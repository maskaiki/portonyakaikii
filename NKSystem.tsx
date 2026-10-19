// @ts-nocheck
/*
 * NKSystem — shared design system for the NIKE "Storm Lab" multi-page expansion.
 * Pages: NKLab, NKCollection, NKProduct, NKExpeditions, NKAbout (+ NKMenu on Home).
 *
 * Visual DNA is inherited from NFStyles.tsx (homepage): Manrope 200–800, square corners,
 * thin white rules, square nodes, pill readouts, Libre Barcode labels, first-line indents,
 * difference-blend display type. Inner pages run on ink #0D0D0D with signal #FF3300
 * used ONLY for active state, live data and transitions.
 *
 * Conventions (same as NFStyles): width-only media queries carry a W marker and become
 * container queries on the Framer canvas; vw becomes cqw on canvas so frames of any
 * width preview their own layout. Scroll effects never run on the canvas.
 *
 * Site map + "next chapter" order live in NK_PAGES / NK_NEXT (single source of truth).
 */
import * as React from "react"
import { createPortal } from "react-dom"
import * as FramerNS from "framer"
import { NF_CSS, NF_IMG, NF_LOGO_SLOT } from "./NFStyles.tsx"

/* ------------------------------------------------------------------ site map */

export const NK_PAGES = [
    {
        key: "home",
        label: "Home",
        href: "/",
        index: "00",
        note: "The test chamber",
    },
    { key: "lab", label: "Lab", href: "/lab", index: "01", note: "Technology" },
    {
        key: "collection",
        label: "Collection",
        href: "/collection",
        index: "02",
        note: "Products",
    },
    {
        key: "expeditions",
        label: "Expeditions",
        href: "/expeditions",
        index: "03",
        note: "Field tests",
    },
    {
        key: "about",
        label: "About",
        href: "/about",
        index: "04",
        note: "Philosophy",
    },
]
export const NK_PRODUCT = {
    key: "product",
    label: "Shadow Falcon 750",
    href: "/product",
}
export const NK_NEXT = {
    lab: { label: "collection", href: "/collection", index: "02" },
    collection: { label: "shadow falcon", href: "/product", index: "03" },
    product: { label: "expeditions", href: "/expeditions", index: "04" },
    expeditions: { label: "about", href: "/about", index: "05" },
    about: { label: "the test", href: "/", index: "00" },
}

/* ------------------------------------------------------------------- images */

const RenderTarget = FramerNS.RenderTarget
const IMG = NF_IMG || {}
/** Unsplash URL (free licence, hotlinked CDN). Replace with Framer assets before launch. */
export const nkU = (id, w = 2000) =>
    "https://images.unsplash.com/photo-" +
    id +
    "?auto=format&fit=crop&w=" +
    w +
    "&q=80"

export const NK_IMG = {
    hero:
        IMG.hero ||
        "https://framerusercontent.com/images/yGoExTASM6nMGpQ8h2hMzBhxEI.png",
    gear:
        IMG.gear ||
        "https://framerusercontent.com/images/wL9odacW6yI76LOQUqHQgPbpNNs.png",
    g1:
        IMG.g1 ||
        "https://framerusercontent.com/images/ndTMDf22Iajmjl1pOAALTxUQTA.png",
    g2:
        IMG.g2 ||
        "https://framerusercontent.com/images/8B4ObSccMntHj34JAmrX43e3O8.png",
    g3:
        IMG.g3 ||
        "https://framerusercontent.com/images/fazIGophsXTPiUzOILmOW5Xuk.png",
    gog:
        IMG.gog ||
        "https://framerusercontent.com/images/HUkppP2zyW7Sr6CsJ06HTZ5c70.jpg",
    expHero: nkU("1534852654286-120d822937f7", 2400),
    iceland: nkU("1598903046319-a58c634de7f1", 2400),
    alps: nkU("1522527414937-8b7363e8701d", 2400),
    patagonia: nkU("1586763860704-cebb038de73e", 2400),
    arctic: nkU("1596038529364-293ef6df359d", 2400),
    weave: nkU("1563941834856-28d62afffe50", 2400),
    droplets: nkU("1547576432-605ed3b43ba1", 2400),
    zipper: nkU("1570970348641-13691ff58528", 1800),
    stitch: nkU("1673359129313-766267e79d16", 1600),
    foot1: nkU("1600100315778-850119b19220", 1400),
    foot2: nkU("1560816801-08a84aa4bcd7", 1400),
    base1: nkU("1575898311302-0d04de38c259", 1400),
    goggles: nkU("1700482249920-441d18133829", 1400),
    pack: nkU("1562869319-a1368ba7fe75", 1400),
    gloves: nkU("1675652807734-fdfbfea4fc4e", 1400),
}
export const NK_LOGO_SLOT = NF_LOGO_SLOT

/** srcset for Unsplash / Framer CDN images so the browser picks the right size. */
export function nkSrcSet(src) {
    if (!src || typeof src !== "string") return undefined
    if (src.indexOf("images.unsplash.com") > -1)
        return [640, 1080, 1600, 2400]
            .map((w) => src.replace(/([?&])w=\d+/, "$1w=" + w) + " " + w + "w")
            .join(", ")
    if (
        src.indexOf("framerusercontent.com/images/") > -1 &&
        src.indexOf("?") === -1
    )
        return [512, 1024, 2048]
            .map((w) => src + "?scale-down-to=" + w + " " + w + "w")
            .join(", ")
    return undefined
}

/* -------------------------------------------------------------------- tokens */

const GRAIN =
    "data:image/svg+xml," +
    encodeURIComponent(
        "<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .55 0'/></filter><rect width='180' height='180' filter='url(#n)'/></svg>"
    )

const FONT_IMPORT =
    '@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap");'
const NF_FONTS = ((NF_CSS || "").match(/@font-face\{[^}]*\}/g) || []).join("")

