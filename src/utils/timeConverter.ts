export const convertTimestampToTimeString = (timestamp: number): string => {
  // Create a Date object from the timestamp
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

  // Format the date to a readable string
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };

  return date.toLocaleString(undefined, options);
};
