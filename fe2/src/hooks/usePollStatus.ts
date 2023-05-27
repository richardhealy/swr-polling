import useSWR from "swr";

const fetcher = (...args: any) => {
  // @ts-expect-error next-line
  return fetch(...args).then((res) => res.json());
};

export const usePollStatus = () => {
  const { data, error, isLoading } = useSWR<{
    processes: { id: string; status: "started" | "in progress" | "finihsed" }[];
  }>(`http://localhost:3000/processes`, fetcher, {
    refreshInterval: 3000,
  });

  return { data, error, isLoading };
};
