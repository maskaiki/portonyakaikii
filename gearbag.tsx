// @ts-nocheck
/*
 * GearBag — gear bag (cart) + checkout panel + order preview dialog. Front-end prototype only: nothing is submitted or charged.
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
    '<div class="cart-stage" id="cart">\n      <section class="cart" aria-labelledby="cart-heading" tabindex="-1">\n        <div class="cart-bag">\n          <a class="cart-back" href="#gear" aria-label="Back to the collection">\n            <svg viewBox="0 0 48 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M46 12H2m10-10L2 12l10 10"></path></svg>\n          </a>\n          <div class="cart-bag__content">\n            <header class="cart-heading">\n              <p class="cart-eyebrow">{{b0}}</p>\n              <h2 id="cart-heading">{{b1}}<span class="cart-count" aria-label="4 items">04</span></h2>\n              <p class="cart-intro" id="cart-item-count">{{b2}}</p>\n            </header>\n\n            <div class="cart-table-wrap">\n              <table class="cart-table" aria-label="Items in your gear bag">\n                <thead><tr><th scope="col">{{b3}}</th><th scope="col">{{b4}}</th><th scope="col">{{b5}}</th><th scope="col"><span class="visually-hidden">{{b6}}</span></th></tr></thead>\n                <tbody id="cart-items"></tbody>\n              </table>\n              <div class="cart-empty" hidden="">\n                <p>{{b7}}</p>\n                <button class="cart-restore" type="button">{{b8}} <span aria-hidden="true">↗</span></button>\n              </div>\n            </div>\n\n            <div class="cart-summary">\n              <div class="cart-summary__line"><span>{{b9}}</span><span id="cart-subtotal">$2,436.00</span></div>\n              <div class="cart-summary__line"><span>{{b10}}</span><span id="cart-delivery">{{b11}}</span></div>\n              <div class="cart-summary__total"><span>{{b12}}</span><strong id="cart-total">$2,436.00</strong></div>\n            </div>\n            <a class="cart-mobile-checkout" href="#checkout">{{b13}} <span aria-hidden="true">↓</span></a>\n            <div class="cart-receipt" aria-hidden="true"><span>{{b14}}</span><small>{{b15}}</small></div>\n            <p class="visually-hidden" id="cart-announcement" role="status" aria-live="polite"></p>\n          </div>\n          <footer class="cart-bag__footer">\n            <img src="{{img:logo}}" alt="Nike" width="100">\n            <p>{{b16}}<br><span>{{b17}}</span></p>\n          </footer>\n        </div>\n\n        <div class="cart-checkout" id="checkout">\n          <header class="cart-checkout__heading">\n            <h3>{{b18}}</h3>\n            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="5" y="10" width="14" height="11"></rect><path d="M8 10V6a4 4 0 0 1 8 0v4M12 14v3"></path></svg>\n          </header>\n          <p class="cart-checkout__intro">{{b19}}<br>{{b20}}</p>\n          <form id="checkout-form">\n            <div class="checkout-field"><label for="checkout-name">{{b21}}</label><input id="checkout-name" name="name" autocomplete="name" placeholder="{{b37}}" required="" maxlength="100"></div>\n            <div class="checkout-field"><label for="checkout-phone">{{b22}}</label><input id="checkout-phone" name="phone" type="tel" autocomplete="tel" placeholder="{{b38}}" required="" maxlength="40"></div>\n            <div class="checkout-field"><label for="checkout-email">{{b23}}</label><input id="checkout-email" name="email" type="email" autocomplete="email" placeholder="{{b39}}" required="" maxlength="150"></div>\n            <div class="checkout-field checkout-field--payment">\n              <label for="checkout-payment">{{b24}}</label>\n              <div class="checkout-select">\n                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="2" y="5" width="20" height="14"></rect><path d="M2 10h20M6 15h4"></path></svg>\n                <select id="checkout-payment" name="payment"><option value="card">{{b25}}</option><option value="delivery">{{b26}}</option></select>\n                <svg class="checkout-select__chevron" viewBox="0 0 12 8" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="m1 1 5 5 5-5"></path></svg>\n              </div>\n            </div>\n            <fieldset class="checkout-delivery">\n              <legend>{{b27}}</legend>\n              <label class="checkout-delivery__option">\n                <input type="radio" name="delivery" value="pickup" checked="">\n                <span class="checkout-delivery__icon"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M5 13v15h22V13M3 13l3-9h20l3 9M3 13h26M12 28V17h8v11M9 4l-1 9M16 4v9M23 4l1 9"></path></svg></span>\n                <span class="checkout-delivery__text"><strong>{{b28}}</strong><span>{{b29}}</span><small>{{b30}}</small></span>\n                <span class="checkout-delivery__radio" aria-hidden="true"></span>\n              </label>\n              <label class="checkout-delivery__option">\n                <input type="radio" name="delivery" value="courier">\n                <span class="checkout-delivery__icon"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M3 7h17v17H3zM20 13h5l5 6v5H20M25 13v7h5"></path><circle cx="9" cy="25" r="3" fill="white"></circle><circle cx="25" cy="25" r="3" fill="white"></circle></svg></span>\n                <span class="checkout-delivery__text"><strong>{{b31}}</strong><span>{{b32}}</span><small>$15.00</small></span>\n                <span class="checkout-delivery__radio" aria-hidden="true"></span>\n              </label>\n            </fieldset>\n            <button class="checkout-submit" type="submit"><span>{{b33}} <span class="checkout-submit__total">— $2,436.00</span></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h16m-7-7 7 7-7 7"></path></svg></button>\n            <p class="checkout-preview-note">{{b34}}</p>\n          </form>\n          <footer class="cart-checkout__footer"><span>{{b35}}</span><span>{{b36}}</span></footer>\n        </div>\n      </section>\n      </div><template id="cart-item-template"><table><tbody>\n      <tr class="cart-item">\n        <td><div class="cart-item__product"><img class="cart-item__image" alt="" width="88" height="100"><div class="cart-item__details"><h3></h3><p class="cart-item__variant"></p><span class="cart-item__unit-price"></span></div></div></td>\n        <td><div class="cart-quantity"><button type="button" data-quantity="-1" aria-label="Decrease quantity">−</button><span class="cart-quantity__value"></span><button type="button" data-quantity="1" aria-label="Increase quantity">+</button></div></td>\n        <td class="cart-item__total"></td>\n        <td><button class="cart-item__remove" type="button" aria-label="Remove item"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="m3 3 10 10M3 13 13 3"></path></svg></button></td>\n      </tr>\n    </tbody></table></template><dialog class="order-preview" aria-labelledby="order-preview-heading">\n      <button class="order-preview__close" type="button" aria-label="Close order preview">×</button>\n      <p class="cart-eyebrow">{{d0}}</p>\n      <h2 id="order-preview-heading">{{d1}}</h2>\n      <p>{{d2}}</p>\n      <dl><div><dt>{{d3}}</dt><dd id="preview-item-count"></dd></div><div><dt>{{d4}}</dt><dd id="preview-delivery"></dd></div><div><dt>{{d5}}</dt><dd id="preview-total"></dd></div></dl>\n      <button class="order-preview__return" type="button">{{d6}} <span aria-hidden="true">↗</span></button>\n    </dialog>'
const TEXTS = [
    {
        k: "b0",
        g: "bag",
        gt: "Bag",
        l: "Ready for what’s next",
        d: "Ready for what’s next",
    },
    { k: "b1", g: "bag", gt: "Bag", l: "Your gear bag", d: "Your gear bag" },
    {
        k: "b2",
        g: "bag",
        gt: "Bag",
        l: "You have 4 items ready for…",
        d: "You have 4 items ready for your next adventure.",
    },
    { k: "b3", g: "bag", gt: "Bag", l: "Equipment", d: "Equipment" },
    { k: "b4", g: "bag", gt: "Bag", l: "Quantity", d: "Quantity" },
    { k: "b5", g: "bag", gt: "Bag", l: "Total", d: "Total" },
    { k: "b6", g: "bag", gt: "Bag", l: "Remove", d: "Remove" },
    {
        k: "b7",
        g: "bag",
        gt: "Bag",
        l: "Your next adventure starts…",
        d: "Your next adventure starts with an empty bag.",
    },
    { k: "b8", g: "bag", gt: "Bag", l: "Restore items", d: "Restore items" },
    {
        k: "b9",
        g: "bagSummary",
        gt: "Bag Summary",
        l: "Subtotal",
        d: "Subtotal",
    },
    {
        k: "b10",
        g: "bagSummary",
        gt: "Bag Summary",
        l: "Delivery",
        d: "Delivery",
    },
    {
        k: "b11",
        g: "bagSummary",
        gt: "Bag Summary",
        l: "Complimentary",
        d: "Complimentary",
    },
    {
        k: "b12",
        g: "bagSummary",
        gt: "Bag Summary",
        l: "Total amount",
        d: "Total amount",
    },
    {
        k: "b13",
        g: "bag",
        gt: "Bag",
        l: "Continue to checkout",
        d: "Continue to checkout",
    },
    {
        k: "b14",
        g: "bagSummary",
        gt: "Bag Summary",
        l: "NEVERSTOP TESTING",
        d: "NEVERSTOP TESTING",
    },
    {
        k: "b15",
        g: "bagSummary",
        gt: "Bag Summary",
        l: "NIKE · STORM LAB EQUIPMENT",
        d: "NIKE · STORM LAB EQUIPMENT",
    },
    {
        k: "b16",
        g: "bag",
        gt: "Bag",
        l: "Never stop testing.",
        d: "Never stop testing.",
    },
    {
        k: "b17",
        g: "bag",
        gt: "Bag",
        l: "From the first step to the…",
        d: "From the first step to the next summit.",
    },
    { k: "b18", g: "checkout", gt: "Checkout", l: "Checkout", d: "Checkout" },
    {
        k: "b19",
        g: "checkout",
        gt: "Checkout",
        l: "A few details, then you’re…",
        d: "A few details, then you’re ready to go.",
    },
    {
        k: "b20",
        g: "checkout",
        gt: "Checkout",
        l: "Choose how your gear gets …",
        d: "Choose how your gear gets to you.",
    },
    { k: "b21", g: "checkout", gt: "Checkout", l: "Full name", d: "Full name" },
    {
        k: "b22",
        g: "checkout",
        gt: "Checkout",
        l: "Phone number",
        d: "Phone number",
    },
    {
        k: "b23",
        g: "checkout",
        gt: "Checkout",
        l: "Email address",
        d: "Email address",
    },
    {
        k: "b24",
        g: "checkout",
        gt: "Checkout",
        l: "Payment method",
        d: "Payment method",
    },
    {
        k: "b25",
        g: "checkout",
        gt: "Checkout",
        l: "Credit / debit card",
        d: "Credit / debit card",
    },
    {
        k: "b26",
        g: "checkout",
        gt: "Checkout",
        l: "Pay on delivery",
        d: "Pay on delivery",
    },
    {
        k: "b27",
        g: "checkout",
        gt: "Checkout",
        l: "Delivery method",
        d: "Delivery method",
    },
    {
        k: "b28",
        g: "checkout",
        gt: "Checkout",
        l: "Store pickup",
        d: "Store pickup",
    },
    {
        k: "b29",
        g: "checkout",
        gt: "Checkout",
        l: "Collect from a store near …",
        d: "Collect from a store near you",
    },
    {
        k: "b30",
        g: "checkout",
        gt: "Checkout",
        l: "Complimentary",
        d: "Complimentary",
    },
    {
        k: "b31",
        g: "checkout",
        gt: "Checkout",
        l: "Doorstep delivery",
        d: "Doorstep delivery",
    },
    {
        k: "b32",
        g: "checkout",
        gt: "Checkout",
        l: "Delivered to your address",
        d: "Delivered to your address",
    },
    { k: "b33", g: "checkout", gt: "Checkout", l: "Checkout", d: "Checkout" },
    {
        k: "b34",
        g: "checkout",
        gt: "Checkout",
        l: "Design preview. No payment…",
        d: "Design preview. No payment will be taken.",
    },
    {
        k: "b35",
        g: "checkout",
        gt: "Checkout",
        l: "Built for the journey.",
        d: "Built for the journey.",
    },
    {
        k: "b36",
        g: "checkout",
        gt: "Checkout",
        l: "Nike Storm Lab ↗",
        d: "Nike Storm Lab ↗",
    },
    {
        k: "b37",
        g: "checkout",
        gt: "Checkout",
        l: "Placeholder: Your full name",
        d: "Your full name",
        a: 1,
    },
    {
        k: "b38",
        g: "checkout",
        gt: "Checkout",
        l: "Placeholder: +380 00 000 00 00",
        d: "+380 00 000 00 00",
        a: 1,
    },
    {
        k: "b39",
        g: "checkout",
        gt: "Checkout",
        l: "Placeholder: you@example.com",
        d: "you@example.com",
        a: 1,
    },
    {
        k: "d0",
        g: "bag",
        gt: "Bag",
        l: "One step closer to the out…",
        d: "One step closer to the outdoors",
    },
    {
        k: "d1",
        g: "orderPreview",
        gt: "Order Preview",
        l: "Your order preview",
        d: "Your order preview",
    },
    {
        k: "d2",
        g: "orderPreview",
        gt: "Order Preview",
        l: "This is a preview of your …",
        d: "This is a preview of your gear bag. No order has been placed and no payment has been taken.",
    },
    {
        k: "d3",
        g: "orderPreview",
        gt: "Order Preview",
        l: "Equipment",
        d: "Equipment",
    },
    {
        k: "d4",
        g: "orderPreview",
        gt: "Order Preview",
        l: "Delivery",
        d: "Delivery",
    },
    { k: "d5", g: "orderPreview", gt: "Order Preview", l: "Total", d: "Total" },
    {
        k: "d6",
        g: "orderPreview",
        gt: "Order Preview",
        l: "Back to your bag",
        d: "Back to your bag",
    },
]

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 1249
 */
