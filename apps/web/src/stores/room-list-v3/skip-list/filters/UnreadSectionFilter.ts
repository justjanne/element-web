/*
Copyright 2025 New Vector Ltd.
SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import type { Room } from "matrix-js-sdk/src/matrix";
import { type Filter, FilterKey } from ".";

export class UnreadSectionFilter implements Filter {
    public constructor(private readonly filters: Filter[]) {}

    public matches(room: Room): boolean {
        return this.filters.some(filter => filter?.matches(room));
    }

    public get key(): FilterKey {
        return UnreadSectionFilter.KEY;
    }

    public static KEY = "section_unread"
}
