import { useCallback } from "react";
import AgGridTable from "./components/AgGridTable";
import { useEntries } from "./hooks/useEntries";
import Button from "./components/Button";
import "./agGridSetup"
import "./index.css"


function App() {
  const { original, rows, setRows, getChanges, resetToOriginal } = useEntries(10);

  const handleCompare = useCallback(() => {
    const changed = getChanges();
    console.log("Original values (unchanged copy):", original);
    console.log("Changed values (only changed rows):", changed);
    console.log("complete Updated Rows: ", rows)
    alert(`Compare logged to console. Changed rows: ${changed.length}`);
  }, [getChanges, original]);

  return (
    <div >
      <h1 className="text-2xl flex justify-center align-middle font-bold font-sans mb-4 m-1">QOSINE: AG Grid Assignment</h1>
      <AgGridTable rows={rows} setRows={setRows} original={original} minWidth={60} />
      <div className="mb-4 flex gap-3 mt-5 ml-5">
        <Button onClick={handleCompare}>Compare</Button>
        <Button onClick={resetToOriginal} className="bg-gray-600">Reset</Button>
      </div>
      <div>
        <h1 className="text-l mb-4 flex gap-3 mt-5 ml-5">Total changed rows: {getChanges().length} </h1>
      </div>
    </div>

  );
}

export default App;
