import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMessageTime(date: string) {
  const today = new Date();
  const messageDate = new Date(date);

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  if (messageDate.toDateString() === today.toDateString()) {
    return messageDate.toLocaleTimeString("de-DE", timeOptions);
  } else {
    return (
      messageDate.toLocaleDateString("de-DE", dateOptions) +
      " - " +
      messageDate.toLocaleTimeString("de-DE", timeOptions)
    );
  }
}
