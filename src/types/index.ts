export type Account = { amount: number; isBilled: boolean; };
export type YearDataMap = Record<number, {
    total_amount: number;
    price?: number;
    acc1?: Account;
    acc2?: Account;
    acc3?: Account;
    acc4?: Account;
}>;

export type Entry = {
    service: { _id: string; name: string };
    act: { _id: string; name: string };
    quote: string;
    remarks: string;
    yearData: YearDataMap;
};
