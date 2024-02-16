const showTime = (createdAt: any) => {
  const date = new Date(createdAt);
  const options: any = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata", // IST timezone
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export default showTime;
