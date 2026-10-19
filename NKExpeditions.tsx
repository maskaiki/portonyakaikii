// @ts-nocheck
/*
 * NKExpeditions — /expeditions. The most cinematic page: field validation.
 * 01 Hero: fullscreen storm, driving-snow layer, "TESTED / BEYOND / COMFORT."
 * 02 Chapters: 01 Iceland · 02 Alps · 03 Patagonia · 04 Arctic. Sticky fullscreen panels;
 *    each new environment is unveiled by a moving edge (its image stays fixed while the
 *    panel slides in) with a signal line on the front. Data is part of the composition.
 *    Each environment has its own animated weather layer (rain / snow / wind).
 * 03 Field report: the four tests as one lab table.
 * Coordinates are the photographed locations; conditions are illustrative.
 */
import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import {
    NK,
    NK_IMG,
    useNKEnv,
    useScene,
    nkProps,
    nkClamp,
} from "./NKSystem.tsx"

const CHAPTERS = [
    {
        k: "iceland",
        name: "Iceland",
        place: "Reynisfjara · South coast",
        lat: "63°24′N",
        lon: "19°03′W",
        temp: "−9",
        wind: "82",
        alt: "0",
        days: "06",
        wx: "rain",
        note: "Horizontal rain off the North Atlantic. The hood stayed sealed.",
    },
    {
        k: "alps",
        name: "Alps",
        place: "Aiguille du Midi · Mont Blanc massif",
        lat: "45°52′N",
        lon: "6°53′E",
        temp: "−24",
        wind: "64",
        alt: "3,842",
        days: "04",
        wx: "snow",
        note: "Knife-edge ridge at −24°C. Cuffs sealed over gloves all day.",
    },
    {
        k: "patagonia",
        name: "Patagonia",
        place: "Torres del Paine · Chile",
        lat: "50°54′S",
        lon: "72°57′W",
        temp: "−6",
        wind: "120",
        alt: "2,460",
        days: "09",
        wx: "wind",
        note: "Gusts to 120 km/h. Zero seam failures.",
    },
    {
        k: "arctic",
        name: "Arctic",
        place: "Hansbreen · Svalbard",
        lat: "77°04′N",
        lon: "15°38′E",
        temp: "−32",
        wind: "54",
        alt: "380",
        days: "12",
        wx: "snow",
        note: "Polar night. Vents open, no frost inside the shell.",
    },
]

const D = {
    line1: "TESTED",
    line2: "BEYOND",
    line3: "COMFORT.",
    heroLabel: "Field tests · FW26",
    heroCopy:
        "Four environments. One question: how does an athlete move when the weather stops cooperating?",
    product: "Shadow Falcon 750",
    reportTitle: "Field report",
    reportNote:
        "Coordinates: photographed test locations. Conditions illustrative.",
}

