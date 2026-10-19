// @ts-nocheck
/*
 * NKProduct — /product. Shadow Falcon 750 (same jacket as the homepage gear stage).
 * 01 Hero: enormous cutout (≈86% of viewport height), lowercase product title (homepage
 *    .collection-title DNA), uppercase tagline, specimen frame.
 * 02 Exploration: 5 technical hotspots + inspection panel with live zoom crop.
 * 03 Detail gallery: editorial close-ups (fabric, zipper, hood, seams, construction, branding).
 * 04 Colourway: BLACK / STONE / VOLT. Uses per-colourway renders when uploaded, otherwise
 *    grades the cutout (placeholder until the 3D team renders real colourways).
 * Specs mirror the homepage "Shadow Falcon 750" specs (illustrative).
 */
import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import {
    NK,
    NK_IMG,
    NK_LOGO_SLOT,
    useNKEnv,
    useScene,
    nkProps,
    nkClamp,
} from "./NKSystem.tsx"

const D = {
    brand: "NIKE",
    name1: "shadow",
    name2: "falcon",
    name3: "750",
    tag1: "Engineered for",
    tag2: "extreme weather.",
    intro: "A sculpted cape, an enveloping hood and adjustable details. Seen from every angle.",
    code: "SF750 · Extreme weather shell",
    exploreLabel: "Product exploration",
    exploreTitle: "Inspect the shell.",
    galleryLabel: "Detail",
    galleryTitle: "Built in the details.",
    colorLabel: "Colourway",
    note: "Illustrative specifications",
}

const HOTSPOTS = [
    {
        k: "h1",
        x: 37,
        y: 7,
        title: "Storm hood",
        spec: "3-point adjust",
        text: "Helmet-compatible hood with a wired brim. One-hand adjusters lock it in place in 80 km/h gusts.",
    },
    {
        k: "h2",
        x: 60,
        y: 34,
        title: "Sealed seams",
        spec: "13 mm tape",
        text: "Every seam is taped from the inside, so water has no path through the stitch holes.",
    },
    {
        k: "h3",
        x: 29,
        y: 45,
        title: "Ventilation",
        spec: "2 × 30 cm",
        text: "Two-way vents dump heat on the climb without opening the shell to rain.",
    },
    {
        k: "h4",
        x: 44,
        y: 53,
        title: "Waterproof zip",
        spec: "Laminated · 2-way",
        text: "Laminated front zip behind an internal storm flap. Glove-friendly puller.",
    },
    {
        k: "h5",
        x: 64,
        y: 76,
        title: "Adjustable cuff",
        spec: "Over-glove fit",
        text: "Low-profile tab seals the cuff over or under gloves.",
    },
]

const DETAILS = [
    {
        k: "hood",
        title: "Hood",
        text: "Wired brim keeps rain off the eyes.",
        ar: "4 / 5",
        pos: "38% 10%",
        zoom: 2.4,
    },
    {
        k: "fabric",
        title: "Fabric",
        text: "100% recycled nylon ripstop.",
        ar: "1 / 1",
    },
    {
        k: "zipper",
        title: "Zipper",
        text: "Laminated zip, sealed against horizontal rain.",
        ar: "3 / 2",
    },
    {
        k: "seams",
        title: "Seams",
        text: "Taped seams, inside and out of sight.",
        ar: "4 / 5",
    },
    {
        k: "brand",
        title: "Branding",
        text: "Heat-transferred mark. No stitch holes.",
        ar: "1 / 1",
    },
    {
        k: "build",
        title: "Construction",
        text: "Water beads and runs off the face fabric.",
        ar: "16 / 10",
    },
]

const COLORS = [
    {
        k: "black",
        name: "Black",
        code: "SF750-010",
        hex: "#111111",
        filter: "grayscale(1) contrast(1.06)",
        glow: "#2a2a2a",
    },
    {
        k: "stone",
        name: "Stone",
        code: "SF750-250",
        hex: "#cfc7b9",
        filter: "grayscale(1) brightness(2.65) contrast(.78) sepia(.32) saturate(.85)",
        glow: "#3a3631",
    },
    {
        k: "volt",
        name: "Volt",
        code: "SF750-702",
        hex: "#ceff00",
        filter: "grayscale(1) brightness(3) contrast(.88) sepia(1) saturate(9) hue-rotate(38deg)",
        glow: "#2c3310",
    },
]

