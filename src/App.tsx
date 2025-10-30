import { useCallback } from "react";
import AgGridTable from "./components/AgGridTable";
import { useEntries } from "./hooks/useEntries";
import Button from "./components/Button";
import "./agGridSetup"


function App() {
  const { original, rows, setRows, getChanges, resetToOriginal } = useEntries(10);

  const handleCompare = useCallback(() => {
    const changed = getChanges();
    console.log("Original values (unchanged copy):", original);
    console.log("Changed values (only changed rows):", changed);
    alert(`Compare logged to console. Changed rows: ${changed.length}`);
  }, [getChanges, original]);

  return (
    <div >
      <h1 className="text-2xl font-bold mb-4">QOSINE: AG Grid Assignment</h1>
      <div className="mb-4 flex gap-3">
        <Button onClick={handleCompare}>Compare</Button>
        <Button onClick={resetToOriginal} className="bg-gray-600">Reset</Button>
      </div>
      <AgGridTable rows={rows} setRows={setRows} minWidth={60} />
    </div>

  );
}

export default App;
