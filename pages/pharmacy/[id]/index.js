import Head from "next/head";
import { useRouter } from "next/router";
import useLocalStorageState from "use-local-storage-state";
import usePharmacyDetails from "../../../hooks/usePharmacyDetails";

const PharmcyDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { details, isError, isLoading } = usePharmacyDetails(id);
  const [purchaseHistory] = useLocalStorageState("purchase_history", {
    defaultValue: {},
  });

  // TODO: Handle errors gracefully. Handle isLoading with ghost component
  if (isError || isLoading) {
    return;
  }

  const { name, address, primaryPhoneNumber, pharmacyHours } = details;

  return (
    <div>
      <Head>
        <title>Pharmacy Details</title>
      </Head>

      <main>
        <div className="grid grid-cols-2 items-start">
          <div>
            <div className="font-medium text-xl">Pharmacy Details</div>
            <div>Name: {name}</div>
            <div>Address: {address.streetAddress1}</div>
            <div>Primary Phone: {primaryPhoneNumber}</div>
            <div>pharmacyHours: {pharmacyHours}</div>
          </div>
          <button onClick={() => router.push(`/pharmacy/${id}/order`)}>
            Order
          </button>
        </div>
        {purchaseHistory[id] && (
          <div className="my-10">
            <div className="font-medium text-xl">Purchase History</div>
            <ul>
              {purchaseHistory[id].map((purch) => {
                return <li key={purch}>{purch}</li>;
              })}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default PharmcyDetailsPage;