const SPECS = [
    { n: "100", u: "%", l: "Recycled nylon" },
    { n: "180", u: "g/m²", l: "Fabric weight" },
    { n: "20k", u: "mm", l: "Water resistance" },
    { n: "−10", u: "°C", l: "Temperature rating" },
    { n: "3", u: "L", l: "Shell construction" },
]

const PR_CSS = `
.nk-pr .pr-hero{position:relative;height:100vh;height:100svh;min-height:680px;overflow:hidden;background:radial-gradient(48% 62% at 58% 58%,#2b2b2b 0%,#161616 42%,#0d0d0d 74%)}
.nk-pr .pr-hero__floor{position:absolute;left:0;right:0;bottom:0;height:22%;background:linear-gradient(to top,rgb(255 255 255 / 4%),transparent)}
.nk-pr .pr-figure{position:absolute;left:50%;bottom:0;height:86svh;aspect-ratio:782 / 1196;transform:translate3d(-36%,calc(var(--p,0) * 6svh),0) scale(calc(1.04 - var(--p,0) * .04));transform-origin:50% 100%;animation:pr-settle 1.8s var(--ease) both}
.nk-pr .pr-figure img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;object-position:50% 100%}
@keyframes pr-settle{from{opacity:0;transform:translate3d(-36%,3svh,0) scale(1.08)}to{opacity:1}}
.nk-pr .pr-hero__name{position:absolute;z-index:3;left:var(--inset);bottom:var(--inset);pointer-events:none}
.nk-pr .pr-hero__name .nk-display{font-size:clamp(84px,min(9.1vw,16.1svh),242px)}
.nk-pr .pr-hero__name .nk-lines>span:nth-child(2){margin-left:.46em}
.nk-pr .pr-brand{display:flex;align-items:center;gap:16px;margin-bottom:clamp(18px,2svh,30px)}
.nk-pr .pr-brand img{width:clamp(56px,4vw,84px);height:auto;filter:brightness(0) invert(1)}
.nk-pr .pr-tag{position:absolute;z-index:3;right:var(--inset);top:calc(var(--inset) + clamp(80px,9svh,120px));text-align:right}
.nk-pr .pr-tag p{margin:0;font-size:clamp(22px,2.15vw,52px);font-weight:300;line-height:1.02;letter-spacing:-.05em;text-transform:uppercase}
.nk-pr .pr-intro{position:absolute;z-index:3;right:var(--inset);bottom:var(--inset);width:clamp(240px,21vw,420px);display:grid;gap:18px}
.nk-pr .pr-intro .nk-body{text-indent:30%}
.nk-pr .pr-intro__row{display:flex;gap:10px;flex-wrap:wrap}
.nk-pr .pr-hero__code{position:absolute;z-index:3;left:var(--inset);top:calc(var(--inset) + clamp(80px,9svh,120px))}

/* exploration */
.nk-pr .pr-x{position:relative;display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:var(--gap);padding:clamp(110px,12vw,220px) var(--inset) clamp(60px,6vw,120px);min-height:100svh}
.nk-pr .pr-x__stage{position:relative;height:min(100svh,1180px);background:radial-gradient(50% 55% at 50% 55%,#242424,#121212 76%);border:1px solid var(--line);overflow:hidden}
.nk-pr .pr-x__fig{position:absolute;left:50%;bottom:0;height:96%;aspect-ratio:782 / 1196;transform:translateX(-46%)}
.nk-pr .pr-x__fig img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;object-position:50% 100%;filter:grayscale(1) contrast(1.06)}
.nk-pr .pr-hot{position:absolute;left:calc(var(--x) * 1%);top:calc(var(--y) * 1%);width:44px;height:44px;margin:-22px 0 0 -22px;padding:0;border:0;background:transparent;cursor:pointer;z-index:2}
.nk-pr .pr-hot:before{content:"";position:absolute;inset:15px;background:#fff;transition:background .25s,transform .35s var(--ease)}
.nk-pr .pr-hot:after{content:"";position:absolute;inset:6px;border:1px solid rgb(255 255 255 / 70%);animation:pr-pulse 2.4s var(--ease) infinite}
.nk-pr .pr-hot span{position:absolute;left:44px;top:50%;transform:translateY(-50%);font-size:11px;letter-spacing:.08em;color:#fff;white-space:nowrap;opacity:.8;font-variant-numeric:tabular-nums}
.nk-pr .pr-hot.is-on:before{background:var(--signal);transform:rotate(45deg)}
.nk-pr .pr-hot.is-on:after{border-color:var(--signal)}
.nk-pr .pr-hot.is-on span{opacity:1;color:var(--signal)}
@keyframes pr-pulse{0%{transform:scale(.7);opacity:0}30%{opacity:1}100%{transform:scale(1.35);opacity:0}}
.nk-pr .pr-x__side{position:sticky;top:calc(var(--inset) + clamp(70px,8svh,110px));align-self:start;display:grid;gap:clamp(20px,2vw,36px)}
.nk-pr .pr-x__side .nk-title{font-size:clamp(30px,3.1vw,78px)}
.nk-pr .pr-x__list{margin:0;padding:0;list-style:none}
.nk-pr .pr-x__list button{display:grid;grid-template-columns:40px minmax(0,1fr) auto;align-items:baseline;gap:12px;width:100%;padding:12px 0;border:0;border-top:1px solid var(--rule);background:transparent;text-align:left;cursor:pointer;transition:padding .35s var(--ease)}
.nk-pr .pr-x__list li:last-child button{border-bottom:1px solid var(--rule)}
.nk-pr .pr-x__list button span:first-child{font-size:11px;letter-spacing:.08em;color:var(--fog);font-variant-numeric:tabular-nums}
.nk-pr .pr-x__list button strong{font-size:clamp(15px,1.15vw,24px);font-weight:600;letter-spacing:-.03em;text-transform:uppercase}
.nk-pr .pr-x__list button em{font-style:normal;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--fog)}
.nk-pr .pr-x__list button:hover,.nk-pr .pr-x__list button[aria-pressed="true"]{padding-left:10px}
.nk-pr .pr-x__list button[aria-pressed="true"] span:first-child{color:var(--signal)}
.nk-pr .pr-panel{display:grid;grid-template-columns:clamp(110px,9vw,170px) minmax(0,1fr);gap:18px;padding:14px}
.nk-pr .pr-panel__zoom{position:relative;aspect-ratio:1;background-repeat:no-repeat;background-size:var(--zs,420%);background-position:var(--zx,50%) var(--zy,50%);background-color:#161616;filter:grayscale(1) contrast(1.1);transition:background-position .6s var(--ease)}
.nk-pr .pr-panel__zoom:after{content:"";position:absolute;inset:0;background:linear-gradient(rgb(255 255 255 / 55%),rgb(255 255 255 / 55%)) 50% 0/1px 100% no-repeat,linear-gradient(rgb(255 255 255 / 55%),rgb(255 255 255 / 55%)) 0 50%/100% 1px no-repeat;opacity:.6}
.nk-pr .pr-panel h3{margin:6px 0 8px;font-size:clamp(18px,1.4vw,30px);font-weight:700;letter-spacing:-.03em;line-height:1;text-transform:uppercase}
.nk-pr .pr-panel p{margin:0;font-size:clamp(12px,.85vw,17px);font-weight:300;line-height:1.45;color:rgb(255 255 255 / 82%)}
.nk-pr .pr-panel__fade{animation:pr-fade .5s var(--ease) both}
@keyframes pr-fade{from{opacity:0;transform:translate3d(0,10px,0)}to{opacity:1;transform:none}}
.nk-pr .pr-x__line{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible}
.nk-pr .pr-x__line path{fill:none;stroke:var(--signal);stroke-width:1;vector-effect:non-scaling-stroke}

/* gallery */
.nk-pr .pr-g{padding:clamp(110px,12vw,220px) var(--inset) 0}
.nk-pr .pr-g__head{display:flex;justify-content:space-between;align-items:end;gap:var(--gap);padding-top:14px;border-top:1px solid var(--rule);margin-bottom:clamp(50px,6vw,110px)}
.nk-pr .pr-g__head .nk-display{font-size:clamp(56px,min(7.4vw,13svh),180px)}
.nk-pr .pr-g__grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);row-gap:clamp(60px,7vw,140px)}
.nk-pr .pr-d{position:relative}
.nk-pr .pr-d__img{position:relative;aspect-ratio:var(--ar);overflow:hidden;background:#151515}
.nk-pr .pr-d__img .nk-mask,.nk-pr .pr-d__img .nk-mask__in,.nk-pr .pr-d__par{position:absolute;inset:0}
.nk-pr .pr-d__par img{width:100%;height:100%;object-fit:cover}
.nk-pr .pr-d__crop{position:absolute;inset:0;background-repeat:no-repeat;background-color:#141414;filter:grayscale(1) contrast(1.08)}
.nk-pr .pr-d__brand{position:absolute;inset:0;display:grid;place-items:center}
.nk-pr .pr-d__brand img{width:38%;height:auto;filter:brightness(0) invert(1);opacity:.86;mix-blend-mode:screen}
.nk-pr .pr-d__cap{display:flex;gap:14px;align-items:baseline;margin-top:14px}
.nk-pr .pr-d__cap b{font-size:11px;font-weight:400;letter-spacing:.08em;color:var(--fog);font-variant-numeric:tabular-nums}
.nk-pr .pr-d__cap strong{font-size:clamp(14px,1vw,20px);font-weight:600;letter-spacing:-.02em;text-transform:uppercase}
.nk-pr .pr-d__cap span{margin-left:auto;max-width:26ch;text-align:right;font-size:clamp(11px,.75vw,15px);font-weight:300;color:var(--fog)}
.nk-pr .pr-d:nth-child(1){grid-column:1 / span 7}
.nk-pr .pr-d:nth-child(2){grid-column:9 / span 4;margin-top:24svh}
.nk-pr .pr-d:nth-child(3){grid-column:2 / span 6}
.nk-pr .pr-d:nth-child(4){grid-column:9 / span 4;margin-top:-10svh}
.nk-pr .pr-d:nth-child(5){grid-column:1 / span 4}
.nk-pr .pr-d:nth-child(6){grid-column:6 / span 7;margin-top:14svh}

/* colourway */
.nk-pr .pr-c{position:relative;display:grid;grid-template-columns:minmax(0,4fr) minmax(0,5fr) minmax(0,3fr);gap:var(--gap);align-items:end;min-height:100svh;margin-top:clamp(110px,12vw,220px);padding:clamp(80px,9vw,160px) var(--inset) var(--inset);border-top:1px solid var(--line);overflow:hidden}
.nk-pr .pr-c__glow{position:absolute;inset:0;background:radial-gradient(42% 58% at 50% 62%,var(--glow,#2a2a2a),transparent 72%);transition:background 1s var(--ease)}
.nk-pr .pr-c__fig{position:relative;grid-column:2;height:min(88svh,1040px);aspect-ratio:782 / 1196;justify-self:center}
.nk-pr .pr-c__fig img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;object-position:50% 100%;transition:opacity .8s var(--ease),filter .8s var(--ease)}
.nk-pr .pr-c__fig img.is-off{opacity:0}
.nk-pr .pr-c__left{position:relative;display:grid;gap:18px;align-self:stretch;align-content:space-between}
.nk-pr .pr-c__name{font-size:clamp(72px,min(8.4vw,15svh),210px)}
.nk-pr .pr-c__name span{display:block;animation:pr-fade .6s var(--ease) both}
.nk-pr .pr-swatches{position:relative;display:grid;gap:8px;align-self:end}
.nk-pr .pr-sw{display:grid;grid-template-columns:44px minmax(0,1fr) auto;align-items:center;gap:14px;padding:8px;border:1px solid var(--line);background:transparent;text-align:left;cursor:pointer;transition:border-color .25s,background .25s}
.nk-pr .pr-sw i{display:block;width:44px;height:44px;border:1px solid rgb(255 255 255 / 30%)}
.nk-pr .pr-sw strong{font-size:15px;font-weight:600;letter-spacing:-.02em;text-transform:uppercase}
.nk-pr .pr-sw em{font-style:normal;font-size:11px;letter-spacing:.08em;color:var(--fog)}
.nk-pr .pr-sw:hover{border-color:rgb(255 255 255 / 60%)}
.nk-pr .pr-sw[aria-pressed="true"]{border-color:#fff;background:rgb(255 255 255 / 6%)}
.nk-pr .pr-sw[aria-pressed="true"] em{color:#fff}
.nk-pr .pr-specs{position:relative;width:100%;border-collapse:collapse;margin-top:28px}
.nk-pr .pr-specs caption{padding-bottom:10px;text-align:left}
.nk-pr .pr-specs td,.nk-pr .pr-specs th{padding:10px 0;border-top:1px solid var(--rule);text-align:left;vertical-align:middle}
.nk-pr .pr-specs td{width:46%;padding-right:12px}
.nk-pr .pr-specs th{font-size:clamp(11px,.73vw,15px);font-weight:400}
.nk-pr .pr-specs .nk-num{font-size:clamp(26px,1.9vw,44px)}
.nk-pr .pr-specs .nk-num small{margin-left:.2em;font-size:.42em;font-weight:300;letter-spacing:-.02em}
.nk-pr .pr-c__cta{position:relative;display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}

@media /*W*/(max-width:1023px){
.nk-pr .pr-figure{height:74svh;transform:translate3d(-30%,calc(var(--p,0) * 6svh),0)}
@keyframes pr-settle{from{opacity:0}to{opacity:1}}
.nk-pr .pr-intro{display:none}
.nk-pr .pr-tag p{font-size:clamp(18px,4vw,32px)}
.nk-pr .pr-hero__name .nk-display{font-size:clamp(64px,17.6vw,150px)}
.nk-pr .pr-x{grid-template-columns:minmax(0,1fr)}
.nk-pr .pr-x__stage{height:min(92svh,820px)}
.nk-pr .pr-x__side{position:relative;top:0}
.nk-pr .pr-x__line{display:none}
.nk-pr .pr-hot span{display:none}
.nk-pr .pr-g__head{flex-direction:column;align-items:flex-start}
.nk-pr .pr-g__grid{grid-template-columns:repeat(6,minmax(0,1fr));row-gap:56px}
.nk-pr .pr-d:nth-child(n){grid-column:1 / span 6;margin-top:0}
.nk-pr .pr-d:nth-child(even){grid-column:2 / span 5}
.nk-pr .pr-d__cap{flex-wrap:wrap}
.nk-pr .pr-d__cap span{margin-left:0;text-align:left;flex-basis:100%}
.nk-pr .pr-c{grid-template-columns:minmax(0,1fr);align-items:start}
.nk-pr .pr-c__fig{grid-column:1;grid-row:2;height:70svh}
.nk-pr .pr-c__left{grid-row:1}
.nk-pr .pr-swatches{grid-row:3}
.nk-pr .pr-swatches{grid-template-columns:repeat(3,minmax(0,1fr))}
.nk-pr .pr-sw{grid-template-columns:minmax(0,1fr);justify-items:start}
.nk-pr .pr-sw i{width:100%;height:36px}
}
@media /*W*/(max-width:599px){
.nk-pr .pr-figure{height:66svh;transform:translate3d(-22%,0,0)}
.nk-pr .pr-tag{top:calc(var(--inset) + 70px)}
.nk-pr .pr-hero__code{display:none}
.nk-pr .pr-panel{grid-template-columns:minmax(0,1fr)}
.nk-pr .pr-panel__zoom{max-width:160px}
}
@media(prefers-reduced-motion:reduce){
.nk-pr .pr-figure{animation:none}
.nk-pr .pr-hot:after{animation:none}
.nk-pr .pr-d__par{animation:none!important}
}
@supports (animation-timeline:view()){
.nk-pr .pr-d__par{animation:pr-par linear both;animation-timeline:view();animation-range:cover 0% cover 100%}
@keyframes pr-par{from{transform:translate3d(0,-5%,0) scale(1.1)}to{transform:translate3d(0,5%,0) scale(1.1)}}
}
.nk--canvas.nk-pr .pr-figure{animation:none}
.nk--canvas.nk-pr .pr-d__par{animation:none}
.nk--canvas.nk-pr .pr-x__side{position:relative;top:0}
`

