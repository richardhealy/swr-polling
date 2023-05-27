import "./App.css";
import { v4 as uuid } from "uuid";
import { usePollStatus } from "./hooks/usePollStatus";

function App() {
  const { data, error, isLoading } = usePollStatus();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const createProcess = async () => {
    await fetch("http://localhost:3000/processes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: uuid() }),
    });
  };

  return (
    <>
      <table>
        {data?.processes.length === 0 && (
          <tr>
            <td>No processes</td>
          </tr>
        )}
        {data?.processes.map((process) => {
          return (
            <tr>
              <td>{process.id}</td>
              <td>{process.status}</td>
            </tr>
          );
        })}
      </table>
      <button onClick={createProcess}>Add Process</button>
    </>
  );
}

export default App;
