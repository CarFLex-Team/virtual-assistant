import { format, isToday, isYesterday } from "date-fns";

export function formatChatDate(dateString: string) {
  const date = new Date(dateString);

  if (isToday(date)) {
    return `Today ${format(date, "h:mm a")} GMT`;
  }

  if (isYesterday(date)) {
    return `Yesterday ${format(date, "h:mm a")} GMT`;
  }

  return `${format(date, "MMM d, yyyy h:mm a")} GMT`;
}
