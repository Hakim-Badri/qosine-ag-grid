
import { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { themeBalham, type ColDef, type GridApi, type GridReadyEvent } from "ag-grid-community";
import type { Entry, SelectionStats } from "../types";
import { flattenEntries, reconstructEntries } from "../utils/rowMapper";
import { getColDefs } from "./column";

import "../styles/aggrid-overrides.css";
import { getSelectedCellSummary } from "../utils/slectedCellSummary";


type Props = {
    rows: Entry[];
    setRows: (next: Entry[]) => void;
    original?: Entry[];
    minWidth?: number;
};

const gridOptions = {
    undoRedoCellEditing: true,
    undoRedoCellEditingLimit: 20,
    cellSelection: true,
    rowSelection: {
        mode: 'multiRow',
    },
    enableCellTextSelection: true,
    ensureDomOrder: true


}

export default function AgGridTable({ rows, setRows, minWidth = 60 }: Props) {

    const gridApiRef = useRef<GridApi | null>(null);
    const agRows = useMemo(() => flattenEntries(rows), [rows]);
    const colDefs = useMemo<ColDef[]>(() => getColDefs(minWidth), [minWidth]);
    const [selectionStats, setSelectionStats] = useState<SelectionStats | null>(null);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        gridApiRef.current = params.api;
        params.api.sizeColumnsToFit?.();
    }, []);

    const myTheme = themeBalham.withParams({
        rowBorder: true,
        columnBorder: true
    })


    const onCellValueChanged = useCallback(() => {
        const api = gridApiRef.current;
        if (!api) return;
        const flatRows: any[] = [];
        api.forEachNode((n) => flatRows.push(n.data));
        const reconstructed = reconstructEntries(flatRows);
        setRows(reconstructed);
    }, [setRows]);

    const onCellSelectionChanged = useCallback(() => {
        const api = gridApiRef.current;
        const stats = getSelectedCellSummary(api);
        console.log("stats: ", stats)
        setSelectionStats(stats);
    }, []);

    return (
        <div className="ag-grid" style={{ height: "68vh", width: "100%" }}>
            <AgGridReact
                theme={myTheme}
                rowData={agRows}
                columnDefs={colDefs}
                defaultColDef={{ resizable: true, sortable: true, flex: 0 }}
                onCellSelectionChanged={onCellSelectionChanged}
                onGridReady={onGridReady}
                onCellValueChanged={onCellValueChanged}
                undoRedoCellEditing={gridOptions.undoRedoCellEditing}
                undoRedoCellEditingLimit={gridOptions.undoRedoCellEditingLimit}
                cellSelection={gridOptions.cellSelection}
                animateRows
            />

            {selectionStats?.count ? <div className="ag-summary">
                <span className="label">Rows:</span>
                <span className="value">
                    {selectionStats?.selectedRowCount}
                </span>
                <span className="label">Total rows:</span>
                <span className="value" >
                    {selectionStats?.totalRows}
                </span>
                <span className="label">Avg:</span>
                <span className="value">
                    {selectionStats?.avg !== null ? selectionStats?.avg.toFixed(2) : "-"}
                </span>
                <span className="label">Count:</span>
                <span className="value">
                    {selectionStats?.count}
                </span>
                <span className="label">Min:</span>
                <span className="value">
                    {selectionStats?.min ?? "-"}
                </span>
                <span className="label">Max:</span>
                <span className="value">
                    {selectionStats?.max ?? "-"}
                </span>
                <span className="label">Sum:</span>
                <span className="value">
                    {selectionStats?.sum}
                </span>
            </div> : null
            }
        </div>
    );
}
