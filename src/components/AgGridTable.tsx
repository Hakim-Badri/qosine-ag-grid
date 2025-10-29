// src/components/AgGridTable.tsx
import React, { useCallback, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import type { Entry } from "../types";
import { flattenEntries } from "../utils/rowMapper";
import { getColDefs } from "./column";

type Props = {
    rows: Entry[]; // working rows from parent
    setRows: (next: Entry[]) => void;
    // optional: original if parent wants to pass it in
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



}

export default function AgGridTable({ rows, setRows, minWidth = 60 }: Props) {

    const gridApiRef = useRef<GridApi | null>(null);
    const agRows = useMemo(() => flattenEntries(rows), [rows]);
    const colDefs = useMemo<ColDef[]>(() => getColDefs(minWidth), [minWidth]);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        gridApiRef.current = params.api;
        params.api.sizeColumnsToFit?.();
    }, []);


    const onCellValueChanged = useCallback(() => { }, [setRows]);

    return (
        <div className="ag-theme-alpine" style={{ height: "68vh", width: "100%" }}>
            <AgGridReact
                rowData={agRows}
                columnDefs={colDefs}
                defaultColDef={{ resizable: true, sortable: true, filter: true, flex: 0 }}
                rowSelection={gridOptions.rowSelection}
                onGridReady={onGridReady}
                onCellValueChanged={onCellValueChanged}
                undoRedoCellEditing={gridOptions.undoRedoCellEditing}
                undoRedoCellEditingLimit={gridOptions.undoRedoCellEditingLimit}
                cellSelection={gridOptions.cellSelection}
                animateRows
            />
        </div>
    );
}
