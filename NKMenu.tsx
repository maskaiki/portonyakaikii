// @ts-nocheck
/*
 * NKMenu — drop-in for pages that keep their own navigation (Home).
 * Renders nothing in the layout: the fullscreen menu overlay + page-transition curtain
 * are portalled to <body>. Opens on any link to "#menu" (the homepage nav "Menu" item).
 * Place one instance anywhere on the page (absolute, 1×1). Canvas shows a small badge.
 */
import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { NK } from "./NKSystem.tsx"

/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 * @framerIntrinsicWidth 240
 * @framerIntrinsicHeight 26
 */
export default function NKMenu(props) {
    return <NK.MenuBridge page={props.page || "home"} logo={props.logo} />
}

addPropertyControls(NKMenu, {
    logo: { type: ControlType.Image, title: "Logo (Swoosh)" },
    page: {
        type: ControlType.Enum,
        title: "Current page",
        options: ["home", "lab", "collection", "expeditions", "about"],
        defaultValue: "home",
    },
})
