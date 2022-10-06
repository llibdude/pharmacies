import useSWR from "swr";

const useMedications = () => {
  const fetcher = (args) => fetch(args).then((res) => res.json());
  const { data, error } = useSWR(`/api/medications`, fetcher);

  return {
    medications: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useMedications;
