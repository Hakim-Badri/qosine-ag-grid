import { useState, useRef } from "react";
import type { Entry } from "../types";
import { createEntries } from "../utils/createEntries";

export function useEntries(initialCount = 20) {
    // original (immutable reference)
    const originalRef = useRef<Entry[]>(createEntries(initialCount));
    // working copy for editing in the grid
    const [rows, setRows] = useState<Entry[]>(
        () => JSON.parse(JSON.stringify(originalRef.current)) as Entry[]
    );

    // Compute changed values (diff)
    const getChanges = () => {
        const orig = originalRef.current;
        const changed: Entry[] = [];

        rows.forEach((r, idx) => {
            const o = orig[idx];
            if (!o) return;
            if (JSON.stringify(o) !== JSON.stringify(r)) {
                changed.push(r);
            }
        });

        return changed;
    };

    const resetToOriginal = () => {
        setRows(JSON.parse(JSON.stringify(originalRef.current)));
    };

    return { original: originalRef.current, rows, setRows, getChanges, resetToOriginal };
}
