import React, { type JSX } from "react";
import classNames from "classnames";
import styles from "./RoomListItemView.module.css";

interface MessagePreviewProps {
    content: string
}

export function MessagePreview({ content }: MessagePreviewProps): JSX.Element {
    return (
        <div className={classNames(
            styles.typography,
            styles[`font-body-sm-regular`],
            styles.ellipsis,
        )} title={content}>
            {content}
        </div>
    );
}
