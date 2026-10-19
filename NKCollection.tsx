// @ts-nocheck
/*
 * NKCollection — /collection. Products as campaign objects, not a store grid.
 * 01 Intro: lowercase display over the homepage-style vertical gallery loop + category index
 * 02 Chapters: Outerwear (asymmetric editorial), Footwear (horizontal pinned track),
 *    Base layers, Equipment. Hover = perspective tilt + crop change + viewfinder brackets.
 * Only the flagship links to /product; other objects carry an "In testing" status.
 * Objects are editable through the "Objects" array control (category, name, labels, image).
 */
import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import {
    NK,
    NK_IMG,
    NK_PRODUCT,
    useNKEnv,
    useScene,
    nkProps,
    nkClamp,
} from "./NKSystem.tsx"

const CATS = [
    { key: "Outerwear", line: "Shells engineered for horizontal rain." },
    { key: "Footwear", line: "Grip and dryness on unstable ground." },
    { key: "Base layers", line: "The climate next to the skin." },
    { key: "Equipment", line: "Tools that survive the same storm." },
]

const ITEMS = [
    {
        id: "sf750",
        category: "Outerwear",
        name: "Shadow Falcon 750",
        label: "Extreme weather shell",
        tech: "3L · 30K MM",
        status: "Explore",
        href: "/product",
    },
    {
        id: "alpine",
        category: "Outerwear",
        name: "Alpine Shield",
        label: "Alpine hard shell",
        tech: "3L · 28K MM",
        status: "In testing",
    },
    {
        id: "veil",
        category: "Outerwear",
        name: "Storm Veil",
        label: "Cape shell system",
        tech: "2.5L · 20K MM",
        status: "In testing",
    },
    {
        id: "cirrus",
        category: "Outerwear",
        name: "Cirrus Expedition",
        label: "Belted expedition shell",
        tech: "3L · 30K MM",
        status: "In testing",
    },
    {
        id: "trail",
        category: "Footwear",
        name: "Storm Trail 01",
        label: "Waterproof trail shoe",
        tech: "Sealed bootie · lug 5 MM",
        status: "In testing",
    },
    {
        id: "summit",
        category: "Footwear",
        name: "Summit Boot",
        label: "Insulated alpine boot",
        tech: "Crampon-ready",
        status: "In testing",
    },
    {
        id: "base",
        category: "Base layers",
        name: "Thermal Base 260",
        label: "Thermal base layer",
        tech: "260 G/M²",
        status: "In testing",
    },
    {
        id: "core",
        category: "Base layers",
        name: "Core Mesh LS",
        label: "Moisture transfer layer",
        tech: "Body-mapped mesh",
        status: "In testing",
    },
    {
        id: "goggles",
        category: "Equipment",
        name: "Summit Goggles",
        label: "Anti-fog storm lens",
        tech: "Photochromic",
        status: "In testing",
    },
    {
        id: "pack",
        category: "Equipment",
        name: "Storm Pack 28",
        label: "Roll-top dry pack",
        tech: "28 L · welded seams",
        status: "In testing",
    },
    {
        id: "gloves",
        category: "Equipment",
        name: "Grip Shell Glove",
        label: "Waterproof shell glove",
        tech: "Touch-ready",
        status: "In testing",
    },
]
const IMG_BY_ID = {
    sf750: NK_IMG.gear,
    alpine: NK_IMG.g1,
    veil: NK_IMG.g3,
    cirrus: NK_IMG.g2,
    trail: NK_IMG.foot2,
    summit: NK_IMG.foot1,
    base: NK_IMG.base1,
    core: NK_IMG.stitch,
    goggles: NK_IMG.goggles,
    pack: NK_IMG.pack,
    gloves: NK_IMG.gloves,
}
const CUTOUT = { sf750: true }

const D = {
    title: "collection",
    season: "FW26 · Storm system",
    lead: "Four systems built for one storm.",
    note: "Concept objects. Specifications illustrative.",
}