export const NK_CSS = `
.nk{--ink:#0d0d0d;--carbon:#141414;--graphite:#1d1d1d;--white:#fff;--mist:#8a8a8a;--fog:rgb(255 255 255 / 64%);--line:rgb(255 255 255 / 14%);--rule:rgb(255 255 255 / 28%);--signal:#ff3300;--signal-2:#df2d00;--panel:rgb(255 255 255 / 8%);--panel-line:rgb(255 255 255 / 24%);--inset:40px;--gap:20px;--ease:cubic-bezier(.2,.7,.2,1);--ease-io:cubic-bezier(.65,0,.35,1);--vh:1svh;
position:relative;display:block;width:100%;min-width:0;margin:0;background:var(--ink);color:#fff;font-family:Manrope Variable,Manrope,sans-serif;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;overflow-x:clip}
.nk *,.nk *:before,.nk *:after{box-sizing:border-box}
.nk a{color:inherit}
.nk img{display:block;max-width:none}
.nk button{font:inherit;color:inherit}
.nk :focus-visible{outline:1px solid #fff;outline-offset:4px}
.nk-mono{filter:grayscale(1) contrast(1.06) brightness(.94)}
.nk-vh{display:none}
.nk-sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0}

/* type */
.nk-display{margin:0;font-weight:700;font-size:clamp(64px,min(10.4vw,18.5svh),260px);line-height:.8;letter-spacing:-.06em;text-transform:uppercase}
.nk-display--lower{text-transform:none;letter-spacing:-.07em;line-height:.78161}
.nk-title{margin:0;font-weight:700;font-size:clamp(30px,2.55vw,70px);line-height:.88;letter-spacing:-.02em;text-transform:uppercase}
.nk-num{font-weight:200;letter-spacing:-.08em;line-height:.82;font-variant-numeric:tabular-nums;white-space:nowrap}
.nk-label{display:block;margin:0;font-size:clamp(10px,.63vw,12px);font-weight:400;line-height:1.3;letter-spacing:.1em;text-transform:uppercase;color:var(--fog)}
.nk-label b{font-weight:400;color:#fff}
.nk-body{margin:0;font-size:clamp(13px,.85vw,18px);font-weight:300;line-height:1.45;letter-spacing:-.02em;color:rgb(255 255 255 / 82%)}
.nk-lead{margin:0;font-size:clamp(20px,2.05vw,44px);font-weight:300;line-height:1.12;letter-spacing:-.045em}
.nk-indent{text-indent:20.5%}
.nk-blend{mix-blend-mode:difference;color:#fff}
.nk-index{font-variant-numeric:tabular-nums}
.nk-signal{color:var(--signal)}

/* atoms */
.nk-node{display:inline-block;width:clamp(7px,.6vw,12px);aspect-ratio:1;background:#fff;flex:none}
.nk-node--signal{background:var(--signal)}
.nk-live{display:inline-flex;align-items:center;gap:8px}
.nk-live:before{content:"";width:7px;height:7px;background:var(--signal);animation:nk-blink 1.6s steps(2,end) infinite}
@keyframes nk-blink{50%{opacity:.15}}
.nk-barcode{display:block;font-family:"Libre Barcode 128",monospace;font-weight:400;line-height:.72;letter-spacing:.08em;white-space:nowrap;overflow:hidden}
.nk-rule{height:1px;background:var(--rule);border:0;margin:0}
.nk-brackets{position:absolute;inset:0;pointer-events:none}
.nk-brackets:before,.nk-brackets:after,.nk-brackets i:before,.nk-brackets i:after{content:"";position:absolute;width:clamp(16px,1.6vw,28px);aspect-ratio:1;border:0 solid #fff}
.nk-brackets:before{top:0;left:0;border-top-width:2px;border-left-width:2px}
.nk-brackets:after{top:0;right:0;border-top-width:2px;border-right-width:2px}
.nk-brackets i:before{bottom:0;left:0;border-bottom-width:2px;border-left-width:2px}
.nk-brackets i:after{bottom:0;right:0;border-bottom-width:2px;border-right-width:2px}
.nk-pill{display:inline-flex;align-items:baseline;justify-content:center;padding:.06em .3em .12em;border:2px solid #fff;border-radius:999px;font-weight:200;letter-spacing:-.055em;line-height:1.1;font-variant-numeric:tabular-nums}
.nk-cta{display:inline-flex;align-items:center;justify-content:space-between;gap:30px;min-height:44px;padding:12px 18px;border:1px solid #fff;background:#fff;color:var(--ink)!important;font-size:13px;font-weight:700;line-height:1.2;letter-spacing:-.035em;text-transform:uppercase;text-decoration:none;cursor:pointer;transition:background .2s ease,color .2s ease,border-color .2s ease}
.nk-cta svg{flex:0 0 16px;width:16px;height:16px;transition:transform .2s ease}
.nk-cta:hover{background:var(--signal);border-color:var(--signal);color:#fff!important}
.nk-cta:hover svg{transform:translate(2px,-2px)}
.nk-cta--ghost{background:transparent;color:#fff!important;border-color:rgb(255 255 255 / 55%)}
.nk-cta--ghost:hover{background:#fff;color:var(--ink)!important;border-color:#fff}
.nk-link{display:inline-flex;align-items:center;gap:10px;font-size:13px;font-weight:600;letter-spacing:-.02em;text-decoration:none;text-transform:uppercase}
.nk-link svg{width:14px;height:14px;transition:transform .25s var(--ease)}
.nk-link:hover svg{transform:translate(3px,-3px)}
.nk-panel{border:1px solid var(--panel-line);background:var(--panel);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px)}

/* reveals (JS adds .is-in) */
.nk-rv{opacity:0;transform:translate3d(0,32px,0);transition:opacity .9s var(--ease),transform 1.1s var(--ease);transition-delay:calc(var(--d,0) * 90ms)}
.nk-rv.is-in{opacity:1;transform:none}
.nk-lines>span{display:block;overflow:hidden;padding-bottom:.06em;margin-bottom:-.06em}
.nk-lines>span>span{display:block;transform:translate3d(0,105%,0);transition:transform 1.15s var(--ease);transition-delay:calc(var(--d,0) * 90ms + var(--i,0) * 70ms)}
.nk-lines.is-in>span>span{transform:none}
.nk-mask{position:relative;overflow:hidden;translate:0 100%;transition:translate 1.25s var(--ease-io);transition-delay:calc(var(--d,0) * 90ms)}
.nk-mask>img,.nk-mask>.nk-mask__in{translate:0 -100%;scale:1.18;transition:translate 1.25s var(--ease-io),scale 1.8s var(--ease);transition-delay:calc(var(--d,0) * 90ms)}
.nk-mask.is-in,.nk-mask.is-in>img,.nk-mask.is-in>.nk-mask__in{translate:none}
.nk-mask.is-in>img,.nk-mask.is-in>.nk-mask__in{scale:none}

/* grain */
.nk-grain{position:fixed;z-index:40;inset:-6%;pointer-events:none;background:url("${GRAIN}") repeat;opacity:.075;animation:nk-grain .9s steps(6) infinite}
@keyframes nk-grain{0%{transform:translate(0,0)}20%{transform:translate(-3%,2%)}40%{transform:translate(2%,-3%)}60%{transform:translate(-2%,-1%)}80%{transform:translate(3%,3%)}100%{transform:translate(0,0)}}

/* nav (mirrors homepage .site-nav) */
.nk-nav{position:fixed;z-index:60;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:flex-start;padding:var(--inset);pointer-events:none;transition:transform .55s var(--ease),opacity .4s ease}
.nk-nav>*{pointer-events:auto}
.nk-nav--hidden{transform:translate3d(0,-130%,0);opacity:0}
.nk-nav__logo{display:block;text-decoration:none}
.nk-nav__logo img{display:block;width:clamp(76px,5.6vw,120px);height:auto;filter:brightness(0) invert(1)}
.nk-nav__menu{display:flex;gap:4px;padding:1px;border:3px solid rgb(255 255 255 / 28%);background:#fff3;-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px)}
.nk-nav__link{display:grid;place-items:center;min-height:clamp(36px,1.9vw,50px);margin:0;padding:0 clamp(12px,.63vw,17px);border:0;border-radius:0;background:#fff;color:#777!important;font-family:inherit;font-size:clamp(16px,.84vw,22px);font-weight:400;line-height:1;text-decoration:none;white-space:nowrap;cursor:pointer;transition:background .2s,color .2s}
.nk-nav__link:hover,.nk-nav__link:focus-visible{background:#f4f4f4;color:#111!important}
.nk-nav__link--active,.nk-nav__link--active:hover{background:#0d0d0d;color:#fff!important}
.nk-nav__link--menu{gap:10px;grid-auto-flow:column}
.nk-nav__burger{display:grid;gap:4px;width:14px}
.nk-nav__burger i{display:block;height:1.5px;background:currentColor}

/* menu overlay */
.nk-menu{position:fixed!important;z-index:80;inset:0;display:grid;grid-template-columns:minmax(0,1fr) clamp(260px,24vw,460px);grid-template-rows:auto minmax(0,1fr) auto;column-gap:var(--gap);padding:var(--inset);overflow:hidden;visibility:hidden;pointer-events:none;background:transparent}
.nk-menu.is-open{visibility:visible;pointer-events:auto}
.nk-menu__bg{position:absolute;inset:0;background:var(--ink);clip-path:inset(0 0 100% 0);transition:clip-path .75s var(--ease-io)}
.nk-menu.is-open .nk-menu__bg{clip-path:inset(0 0 0 0)}
.nk-menu__bg:after{content:"";position:absolute;inset:0;background:url("${GRAIN}") repeat;opacity:.06}
.nk-menu__top{position:relative;grid-column:1 / -1;display:flex;justify-content:space-between;align-items:flex-start}
.nk-menu__top,.nk-menu__side,.nk-menu__bottom{opacity:0;transition:opacity .35s ease}
.nk-menu.is-open .nk-menu__top,.nk-menu.is-open .nk-menu__side,.nk-menu.is-open .nk-menu__bottom{opacity:1;transition:opacity .6s ease .45s}
.nk-menu__list{position:relative;align-self:end;display:flex;flex-direction:column;margin:0;padding:0;list-style:none}
.nk-menu__item{position:relative;display:grid;grid-template-columns:clamp(44px,4.2vw,84px) minmax(0,1fr) auto;align-items:end;gap:0 var(--gap);padding:clamp(4px,.6svh,10px) 0;border-top:1px solid var(--line);text-decoration:none;transition:opacity .35s ease}
.nk-menu__list:hover .nk-menu__item:not(:hover){opacity:.26}
.nk-menu__index{align-self:start;padding-top:.9em;font-size:clamp(11px,.75vw,14px);font-weight:400;letter-spacing:.06em;font-variant-numeric:tabular-nums;color:var(--fog)}
.nk-menu__mask{display:block;overflow:hidden}
.nk-menu__word{display:block;font-size:clamp(54px,min(8.6vw,13.6svh),210px);font-weight:700;line-height:.84;letter-spacing:-.07em;transform:translate3d(0,108%,0);transition:transform .7s var(--ease-io)}
.nk-menu.is-open .nk-menu__word{transform:none;transition:transform 1s var(--ease);transition-delay:calc(.28s + var(--i) * 70ms)}
.nk-menu__item:hover .nk-menu__word{transform:translate3d(1.2vw,0,0)}
.nk-menu__note{align-self:end;padding-bottom:.9em;font-size:clamp(10px,.63vw,12px);letter-spacing:.1em;text-transform:uppercase;color:var(--fog)}
.nk-menu__item.is-current .nk-menu__index{color:var(--signal)}
.nk-menu__item.is-current .nk-menu__index:before{content:"";display:inline-block;width:8px;height:8px;margin-right:8px;background:var(--signal)}
.nk-menu__side{position:relative;grid-row:2 / 3;grid-column:2;align-self:end;display:flex;flex-direction:column;gap:18px;padding-bottom:clamp(6px,1svh,14px)}
.nk-menu__feature{display:grid;grid-template-columns:96px minmax(0,1fr);gap:16px;align-items:end;padding:10px;border:1px solid var(--panel-line);background:var(--panel);text-decoration:none;transition:border-color .2s}
.nk-menu__feature:hover{border-color:#fff}
.nk-menu__feature img{width:96px;height:120px;object-fit:cover;object-position:50% 20%;background:#1a1a1a}
.nk-menu__feature strong{display:block;margin-top:6px;font-size:15px;font-weight:600;letter-spacing:-.03em;text-transform:none}
.nk-menu__readout{display:grid;grid-template-columns:auto 1fr;gap:6px 16px;font-size:11px;font-weight:300;letter-spacing:.06em;text-transform:uppercase;color:var(--fog)}
.nk-menu__readout b{font-weight:400;color:#fff;font-variant-numeric:tabular-nums}
.nk-menu__bottom{position:relative;grid-column:1 / -1;display:flex;justify-content:space-between;gap:20px;padding-top:18px;font-size:11px;font-weight:300;letter-spacing:.04em;color:var(--fog)}

/* page transition */
.nk-curtain{position:fixed;z-index:95;inset:0;background:var(--ink);pointer-events:none;opacity:0;transition:opacity .42s var(--ease-io)}
.nk-curtain.is-on{opacity:1}
.nk-curtain--enter{animation:nk-curtain-out .75s var(--ease-io) .05s both}
.nk-curtain__bar{position:absolute;top:0;left:0;right:0;height:2px;background:var(--signal);transform:scaleX(0);transform-origin:0 50%}
.nk-curtain.is-on .nk-curtain__bar{transform:scaleX(1);transition:transform .5s var(--ease-io)}
@keyframes nk-curtain-out{from{opacity:1}to{opacity:0}}
.nk-page{transform-origin:50% 0}
.nk-page--enter{animation:nk-page-in 1s var(--ease) both}
@keyframes nk-page-in{from{opacity:0;transform:scale(1.02)}to{opacity:1;transform:none}}
html.nk-leaving #main{transition:transform .45s var(--ease-io),opacity .45s var(--ease-io);transform:scale(.98);opacity:0}
html.nk-lock,html.nk-lock body{overflow:hidden!important}

/* footer */
.nk-footer{position:relative;padding:clamp(120px,14vw,260px) var(--inset) var(--inset);border-top:1px solid var(--line)}
.nk-next{position:relative;display:block;text-decoration:none;isolation:isolate}
.nk-next__top{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:clamp(14px,1.4vw,28px)}
.nk-next__word{position:relative;display:flex;align-items:flex-end;justify-content:space-between;gap:var(--gap);padding:clamp(10px,1vw,20px) 0 clamp(14px,1.2vw,24px);border-top:1px solid var(--rule);border-bottom:1px solid var(--rule)}
.nk-next__word span{font-size:clamp(64px,min(12.5vw,22svh),300px);font-weight:700;line-height:.8;letter-spacing:-.075em;transition:transform .7s var(--ease)}
.nk-next__arrow{flex:none;width:clamp(48px,6vw,128px);height:auto;transition:transform .6s var(--ease)}
.nk-next__fill{position:absolute;z-index:-1;inset:0;background:var(--signal);clip-path:inset(100% 0 0 0);transition:clip-path .7s var(--ease-io)}
.nk-next:hover .nk-next__fill{clip-path:inset(0 0 0 0)}
.nk-next:hover .nk-next__word span{transform:translate3d(1.6vw,0,0)}
.nk-next:hover .nk-next__arrow{transform:rotate(45deg)}
.nk-footer__bar{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:end;gap:var(--gap) 40px;margin-top:clamp(64px,8vw,140px)}
.nk-footer__bar img{width:clamp(70px,5vw,100px);height:auto;filter:brightness(0) invert(1)}
.nk-footer__links{display:flex;flex-wrap:wrap;gap:6px 24px;margin:0;padding:0;list-style:none}
.nk-footer__links a{font-size:13px;font-weight:400;letter-spacing:-.01em;text-decoration:none;color:var(--fog);transition:color .2s}
.nk-footer__links a:hover,.nk-footer__links a[aria-current]{color:#fff}
.nk-footer__meta{text-align:right}
.nk-footer__meta .nk-barcode{font-size:40px;margin-bottom:10px}
.nk-footer__legal{display:flex;justify-content:space-between;gap:20px;margin-top:28px;padding-top:16px;border-top:1px solid var(--line);font-size:11px;font-weight:300;letter-spacing:.02em;color:var(--fog)}

@media /*W*/(max-width:1023px){
.nk{--inset:max(24px,env(safe-area-inset-left));--gap:16px}
.nk-nav__link{min-height:44px;padding:0 12px;font-size:13px}
.nk-nav__link--page{display:none}
.nk-nav__link--page.nk-nav__link--active{display:grid}
.nk-menu{grid-template-columns:minmax(0,1fr);grid-template-rows:auto minmax(0,1fr) auto auto}
.nk-menu__side{grid-row:3;grid-column:1;padding:20px 0 0}
.nk-menu__readout{display:none}
.nk-menu__word{font-size:clamp(48px,13vw,120px)}
.nk-footer__bar{grid-template-columns:1fr;align-items:start}
.nk-footer__meta{text-align:left}
}
@media /*W*/(max-width:599px){
.nk{--inset:max(20px,env(safe-area-inset-left))}
.nk-nav__link{padding:0 10px;font-size:12px}
.nk-menu__item{grid-template-columns:36px minmax(0,1fr)}
.nk-menu__note{display:none}
.nk-menu__feature{grid-template-columns:72px minmax(0,1fr)}
.nk-menu__feature img{width:72px;height:90px}
.nk-footer__legal{flex-direction:column}
.nk-next__word span{font-size:clamp(44px,13vw,120px)}
.nk-next__arrow{width:36px}
}
@media (hover:none){.nk-grain{animation:none}}
@media(prefers-reduced-motion:reduce){
.nk-rv,.nk-lines>span>span,.nk-mask,.nk-mask>img,.nk-mask>.nk-mask__in{transition:none!important;transform:none!important;translate:none!important;scale:none!important;opacity:1!important;clip-path:none!important}
.nk-grain,.nk-live:before{animation:none}
.nk-page--enter,.nk-curtain--enter{animation-duration:.01s}
html.nk-leaving #main{transform:none}
}
.nk--canvas .nk-rv,.nk--canvas .nk-lines>span>span,.nk--canvas .nk-mask,.nk--canvas .nk-mask>img,.nk--canvas .nk-mask>.nk-mask__in{transition:none!important;transform:none!important;translate:none!important;scale:none!important;opacity:1!important;clip-path:none!important}
.nk--canvas .nk-nav{position:absolute}
.nk--canvas .nk-grain{display:none}
`

