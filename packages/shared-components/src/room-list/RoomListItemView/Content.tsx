import React, { ComponentProps, type JSX } from "react";
import classNames from "classnames";

import flexStyles from "./Flex.module.css";
import styles from "./RoomListItemView.module.css";

const styleContent: { [key: string]: string } = {
    "--mx-flex-display": "flex",
    "--mx-flex-direction": "row",
    "--mx-flex-align": "center",
    "--mx-flex-justify": "space-between",
    "--mx-flex-gap": "var(--cpd-space-2x)",
    "--mx-flex-wrap": "nowrap",
};
export function Content(
    { children, className, ...props }: React.PropsWithChildren<ComponentProps<"div">>
): JSX.Element {
    return (
        <div className={classNames(flexStyles.flex, styles.content, className)} style={styleContent} {...props}>
            {children}
        </div>
    );
}
