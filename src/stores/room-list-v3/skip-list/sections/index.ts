/*
Copyright 2025 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { type Room } from "matrix-js-sdk/src/matrix";

import { type Filter, FilterKey } from "../filters";
import { FavouriteFilter } from "../filters/FavouriteFilter.ts";
import { UnreadFilter } from "../filters/UnreadFilter.ts";
import { PeopleFilter } from "../filters/PeopleFilter.ts";
import { RoomsFilter } from "../filters/RoomsFilter.ts";
import { InvitesFilter } from "../filters/InvitesFilter.ts";
import { MentionsFilter } from "../filters/MentionsFilter.ts";
import { LowPriorityFilter } from "../filters/LowPriorityFilter.ts";

export type Section = FilterKey | FilterKey[] | null;

const filters: { [T in FilterKey]?: Filter } = {
    [FilterKey.FavouriteFilter]: new FavouriteFilter(),
    [FilterKey.UnreadFilter]: new UnreadFilter(),
    [FilterKey.PeopleFilter]: new PeopleFilter(),
    [FilterKey.RoomsFilter]: new RoomsFilter(),
    [FilterKey.InvitesFilter]: new InvitesFilter(),
    [FilterKey.MentionsFilter]: new MentionsFilter(),
    [FilterKey.LowPriorityFilter]: new LowPriorityFilter(),
};

export function sectionMatches(section: Section, room: Room): boolean {
    if (section === null) {
        return false;
    } else if (Array.isArray(section)) {
        return section.every((key) => !!filters[key]?.matches(room));
    } else {
        return !!filters[section]?.matches(room);
    }
}

const sectionsDefault: Section[] = [
    // Invite
    [FilterKey.InvitesFilter],
    // Favourite
    [FilterKey.FavouriteFilter],
    // People
    [FilterKey.PeopleFilter],
    // Other
    null,
    // Low Priority
    [FilterKey.LowPriorityFilter],
];
const sectionsUnreadFirst: Section[] = [
    // Invite
    [FilterKey.InvitesFilter],
    // Mention
    [FilterKey.MentionsFilter],
    // Unread & Favourite
    [FilterKey.UnreadFilter, FilterKey.FavouriteFilter],
    // Unread & People
    [FilterKey.UnreadFilter, FilterKey.PeopleFilter],
    // Unread Other
    [FilterKey.UnreadFilter],
    // Favourite
    [FilterKey.FavouriteFilter],
    // People
    [FilterKey.PeopleFilter],
    // Other
    null,
    // Low Priority
    [FilterKey.LowPriorityFilter],
];
const listUnreadFirst: Section[] = [
    // Mention
    [FilterKey.MentionsFilter],
    // Unread Other
    [FilterKey.UnreadFilter],
    // Other
    null,
];
export const listDefault: Section[] = [null];

export function buildSections(useSections: boolean, unreadFirst: boolean): Section[] {
    if (useSections && unreadFirst) return sectionsUnreadFirst;
    else if (useSections) return sectionsDefault;
    else if (unreadFirst) return listUnreadFirst;
    else return listDefault;
}