const EX_CSS = `
.nk-ex .ex-hero{position:relative;height:120vh;height:120svh;min-height:760px}
.nk-ex .ex-hero__sticky{position:sticky;top:0;height:100vh;height:100svh;min-height:640px;overflow:hidden}
.nk-ex .ex-hero__media{position:absolute;inset:-4%;transform:scale(calc(1.12 - var(--p,0) * .12)) translate3d(0,calc(var(--p,0) * 3%),0)}
.nk-ex .ex-hero__media img,.nk-ex .ex-hero__media video{width:100%;height:100%;object-fit:cover}
.nk-ex .ex-shade{position:absolute;inset:0;background:linear-gradient(to bottom,rgb(13 13 13 / 55%),rgb(13 13 13 / 0%) 30%,rgb(13 13 13 / 10%) 60%,rgb(13 13 13 / 88%))}
.nk-ex .ex-hero__type{position:absolute;z-index:3;left:var(--inset);bottom:calc(var(--inset) + 1svh)}
.nk-ex .ex-hero__type .nk-display{font-size:clamp(76px,min(12.6vw,22svh),300px)}
.nk-ex .ex-hero__type .nk-lines>span:nth-child(2){margin-left:1.05em}
.nk-ex .ex-hero__copy{position:absolute;z-index:3;right:var(--inset);bottom:calc(var(--inset) + 1svh);width:clamp(260px,23vw,460px);display:grid;gap:16px}
.nk-ex .ex-hero__copy .nk-body{text-indent:30%}
.nk-ex .ex-sum{position:absolute;z-index:3;right:var(--inset);top:calc(var(--inset) + clamp(80px,9svh,120px));display:grid;grid-template-columns:repeat(4,auto);gap:0;border-top:1px solid var(--rule)}
.nk-ex .ex-sum div{padding:12px 0 0 clamp(18px,2vw,40px);text-align:right}
.nk-ex .ex-sum .nk-num{display:block;margin-top:8px;font-size:clamp(30px,2.6vw,60px)}
.nk-ex .ex-sum small{font-size:.42em;font-weight:300;letter-spacing:-.02em;margin-left:.15em}
.nk-ex .ex-hero__label{position:absolute;z-index:3;left:var(--inset);top:calc(var(--inset) + clamp(80px,9svh,120px))}

/* weather layers */
.nk-ex .ex-wx{position:absolute;inset:-20%;pointer-events:none;opacity:.5;will-change:transform}
.nk-ex .ex-wx--snow{background:radial-gradient(circle,rgb(255 255 255 / 85%) 0 1.2px,transparent 1.6px) 0 0/90px 90px,radial-gradient(circle,rgb(255 255 255 / 55%) 0 .8px,transparent 1.2px) 30px 45px/60px 60px;animation:ex-snow 2.6s linear infinite}
.nk-ex .ex-wx--snow.ex-wx--b{opacity:.32;background-size:150px 150px,110px 110px;animation-duration:4.4s}
@keyframes ex-snow{to{transform:translate3d(-90px,90px,0)}}
.nk-ex .ex-wx--rain{background:repeating-linear-gradient(105deg,transparent 0 22px,rgb(255 255 255 / 22%) 22px 23px,transparent 23px 61px);background-size:200px 300px;animation:ex-rain .55s linear infinite;opacity:.45}
.nk-ex .ex-wx--rain.ex-wx--b{opacity:.25;background-size:260px 420px;animation-duration:.8s}
@keyframes ex-rain{to{transform:translate3d(-80px,300px,0)}}
.nk-ex .ex-wx--wind{background:repeating-linear-gradient(176deg,transparent 0 40px,rgb(255 255 255 / 16%) 40px 41px,transparent 41px 97px);background-size:600px 200px;animation:ex-wind .9s linear infinite;opacity:.5}
.nk-ex .ex-wx--wind.ex-wx--b{opacity:.28;background-size:900px 260px;animation-duration:1.5s}
@keyframes ex-wind{to{transform:translate3d(-600px,40px,0)}}

/* chapters */
.nk-ex .ex-chs{position:relative}
.nk-ex .ex-ch{position:sticky;top:0;height:100vh;height:100svh;min-height:640px;overflow:hidden;margin-bottom:70svh;background:#0d0d0d}
.nk-ex .ex-ch:last-child{margin-bottom:0}
.nk-ex .ex-ch:before{content:"";position:absolute;z-index:6;top:0;left:0;right:0;height:2px;background:var(--signal);opacity:var(--edge,0);box-shadow:0 0 22px 2px rgb(255 51 0 / 50%)}
.nk-ex .ex-ch__media{position:absolute;inset:0;transform:translate3d(0,calc(var(--t,0px) * -1),0)}
.nk-ex .ex-ch__media img{width:100%;height:100%;object-fit:cover;animation:ex-kb 24s ease-in-out infinite alternate}
@keyframes ex-kb{from{transform:scale(1.08)}to{transform:scale(1)}}
.nk-ex .ex-ch__cover{position:absolute;z-index:5;inset:0;background:#0d0d0d;opacity:var(--cover,0);pointer-events:none}
.nk-ex .ex-ch__hud{position:absolute;z-index:3;inset:0;transform:translate3d(0,calc(var(--t,0px) * -.35),0)}
.nk-ex .ex-ch__i{position:absolute;left:var(--inset);top:calc(var(--inset) + clamp(80px,9svh,120px));font-size:clamp(70px,8vw,190px)}
.nk-ex .ex-ch__coords{position:absolute;left:calc(var(--inset) + clamp(150px,13vw,300px));top:calc(var(--inset) + clamp(84px,9.4svh,126px));display:grid;gap:6px}
.nk-ex .ex-ch__coords .nk-num{font-size:clamp(28px,2.6vw,62px)}
.nk-ex .ex-ch__name{position:absolute;left:var(--inset);bottom:calc(var(--inset) + 1svh)}
.nk-ex .ex-ch__name .nk-display{font-size:clamp(76px,min(13.4vw,24svh),330px)}
.nk-ex .ex-ch__name .nk-label{margin-bottom:12px}
.nk-ex .ex-ch__data{position:absolute;right:var(--inset);top:calc(var(--inset) + clamp(80px,9svh,120px));display:flex;flex-direction:column;align-items:flex-end;gap:12px;text-align:right}
.nk-ex .ex-ch__data .nk-pill{font-size:clamp(40px,min(3.8vw,6.6svh),96px)}
.nk-ex .ex-ch__data p{margin:0;font-size:clamp(12px,.9vw,20px);font-weight:300;line-height:1.15;letter-spacing:-.04em;text-transform:uppercase}
.nk-ex .ex-ch__grid{position:absolute;right:var(--inset);bottom:calc(var(--inset) + 1svh);display:grid;grid-template-columns:repeat(3,auto);gap:0;border-top:1px solid var(--rule)}
.nk-ex .ex-ch__grid div{padding:12px 0 0 clamp(20px,2.2vw,44px);text-align:right}
.nk-ex .ex-ch__grid .nk-num{display:block;margin-top:8px;font-size:clamp(34px,3.2vw,76px)}
.nk-ex .ex-ch__grid small{font-size:.38em;font-weight:300;margin-left:.15em;letter-spacing:-.01em}
.nk-ex .ex-ch__note{position:absolute;right:var(--inset);bottom:calc(var(--inset) + clamp(120px,13svh,170px));width:clamp(260px,24vw,460px)}
.nk-ex .ex-ch__note .nk-lead{font-size:clamp(18px,1.6vw,34px);text-indent:20.5%}
.nk-ex .ex-ch__wind{position:absolute;left:56%;top:46%;width:clamp(120px,12vw,240px);height:clamp(60px,8svh,120px);pointer-events:none}
.nk-ex .ex-ch__wind svg{width:100%;height:100%;overflow:visible}
.nk-ex .ex-ch__wind path{fill:none;stroke:#fff;stroke-width:1.5;vector-effect:non-scaling-stroke}
.nk-ex .ex-ch__wind i{position:absolute;left:0;bottom:0;width:10px;height:10px;transform:translate(-50%,50%);background:#fff}
.nk-ex .ex-ch__wind span{position:absolute;right:0;top:-18px;font-size:10px;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap}
.nk-ex .ex-rail{position:absolute;z-index:4;left:50%;top:calc(var(--inset) + clamp(80px,9svh,120px));transform:translateX(-50%);display:flex;gap:6px;margin:0;padding:0;list-style:none}
.nk-ex .ex-rail li{display:grid;gap:8px;width:clamp(56px,5vw,92px);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--fog)}
.nk-ex .ex-rail li:before{content:"";height:2px;background:rgb(255 255 255 / 30%)}
.nk-ex .ex-rail li.is-on{color:#fff}
.nk-ex .ex-rail li.is-on:before{background:var(--signal)}
.nk-ex .ex-rail li.is-done:before{background:#fff}

/* report */
.nk-ex .ex-rep{padding:clamp(120px,13vw,240px) var(--inset) 0}
.nk-ex .ex-rep__head{display:flex;justify-content:space-between;align-items:end;gap:var(--gap);margin-bottom:clamp(30px,3vw,60px)}
.nk-ex .ex-rep__head .nk-display{font-size:clamp(56px,min(7.4vw,13svh),180px)}
.nk-ex .ex-table{width:100%;border-collapse:collapse;text-align:left;font-variant-numeric:tabular-nums}
.nk-ex .ex-table th{padding:0 0 14px;font-size:10px;font-weight:400;letter-spacing:.08em;text-transform:uppercase;color:var(--fog)}
.nk-ex .ex-table td{padding:clamp(14px,1.4vw,26px) 0;border-top:1px solid var(--rule);font-size:clamp(13px,.95vw,20px);font-weight:300;vertical-align:baseline;white-space:nowrap}
.nk-ex .ex-table tr:last-child td{border-bottom:1px solid var(--rule)}
.nk-ex .ex-table td:first-child{width:6%;color:var(--fog)}
.nk-ex .ex-table td.ex-loc strong{display:block;font-size:clamp(20px,1.9vw,40px);font-weight:700;letter-spacing:-.04em;text-transform:uppercase}
.nk-ex .ex-table td.ex-loc span{font-size:11px;letter-spacing:.06em;color:var(--fog)}
.nk-ex .ex-table .nk-num{font-size:clamp(22px,1.9vw,42px)}
.nk-ex .ex-pass{display:inline-flex;align-items:center;gap:8px;font-weight:600;text-transform:uppercase;font-size:12px;letter-spacing:.04em}
.nk-ex .ex-pass:before{content:"";width:8px;height:8px;background:#fff}
.nk-ex .ex-table tr{transition:background .3s}
.nk-ex .ex-table tbody tr:hover{background:rgb(255 255 255 / 4%)}
.nk-ex .ex-table tbody tr:hover .ex-pass:before{background:var(--signal)}

@media /*W*/(max-width:1023px){
.nk-ex .ex-sum{grid-template-columns:repeat(2,auto)}
.nk-ex .ex-hero__copy{display:none}
.nk-ex .ex-hero__type .nk-display{font-size:clamp(60px,17vw,150px)}
.nk-ex .ex-ch__coords{left:var(--inset);top:calc(var(--inset) + clamp(80px,9svh,120px) + clamp(70px,8vw,190px) + 16px)}
.nk-ex .ex-ch__name .nk-display{font-size:clamp(44px,14vw,160px)}
.nk-ex .ex-ch__note{display:none}
.nk-ex .ex-ch__wind{display:none}
.nk-ex .ex-ch__grid{left:var(--inset);right:var(--inset);bottom:calc(var(--inset) + clamp(100px,22vw,190px));grid-template-columns:repeat(3,minmax(0,1fr))}
.nk-ex .ex-ch__grid div{padding-left:0;text-align:left}
.nk-ex .ex-rail{left:auto;right:var(--inset);top:auto;bottom:calc(var(--inset) + clamp(100px,22vw,190px) + 96px);transform:none}
.nk-ex .ex-rail li{width:36px;font-size:0}
.nk-ex .ex-table thead{display:none}
.nk-ex .ex-table,.nk-ex .ex-table tbody,.nk-ex .ex-table tr,.nk-ex .ex-table td{display:block;width:100%!important}
.nk-ex .ex-table tr{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));padding:16px 0;border-top:1px solid var(--rule)}
.nk-ex .ex-table td{border:0!important;padding:4px 0}
.nk-ex .ex-table td:first-child,.nk-ex .ex-table td.ex-loc{grid-column:1 / -1}
}
@media /*W*/(max-width:599px){
.nk-ex .ex-sum{display:none}
.nk-ex .ex-ch__data{top:auto;bottom:calc(var(--inset) + clamp(100px,22vw,190px) + 150px)}
.nk-ex .ex-ch__data p{display:none}
.nk-ex .ex-ch{margin-bottom:40svh}
}
@media(prefers-reduced-motion:reduce){
.nk-ex .ex-wx,.nk-ex .ex-ch__media img{animation:none}
.nk-ex .ex-wx{display:none}
}
.nk--canvas.nk-ex .ex-hero{height:auto}
.nk--canvas.nk-ex .ex-hero__sticky{position:relative}
.nk--canvas.nk-ex .ex-ch{position:relative;margin-bottom:0}
.nk--canvas.nk-ex .ex-wx,.nk--canvas.nk-ex .ex-ch__media img{animation:none}
`

