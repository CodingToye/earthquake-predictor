// utils/date.ts

export function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  return {
    date: date.toDateString(),
    time: date.toLocaleTimeString("en-US"),
  };
}
