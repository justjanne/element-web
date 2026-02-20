/*
 * Copyright 2026 Element Creations Ltd.
 *
 * SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
 * Please see LICENSE files in the repository root for full details.
 */

import {useMemo, useRef} from "react";

export function useMemorizedList<T>(value: T[]): T[] {
    const memo = useRef(value);
    return useMemo(() => {
        if (arrayEqual(value, memo.current)) {
            return memo.current
        } else {
            memo.current = value;
            return value;
        }
    }, [value]);
}

function arrayEqual<T>(a: T[], b: T[]): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
