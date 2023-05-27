import "./App.css";
import { v4 as uuid } from "uuid";
import { usePollStatus } from "./hooks/usePollStatus";
import { useState } from "react";

function App() {
  const [id] = useState(uuid());

  const { data, error, isLoading } = usePollStatus(id);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <div>{data?.status ?? "Error"}</div>
    </>
  );
}

export default App;
