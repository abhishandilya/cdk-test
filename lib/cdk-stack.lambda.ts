export const handler = async (event: unknown = {}): Promise<unknown> => {
  console.log(JSON.stringify(event, null, 2));
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from Lambda!",
      input: event,
    }),
  };
};