const COL_CSS = `
.nk-col .col-hero{position:relative;height:100vh;height:100svh;min-height:680px;overflow:hidden}
.nk-col .col-gallery{position:absolute;top:0;bottom:0;right:var(--inset);width:min(24vw,51svh);overflow:hidden}
.nk-col .col-gallery__track{display:flex;flex-direction:column;gap:clamp(14px,1.04vw,28px);animation:col-loop 32s linear infinite;will-change:transform}
.nk-col .col-gallery__track img{width:100%;height:auto;aspect-ratio:2 / 3;object-fit:cover}
@keyframes col-loop{to{transform:translate3d(0,-50%,0)}}
.nk-col .col-gallery:after{content:"";position:absolute;inset:0;background:linear-gradient(to bottom,#0d0d0d,transparent 18%,transparent 82%,#0d0d0d);pointer-events:none}
.nk-col .col-hero__title{position:absolute;z-index:2;left:var(--inset);bottom:calc(var(--inset) + 6svh);pointer-events:none}
.nk-col .col-hero__title .nk-display{font-size:clamp(90px,min(16vw,28svh),380px)}
.nk-col .col-hero__intro{position:absolute;z-index:3;left:var(--inset);top:calc(var(--inset) + clamp(80px,9svh,120px));display:grid;gap:18px;width:clamp(280px,26vw,520px)}
.nk-col .col-hero__intro .nk-lead{text-indent:20.5%}
.nk-col .col-index{position:absolute;z-index:3;left:calc(var(--inset) + 34vw);top:calc(var(--inset) + clamp(80px,9svh,120px));width:clamp(240px,22vw,420px);margin:0;padding:0;list-style:none}
.nk-col .col-index a{display:grid;grid-template-columns:32px minmax(0,1fr) auto;align-items:baseline;gap:12px;padding:11px 0;border-top:1px solid var(--rule);text-decoration:none;font-size:clamp(14px,1vw,20px);font-weight:400;letter-spacing:-.02em;transition:padding .35s var(--ease),color .2s}
.nk-col .col-index li:last-child a{border-bottom:1px solid var(--rule)}
.nk-col .col-index a:hover{padding-left:10px}
.nk-col .col-index a:hover .col-index__i{color:var(--signal)}
.nk-col .col-index__i,.nk-col .col-index__n{font-size:11px;letter-spacing:.08em;color:var(--fog);font-variant-numeric:tabular-nums;transition:color .2s}

.nk-col .col-ch{position:relative;padding:clamp(110px,12vw,220px) var(--inset) 0}
.nk-col .col-ch__head{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,7fr) minmax(0,3fr);align-items:end;gap:var(--gap);padding-top:clamp(14px,1.2vw,24px);border-top:1px solid var(--rule)}
.nk-col .col-ch__i{font-size:clamp(56px,6vw,140px);align-self:start}
.nk-col .col-ch__head .nk-display{font-size:clamp(56px,min(8.2vw,15svh),200px)}
.nk-col .col-ch__meta{display:grid;gap:10px;justify-items:end;text-align:right;padding-bottom:.6em}
.nk-col .col-ch__meta p{margin:0;max-width:24ch;font-size:clamp(13px,.9vw,18px);font-weight:300;line-height:1.35;color:rgb(255 255 255 / 80%)}

.nk-col .col-grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);row-gap:clamp(70px,8vw,150px);margin-top:clamp(56px,6vw,110px)}
.nk-col .col-obj{position:relative;display:block;text-decoration:none;perspective:1200px}
.nk-col .col-obj__frame{position:relative;padding:9px;border:1px solid rgb(255 255 255 / 30%);transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transform-style:preserve-3d;transition:transform .6s var(--ease),border-color .3s}
.nk-col .col-obj__frame:after{content:"";position:absolute;right:0;top:0;width:clamp(8px,.8333vw,14px);aspect-ratio:1;transform:translate(100%,-100%);background:#fff;transition:background .3s}
.nk-col .col-obj:hover .col-obj__frame{border-color:#fff}
.nk-col .col-obj--link:hover .col-obj__frame:after{background:var(--signal)}
.nk-col .col-obj__img{position:relative;overflow:hidden;background:#151515;aspect-ratio:var(--ar,4 / 5)}
.nk-col .col-obj__img .nk-mask,.nk-col .col-obj__img .nk-mask__in,.nk-col .col-obj__par{position:absolute;inset:0}
.nk-col .col-obj__par img{width:100%;height:100%;object-fit:cover;object-position:var(--op,50% 35%);transition:transform 1.1s var(--ease),object-position 1.1s var(--ease)}
.nk-col .col-obj--cut .col-obj__img{background:radial-gradient(70% 60% at 50% 45%,#2a2a2a,#121212 75%)}
.nk-col .col-obj--cut .col-obj__par img{object-fit:contain;object-position:50% 100%;padding-top:6%}
.nk-col .col-obj:hover .col-obj__par img{transform:scale(1.07);object-position:var(--op2,50% 25%)}
.nk-col .col-obj .nk-brackets{inset:16px;opacity:0;transform:scale(1.06);transition:opacity .35s ease,transform .6s var(--ease)}
.nk-col .col-obj:hover .nk-brackets{opacity:1;transform:none}
.nk-col .col-obj__cap{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px 16px;align-items:baseline;margin-top:18px}
.nk-col .col-obj__name{margin:0;font-size:clamp(20px,1.9vw,40px);font-weight:700;line-height:.92;letter-spacing:-.05em;text-transform:none}
.nk-col .col-obj__meta{grid-column:1 / -1;display:flex;flex-wrap:wrap;gap:4px 14px;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--fog)}
.nk-col .col-obj__meta b{font-weight:400;color:#fff}
.nk-col .col-obj__status{grid-column:2;grid-row:1;justify-self:end;display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:600;letter-spacing:-.01em;text-transform:uppercase;white-space:nowrap}
.nk-col .col-obj__status svg{width:14px;height:14px;transition:transform .3s var(--ease)}
.nk-col .col-obj--link:hover .col-obj__status svg{transform:translate(3px,-3px)}
.nk-col .col-obj__status--test{font-weight:400;color:var(--fog)}
.nk-col .col-obj__status--test:before{content:"";width:6px;height:6px;border:1px solid var(--fog)}

/* outerwear editorial placements */
.nk-col .col-grid--outerwear .col-obj:nth-child(1){grid-column:1 / span 7;--ar:4 / 4.6}
.nk-col .col-grid--outerwear .col-obj:nth-child(2){grid-column:9 / span 4;margin-top:28svh;--ar:2 / 3}
.nk-col .col-grid--outerwear .col-obj:nth-child(3){grid-column:2 / span 5;--ar:2 / 3}
.nk-col .col-grid--outerwear .col-obj:nth-child(4){grid-column:8 / span 4;margin-top:-14svh;--ar:2 / 3}
.nk-col .col-grid--outerwear .col-obj:nth-child(n+5){grid-column:span 4}
/* base layers */
.nk-col .col-grid--base .col-obj:nth-child(1){grid-column:1 / span 5;--ar:2 / 3;--op:50% 40%}
.nk-col .col-grid--base .col-quote{grid-column:7 / span 6;align-self:center}
.nk-col .col-grid--base .col-obj:nth-child(3){grid-column:7 / span 4;--ar:4 / 5}
.nk-col .col-grid--base .col-obj:nth-child(n+4){grid-column:span 4}
.nk-col .col-quote .nk-lead{text-indent:20.5%}
/* equipment */
.nk-col .col-grid--equipment .col-obj:nth-child(1){grid-column:1 / span 6;--ar:1 / 1}
.nk-col .col-grid--equipment .col-obj:nth-child(2){grid-column:8 / span 3;margin-top:22svh;--ar:2 / 3}
.nk-col .col-grid--equipment .col-obj:nth-child(3){grid-column:4 / span 4;--ar:4 / 5}
.nk-col .col-grid--equipment .col-obj:nth-child(n+4){grid-column:span 4}

/* footwear horizontal track */
.nk-col .col-h{position:relative;margin-top:clamp(56px,6vw,110px)}
.nk-col .col-h__sticky{position:sticky;top:0;height:100vh;height:100svh;min-height:600px;overflow:hidden;display:flex;align-items:center}
.nk-col .col-h__track{display:flex;align-items:center;gap:clamp(24px,3vw,60px);padding:0 var(--inset);will-change:transform;transform:translate3d(var(--tx,0px),0,0)}
.nk-col .col-h__card{flex:none;width:min(34vw,46svh);--ar:4 / 5}
.nk-col .col-h__card--wide{width:min(48vw,74svh);--ar:5 / 4}
.nk-col .col-h__card .col-obj{--ar:inherit}
.nk-col .col-h__intro{flex:none;width:clamp(260px,24vw,440px);display:grid;gap:22px}
.nk-col .col-h__intro .nk-lead{text-indent:20.5%}
.nk-col .col-h__rail{position:absolute;left:var(--inset);right:var(--inset);bottom:var(--inset);height:1px;background:var(--rule)}
.nk-col .col-h__rail i{position:absolute;left:0;top:-1px;height:3px;width:calc(var(--hp,0) * 100%);background:#fff}
.nk-col .col-h__rail i:after{content:"";position:absolute;right:-5px;top:-4px;width:10px;height:10px;background:var(--signal)}
.nk-col .col-h__count{position:absolute;right:var(--inset);bottom:calc(var(--inset) + 16px)}

@supports (animation-timeline:view()){
.nk-col .col-obj__par{animation:col-par linear both;animation-timeline:view();animation-range:cover 0% cover 100%}
@keyframes col-par{from{transform:translate3d(0,-5%,0) scale(1.1)}to{transform:translate3d(0,5%,0) scale(1.1)}}
}

@media /*W*/(max-width:1023px){
.nk-col .col-gallery{width:38vw;right:var(--inset);opacity:.55}
.nk-col .col-index{left:var(--inset);top:auto;bottom:calc(var(--inset) + 30svh);width:min(62vw,360px)}
.nk-col .col-hero__intro{width:min(60vw,360px)}
.nk-col .col-hero__title .nk-display{font-size:clamp(64px,19vw,180px)}
.nk-col .col-ch__head{grid-template-columns:minmax(0,1fr)}
.nk-col .col-ch__meta{justify-items:start;text-align:left}
.nk-col .col-grid{grid-template-columns:repeat(6,minmax(0,1fr));row-gap:64px}
.nk-col .col-grid .col-obj:nth-child(n),.nk-col .col-grid .col-quote{grid-column:span 6!important;margin-top:0!important}
.nk-col .col-grid .col-obj:nth-child(even){grid-column:2 / span 5!important}
.nk-col .col-h{height:auto!important}
.nk-col .col-h__sticky{position:relative;height:auto;min-height:0;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding-bottom:40px}
.nk-col .col-h__sticky::-webkit-scrollbar{display:none}
.nk-col .col-h__track{transform:none!important}
.nk-col .col-h__card,.nk-col .col-h__card--wide{width:78vw;scroll-snap-align:start}
.nk-col .col-h__intro{width:70vw;scroll-snap-align:start}
.nk-col .col-h__rail,.nk-col .col-h__count{display:none}
}
@media /*W*/(max-width:599px){
.nk-col .col-gallery{display:none}
.nk-col .col-index{bottom:calc(var(--inset) + 24svh);width:calc(100% - var(--inset) * 2)}
.nk-col .col-obj__cap{grid-template-columns:minmax(0,1fr)}
.nk-col .col-obj__status{grid-column:1;grid-row:auto;justify-self:start}
}
@media(prefers-reduced-motion:reduce){
.nk-col .col-gallery__track{animation:none}
.nk-col .col-obj__par{animation:none}
}
.nk--canvas.nk-col .col-gallery__track{animation:none}
.nk--canvas.nk-col .col-obj__par{animation:none}
.nk--canvas.nk-col .col-h{height:auto!important}
.nk--canvas.nk-col .col-h__sticky{position:relative;overflow:hidden}
`

