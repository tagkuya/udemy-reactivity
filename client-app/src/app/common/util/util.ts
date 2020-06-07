export const combineDateAndTime = (date: Date, time: Date) => {
  const timeString =
    time.getHours().toString() + ":" + time.getMinutes().toString() + ":00";
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateString = `${year}-${month}-${day}`;

  return new Date(dateString + " " + timeString);
};
