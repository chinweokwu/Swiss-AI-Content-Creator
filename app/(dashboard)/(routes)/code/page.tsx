"use client"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import * as z from "zod"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Heading } from '@/components/heading'
import { Empty } from '@/components/empty'
import { Code } from 'lucide-react'
import { formSchema } from './constants'
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/loader"
import { cn } from "@/lib/utils"
import { UserAvatar } from "@/components/use-avatar"
import { BotAvatar } from "@/components/bot-avatar"
import ReactMarkdown from "react-markdown";

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const CodePage = () => {
  const router = useRouter()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  })

  const isLoading  = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatMessage  = {
        role: "user",
        content: values.prompt,
      }
      const newMessages = [...messages, userMessage]
      const response = await axios.post("/api/code",{messages: newMessages});

      setMessages((curr) => [...curr, userMessage, response.data])
      form.reset();
    }catch(error: any){
      console.log(error)
    }finally{
      router.refresh()
    }
  }
  return (
    <div>
      <Heading 
        title='Code Generation'
        description='Our most advance code model'
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadoe-sm grid grid-col-12 gap-2"
          >
           <FormField
            name="prompt"
            render={({field}) => (
              <FormItem className="col-span-12 lg:col-span-10">
                <FormControl className="m-0 p-0">
                  <Input
                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                    disabled={isLoading}
                    placeholder="simple toggle button using javascript"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
           /> 
           <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
             Submit
           </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4 px-5">
        {isLoading && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">

            <Loader/>
          </div>
        )}
        {messages.length === 0 && !isLoading && (
          <Empty label="No Conversation started" />
        )}
        <div className="flex flex-col-reverse gap-y-4">
          {messages.map((message) => (
            <div 
              className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white border border-black/10" : "bg-violet-100")}
              key={message.content} >

              {message.role === "user" ? <UserAvatar/>: <BotAvatar/>}
              <ReactMarkdown
                components={{
                  pre: ({node, ...props}) => (
                    <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                      <pre {...props}/>
                    </div>  
                  ),
                  code: ({node, ...props}) => (
                    <code className="bg-black/10 rounded-lg  p-2" {...props}/>
                  )}}
                  className="text-sm overflow-hidden leading-7"
              >
                {message.content  || ""}
              </ReactMarkdown>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CodePage