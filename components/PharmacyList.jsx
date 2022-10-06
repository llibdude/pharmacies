import Link from "next/link";

const PharmacyList = ({ pharmacies, purchaseHistory }) => {
  return (
    <div className="grid grid-cols-1 max-w-[500px] m-auto">
      {pharmacies.map((pharm) => {
        return (
          <div
            className="rounded border hover:bg-secondary cursor-pointer flex"
            key={pharm.pharmacyId}
          >
            <Link href={`/pharmacy/${pharm.pharmacyId}`}>
              <a
                alt={`View details about ${pharm.name}`}
                className="py-2 px-2 w-full"
              >
                {purchaseHistory[pharm.pharmacyId] ? "checkmark" : null}
                {pharm.name}
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default PharmacyList;