function Chapter({ c, i, n, img, product, onCanvas }) {
    return (
        <article
            className="ex-ch"
            data-i={i}
            aria-label={String(i + 1).padStart(2, "0") + " " + c.name}
        >
            <div className="ex-ch__media" aria-hidden="true">
                <img
                    src={img}
                    alt=""
                    className="nk-mono"
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    sizes="100vw"
                />
            </div>
            <div className="ex-shade" aria-hidden="true" />
            {!onCanvas ? (
                <>
                    <div
                        className={"ex-wx ex-wx--" + c.wx}
                        aria-hidden="true"
                    />
                    <div
                        className={"ex-wx ex-wx--" + c.wx + " ex-wx--b"}
                        aria-hidden="true"
                    />
                </>
            ) : null}
            <div className="ex-ch__hud">
                <span className="ex-ch__i nk-num">
                    {String(i + 1).padStart(2, "0")}
                </span>
                <div className="ex-ch__coords">
                    <span className="nk-label">Coordinates</span>
                    <span className="nk-num">{c.lat}</span>
                    <span className="nk-num">{c.lon}</span>
                </div>
                <ol className="ex-rail" aria-hidden="true">
                    {Array.from({ length: n }).map((_, j) => (
                        <li
                            key={j}
                            className={
                                j === i ? "is-on" : j < i ? "is-done" : ""
                            }
                        >
                            {String(j + 1).padStart(2, "0")}
                        </li>
                    ))}
                </ol>
                <div className="ex-ch__data">
                    <span className="nk-pill">
                        {c.temp}
                        <span style={{ fontSize: ".6em" }}>°C</span>
                    </span>
                    <p>
                        Air
                        <br />
                        temperature
                    </p>
                </div>
                <div className="ex-ch__wind" aria-hidden="true">
                    <svg viewBox="0 0 200 100" preserveAspectRatio="none">
                        <path d="M0 100 200 0" />
                    </svg>
                    <i />
                    <span>Gust · {c.wind} km/h</span>
                </div>
                <div className="ex-ch__note">
                    <p className="nk-lead">{c.note}</p>
                </div>
                <div className="ex-ch__grid">
                    <div>
                        <span className="nk-label">Wind</span>
                        <span className="nk-num">
                            {c.wind}
                            <small>km/h</small>
                        </span>
                    </div>
                    <div>
                        <span className="nk-label">Altitude</span>
                        <span className="nk-num">
                            {c.alt}
                            <small>m</small>
                        </span>
                    </div>
                    <div>
                        <span className="nk-label">Test days</span>
                        <span className="nk-num">{c.days}</span>
                    </div>
                </div>
                <div className="ex-ch__name">
                    <span className="nk-label">
                        <b>{c.place}</b> · {product}
                    </span>
                    <h2 className="nk-display nk-blend">{c.name}</h2>
                </div>
            </div>
            <div className="ex-ch__cover" aria-hidden="true" />
        </article>
    )
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 9800
 */
export default function NKExpeditions(props) {
    const p = nkProps(props, D, ["copy"])
    const { onCanvas, reduced } = useNKEnv()
    const heroRef = React.useRef(null)
    const chRef = React.useRef(null)
    const imgs = [
        p.iceland || NK_IMG.iceland,
        p.alps || NK_IMG.alps,
        p.patagonia || NK_IMG.patagonia,
        p.arctic || NK_IMG.arctic,
    ]
    const chapters = CHAPTERS.map((c, i) => ({
        ...c,
        note: p["n" + (i + 1)] || c.note,
    }))
    const nums = (k) =>
        chapters.map((c) =>
            Number(
                String(c[k])
                    .replace(/[^0-9.−-]/g, "")
                    .replace("−", "-")
            )
        )
    const maxAlt = Math.max(...nums("alt"))
    const minTemp = Math.min(...nums("temp"))
    const maxWind = Math.max(...nums("wind"))
    const days = nums("days").reduce((a, b) => a + b, 0)

    useScene(
        heroRef,
        ({ el, pin }) => el.style.setProperty("--p", pin.toFixed(4)),
        !onCanvas && !reduced
    )
    useScene(
        chRef,
        ({ el, vh }) => {
            const panels = el.querySelectorAll(".ex-ch")
            panels.forEach((pn, i) => {
                const top = pn.getBoundingClientRect().top
                const t = Math.max(0, top)
                const sliding = top > 0.5 && top < vh
                pn.style.setProperty(
                    "--t",
                    sliding ? t.toFixed(1) + "px" : "0px"
                )
                pn.style.setProperty("--edge", sliding ? "1" : "0")
                const next = panels[i + 1]
                if (next) {
                    const nt = next.getBoundingClientRect().top
                    pn.style.setProperty(
                        "--cover",
                        (nkClamp(1 - nt / vh) * 0.65).toFixed(3)
                    )
                }
            })
        },
        !onCanvas && !reduced
    )

    return (
        <NK.Shell
            page="expeditions"
            logo={p.logo}
            legal={p.legal}
            css={EX_CSS}
            className="nk-ex"
        >
            {/* 01 HERO */}
            <section
                ref={heroRef}
                className="ex-hero"
                aria-label="Tested beyond comfort"
            >
                <div className="ex-hero__sticky">
                    <div className="ex-hero__media" aria-hidden="true">
                        {p.heroVideo ? (
                            <video
                                src={p.heroVideo}
                                autoPlay
                                muted
                                loop
                                playsInline
                                poster={p.heroImage || NK_IMG.expHero}
                                className="nk-mono"
                            />
                        ) : (
                            <img
                                src={p.heroImage || NK_IMG.expHero}
                                alt=""
                                className="nk-mono"
                                fetchpriority="high"
                                decoding="async"
                                sizes="100vw"
                            />
                        )}
                    </div>
                    {!onCanvas ? (
                        <>
                            <div
                                className="ex-wx ex-wx--snow"
                                aria-hidden="true"
                            />
                            <div
                                className="ex-wx ex-wx--snow ex-wx--b"
                                aria-hidden="true"
                            />
                        </>
                    ) : null}
                    <div className="ex-shade" aria-hidden="true" />
                    <span className="ex-hero__label nk-label nk-rv">
                        <b>04</b> — {p.heroLabel}
                    </span>
                    <div className="ex-sum nk-rv" style={{ "--d": 1 }}>
                        <div>
                            <span className="nk-label">Expeditions</span>
                            <span className="nk-num">0{chapters.length}</span>
                        </div>
                        <div>
                            <span className="nk-label">Max altitude</span>
                            <span className="nk-num">
                                {maxAlt.toLocaleString("en-US")}
                                <small>m</small>
                            </span>
                        </div>
                        <div>
                            <span className="nk-label">Min temp</span>
                            <span className="nk-num">
                                {String(minTemp).replace("-", "−")}
                                <small>°C</small>
                            </span>
                        </div>
                        <div>
                            <span className="nk-label">Max wind</span>
                            <span className="nk-num">
                                {maxWind}
                                <small>km/h</small>
                            </span>
                        </div>
                    </div>
                    <div className="ex-hero__type nk-blend">
                        <NK.Lines
                            as="h1"
                            className="nk-display"
                            lines={[p.line1, p.line2, p.line3]}
                        />
                    </div>
                    <div className="ex-hero__copy nk-rv" style={{ "--d": 2 }}>
                        <p className="nk-body">{p.heroCopy}</p>
                        <span className="nk-label">
                            <b>{days}</b> test days · {p.product}
                        </span>
                    </div>
                </div>
            </section>

            {/* 02 CHAPTERS */}
            <section ref={chRef} className="ex-chs" aria-label="Expeditions">
                {chapters.map((c, i) => (
                    <Chapter
                        key={c.k}
                        c={c}
                        i={i}
                        n={chapters.length}
                        img={imgs[i]}
                        product={p.product}
                        onCanvas={onCanvas}
                    />
                ))}
            </section>

            {/* 03 FIELD REPORT */}
            <section className="ex-rep" aria-label="Field report">
                <header className="ex-rep__head">
                    <NK.Lines
                        as="h2"
                        className="nk-display"
                        lines={[p.reportTitle]}
                    />
                    <span className="nk-label nk-rv">{p.reportNote}</span>
                </header>
                <table className="ex-table nk-rv">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Location</th>
                            <th>Coordinates</th>
                            <th>Air temp</th>
                            <th>Wind</th>
                            <th>Altitude</th>
                            <th>Days</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chapters.map((c, i) => (
                            <tr key={c.k}>
                                <td>{String(i + 1).padStart(2, "0")}</td>
                                <td className="ex-loc">
                                    <strong>{c.name}</strong>
                                    <span>{c.place}</span>
                                </td>
                                <td>
                                    {c.lat} {c.lon}
                                </td>
                                <td>
                                    <span className="nk-num">{c.temp}</span>°C
                                </td>
                                <td>
                                    <span className="nk-num">{c.wind}</span>{" "}
                                    km/h
                                </td>
                                <td>
                                    <span className="nk-num">{c.alt}</span> m
                                </td>
                                <td>
                                    <span className="nk-num">{c.days}</span>
                                </td>
                                <td>
                                    <span className="ex-pass">Pass</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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

addPropertyControls(NKExpeditions, {
    logo: I("Logo (Swoosh)"),
    heroImage: I("Hero image"),
    heroVideo: {
        type: ControlType.File,
        title: "Hero video (optional)",
        allowedFileTypes: ["mp4", "webm"],
    },
    copy: {
        type: ControlType.Object,
        title: "Copy",
        controls: {
            line1: S("Line 1", D.line1),
            line2: S("Line 2", D.line2),
            line3: S("Line 3", D.line3),
            heroLabel: S("Label", D.heroLabel),
            heroCopy: S("Hero copy", D.heroCopy, true),
            product: S("Product tested", D.product),
            n1: S("01 field note", CHAPTERS[0].note, true),
            n2: S("02 field note", CHAPTERS[1].note, true),
            n3: S("03 field note", CHAPTERS[2].note, true),
            n4: S("04 field note", CHAPTERS[3].note, true),
            reportTitle: S("Report title", D.reportTitle),
            reportNote: S("Report note", D.reportNote, true),
        },
    },
    iceland: I("01 Iceland image"),
    alps: I("02 Alps image"),
    patagonia: I("03 Patagonia image"),
    arctic: I("04 Arctic image"),
    legal: S(
        "Footer legal line",
        "Concept project. Not affiliated with, endorsed or sponsored by Nike, Inc.",
        true
    ),
})
