import {
    ClipboardList,
    Plus,
    Trash2,
    Edit2,
    Info,
  } from "lucide-react";
  
  interface IconProps {
    name: "clipboard" | "plus" | "trash" | "edit" | "info";
    size?: number;
    className?: string;
  }
  
  const iconsMap = {
    clipboard: ClipboardList,
    plus: Plus,
    trash: Trash2,
    edit: Edit2,
    info: Info,
  };
  
  export default function Icon({ name, size = 40, className }: IconProps) {
    const LucideIcon = iconsMap[name];
    return <LucideIcon size={size} strokeWidth={1.6} className={className} />;
  }