export type YearKey = 2025 | 2024 | 2023 | 2022;

export type Account = {
    amount: number;
    isBilled: boolean;
};

export type YearDataItem = {
    total_amount: number;
    acc1: Account;
    acc2: Account;
    acc3: Account;
    acc4: Account;
};



export type Entry = {
    service: { _id: string; name: string };
    act: { _id: string; name: string };
    quote: string;
    remarks: string;
    yearData: Record<YearKey, YearDataItem>;
    _id?: string;
};

export type SelectionStats = {
    selectedRowIndexes: number[]; // unique row indexes touched by selection
    selectedRowCount: number; // unique rows count
    totalRows: number; // total rows in grid (after filter/sort)
    count: number; // numeric cells count
    sum: number; // numeric sum
    avg: number | null;
    min: number | null;
    max: number | null;
};
