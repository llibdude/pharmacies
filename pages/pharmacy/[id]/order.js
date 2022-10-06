import Head from "next/head";
import { useRouter } from "next/router";
import useLocalStorageState from "use-local-storage-state";
import MedicationList from "../../../components/MedicationList";
import usePharmacyDetails from "../../../hooks/usePharmacyDetails";

export default function Home() {
  const router = useRouter();
  const { id } = router.query;
  const [purchaseHistory, setPurchaseHistory] = useLocalStorageState(
    "purchase_history",
    {
      defaultValue: {},
    }
  );

  // Store medications purchased by store
  const handlePurchase = (medications) => {
    setPurchaseHistory = {
      ...purchaseHistory,
      [id]: medications,
    };

    router.push("/");
  };

  const { details, isError, isLoading } = usePharmacyDetails(id);

  // TODO: Handle errors gracefully. Handle isLoading with ghost component
  if (isError || isLoading) {
    return;
  }

  return (
    <div>
      <Head>
        <title>Order</title>
      </Head>

      <main>
        {purchaseHistory[id] ? (
          <div>
            We're sorry you have already made an order from this pharmacy
          </div>
        ) : (
          <>
            <div>What would you like to order from {details.name} today?</div>
            <MedicationList onPurchase={handlePurchase} />
          </>
        )}
      </main>
    </div>
  );
}
