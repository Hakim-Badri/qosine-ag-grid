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
/**
 * Convert flat grid rows back into Entry[] structure.
 * It expects the flat rows to include the fields produced by `flattenEntries`.
 */
export function reconstructEntries(flatRows: any[]): Entry[] {
    const yrs: YearKey[] = [2022, 2023, 2024, 2025];
    return flatRows.map((r) => {
        const yd: any = {};
        // 2022
        yd[2022] = {
            total_amount: Number(r["2022"] || 0),
            acc1: { amount: 0, isBilled: true },
            acc2: { amount: 0, isBilled: true },
            acc3: { amount: 0, isBilled: true },
            acc4: { amount: 0, isBilled: true },
        };
        // 2023
        yd[2023] = {
            total_amount: Number(r["2023"] || 0),
            acc1: { amount: 0, isBilled: true },
            acc2: { amount: 0, isBilled: true },
            acc3: { amount: 0, isBilled: true },
            acc4: { amount: 0, isBilled: true },
        };
        // 2024
        yd[2024] = {
            total_amount: Number(r["2024"] || 0),
            acc1: { amount: Number(r["acc1_2024"] || 0), isBilled: true },
            acc2: { amount: Number(r["acc2_2024"] || 0), isBilled: true },
            acc3: { amount: Number(r["acc3_2024"] || 0), isBilled: true },
            acc4: { amount: Number(r["acc4_2024"] || 0), isBilled: true },
        };
        // 2025 (price + accs)
        yd[2025] = {
            total_amount: Number(r["price"] || 0),
            acc1: { amount: Number(r["acc1"] || 0), isBilled: true },
            acc2: { amount: Number(r["acc2"] || 0), isBilled: true },
            acc3: { amount: Number(r["acc3"] || 0), isBilled: true },
            acc4: { amount: Number(r["acc4"] || 0), isBilled: true },
        };

        return {
            _id: r._id,
            service: { _id: r._id ? `srv_${r._id}` : "", name: r.serviceName },
            act: { _id: r._id ? `act_${r._id}` : "", name: r.actName },
            quote: r.quote,
            remarks: r.remarks,
            yearData: yd,
        } as Entry;
    });
}
