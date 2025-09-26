/*
Copyright 2025 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import type { Room } from "matrix-js-sdk/src/matrix";
import type { Sorter } from ".";
import { type Filter, FilterKey } from "../filters";
import { FavouriteFilter } from "../filters/FavouriteFilter.ts";
import { PeopleFilter } from "../filters/PeopleFilter.ts";
import { InvitesFilter } from "../filters/InvitesFilter.ts";
import { UnreadFilter } from "../filters/UnreadFilter.ts";
import { RoomsFilter } from "../filters/RoomsFilter.ts";
import { MentionsFilter } from "../filters/MentionsFilter.ts";
import { LowPriorityFilter } from "../filters/LowPriorityFilter.ts";

const filters: { [T in FilterKey]?: Filter } = {
    [FilterKey.FavouriteFilter]: new FavouriteFilter(),
    [FilterKey.UnreadFilter]: new UnreadFilter(),
    [FilterKey.PeopleFilter]: new PeopleFilter(),
    [FilterKey.RoomsFilter]: new RoomsFilter(),
    [FilterKey.InvitesFilter]: new InvitesFilter(),
    [FilterKey.MentionsFilter]: new MentionsFilter(),
    [FilterKey.LowPriorityFilter]: new LowPriorityFilter(),
};

export class SectionSorter implements Sorter {
    public constructor(
        public readonly wrapped: Sorter,
        public readonly sections: (FilterKey | null)[],
    ) {}

    public sort(rooms: Room[]): Room[] {
        return [...rooms].sort((a, b) => {
            return this.comparator(a, b);
        });
    }

    private getSectionIndex(room: Room): number {
        for (let index = 0; index < this.sections.length; index++) {
            const key = this.sections[index];
            if (key !== null && filters[key] && filters[key].matches(room)) {
                return index;
            }
        }
        return this.sections.indexOf(null);
    }

    public comparator(roomA: Room, roomB: Room): number {
        const sectionA = this.getSectionIndex(roomA);
        const sectionB = this.getSectionIndex(roomB);
        if (sectionA === sectionB) {
            return this.wrapped.comparator(roomA, roomB);
        } else {
            return sectionA - sectionB;
        }
    }

    public get type(): string {
        return ["grouping", this.wrapped.type, ...this.sections].join("|");
    }
}