const Arrow = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
    >
        <path d="M5 19 19 5M7 5h12v12" />
    </svg>
)

function ProductObject({
    item,
    i,
    ci,
    onCanvas,
    sizes = "(max-width: 1023px) 90vw, 40vw",
}) {
    const ref = React.useRef(null)
    const isLink = !!item.href
    const Tag = isLink ? "a" : "div"
    const src = item.image || IMG_BY_ID[item.id] || NK_IMG.g1
    const cut = CUTOUT[item.id] && !item.image
    const onMove = (e) => {
        if (onCanvas || !ref.current || e.pointerType === "touch") return
        const r = ref.current.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        ref.current.style.setProperty("--ry", (x * 6).toFixed(2) + "deg")
        ref.current.style.setProperty("--rx", (-y * 5).toFixed(2) + "deg")
        ref.current.style.setProperty(
            "--op2",
            (50 + x * 16).toFixed(1) + "% " + (32 + y * 16).toFixed(1) + "%"
        )
    }
    const onLeave = () => {
        if (!ref.current) return
        ref.current.style.setProperty("--rx", "0deg")
        ref.current.style.setProperty("--ry", "0deg")
    }
    return (
        <Tag
            ref={ref}
            className={
                "col-obj nk-rv" +
                (isLink ? " col-obj--link" : "") +
                (cut ? " col-obj--cut" : "")
            }
            href={isLink ? item.href : undefined}
            onPointerMove={onMove}
            onPointerLeave={onLeave}
            aria-label={isLink ? item.name + " — explore" : undefined}
        >
            <div className="col-obj__frame">
                <div className="col-obj__img">
                    <div className="nk-mask">
                        <div className="nk-mask__in">
                            <div className="col-obj__par">
                                <img
                                    src={src}
                                    alt={item.name + " — " + item.label}
                                    loading="lazy"
                                    decoding="async"
                                    sizes={sizes}
                                    className="nk-mono"
                                />
                            </div>
                        </div>
                    </div>
                    <NK.Brackets />
                </div>
            </div>
            <div className="col-obj__cap">
                <h3 className="col-obj__name">{item.name}</h3>
                {isLink ? (
                    <span className="col-obj__status">
                        {item.status || "Explore"} <Arrow />
                    </span>
                ) : (
                    <span className="col-obj__status col-obj__status--test">
                        {item.status || "In testing"}
                    </span>
                )}
                <span className="col-obj__meta">
                    <b>
                        {String(ci + 1).padStart(2, "0")}.{i + 1}
                    </b>
                    <span>{item.label}</span>
                    <span>{item.tech}</span>
                </span>
            </div>
        </Tag>
    )
}