function Detail({ d, i, src, logo, product }) {
    let media
    if (d.k === "hood")
        media = (
            <div
                className="pr-d__crop"
                style={{
                    backgroundImage: "url(" + product + ")",
                    backgroundSize: d.zoom * 100 + "%",
                    backgroundPosition: d.pos,
                }}
                role="img"
                aria-label="Hood close-up"
            />
        )
    else if (d.k === "brand")
        media = (
            <>
                <img
                    src={src}
                    alt=""
                    className="nk-mono"
                    loading="lazy"
                    decoding="async"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "grayscale(1) brightness(.55) contrast(1.1)",
                    }}
                />
                <div className="pr-d__brand">
                    <img src={logo || NK_LOGO_SLOT} alt="Logo detail" />
                </div>
            </>
        )
    else
        media = (
            <img
                src={src}
                alt={d.title + " close-up"}
                className="nk-mono"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 1023px) 90vw, 50vw"
            />
        )
    return (
        <figure className="pr-d nk-rv" style={{ "--ar": d.ar, margin: 0 }}>
            <div className="pr-d__img">
                <div className="nk-mask">
                    <div className="nk-mask__in">
                        <div className="pr-d__par">{media}</div>
                    </div>
                </div>
            </div>
            <figcaption className="pr-d__cap">
                <b>D.{String(i + 1).padStart(2, "0")}</b>
                <strong>{d.title}</strong>
                <span>{d.text}</span>
            </figcaption>
        </figure>
    )
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 7600
 */
