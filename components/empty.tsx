import Image from "next/image"

interface EmptyProps {
  label: string
}

export const Empty = ({label}: EmptyProps) => {
  return (
    <div className="h-tem-center full p-20 flex flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        <Image alt="Empty" fill src="/empty.gif"/>
      </div>
      <p className="tex-muted-foreground text-sm text-center">{label}</p>
    </div>
  )
}
