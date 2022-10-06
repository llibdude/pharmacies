// TODO - Implement searching and pagination
export default async (req, res) => {
  const { method, query } = req;

  // TODO: Validate data
  const response = await fetch(
    `https://s3-us-west-2.amazonaws.com/assets.nimblerx.com/prod/medicationListFromNIH/medicationListFromNIH.txt`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
  const result = await response.text();
  const parsedResult = result.replaceAll("\n", "").split(",");

  switch (method) {
    case "GET":
      res.json({
        data: parsedResult,
      });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
