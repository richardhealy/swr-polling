import useSWR from "swr";

const fetcher = (...args: any) => {
  // @ts-expect-error next-line
  return fetch(...args).then((res) => res.json());
};

// This would be a store storing the state of the new processes
const processes: Record<string, string | undefined> = {};

export const usePollStatus = (id: string) => {
  let refreshInterval: number | undefined = 2000;
  if (!processes?.[id]) {
    processes[id] = "started";
  }

  if (processes?.[id] && processes[id] === "finished") {
    refreshInterval = undefined;
  }

  const { data, error, isLoading } = useSWR<{ status: string }>(
    `http://localhost:3000/processes/${id}}`,
    fetcher,
    {
      refreshInterval,
    }
  );

  if (data?.status) {
    processes[id] = data.status;
  }

  return { data, error, isLoading };
};
