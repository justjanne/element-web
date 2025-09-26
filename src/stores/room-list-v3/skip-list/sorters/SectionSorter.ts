/*
Copyright 2025 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import type { Room } from "matrix-js-sdk/src/matrix";
import type { Sorter } from ".";
import { buildSections, type Section, sectionMatches } from "../sections";

export class SectionSorter implements Sorter {
    public readonly sections: Section[];
    public constructor(
        public readonly wrapped: Sorter,
        public readonly useSections: boolean,
        public readonly unreadFirst: boolean,
    ) {
        this.sections = buildSections(useSections, unreadFirst);
    }

    public sort(rooms: Room[]): Room[] {
        return [...rooms].sort((a, b) => {
            return this.comparator(a, b);
        });
    }

    private getSectionIndex(room: Room): number {
        for (let index = 0; index < this.sections.length; index++) {
            if (sectionMatches(this.sections[index], room)) {
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
        return [this.wrapped.type, this.useSections ? "useSections" : null, this.unreadFirst ? "unreadFirst" : null]
            .filter((it) => it !== null)
            .join("-");
    }
}
