"use client";
import {useState, useEffect, use} from "react"
import {Menu} from "lucide-react"
import {Button} from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import Sidebar from "@/components/sidebar";

const MobileSidebar = () => {
  const [isMounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])  

  if (!isMounted) return null
  
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden" >
          <Menu/>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar/>
      </SheetContent>
    </Sheet>

  )
}

export default MobileSidebar