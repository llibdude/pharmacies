import Head from "next/head";
import PharmacyList from "../components/PharmacyList";
import usePharmaciesList from "../hooks/usePharmacies";
import useLocalStorageState from "use-local-storage-state";
import { useRouter } from "next/router";

export default function Home() {
  const { pharmacies, isError, isLoading } = usePharmaciesList([]);

  const router = useRouter();

  const [purchaseHistory] = useLocalStorageState("purchase_history", {
    defaultValue: {},
  });

  // TODO: Handle errors gracefully. Handle isLoading with ghost component
  if (isError || isLoading) {
    return;
  }

  return (
    <div>
      <Head>
        <title>Pharmacies</title>
      </Head>

      <main>
        <div className="max-w-[500px] m-auto">
          <button
            className="mb-2"
            onClick={() => router.push(`/pharmacy/${pharmacies.closest}/order`)}
          >
            Order from pharmacy closest to me!
          </button>
          <PharmacyList
            pharmacies={pharmacies.pharmacies}
            purchaseHistory={purchaseHistory}
          />
        </div>
      </main>
    </div>
  );
}
