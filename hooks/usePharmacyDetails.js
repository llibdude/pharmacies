import useSWR from "swr";

const usePharmacyDetails = (pharmacyId) => {
  const fetcher = (args) => fetch(args).then((res) => res.json());
  const { data, error } = useSWR(
    pharmacyId ? `/api/pharmacy/${pharmacyId}` : null,
    fetcher
  );

  return {
    details: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default usePharmacyDetails;
