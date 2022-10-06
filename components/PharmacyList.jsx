import Image from "next/image";
import Link from "next/link";

const PharmacyList = ({ pharmacies, purchaseHistory }) => {
  return (
    <div className="grid grid-cols-1">
      {pharmacies.map((pharm) => {
        return (
          <div
            className="rounded border hover:bg-secondary cursor-pointer flex"
            key={pharm.id}
          >
            <Link href={`/pharmacy/${pharm.id}`}>
              <a
                alt={`View details about ${pharm.name}`}
                className="py-2 px-2 w-full flex items-center"
              >
                {purchaseHistory[pharm.id] ? (
                  <Image src="/assets/checkmark.png" width={24} height={24} />
                ) : (
                  <div className="w-[24px]" />
                )}
                <span className="pl-2">{pharm.name}</span>
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default PharmacyList;
