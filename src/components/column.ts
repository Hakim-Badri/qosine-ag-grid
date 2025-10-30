// src/components/columns.ts
import type { ColDef } from "ag-grid-community";

/**
 * Factory to return column defs. Call with desired minWidth.
 */
export function getColDefs(minWidth = 60): ColDef[] {
    const baseCellClass = (params: any) =>
        params.colDef.editable === false ? "non-editable" : "";
    return [
        { headerName: "Service", field: "serviceName", editable: false, minWidth, cellClass: baseCellClass },
        { headerName: "Act", field: "actName", editable: true, minWidth, cellClass: baseCellClass },
        { headerName: "Remarks", field: "remarks", editable: true, minWidth, cellClass: baseCellClass },
        { headerName: "Quote", field: "quote", editable: false, minWidth, cellClass: baseCellClass },
        { headerName: "2022-2023", field: "2022", editable: false, minWidth, cellClass: baseCellClass },
        { headerName: "2023-2024", field: "2023", editable: false, minWidth, cellClass: baseCellClass },
        { headerName: "2024-2025", field: "2024", editable: false, minWidth, cellClass: baseCellClass },
        {
            headerName: "Price",
            field: "price",
            editable: true,
            minWidth,
            cellClass: baseCellClass,
            valueParser: (p: any) => {
                const n = Number(p.newValue);
                return Number.isNaN(n) ? 0 : n;
            },
        },
        ...["acc1", "acc2", "acc3", "acc4"].map((f) => ({
            headerName: f,
            field: f,
            editable: true,
            minWidth,
            valueParser: (p: any) => {
                const n = Number(p.newValue);
                return Number.isNaN(n) ? 0 : n;
            },
        })),
        {
            headerName: "Diff",
            field: "diff",
            editable: false,
            minWidth,
            valueGetter: (params: any) => {
                const price = Number(params.data?.price || 0);
                const a1 = Number(params.data?.acc1 || 0);
                const a2 = Number(params.data?.acc2 || 0);
                const a3 = Number(params.data?.acc3 || 0);
                const a4 = Number(params.data?.acc4 || 0);
                return price - (a1 + a2 + a3 + a4);
            },
            cellClass: baseCellClass,
            cellClassRules: {
                "negative-diff": (params) => {
                    const val = Number(params.value);
                    return !Number.isNaN(val) && val < 0;
                },
            },
        },
        { headerName: "acc1 2024-25", field: "acc1_2024", editable: false, minWidth, cellClass: baseCellClass },
        { headerName: "acc2 2024-25", field: "acc2_2024", editable: false, minWidth, cellClass: baseCellClass },
        { headerName: "acc3 2024-25", field: "acc3_2024", editable: false, minWidth, cellClass: baseCellClass },
        { headerName: "acc4 2024-25", field: "acc4_2024", editable: false, minWidth, cellClass: baseCellClass },
    ];
}
