"use client";
import Link from "next/link";
import Image from "next/image";
import {Montserrat} from "next/font/google"
import { LayoutDashboard, MessageSquare, ImageIcon, Settings, Code } from "lucide-react"
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { FreeCounter } from "@/components/free-counter";

const montserrat = Montserrat({weight: "700", subsets:['latin']});

const routes = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    href: "/conversation",
    icon: MessageSquare,
    color: "text-violet-700",
  },
  {
    label: "Image Generation",
    href: "/image",
    icon: ImageIcon,
    color: "text-pink-700",
  },
  {
    label: "Code Generation",
    href: "/code",
    icon: Code,
    color: "text-green-700",
  },
  {
    label: "Settings",
    href: "/setting",
    icon: Settings,
    color: "text-pink-700",
  },

]
interface SidebarProps {
  apiLimitCount: number;
  isPro: boolean;
};

const Sidebar = ({apiLimitCount = 0, isPro=false}: SidebarProps) => {
  const pathname = usePathname()
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image
              fill
              alt="logo"
              src="/logo.png"
            />
          </div>
          <h1 className={cn ("text-2xl font-bold", montserrat.className)}>Swiss AICreator</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route)=> (
            <Link 
              href={route.href}
              key={route.href}
              className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-sky-500 hover:bg-white/10 hover:text-white"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro}/>
    </div>
  )
}

export default Sidebar