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

const USER_POSITION = {
  latitude: 37.48771670017411,
  longitude: -122.22652739630438,
};

const computeClosestPharmacy = (pharmacies) => {
  const vectorDistance = (dx, dy) => {
    return Math.sqrt(dx * dx + dy * dy);
  };

  const locationDistance = (location1, location2) => {
    var dx = location1.latitude - location2.latitude,
      dy = location1.longitude - location2.longitude;

    return vectorDistance(dx, dy);
  };

  return pharmacies.reduce((prev, curr) => {
    var prevDistance = locationDistance(USER_POSITION, prev),
      currDistance = locationDistance(USER_POSITION, curr);
    return prevDistance < currDistance ? prev : curr;
  }, 0);
};

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      // Looping through each pharmacy to get it's details is a horribly inefficient way to do this.
      // I would make sure api gives me the details I need so i don't have to query endpoint n times
      const promises = data.pharmacies.map((d) => {
        return fetch(
          `https://api-qa-demo.nimbleandsimple.com/pharmacies/info/${d.pharmacyId}`
        );
      });

      const responses = await Promise.all(promises);
      const parsePromises = responses.map((response) => {
        return response.json();
      });
      const pharmacyDetails = await Promise.all(parsePromises);
      const pharmacyCoords = pharmacyDetails
        .filter((r) => r.value.name && r.value.id)
        .map((r) => {
          return {
            name: r.value.name,
            pharmacyId: r.value.id,
            latitude: r.value.address.latitude,
            longitude: r.value.address.longitude,
          };
        });

      const closestPharmacy = computeClosestPharmacy(pharmacyCoords);

      // Showing pharmacies without a name to users could be confusing or even dangerous. Filter them out along with any pharmacies without an id.
      res.json({
        data: {
          pharmacies: pharmacyDetails.map((pharm) => pharm.value),
          closest: closestPharmacy.pharmacyId,
        },
      });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
