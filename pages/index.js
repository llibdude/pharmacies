import Head from "next/head";
import PharmacyList from "../components/PharmacyList";
import usePharmaciesList from "../hooks/usePharmacies";
import useLocalStorageState from "use-local-storage-state";
import { useEffect } from "react";

export default function Home() {
  const { pharmacies, isError, isLoading } = usePharmaciesList([]);

  const [purchaseHistory, setPurchaseHistory] = useLocalStorageState(
    "purchase_history",
    {
      defaultValue: {},
    }
  );

  // TODO: Handle errors gracefully. Handle isLoading with ghost component
  if (isError || isLoading) {
    return;
  }

  useEffect(() => {
    const computeClosestPharmacy = () => {
      // TODO: Compute closest pharmacy
    };
    computeClosestPharmacy();
  }, pharmacies);

  return (
    <div>
      <Head>
        <title>Pharmacies</title>
      </Head>

      <main>
        <button>Order from pharmacy closest to me!</button>
        <PharmacyList
          pharmacies={pharmacies}
          purchaseHistory={purchaseHistory}
        />
      </main>
    </div>
  );
}
