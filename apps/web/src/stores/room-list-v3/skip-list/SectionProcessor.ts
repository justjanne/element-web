/*
Copyright 2025 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { type Room } from "matrix-js-sdk/src/matrix";
import { RoomListSectionKey } from "@element-hq/web-shared-components";

import { type RoomListEntry } from "../RoomListStoreV3.ts";
import DMRoomMap from "../../../utils/DMRoomMap.ts";
import { RoomNotificationStateStore } from "../../notifications/RoomNotificationStateStore.ts";
import { getMarkedUnreadState } from "../../../utils/notifications.ts";
import { DefaultTagID } from "./tag.ts";

const enum RoomListSubsection {
    UnreadDirect,
    UnreadFavourite,
    UnreadNormal,
    UnreadLowPriority,
    Other,
}

const filters: { [key in RoomListSubsection]: (room: Room) => boolean } = {
    [RoomListSubsection.UnreadDirect]: (room: Room) => {
        const isUnread = RoomNotificationStateStore.instance.getRoomState(room).hasUnreadCount || !!getMarkedUnreadState(room);
        const isDirect = !!DMRoomMap.shared().getUserIdForRoomId(room.roomId);
        const isMention = RoomNotificationStateStore.instance.getRoomState(room).isMention;
        return isMention || (isDirect && isUnread);
    },
    [RoomListSubsection.UnreadFavourite]: (room: Room) => {
        const isUnread = RoomNotificationStateStore.instance.getRoomState(room).hasUnreadCount || !!getMarkedUnreadState(room);
        const isFavourite = !!room.tags[DefaultTagID.Favourite];
        return isUnread && isFavourite;
    },
    [RoomListSubsection.UnreadLowPriority]: (room: Room) => {
        const isUnread = RoomNotificationStateStore.instance.getRoomState(room).hasUnreadCount || !!getMarkedUnreadState(room);
        const isLowPriority = !!room.tags[DefaultTagID.LowPriority];
        return isUnread && isLowPriority;
    },
    [RoomListSubsection.UnreadNormal]: (room: Room) => {
        return RoomNotificationStateStore.instance.getRoomState(room).hasUnreadCount || !!getMarkedUnreadState(room);
    },
    [RoomListSubsection.Other]: (room: Room) => {
        return true;
    },
};

const categories = [
    RoomListSubsection.UnreadDirect,
    RoomListSubsection.UnreadFavourite,
    RoomListSubsection.UnreadLowPriority,
    RoomListSubsection.UnreadNormal,
    RoomListSubsection.Other,
];

export class RoomListSectionHeader {
    public constructor(public readonly key: RoomListSectionKey) {}
}

const sections: {
    header: RoomListSectionHeader; subsections: RoomListSubsection[]
}[] = [
    {
        header: new RoomListSectionHeader(RoomListSectionKey.People),
        subsections: [RoomListSubsection.UnreadDirect]
    },
    {
        header: new RoomListSectionHeader(RoomListSectionKey.Favourite),
        subsections: [RoomListSubsection.UnreadFavourite],
    },
    {
        header: new RoomListSectionHeader(RoomListSectionKey.Unread),
        subsections: [RoomListSubsection.UnreadNormal]
    },
    {
        header: new RoomListSectionHeader(RoomListSectionKey.LowPriority),
        subsections: [RoomListSubsection.UnreadLowPriority],
    },
    {
        header: new RoomListSectionHeader(RoomListSectionKey.Chat),
        subsections: [RoomListSubsection.Other],
    },
];

export class SectionProcessor {
    public process(rooms: Iterable<Room>): RoomListEntry[] {
        const groupedRooms: { [key in RoomListSubsection]: Room[] } = {
            [RoomListSubsection.UnreadDirect]: [],
            [RoomListSubsection.UnreadFavourite]: [],
            [RoomListSubsection.UnreadLowPriority]: [],
            [RoomListSubsection.UnreadNormal]: [],
            [RoomListSubsection.Other]: [],
        };

        for (const room of rooms) {
            for (const category of categories) {
                const filter = filters[category];
                if (filter == null || filter(room)) {
                    groupedRooms[category].push(room);
                    break;
                }
            }
        }

        const roomlist: RoomListEntry[] = [];
        for (const section of sections) {
            const rooms: Room[] = [];
            for (const subsection of section.subsections) {
                rooms.push(...groupedRooms[subsection]);
            }
            if (rooms.length) {
                roomlist.push(section.header);
                roomlist.push(...rooms);
            }
        }

        return roomlist;
    }
}