function Footwear({ items, ci, cat, onCanvas, reduced }) {
    const wrapRef = React.useRef(null)
    const trackRef = React.useRef(null)
    const [h, setH] = React.useState(null)
    React.useEffect(() => {
        if (onCanvas) return
        const measure = () => {
            const t = trackRef.current
            if (!t) return
            if (window.innerWidth < 1024) return setH(null)
            const travel = Math.max(0, t.scrollWidth - window.innerWidth)
            setH(travel + window.innerHeight)
        }
        measure()
        const t1 = setTimeout(measure, 600)
        window.addEventListener("resize", measure)
        return () => {
            clearTimeout(t1)
            window.removeEventListener("resize", measure)
        }
    }, [onCanvas, items.length])
    useScene(
        wrapRef,
        ({ el, pin }) => {
            const t = trackRef.current
            if (!t || window.innerWidth < 1024) return
            const travel = Math.max(0, t.scrollWidth - window.innerWidth)
            el.style.setProperty("--tx", (-pin * travel).toFixed(1) + "px")
            el.style.setProperty("--hp", pin.toFixed(4))
            const c = el.querySelector(".col-h__count b")
            if (c)
                c.textContent = String(
                    Math.min(
                        items.length,
                        1 + Math.floor(pin * items.length * 0.999)
                    )
                ).padStart(2, "0")
        },
        !onCanvas && !reduced
    )
    return (
        <div
            ref={wrapRef}
            className="col-h"
            style={h ? { height: h + "px" } : undefined}
        >
            <div className="col-h__sticky">
                <div ref={trackRef} className="col-h__track">
                    <div className="col-h__intro">
                        <span className="nk-label">
                            <b>Horizontal test track</b> — wet rock, ice, mud
                        </span>
                        <p className="nk-lead">{cat.line}</p>
                    </div>
                    {items.map((it, i) => (
                        <div
                            key={it.id + i}
                            className={
                                "col-h__card" +
                                (i === 0 ? " col-h__card--wide" : "")
                            }
                        >
                            <ProductObject
                                item={{ ...it }}
                                i={i}
                                ci={ci}
                                onCanvas={onCanvas}
                                sizes="(max-width: 1023px) 80vw, 46vw"
                            />
                        </div>
                    ))}
                </div>
                <div className="col-h__rail" aria-hidden="true">
                    <i />
                </div>
                <span className="col-h__count nk-label" aria-hidden="true">
                    <b>01</b> / {String(items.length).padStart(2, "0")}
                </span>
            </div>
        </div>
    )
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 9000
 */
export default function NKCollection(props) {
    const p = nkProps(props, D, ["copy"])
    const { onCanvas, reduced } = useNKEnv()
    const items = (props.items && props.items.length ? props.items : ITEMS).map(
        (it, i) => ({
            ...(ITEMS.find((d) => d.id === it.id) || {}),
            ...it,
            id: it.id || "obj" + i,
        })
    )
    const byCat = CATS.map((c) => ({
        ...c,
        items: items.filter((it) => (it.category || "Outerwear") === c.key),
    }))
    const gal = [
        p.gallery1 || NK_IMG.g1,
        p.gallery2 || NK_IMG.g2,
        p.gallery3 || NK_IMG.g3,
    ]
    const scrollTo = (e, id) => {
        const el = document.getElementById(id)
        if (!el) return
        e.preventDefault()
        el.scrollIntoView({
            behavior: reduced ? "auto" : "smooth",
            block: "start",
        })
    }
    return (
        <NK.Shell
            page="collection"
            logo={p.logo}
            legal={p.legal}
            css={COL_CSS}
            className="nk-col"
        >
            <section className="col-hero" aria-label="Collection">
                <div className="col-gallery" aria-hidden="true">
                    <div className="col-gallery__track">
                        {[...gal, ...gal].map((g, i) => (
                            <img
                                key={i}
                                src={g}
                                alt=""
                                className="nk-mono"
                                loading={i < 3 ? "eager" : "lazy"}
                                decoding="async"
                            />
                        ))}
                    </div>
                </div>
                <div className="col-hero__intro">
                    <span className="nk-label nk-rv">
                        <b>02</b> — {p.season}
                    </span>
                    <p className="nk-lead nk-rv" style={{ "--d": 1 }}>
                        {p.lead}
                    </p>
                    <span className="nk-label nk-rv" style={{ "--d": 2 }}>
                        {p.note}
                    </span>
                </div>
                <ol
                    className="col-index nk-rv"
                    style={{ "--d": 2 }}
                    aria-label="Categories"
                >
                    {byCat.map((c, i) => (
                        <li key={c.key}>
                            <a
                                href={"#nk-cat-" + i}
                                onClick={(e) => scrollTo(e, "nk-cat-" + i)}
                                data-nk-instant=""
                            >
                                <span className="col-index__i">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span>{c.key}</span>
                                <span className="col-index__n">
                                    {String(c.items.length).padStart(2, "0")}
                                </span>
                            </a>
                        </li>
                    ))}
                </ol>
                <div className="col-hero__title nk-blend">
                    <NK.Lines
                        as="h1"
                        className="nk-display nk-display--lower"
                        lines={[p.title]}
                    />
                </div>
            </section>

            {byCat.map((c, ci) =>
                c.items.length ? (
                    <section
                        key={c.key}
                        id={"nk-cat-" + ci}
                        className="col-ch"
                        aria-label={c.key}
                    >
                        <header className="col-ch__head">
                            <span className="col-ch__i nk-num nk-rv">
                                {String(ci + 1).padStart(2, "0")}
                            </span>
                            <NK.Lines
                                as="h2"
                                className="nk-display"
                                lines={[c.key]}
                            />
                            <div
                                className="col-ch__meta nk-rv"
                                style={{ "--d": 1 }}
                            >
                                <span className="nk-label">
                                    <b>
                                        {String(c.items.length).padStart(
                                            2,
                                            "0"
                                        )}
                                    </b>{" "}
                                    objects
                                </span>
                                {c.key !== "Footwear" ? <p>{c.line}</p> : null}
                            </div>
                        </header>
                        {c.key === "Footwear" ? (
                            <Footwear
                                items={c.items}
                                ci={ci}
                                cat={c}
                                onCanvas={onCanvas}
                                reduced={reduced}
                            />
                        ) : c.key === "Base layers" ? (
                            <div className="col-grid col-grid--base">
                                {c.items.slice(0, 1).map((it, i) => (
                                    <ProductObject
                                        key={it.id}
                                        item={it}
                                        i={i}
                                        ci={ci}
                                        onCanvas={onCanvas}
                                    />
                                ))}
                                <div className="col-quote nk-rv">
                                    <span
                                        className="nk-label"
                                        style={{ marginBottom: 16 }}
                                    >
                                        <b>Layer 00</b> — next to skin
                                    </span>
                                    <p className="nk-lead">{p.baseQuote}</p>
                                </div>
                                {c.items.slice(1).map((it, i) => (
                                    <ProductObject
                                        key={it.id}
                                        item={it}
                                        i={i + 1}
                                        ci={ci}
                                        onCanvas={onCanvas}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div
                                className={
                                    "col-grid col-grid--" +
                                    (c.key === "Outerwear"
                                        ? "outerwear"
                                        : "equipment")
                                }
                            >
                                {c.items.map((it, i) => (
                                    <ProductObject
                                        key={it.id}
                                        item={it}
                                        i={i}
                                        ci={ci}
                                        onCanvas={onCanvas}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                ) : null
            )}
        </NK.Shell>
    )
}

D.baseQuote =
    "Warmth is managed, not trapped. Moisture leaves before it can cool you down."

addPropertyControls(NKCollection, {
    logo: { type: ControlType.Image, title: "Logo (Swoosh)" },
    copy: {
        type: ControlType.Object,
        title: "Intro copy",
        controls: {
            title: {
                type: ControlType.String,
                title: "Title",
                defaultValue: D.title,
            },
            season: {
                type: ControlType.String,
                title: "Season",
                defaultValue: D.season,
            },
            lead: {
                type: ControlType.String,
                title: "Lead",
                defaultValue: D.lead,
                displayTextArea: true,
            },
            note: {
                type: ControlType.String,
                title: "Note",
                defaultValue: D.note,
            },
            baseQuote: {
                type: ControlType.String,
                title: "Base layers quote",
                defaultValue: D.baseQuote,
                displayTextArea: true,
            },
        },
    },
    gallery1: { type: ControlType.Image, title: "Intro gallery 1" },
    gallery2: { type: ControlType.Image, title: "Intro gallery 2" },
    gallery3: { type: ControlType.Image, title: "Intro gallery 3" },
    items: {
        type: ControlType.Array,
        title: "Objects",
        control: {
            type: ControlType.Object,
            controls: {
                id: { type: ControlType.String, title: "ID" },
                category: {
                    type: ControlType.Enum,
                    title: "Category",
                    options: CATS.map((c) => c.key),
                    defaultValue: "Outerwear",
                },
                name: { type: ControlType.String, title: "Name" },
                label: { type: ControlType.String, title: "Label" },
                tech: { type: ControlType.String, title: "Tech line" },
                status: { type: ControlType.String, title: "Status" },
                href: { type: ControlType.String, title: "Link (optional)" },
                image: { type: ControlType.Image, title: "Image" },
            },
        },
        defaultValue: ITEMS.map(
            ({ id, category, name, label, tech, status, href }) => ({
                id,
                category,
                name,
                label,
                tech,
                status,
                href: href || "",
            })
        ),
    },
    legal: {
        type: ControlType.String,
        title: "Footer legal line",
        defaultValue:
            "Concept project. Not affiliated with, endorsed or sponsored by Nike, Inc.",
        displayTextArea: true,
    },
})
