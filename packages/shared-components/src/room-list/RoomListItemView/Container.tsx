import React, { ComponentProps, type JSX } from "react";
import classNames from "classnames";

import flexStyles from "./Flex.module.css";
import styles from "./RoomListItemView.module.css";

const styleContainer: { [key: string]: string } = {
    "--mx-flex-display": "flex",
    "--mx-flex-direction": "row",
    "--mx-flex-align": "center",
    "--mx-flex-justify": "start",
    "--mx-flex-gap": "var(--cpd-space-3x)",
    "--mx-flex-wrap": "nowrap",
};
export function Container(
    { children, className, ...props }: React.PropsWithChildren<ComponentProps<"div">>
): JSX.Element {
    return (
        <div className={classNames(flexStyles.flex, styles.container, className)} style={styleContainer} {...props}>
            {children}
        </div>
    );
}