/** Canvas conversion (same convention as nfCss): W media → container queries, vw → cqw. */
export function nkCss(onCanvas, css) {
    let out = css
    if (onCanvas)
        out =
            out
                .split("@media /*W*/")
                .join("@container nk ")
                .replace(/(\d*\.?\d+)vw/g, "$1cqw") +
            ".nk{container:nk/inline-size}"
    return out
}

/**
 * Merge defaults + Framer props. Object controls arrive nested (props.hero.line1);
 * pages read flat keys, so listed groups are flattened. undefined/null = use default.
 */
export function nkProps(props, defaults, groups = []) {
    const out = { ...defaults }
    for (const k in props) {
        if (groups.indexOf(k) > -1) continue
        if (props[k] !== undefined && props[k] !== null) out[k] = props[k]
    }
    groups.forEach((g) => {
        const o = props && props[g]
        if (o && typeof o === "object")
            for (const k in o)
                if (o[k] !== undefined && o[k] !== null) out[k] = o[k]
    })
    return out
}

/* --------------------------------------------------------------------- hooks */

export function useNKEnv() {
    const onCanvas = RenderTarget.current() === RenderTarget.canvas
    const [reduced, setReduced] = React.useState(false)
    React.useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
        const set = () => setReduced(mq.matches)
        set()
        mq.addEventListener
            ? mq.addEventListener("change", set)
            : mq.addListener(set)
        return () =>
            mq.removeEventListener
                ? mq.removeEventListener("change", set)
                : mq.removeListener(set)
    }, [])
    return { onCanvas, reduced }
}

