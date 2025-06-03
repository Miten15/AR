import { cn } from "@/lib/utils"
import { Container } from "@/components/container"

interface SectionProps {
  children: React.ReactNode
  className?: string
  containerSize?: "sm" | "md" | "lg" | "xl" | "full"
  padding?: "none" | "sm" | "md" | "lg" | "xl"
  id?: string
}

export function Section({ 
  children, 
  className, 
  containerSize = "xl",
  padding = "lg",
  id
}: SectionProps) {
  const paddingClasses = {
    none: "",
    sm: "py-8 md:py-12",
    md: "py-12 md:py-16",
    lg: "py-12 md:py-20 lg:py-24",
    xl: "py-16 md:py-24 lg:py-32"
  }

  return (
    <section 
      id={id}
      className={cn(
        "w-full",
        paddingClasses[padding],
        className
      )}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  )
}
