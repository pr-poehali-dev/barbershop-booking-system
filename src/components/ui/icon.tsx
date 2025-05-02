
import React from "react"
import * as LucideIcons from "lucide-react"

type IconName = keyof typeof LucideIcons

interface IconProps {
  name: IconName
  fallback?: IconName
  color?: string
  size?: number
  className?: string
}

const Icon: React.FC<IconProps> = ({ 
  name, 
  fallback = "CircleAlert", 
  color, 
  size = 24, 
  className = "",
  ...props 
}) => {
  // Check if the requested icon exists in Lucide
  const IconComponent = LucideIcons[name] || LucideIcons[fallback]
  
  return (
    <IconComponent 
      color={color} 
      size={size} 
      className={className} 
      {...props} 
    />
  )
}

export default Icon
