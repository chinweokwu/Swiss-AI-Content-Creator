import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { increaseApiLimit, checkApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

export async function POST (req: Request){
  try{
    const {userId} = auth();
    const body = await req.json();
    const {messages} = body;
    const isPro = await checkSubscription()
    const freeTrial = await checkApiLimit();
    if(!userId) {
      return new NextResponse("Unauthorized", {status: 401});  
    }

    if(!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured", {status: 500})
    }

    if(!messages){
      return new NextResponse("Message is required", {status: 400})
    }


    if(!freeTrial && isPro) {
      return new NextResponse("Free Trials Limit has been Exceeded", {status: 403})
    }

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    })
    
    if(!isPro){
      await increaseApiLimit();
    }

    return NextResponse.json(chatCompletion.choices[0].message);
  } catch(error){
    console.log("[CONVERATION_ERROR]", error)
    return new NextResponse("Internal Error", {status: 500})
  }
}