/* One rAF loop for every scroll scene on the page. */
const NK_SUBS = new Set()
let nkTick = false
let nkBound = false
function nkFrame() {
    nkTick = false
    NK_SUBS.forEach((fn) => fn())
}
function nkRequest() {
    if (!nkTick) {
        nkTick = true
        requestAnimationFrame(nkFrame)
    }
}
function nkBind() {
    if (nkBound || typeof window === "undefined") return
    nkBound = true
    window.addEventListener("scroll", nkRequest, { passive: true })
    window.addEventListener("resize", nkRequest)
}
export const nkClamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
export const nkMap = (v, a, b) => nkClamp((v - a) / (b - a))

/**
 * useScene(ref, fn): calls fn(state) every scroll frame while the element is near the
 * viewport. state.pin = 0..1 across a tall sticky wrapper (top hits top → bottom hits bottom),
 * state.pass = 0..1 from entering (top at viewport bottom) to leaving (bottom at viewport top).
 */
export function useScene(ref, fn, enabled = true) {
    const fnRef = React.useRef(fn)
    fnRef.current = fn
    React.useEffect(() => {
        if (!enabled || typeof window === "undefined") return
        nkBind()
        const run = () => {
            const el = ref.current
            if (!el) return
            const r = el.getBoundingClientRect()
            const vh = window.innerHeight || 1
            if (r.bottom < -vh * 0.5 || r.top > vh * 1.5) return
            const span = Math.max(1, r.height - vh)
            fnRef.current({
                el,
                rect: r,
                vh,
                vw: window.innerWidth,
                pin: nkClamp(-r.top / span),
                pass: nkClamp((vh - r.top) / (vh + r.height)),
            })
        }
        NK_SUBS.add(run)
        nkRequest()
        const t = setTimeout(nkRequest, 120)
        return () => {
            NK_SUBS.delete(run)
            clearTimeout(t)
        }
    }, [enabled])
}

