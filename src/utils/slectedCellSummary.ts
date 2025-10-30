// src/utils/selectionStats.ts
import type { GridApi } from "ag-grid-community";
import type { SelectionStats } from "../types";



/**
 * Compute numeric aggregate statistics for current cell-range selection.
 * - Ignores non-numeric cells.
 * - Uses visible rows after filter & sort.
 */
export function getSelectedCellSummary(api: GridApi | null): SelectionStats {
    const empty: SelectionStats = {
        selectedRowIndexes: [],
        selectedRowCount: 0,
        totalRows: 0,
        count: 0,
        sum: 0,
        avg: null,
        min: null,
        max: null,
    };

    if (!api || typeof api.getCellRanges !== "function") return empty;

    const ranges = api.getCellRanges() || [];
    // total rows after filter & sort
    let totalRows = 0;
    api.forEachNodeAfterFilterAndSort(() => {
        totalRows++;
    });

    if (ranges.length === 0) {
        return { ...empty, totalRows };
    }

    const numericValues: number[] = [];
    const rowIndexSet = new Set<number>();

    ranges.forEach((range: any) => {
        // columns selected in this range (colId strings)
        const cols: string[] = range.columns.map((c: any) => c.getColId());
        // determine row indexes boundaries
        const start = Math.min(range.startRow.rowIndex, range.endRow.rowIndex);
        const end = Math.max(range.startRow.rowIndex, range.endRow.rowIndex);

        // iterate visible nodes and check if their index falls inside the range
        let idx = 0;
        api.forEachNodeAfterFilterAndSort((node: any) => {
            if (idx >= start && idx <= end) {
                // register this row index
                rowIndexSet.add(idx);
                // collect numeric values from selected columns
                cols.forEach((colId) => {
                    const val = node.data?.[colId];
                    const n = Number(val);
                    if (!Number.isNaN(n)) numericValues.push(n);
                });
            }
            idx++;
        });
    });

    const count = numericValues.length;
    const sum = count ? numericValues.reduce((s, v) => s + v, 0) : 0;
    const avg = count ? sum / count : null;
    const min = count ? Math.min(...numericValues) : null;
    const max = count ? Math.max(...numericValues) : null;

    return {
        selectedRowIndexes: Array.from(rowIndexSet).sort((a, b) => a - b),
        selectedRowCount: rowIndexSet.size,
        totalRows,
        count,
        sum,
        avg,
        min,
        max,
    };
}
