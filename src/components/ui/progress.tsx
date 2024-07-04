"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative",
      className
    )}
    style={{
      height: '16px',
      width: '100%',
      overflow: 'hidden',
      borderRadius: '9999px',
      backgroundColor: '#333333'
    }}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="transition"
      style={{
        height: '100%',
        width: `${value || 0}%`,
        backgroundColor: '#FFFFFF',
        transition: 'transform .3s'
      }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }