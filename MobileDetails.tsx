// @ts-nocheck
/*
 * MobileDetails — product details block shown on phones/tablets (hidden on desktop by the reference CSS).
 * Text and images are editable in the right-hand property panel.
 */
import * as React from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"
import {
    nfCss,
    renderMarkup,
    textControls,
    NF_IMG,
    NF_MODEL,
} from "./NFStyles.tsx"

const MARKUP =
    '<section class="mobile-collection-details" id="details" aria-label="Shadow Falcon 750 details" hidden=""></section>'
const TEXTS = []

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 10
 */
export default function MobileDetails(props) {
    const onCanvas = RenderTarget.current() === RenderTarget.canvas

    const html = React.useMemo(() => {
        let h = renderMarkup(MARKUP, TEXTS, props)
        if (onCanvas)
            h = h.replace(
                'class="hero__model"',
                'class="hero__model hero__model--ready"'
            )
        return h
    }, [props, onCanvas])

    return (
        <div className="nfx" style={{ width: "100%" }}>
            <style
                data-nf="1"
                dangerouslySetInnerHTML={{ __html: nfCss(onCanvas) }}
            />
            <div
                className={
                    "nfx-in" +
                    (onCanvas ? " has-cart-transition nf-canvas" : "")
                }
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    )
}

addPropertyControls(MobileDetails, {
    ...textControls(TEXTS),
})
