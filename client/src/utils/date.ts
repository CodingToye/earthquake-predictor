// utils/date.ts

export function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  return {
    date: date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    time: date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
}
