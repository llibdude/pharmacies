import useSWR from "swr";

const usePharmaciesList = () => {
  const fetcher = (args) => fetch(args).then((res) => res.json());
  const { data, error } = useSWR(`/api/pharmacies`, fetcher);

  return {
    pharmacies: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default usePharmaciesList;