/** Adds .is-in to every [data-rv] inside root when it enters the viewport (one-shot). */
export function useReveals(rootRef, deps = [], disabled = false) {
    React.useEffect(() => {
        const root = rootRef.current
        if (!root) return
        const els = root.querySelectorAll(".nk-rv,.nk-lines,.nk-mask")
        if (disabled || typeof IntersectionObserver === "undefined") {
            els.forEach((e) => e.classList.add("is-in"))
            return
        }
        // A clip-path mask fully clips its own box, so IntersectionObserver would never report
        // it as visible: masks are observed through their parent (the trigger) instead.
        const map = new Map()
        els.forEach((e) => {
            if (e.classList.contains("is-in")) return
            const trigger =
                e.classList.contains("nk-mask") && e.parentElement
                    ? e.parentElement
                    : e
            if (!map.has(trigger)) map.set(trigger, [])
            map.get(trigger).push(e)
        })
        const io = new IntersectionObserver(
            (entries) =>
                entries.forEach((en) => {
                    if (en.isIntersecting) {
                        ;(map.get(en.target) || []).forEach((t) =>
                            t.classList.add("is-in")
                        )
                        io.unobserve(en.target)
                    }
                }),
            { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
        )
        map.forEach((_v, trigger) => io.observe(trigger))
        return () => io.disconnect()
    }, deps)
}

/** Sticky needs unclipped ancestors (Framer frames clip by default). Same idea as nfUnclip. */
export function nkUnclip(el) {
    if (!el || typeof window === "undefined") return
    for (
        let p = el.parentElement;
        p && p !== document.body && p !== document.documentElement;
        p = p.parentElement
    ) {
        const cs = getComputedStyle(p)
        if (/hidden|auto|scroll/.test(cs.overflowX + " " + cs.overflowY))
            p.style.overflow = "visible"
    }
}

/* ------------------------------------------------------------ transitions */

function nkIsInternal(a, e) {
    if (!a || !a.href) return false
    if (
        e &&
        (e.defaultPrevented ||
            e.button !== 0 ||
            e.metaKey ||
            e.ctrlKey ||
            e.shiftKey ||
            e.altKey)
    )
        return false
    if (a.target && a.target !== "_self") return false
    if (a.hasAttribute("download") || a.dataset.nkInstant !== undefined)
        return false
    const raw = a.getAttribute("href") || ""
    if (raw.charAt(0) === "#") return false
    let u
    try {
        u = new URL(a.href, location.href)
    } catch (err) {
        return false
    }
    if (u.origin !== location.origin) return false
    if (u.pathname === location.pathname) return false
    return u
}

/*
 * Navigation goes through Framer's router when it is available (client-side, works in the
 * editor preview and on the published site); otherwise falls back to a full page load.
 * useRouter is read from the namespace so a missing export can never break the module.
 */
const useFramerRouter =
    typeof FramerNS.useRouter === "function" ? FramerNS.useRouter : () => null
const nkNorm = (p) => "/" + String(p || "").replace(/^\/+|\/+$/g, "")

export function useNKGo() {
    const router = useFramerRouter()
    const go = React.useCallback(
        (href) => {
            let u
            try {
                u = new URL(href, location.href)
            } catch (e) {
                return location.assign(href)
            }
            const routes = router && router.routes
            if (routes && typeof router.navigate === "function") {
                const want = nkNorm(u.pathname)
                const id = Object.keys(routes).find(
                    (k) => routes[k] && nkNorm(routes[k].path) === want
                )
                if (id) {
                    router.navigate(id, u.hash ? u.hash.slice(1) : "")
                    return
                }
            }
            location.assign(u.href)
        },
        [router]
    )
    React.useEffect(() => {
        if (typeof window === "undefined") return
        window.__nkGo = go
    }, [go])
    return go
}

/** Clears transition state when a page mounts (full load, client-side route change, bfcache). */
function nkSettle() {
    if (typeof document === "undefined") return
    document.documentElement.classList.remove("nk-leaving", "nk-lock")
}

/** Global link interception: black curtain + current page scale .98 → navigate. Once per document. */
function nkInstallTransitions(curtainRef) {
    if (typeof window === "undefined" || window.__nkTransitions) return
    window.__nkTransitions = true
    document.addEventListener("click", (e) => {
        const a =
            e.target && e.target.closest ? e.target.closest("a[href]") : null
        const u = nkIsInternal(a, e)
        if (!u) return
        e.preventDefault()
        const reduced =
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const c =
            (curtainRef &&
                curtainRef.current &&
                curtainRef.current.isConnected &&
                curtainRef.current) ||
            document.querySelector(".nk-curtain")
        document.documentElement.classList.remove("nk-lock")
        document.documentElement.classList.add("nk-leaving")
        if (c) {
            c.classList.remove("nk-curtain--enter")
            c.classList.add("is-on")
        }
        setTimeout(
            () => {
                const go = window.__nkGo
                if (go) go(u.pathname + u.hash)
                else location.assign(u.href)
                // safety net: a client-side route change to a page without NK components must
                // never stay dimmed behind the curtain
                setTimeout(() => {
                    if (
                        !document.documentElement.classList.contains(
                            "nk-leaving"
                        )
                    )
                        return
                    nkSettle()
                    document
                        .querySelectorAll(".nk-curtain.is-on")
                        .forEach((cc) => cc.classList.remove("is-on"))
                }, 3000)
            },
            reduced ? 0 : 430
        )
    })
    window.addEventListener("pageshow", (e) => {
        if (!e.persisted) return
        nkSettle()
        const c = document.querySelector(".nk-curtain")
        if (c) c.classList.remove("is-on")
    })
}

/* --------------------------------------------------------------- components */

const Arrow = ({ className }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
    >
        <path d="M5 19 19 5M7 5h12v12" />
    </svg>
)

function Lines({ lines, className = "", as = "h2", d = 0, style }) {
    const Tag = as
    return (
        <Tag
            className={"nk-lines " + className}
            style={{ ...(style || {}), "--d": d }}
        >
            {lines.map((l, i) => (
                <span key={i} style={{ "--i": i }}>
                    <span>{l}</span>
                </span>
            ))}
        </Tag>
    )
}

function Img({
    src,
    alt = "",
    className = "",
    mono = true,
    sizes = "100vw",
    style,
    imgStyle,
    mask = false,
    d = 0,
    eager = false,
}) {
    const img = (
        <img
            src={src}
            srcSet={nkSrcSet(src)}
            sizes={sizes}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className={mono ? "nk-mono" : ""}
            style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                ...(imgStyle || {}),
            }}
        />
    )
    if (!mask)
        return (
            <div className={className} style={style}>
                {img}
            </div>
        )
    return (
        <div
            className={"nk-mask " + className}
            style={{ ...(style || {}), "--d": d }}
        >
            {img}
        </div>
    )
}

