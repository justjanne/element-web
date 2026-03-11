/*
 * Copyright 2026 Element Creations Ltd.
 *
 * SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
 * Please see LICENSE files in the repository root for full details.
 */

import React, { type JSX } from "react";
import classNames from "classnames";

import styles from "./RoomListSectionHeaderView.module.css";
import { useI18n } from "../../utils/i18nContext";

export enum RoomListSectionKey {
    Favourite = "favourite",
    Unread = "unread",
    Chat = "chat",
    LowPriority = "lowpriority",
}

export function isRoomListSectionKey(value: string): value is RoomListSectionKey {
    switch (value) {
        case RoomListSectionKey.Favourite:
        case RoomListSectionKey.Unread:
        case RoomListSectionKey.Chat:
        case RoomListSectionKey.LowPriority:
            return true;
        default:
            return false;
    }
}

/**
 * Props for RoomListItemView component
 */
export interface RoomListSectionHeaderViewProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The room item view model */
    section: RoomListSectionKey;
}

function useSectionTitle(section: RoomListSectionKey): string {
    const { translate: _t } = useI18n();
    switch (section) {
        case RoomListSectionKey.Favourite:
            return _t("room_list|sections|favourite");
        case RoomListSectionKey.Unread:
            return _t("room_list|sections|unread");
        case RoomListSectionKey.Chat:
            return _t("room_list|sections|chat");
        case RoomListSectionKey.LowPriority:
            return _t("room_list|sections|low_priority");
    }
}

/**
 * An item in the room list
 */
export function RoomListSectionHeaderView({ section, ...props }: RoomListSectionHeaderViewProps): JSX.Element {
    const sectionTitle = useSectionTitle(section);

    return (
        <div
            className={classNames(styles.roomListSectionHeader, "mx_RoomListSectionHeaderView")}
            {...props}>
            <h4>{sectionTitle}</h4>
        </div>
    );
}
