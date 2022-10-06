const data = {
  pharmacies: [
    {
      name: "ReCept",
      pharmacyId: "NRxPh-HLRS",
    },
    {
      name: "My Community Pharmacy",
      pharmacyId: "NRxPh-BAC1",
    },
    {
      pharmacyId: "NRxPh-SJC1",
    },
    {
      name: "NY Pharmacy",
      pharmacyId: "NRxPh-ZEREiaYq",
    },
  ],
};

export default (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      // Showing pharmacies without a name to users could be confusing or even dangerous. Filter them out along with any pharmacies without an id.
      res.json({
        data: data.pharmacies.filter((pharm) => pharm.name && pharm.pharmacyId),
      });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
