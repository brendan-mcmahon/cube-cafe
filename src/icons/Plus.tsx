import React from "react";
import { ClickableProps } from "./ClickableProps";

export default function Plus(props: ClickableProps) {
    return (
        <svg className={props.class} onClick={props.onClick} xmlSpace="preserve" version="1.1" viewBox="0 0 847 1058.75" x="0px" y="0px" fill-rule="evenodd">
            <path fill="green"
                d="M423 20c223,0 404,180 404,403 0,223 -181,404 -404,404 -223,0 -403,-181 -403,-404 0,-223 180,-403 403,-403zm-169 339l105 0 0 -105c0,-85 129,-85 129,0l0 105 105 0c84,0 84,129 0,129l-105 0 0 105c0,84 -129,84 -129,0l0 -105 -105 0c-85,0 -85,-129 0,-129z" />
        </svg>
    );
}
