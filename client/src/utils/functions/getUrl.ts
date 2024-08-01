export const getUrl = (url: string) => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3004" + url;
  }
  return url;
};
