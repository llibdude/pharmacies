import Head from "next/head";
import { useRouter } from "next/router";
import usePharmacyDetails from "../../../hooks/usePharmacyDetails";

const PharmcyDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { details, isError, isLoading } = usePharmacyDetails(id);

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
        <div>
          <div>Name: {name}</div>
          <div>Address: {address.streetAddress1}</div>
          <div>Primary Phone: {primaryPhoneNumber}</div>
          <div>pharmacyHours: {pharmacyHours}</div>
        </div>
      </main>
    </div>
  );
};

export default PharmcyDetailsPage;