function Barcode({ text, style, className = "" }) {
    return (
        <span
            className={"nk-barcode " + className}
            style={style}
            aria-hidden="true"
        >
            {text}
        </span>
    )
}

function Brackets() {
    return (
        <span className="nk-brackets" aria-hidden="true">
            <i />
        </span>
    )
}

function Cta({ href, children, ghost = false, onClick }) {
    return (
        <a
            className={"nk-cta" + (ghost ? " nk-cta--ghost" : "")}
            href={href}
            onClick={onClick}
        >
            <span>{children}</span>
            <Arrow />
        </a>
    )
}

function Clock() {
    const [t, setT] = React.useState("--:--:--")
    React.useEffect(() => {
        const f = () => {
            const d = new Date()
            setT(
                [d.getHours(), d.getMinutes(), d.getSeconds()]
                    .map((n) => String(n).padStart(2, "0"))
                    .join(":")
            )
        }
        f()
        const id = setInterval(f, 1000)
        return () => clearInterval(id)
    }, [])
    return <b>{t}</b>
}

function Menu({ open, setOpen, page, logo }) {
    const ref = React.useRef(null)
    React.useEffect(() => {
        const root = document.documentElement
        if (open) {
            root.classList.add("nk-lock")
            const first =
                ref.current && ref.current.querySelector(".nk-menu__item")
            setTimeout(() => first && first.focus({ preventScroll: true }), 420)
        } else root.classList.remove("nk-lock")
        const onKey = (e) => {
            if (!open) return
            if (e.key === "Escape") setOpen(false)
            if (e.key === "Tab" && ref.current) {
                const f = [...ref.current.querySelectorAll("a[href],button")]
                if (!f.length) return
                const i = f.indexOf(document.activeElement)
                if (e.shiftKey && i <= 0) {
                    e.preventDefault()
                    f[f.length - 1].focus()
                } else if (!e.shiftKey && i === f.length - 1) {
                    e.preventDefault()
                    f[0].focus()
                }
            }
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [open])
    return (
        <div
            ref={ref}
            className={"nk nk-menu" + (open ? " is-open" : "")}
            id="nk-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            aria-hidden={!open}
        >
            <div className="nk-menu__bg" aria-hidden="true" />
            <div className="nk-menu__top">
                <a
                    className="nk-nav__logo"
                    href="/"
                    aria-label="Nike Storm Lab — home"
                    tabIndex={open ? 0 : -1}
                >
                    <img
                        src={logo || NK_LOGO_SLOT}
                        alt="Nike"
                        style={{
                            width: "clamp(76px,5.6vw,120px)",
                            filter: "brightness(0) invert(1)",
                        }}
                    />
                </a>
                <div className="nk-nav__menu">
                    <button
                        type="button"
                        className="nk-nav__link nk-nav__link--active"
                        onClick={() => setOpen(false)}
                        tabIndex={open ? 0 : -1}
                    >
                        Close
                    </button>
                </div>
            </div>
            <nav className="nk-menu__list" aria-label="Pages">
                {NK_PAGES.map((pg, i) => (
                    <a
                        key={pg.key}
                        href={pg.href}
                        className={
                            "nk-menu__item" +
                            (pg.key === page ? " is-current" : "")
                        }
                        aria-current={pg.key === page ? "page" : undefined}
                        style={{ "--i": i }}
                        tabIndex={open ? 0 : -1}
                        onClick={(e) => {
                            if (pg.key === page) {
                                e.preventDefault()
                                setOpen(false)
                            }
                        }}
                    >
                        <span className="nk-menu__index">{pg.index}</span>
                        <span className="nk-menu__mask">
                            <span className="nk-menu__word">
                                {pg.label.toLowerCase()}
                            </span>
                        </span>
                        <span className="nk-menu__note">{pg.note}</span>
                    </a>
                ))}
            </nav>
            <aside className="nk-menu__side">
                <span className="nk-label">Featured object</span>
                <a
                    className="nk-menu__feature"
                    href={NK_PRODUCT.href}
                    tabIndex={open ? 0 : -1}
                >
                    <img src={NK_IMG.gear} alt="" />
                    <span>
                        <span className="nk-label">
                            SL-750 · Extreme weather shell
                        </span>
                        <strong>{NK_PRODUCT.label} ↗</strong>
                    </span>
                </a>
                <div className="nk-menu__readout" aria-hidden="true">
                    <span>Local</span>
                    <Clock />
                    <span>Chamber</span>
                    <b>04 · −24°C</b>
                    <span>Status</span>
                    <b className="nk-live">Testing</b>
                </div>
                <Barcode text="NIKESTORMLAB04" style={{ fontSize: 44 }} />
            </aside>
            <div className="nk-menu__bottom">
                <span>Nike Storm Lab — concept</span>
                <span>Esc to close</span>
            </div>
        </div>
    )
}

function Nav({ page, logo, onMenu, menuOpen, onCanvas }) {
    const [hidden, setHidden] = React.useState(false)
    React.useEffect(() => {
        if (onCanvas) return
        let last = window.scrollY
        let raf = 0
        const on = () => {
            cancelAnimationFrame(raf)
            raf = requestAnimationFrame(() => {
                const y = window.scrollY
                const dy = y - last
                if (Math.abs(dy) > 6) {
                    setHidden(dy > 0 && y > window.innerHeight * 0.4)
                    last = y
                }
            })
        }
        window.addEventListener("scroll", on, { passive: true })
        return () => window.removeEventListener("scroll", on)
    }, [onCanvas])
    const links = NK_PAGES.filter((p) => p.key !== "home")
    return (
        <header
            className={
                "nk-nav" + (hidden && !menuOpen ? " nk-nav--hidden" : "")
            }
        >
            <a
                className="nk-nav__logo"
                href="/"
                aria-label="Nike Storm Lab — home"
            >
                <img src={logo || NK_LOGO_SLOT} alt="Nike" />
            </a>
            <nav className="nk-nav__menu" aria-label="Main navigation">
                {links.map((l) => (
                    <a
                        key={l.key}
                        href={l.href}
                        className={
                            "nk-nav__link nk-nav__link--page" +
                            (l.key === page ? " nk-nav__link--active" : "")
                        }
                        aria-current={l.key === page ? "page" : undefined}
                    >
                        {l.label}
                    </a>
                ))}
                <button
                    type="button"
                    className="nk-nav__link nk-nav__link--menu"
                    aria-expanded={menuOpen}
                    aria-controls="nk-menu"
                    onClick={onMenu}
                >
                    <span className="nk-nav__burger" aria-hidden="true">
                        <i />
                        <i />
                    </span>
                    Menu
                </button>
            </nav>
        </header>
    )
}

function Footer({ page, logo, legal }) {
    const next = NK_NEXT[page] || NK_NEXT.about
    const links = NK_PAGES
    return (
        <footer className="nk-footer">
            <a className="nk-next" href={next.href}>
                <span className="nk-next__top">
                    <span className="nk-label">
                        Next chapter — <b>{next.index}</b>
                    </span>
                    <span className="nk-label">Continue ↗</span>
                </span>
                <span className="nk-next__word">
                    <span className="nk-next__fill" aria-hidden="true" />
                    <span>{next.label}</span>
                    <Arrow className="nk-next__arrow" />
                </span>
            </a>
            <div className="nk-footer__bar">
                <a href="/" aria-label="Nike Storm Lab — home">
                    <img src={logo || NK_LOGO_SLOT} alt="Nike" />
                </a>
                <ul className="nk-footer__links">
                    {links.map((l) => (
                        <li key={l.key}>
                            <a
                                href={l.href}
                                aria-current={
                                    l.key === page ? "page" : undefined
                                }
                            >
                                {l.label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a
                            href={NK_PRODUCT.href}
                            aria-current={
                                page === "product" ? "page" : undefined
                            }
                        >
                            {NK_PRODUCT.label}
                        </a>
                    </li>
                </ul>
                <div className="nk-footer__meta">
                    <Barcode text="NIKESTORMLAB" />
                    <span className="nk-label">
                        Storm Lab · FW26 · Chamber 04
                    </span>
                </div>
            </div>
            <div className="nk-footer__legal">
                <span>{legal}</span>
                <span>© 2026 · Built for what comes next</span>
            </div>
        </footer>
    )
}

/** Portals render outside Framer wrappers so fixed layers never inherit transforms/overflow. */
function Portal({ children }) {
    const [host, setHost] = React.useState(null)
    React.useEffect(() => {
        const el = document.createElement("div")
        el.setAttribute("data-nk-portal", "")
        document.body.appendChild(el)
        setHost(el)
        return () => {
            el.remove()
        }
    }, [])
    return host ? createPortal(children, host) : null
}

const DEFAULT_LEGAL =
    "Concept project. Not affiliated with, endorsed or sponsored by Nike, Inc."

/**
 * NKShell — wraps every new page: styles, nav, menu overlay, transition curtain, grain,
 * footer. `css` is the page's own stylesheet (scoped under its root class).
 */
function Shell({ page, logo, legal, css, children, className = "" }) {
    const { onCanvas, reduced } = useNKEnv()
    const [menuOpen, setMenuOpen] = React.useState(false)
    const curtainRef = React.useRef(null)
    const rootRef = React.useRef(null)
    useNKGo()
    React.useEffect(() => {
        if (onCanvas) return
        nkInstallTransitions(curtainRef)
        nkUnclip(rootRef.current)
        nkSettle()
        const onHash = (e) => {
            const a =
                e.target && e.target.closest
                    ? e.target.closest('a[href="#menu"]')
                    : null
            if (a) {
                e.preventDefault()
                setMenuOpen(true)
            }
        }
        document.addEventListener("click", onHash)
        return () => document.removeEventListener("click", onHash)
    }, [onCanvas])
    useReveals(rootRef, [onCanvas, reduced], onCanvas || reduced)
    const styles = nkCss(
        onCanvas,
        FONT_IMPORT + NF_FONTS + NK_CSS + (css || "")
    )
    return (
        <div
            ref={rootRef}
            className={"nk " + className + (onCanvas ? " nk--canvas" : "")}
            data-nk-page={page}
        >
            <style data-nk="1" dangerouslySetInnerHTML={{ __html: styles }} />
            <div className={"nk-page" + (onCanvas ? "" : " nk-page--enter")}>
                {children}
                <Footer
                    page={page}
                    logo={logo}
                    legal={legal || DEFAULT_LEGAL}
                />
            </div>
            <Nav
                page={page}
                logo={logo}
                onMenu={() => setMenuOpen(true)}
                menuOpen={menuOpen}
                onCanvas={onCanvas}
            />
            {!onCanvas && (
                <Portal>
                    <style
                        dangerouslySetInnerHTML={{
                            __html: nkCss(false, NK_CSS),
                        }}
                    />
                    <div
                        className="nk nk-portal"
                        style={{
                            position: "static",
                            background: "transparent",
                            overflow: "visible",
                        }}
                    >
                        <div className="nk-grain" aria-hidden="true" />
                        <Menu
                            open={menuOpen}
                            setOpen={setMenuOpen}
                            page={page}
                            logo={logo}
                        />
                        <div
                            ref={curtainRef}
                            className="nk-curtain nk-curtain--enter"
                            aria-hidden="true"
                        >
                            <div className="nk-curtain__bar" />
                        </div>
                    </div>
                </Portal>
            )}
        </div>
    )
}

/**
 * Overlay-only bridge for pages that keep their own nav (Home): menu + transitions +
 * curtain. Opens on any link to "#menu".
 */
function MenuBridge({ page = "home", logo }) {
    const { onCanvas } = useNKEnv()
    const [open, setOpen] = React.useState(false)
    const curtainRef = React.useRef(null)
    useNKGo()
    React.useEffect(() => {
        if (onCanvas) return
        nkInstallTransitions(curtainRef)
        nkSettle()
        const onHash = (e) => {
            const a =
                e.target && e.target.closest
                    ? e.target.closest('a[href="#menu"]')
                    : null
            if (a) {
                e.preventDefault()
                e.stopPropagation()
                setOpen(true)
            }
        }
        document.addEventListener("click", onHash, true)
        return () => document.removeEventListener("click", onHash, true)
    }, [onCanvas])
    if (onCanvas)
        return (
            <div
                style={{
                    padding: "6px 10px",
                    background: "#0d0d0d",
                    color: "#fff",
                    font: "500 11px/1.2 Manrope, sans-serif",
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                }}
            >
                NK Menu overlay · opens on #menu
            </div>
        )
    return (
        <Portal>
            <style
                dangerouslySetInnerHTML={{
                    __html: FONT_IMPORT + NF_FONTS + nkCss(false, NK_CSS),
                }}
            />
            <div
                className="nk nk-portal"
                style={{
                    position: "static",
                    background: "transparent",
                    overflow: "visible",
                }}
            >
                <Menu open={open} setOpen={setOpen} page={page} logo={logo} />
                <div
                    ref={curtainRef}
                    className="nk-curtain nk-curtain--enter"
                    aria-hidden="true"
                >
                    <div className="nk-curtain__bar" />
                </div>
            </div>
        </Portal>
    )
}

export const NK = {
    Shell,
    MenuBridge,
    Lines,
    Img,
    Barcode,
    Brackets,
    Cta,
    Arrow,
    Portal,
}
