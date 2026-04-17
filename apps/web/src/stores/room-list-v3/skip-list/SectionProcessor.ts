/*
Copyright 2025 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { type Filter, FilterEnum, FilterKey } from "./filters";
import { FavouriteFilter } from "./filters/FavouriteFilter.ts";
import { LowPriorityFilter } from "./filters/LowPriorityFilter.ts";
import { UnreadFilter } from "./filters/UnreadFilter.ts";
import { MentionsFilter } from "./filters/MentionsFilter.ts";
import { InvitesFilter } from "./filters/InvitesFilter.ts";
import { UnreadSectionFilter } from "./filters/UnreadSectionFilter.ts";
import { ChatSectionFilter } from "./filters/ChatSectionFilter.ts";
import { DefaultTagID } from "./tag.ts";

export const SECTIONS = [
    FilterEnum.FavouriteFilter,
    UnreadSectionFilter.KEY,
    ChatSectionFilter.KEY,
    FilterEnum.LowPriorityFilter,
]

export const SECTION_FILTERS: { [key: FilterKey]: Filter } = {
    [FilterEnum.FavouriteFilter]: new FavouriteFilter(),
    [UnreadSectionFilter.KEY]: new UnreadSectionFilter(
        [new InvitesFilter(), new MentionsFilter(), new UnreadFilter()],
        [DefaultTagID.Favourite, DefaultTagID.LowPriority],
    ),
    [FilterEnum.LowPriorityFilter]: new LowPriorityFilter(),
}

SECTION_FILTERS[ChatSectionFilter.KEY] = new ChatSectionFilter(SECTIONS.map(tag => SECTION_FILTERS[tag]));
