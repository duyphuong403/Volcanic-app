export const formatDate = (timestamp: string) => {
  if (!timestamp) return null;

  const date = new Date(parseInt(timestamp));

  return date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0") + ", " + date.toDateString();
};