export default function GearBag(props) {
    const onCanvas = RenderTarget.current() === RenderTarget.canvas
    if (typeof window !== "undefined") {
        window.__NF_PRODUCTS = (props.products || []).map((p, i) => ({
            id: p.id || "item" + i,
            name: p.name,
            variant: p.variant,
            price: Math.round((Number(p.price) || 0) * 100),
            image:
                p.image || [NF_IMG.g2, NF_IMG.g1, NF_IMG.g3, NF_IMG.gog][i % 4],
        }))
    }
    const html = React.useMemo(() => {
        let h = renderMarkup(MARKUP, TEXTS, props)
        if (onCanvas)
            h = h.replace(
                'class="hero__model"',
                'class="hero__model hero__model--ready"'
            )
        if (onCanvas) {
            // Editor preview only: the live site renders these rows from the template via NFEngine.
            const fmt = (c) =>
                new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(c / 100)
            const esc = (v) =>
                String(v == null ? "" : v)
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
            const rows = (window.__NF_PRODUCTS || [])
                .map(
                    (p) =>
                        '<tr class="cart-item"><td><div class="cart-item__product"><img class="cart-item__image" alt="" width="88" height="100" src="' +
                        esc(p.image) +
                        '"><div class="cart-item__details"><h3>' +
                        esc(p.name) +
                        '</h3><p class="cart-item__variant">' +
                        esc(p.variant) +
                        '</p><span class="cart-item__unit-price">' +
                        fmt(p.price) +
                        "</span></div></div></td>" +
                        '<td><div class="cart-quantity"><button type="button" data-quantity="-1">−</button><span class="cart-quantity__value">1</span><button type="button" data-quantity="1">+</button></div></td>' +
                        '<td class="cart-item__total">' +
                        fmt(p.price) +
                        '</td><td><button class="cart-item__remove" type="button"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="m3 3 10 10M3 13 13 3"></path></svg></button></td></tr>'
                )
                .join("")
            h = h.replace(
                '<tbody id="cart-items"></tbody>',
                '<tbody id="cart-items">' + rows + "</tbody>"
            )
        }
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
                    (onCanvas ? " has-cart-transition nf-canvas" + "" : "")
                }
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    )
}

addPropertyControls(GearBag, {
    products: {
        type: ControlType.Array,
        title: "Products",
        control: {
            type: ControlType.Object,
            controls: {
                id: { type: ControlType.String, title: "ID" },
                name: { type: ControlType.String, title: "Name" },
                variant: { type: ControlType.String, title: "Variant" },
                price: {
                    type: ControlType.Number,
                    title: "Price (USD)",
                    min: 0,
                    step: 1,
                    displayStepper: true,
                },
                image: { type: ControlType.Image, title: "Image" },
            },
        },
        defaultValue: [
            {
                id: "shadow",
                name: "Shadow Falcon 750",
                variant: "Black / Size M",
                price: 759,
            },
            {
                id: "alpine",
                name: "Alpine Shield",
                variant: "Black / Size M",
                price: 689,
            },
            {
                id: "storm",
                name: "Storm Veil",
                variant: "Black / Size M",
                price: 829,
            },
            {
                id: "goggles",
                name: "Summit Goggles",
                variant: "Black / One size",
                price: 159,
            },
        ],
    },
    images: {
        type: ControlType.Object,
        title: "Images",
        controls: { logo: { type: ControlType.Image, title: "Logo" } },
    },
    ...textControls(TEXTS),
})
