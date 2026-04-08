import React, { ComponentProps, type JSX, } from "react";
import classNames from "classnames";

import flexStyles from "./Flex.module.css";
import styles from "./RoomListItemView.module.css";

const styleRoomListItem: { [key: string]: string } = {
    "--mx-flex-display": "flex",
    "--mx-flex-direction": "row",
    "--mx-flex-align": "stretch",
    "--mx-flex-justify": "start",
    "--mx-flex-gap": "var(--cpd-space-3x)",
    "--mx-flex-wrap": "nowrap",
};
export function RoomListItem(
    { children, className, ...props }: React.PropsWithChildren<ComponentProps<"button">>
): JSX.Element {
    return (
        <button className={classNames(flexStyles.flex, styles.roomListItem, className)} style={styleRoomListItem} {...props}>
            {children}
        </button>
    );
}
