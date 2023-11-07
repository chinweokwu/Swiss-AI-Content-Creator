"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonals = [
  {
    name: "Paul",
    avatar: "P",
    title: "Software Engineer",
    description: "This is th best app i have ever used!!!"
  },
  {
    name: "Morah",
    avatar: "M",
    title: "Software Engineer",
    description: "This is th best app i have ever used!!!"
  },
  {
    name: "Chinwe",
    avatar: "C",
    title: "Software Engineer",
    description: "This is th best app i have ever used!!!"
  },
  {
    name: "Sam",
    avatar: "S",
    title: "Software Engineer",
    description: "This is th best app i have ever used!!!"
  },
    {
    name: "Ifeanyi",
    avatar: "I",
    title: "Software Engineer",
    description: "This is th best app i have ever used!!!"
  },
    {
    name: "Deborah",
    avatar: "D",
    title: "Software Engineer",
    description: "This is th best app i have ever used!!!"
  },
    {
    name: "Victory",
    avatar: "V",
    title: "Software Engineer",
    description: "This is th best app i have ever used!!!"
  },
]

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          testimonals.map((item)=> (
            <Card key={item.description} className="bg-[#192339] border-none text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-x-2">
                  <div>
                    <p>{item.name}</p>
                    <p>{item.title}</p>
                  </div>
                </CardTitle>
                <CardContent className="pt-4 px-0">
                  {item.description}
                </CardContent>
              </CardHeader>
            </Card>
          ))
        }
      </div>
    </div>
  )
}