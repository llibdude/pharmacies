export default async (req, res) => {
  const { method, query } = req;

  // TODO: Validate data
  const response = await fetch(
    `https://api-qa-demo.nimbleandsimple.com/pharmacies/info/${query.id}`
  );
  const result = await response.json();

  switch (method) {
    case "GET":
      res.json({
        data: result.value,
      });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
