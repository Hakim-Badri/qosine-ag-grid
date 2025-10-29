// src/utils/rowMapper.ts
import type { Entry, YearKey } from "../types";

/**
 * Convert nested Entry[] to a flat row array for AG Grid
 */
export function flattenEntries(entries: Entry[]) {
    return entries.map((r) => {
        return {
            _id: r._id,
            serviceName: r.service.name,
            actName: r.act.name,
            remarks: r.remarks,
            quote: r.quote,
            "2022": r.yearData[2022].total_amount,
            "2023": r.yearData[2023].total_amount,
            "2024": r.yearData[2024].total_amount,
            acc1_2024: r.yearData[2024].acc1.amount,
            acc2_2024: r.yearData[2024].acc2.amount,
            acc3_2024: r.yearData[2024].acc3.amount,
            acc4_2024: r.yearData[2024].acc4.amount,
            price: r.yearData[2025].total_amount,
            acc1: r.yearData[2025].acc1.amount,
            acc2: r.yearData[2025].acc2.amount,
            acc3: r.yearData[2025].acc3.amount,
            acc4: r.yearData[2025].acc4.amount,
        };
    });
}