export default function NKProduct(props) {
    const p = nkProps(props, D, ["copy", "hotspots"])
    const { onCanvas, reduced } = useNKEnv()
    const product = p.productImage || NK_IMG.gear
    const heroRef = React.useRef(null)
    const stageRef = React.useRef(null)
    const panelRef = React.useRef(null)
    const lineRef = React.useRef(null)
    const xRef = React.useRef(null)
    const [hot, setHot] = React.useState(0)
    const [color, setColor] = React.useState(0)
    const spots = HOTSPOTS.map((h, i) => ({
        ...h,
        title: p[h.k + "t"] || h.title,
        text: p[h.k + "d"] || h.text,
        spec: p[h.k + "s"] || h.spec,
        x: p[h.k + "x"] ?? h.x,
        y: p[h.k + "y"] ?? h.y,
    }))
    const detailSrc = {
        fabric: p.dFabric || NK_IMG.weave,
        zipper: p.dZipper || NK_IMG.zipper,
        seams: p.dSeams || NK_IMG.stitch,
        brand: p.dBrand || NK_IMG.weave,
        build: p.dBuild || NK_IMG.droplets,
        hood: product,
    }
    const colorImgs = [p.cBlack, p.cStone, p.cVolt]

    useScene(
        heroRef,
        ({ el, rect, vh }) =>
            el.style.setProperty("--p", nkClamp(-rect.top / vh).toFixed(4)),
        !onCanvas && !reduced
    )

    // leader line from the active hotspot to the inspection panel (desktop)
    const drawLine = React.useCallback(() => {
        const st = stageRef.current,
            pn = panelRef.current,
            ln = lineRef.current,
            root = xRef.current
        if (
            !st ||
            !pn ||
            !ln ||
            !root ||
            typeof window === "undefined" ||
            window.innerWidth < 1024
        )
            return
        const b = st.querySelector(".pr-hot.is-on")
        if (!b) return
        const rr = root.getBoundingClientRect()
        const hb = b.getBoundingClientRect()
        const pb = pn.getBoundingClientRect()
        const x1 = hb.left + hb.width / 2 - rr.left,
            y1 = hb.top + hb.height / 2 - rr.top
        const x2 = pb.left - rr.left,
            y2 = pb.top + pb.height / 2 - rr.top
        ln.querySelector("path").setAttribute(
            "d",
            "M" +
                x1.toFixed(1) +
                " " +
                y1.toFixed(1) +
                " L" +
                x2.toFixed(1) +
                " " +
                y2.toFixed(1)
        )
    }, [])
    useScene(xRef, drawLine, !onCanvas)
    React.useEffect(() => {
        drawLine()
        const t = setTimeout(drawLine, 60)
        return () => clearTimeout(t)
    }, [hot, drawLine])

    const h = spots[hot]
    const c = COLORS[color]
    return (
        <NK.Shell
            page="product"
            logo={p.logo}
            legal={p.legal}
            css={PR_CSS}
            className="nk-pr"
        >
            {/* 01 HERO */}
            <section
                ref={heroRef}
                className="pr-hero"
                aria-label="Shadow Falcon 750"
            >
                <div className="pr-hero__floor" aria-hidden="true" />
                <div className="pr-figure">
                    <img
                        src={product}
                        alt="Shadow Falcon 750 extreme weather shell"
                        fetchpriority="high"
                        decoding="async"
                        style={{ filter: "grayscale(1) contrast(1.06)" }}
                    />
                </div>
                <span className="pr-hero__code nk-label nk-rv">
                    <b>03</b> — {p.code}
                </span>
                <div className="pr-tag nk-rv" style={{ "--d": 1 }}>
                    <p>
                        {p.tag1}
                        <br />
                        {p.tag2}
                    </p>
                </div>
                <div className="pr-hero__name">
                    <div className="pr-brand nk-rv">
                        <img src={p.logo || NK_LOGO_SLOT} alt="Nike" />
                        <span className="nk-label">
                            <b>{p.brand}</b>
                        </span>
                    </div>
                    <div className="nk-blend">
                        <NK.Lines
                            as="h1"
                            className="nk-display nk-display--lower"
                            lines={[p.name1, p.name2, p.name3]}
                        />
                    </div>
                </div>
                <div className="pr-intro nk-rv" style={{ "--d": 2 }}>
                    <p className="nk-body">{p.intro}</p>
                    <div className="pr-intro__row">
                        <NK.Cta href="#nk-explore">Explore the shell</NK.Cta>
                    </div>
                </div>
            </section>

            {/* 02 EXPLORATION */}
            <section
                ref={xRef}
                id="nk-explore"
                className="pr-x"
                aria-label="Product exploration"
            >
                <div ref={stageRef} className="pr-x__stage nk-rv">
                    <div className="pr-x__fig">
                        <img
                            src={product}
                            alt="Shadow Falcon 750 with technical hotspots"
                            loading="lazy"
                            decoding="async"
                        />
                        {spots.map((s, i) => (
                            <button
                                key={s.k}
                                type="button"
                                className={
                                    "pr-hot" + (i === hot ? " is-on" : "")
                                }
                                style={{ "--x": s.x, "--y": s.y }}
                                aria-label={
                                    String(i + 1).padStart(2, "0") +
                                    " " +
                                    s.title
                                }
                                aria-pressed={i === hot}
                                onMouseEnter={() => setHot(i)}
                                onFocus={() => setHot(i)}
                                onClick={() => setHot(i)}
                            >
                                <span>{String(i + 1).padStart(2, "0")}</span>
                            </button>
                        ))}
                    </div>
                    <NK.Brackets />
                </div>
                <aside className="pr-x__side">
                    <span className="nk-label">
                        <b>03.1</b> — {p.exploreLabel}
                    </span>
                    <h2 className="nk-title">{p.exploreTitle}</h2>
                    <div
                        ref={panelRef}
                        className="pr-panel nk-panel"
                        aria-live="polite"
                    >
                        <div
                            className="pr-panel__zoom"
                            style={{
                                backgroundImage: "url(" + product + ")",
                                "--zx": h.x + "%",
                                "--zy": h.y + "%",
                            }}
                            aria-hidden="true"
                        />
                        <div key={hot} className="pr-panel__fade">
                            <span className="nk-label">
                                <b className="nk-signal">
                                    {String(hot + 1).padStart(2, "0")}
                                </b>{" "}
                                — {h.spec}
                            </span>
                            <h3>{h.title}</h3>
                            <p>{h.text}</p>
                        </div>
                    </div>
                    <ol className="pr-x__list">
                        {spots.map((s, i) => (
                            <li key={s.k}>
                                <button
                                    type="button"
                                    aria-pressed={i === hot}
                                    onClick={() => setHot(i)}
                                    onMouseEnter={() => setHot(i)}
                                >
                                    <span>
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <strong>{s.title}</strong>
                                    <em>{s.spec}</em>
                                </button>
                            </li>
                        ))}
                    </ol>
                </aside>
                <svg ref={lineRef} className="pr-x__line" aria-hidden="true">
                    <path d="" />
                </svg>
            </section>

            {/* 03 DETAIL GALLERY */}
            <section className="pr-g" aria-label="Detail gallery">
                <header className="pr-g__head">
                    <NK.Lines
                        as="h2"
                        className="nk-display"
                        lines={[p.galleryTitle]}
                    />
                    <span className="nk-label nk-rv">
                        <b>03.2</b> — {p.galleryLabel} · 06 frames
                    </span>
                </header>
                <div className="pr-g__grid">
                    {DETAILS.map((d, i) => (
                        <Detail
                            key={d.k}
                            d={d}
                            i={i}
                            src={detailSrc[d.k]}
                            logo={p.logo}
                            product={product}
                        />
                    ))}
                </div>
            </section>

            {/* 04 COLOURWAY */}
            <section
                className="pr-c"
                style={{ "--glow": c.glow }}
                aria-label="Colourway"
            >
                <div className="pr-c__glow" aria-hidden="true" />
                <div className="pr-c__left">
                    <div>
                        <span className="nk-label" style={{ marginBottom: 16 }}>
                            <b>03.3</b> — {p.colorLabel}
                        </span>
                        <h2
                            className="nk-display pr-c__name"
                            aria-live="polite"
                        >
                            <span key={c.k}>{c.name}</span>
                        </h2>
                        <span className="nk-label" style={{ marginTop: 14 }}>
                            {c.code}
                        </span>
                    </div>
                    <table className="pr-specs">
                        <caption className="nk-label">{p.note}</caption>
                        <tbody>
                            {SPECS.map((s) => (
                                <tr key={s.l}>
                                    <td>
                                        <span className="nk-num">
                                            {s.n}
                                            <small>{s.u}</small>
                                        </span>
                                    </td>
                                    <th scope="row">{s.l}</th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pr-c__fig">
                    {COLORS.map((cc, i) => (
                        <img
                            key={cc.k}
                            src={colorImgs[i] || product}
                            alt={
                                i === color
                                    ? "Shadow Falcon 750 in " + cc.name
                                    : ""
                            }
                            className={i === color ? "" : "is-off"}
                            loading="lazy"
                            decoding="async"
                            style={{
                                filter: colorImgs[i] ? "none" : cc.filter,
                            }}
                        />
                    ))}
                </div>
                <div
                    className="pr-swatches"
                    role="group"
                    aria-label="Choose colourway"
                >
                    {COLORS.map((cc, i) => (
                        <button
                            key={cc.k}
                            type="button"
                            className="pr-sw"
                            aria-pressed={i === color}
                            onClick={() => setColor(i)}
                        >
                            <i style={{ background: cc.hex }} />
                            <strong>{cc.name}</strong>
                            <em>{cc.code}</em>
                        </button>
                    ))}
                    <div className="pr-c__cta">
                        <NK.Cta href="/expeditions">See it tested</NK.Cta>
                        <NK.Cta href="/collection" ghost>
                            Collection
                        </NK.Cta>
                    </div>
                </div>
            </section>
        </NK.Shell>
    )
}

const S = (title, def, area = false) => ({
    type: ControlType.String,
    title,
    defaultValue: def,
    displayTextArea: area,
})
const I = (title) => ({ type: ControlType.Image, title })
const hotControls = {}
HOTSPOTS.forEach((h, i) => {
    const n = String(i + 1).padStart(2, "0")
    hotControls[h.k + "t"] = S(n + " title", h.title)
    hotControls[h.k + "s"] = S(n + " spec", h.spec)
    hotControls[h.k + "d"] = S(n + " text", h.text, true)
    hotControls[h.k + "x"] = {
        type: ControlType.Number,
        title: n + " x %",
        defaultValue: h.x,
        min: 0,
        max: 100,
        step: 0.5,
    }
    hotControls[h.k + "y"] = {
        type: ControlType.Number,
        title: n + " y %",
        defaultValue: h.y,
        min: 0,
        max: 100,
        step: 0.5,
    }
})

addPropertyControls(NKProduct, {
    logo: I("Logo (Swoosh)"),
    productImage: I("Product cutout (PNG)"),
    copy: {
        type: ControlType.Object,
        title: "Copy",
        controls: {
            brand: S("Brand", D.brand),
            name1: S("Name line 1", D.name1),
            name2: S("Name line 2", D.name2),
            name3: S("Name line 3", D.name3),
            tag1: S("Tagline 1", D.tag1),
            tag2: S("Tagline 2", D.tag2),
            intro: S("Intro", D.intro, true),
            code: S("Code", D.code),
            exploreTitle: S("Exploration title", D.exploreTitle),
            galleryTitle: S("Gallery title", D.galleryTitle),
            note: S("Specs note", D.note),
        },
    },
    hotspots: {
        type: ControlType.Object,
        title: "Hotspots",
        controls: hotControls,
    },
    dFabric: I("Detail — fabric"),
    dZipper: I("Detail — zipper"),
    dSeams: I("Detail — seams"),
    dBrand: I("Detail — branding base"),
    dBuild: I("Detail — construction"),
    cBlack: I("Colourway — Black render"),
    cStone: I("Colourway — Stone render"),
    cVolt: I("Colourway — Volt render"),
    legal: S(
        "Footer legal line",
        "Concept project. Not affiliated with, endorsed or sponsored by Nike, Inc.",
        true
    ),
})
