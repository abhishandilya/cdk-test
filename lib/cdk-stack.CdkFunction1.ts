export const handler = async (event: any) => {
  console.log("Hello, world!");
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify("Hello, world!"),
    contentType: "application/json",
  };
};
