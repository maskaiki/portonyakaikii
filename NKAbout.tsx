// @ts-nocheck
/*
 * NKAbout — /about. Typography-led brand philosophy.
 * 01 "We don't design for perfect conditions." pinned; outline → solid fill sweeps line by line.
 * 02 "We design for what comes next." lines travel in horizontally; "NEXT." is the only signal word.
 * 03 Manifesto (two short paragraphs), 04 three principles, 05 outline marquee.
 */
import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { NK, useNKEnv, useScene, nkProps, nkClamp } from "./NKSystem.tsx"

const D = {
    s1: "We don’t\ndesign for\nperfect\nconditions.",
    s2: "We design\nfor what\ncomes next.",
    accent: "next.",
    lead: "NIKE STORM LAB explores the intersection of movement, material science and extreme environments.",
    body: "Products are tested beyond everyday conditions to understand how athletes move when weather becomes unpredictable.",
    p1t: "Movement",
    p1d: "The athlete is the brief.",
    p2t: "Material",
    p2d: "Engineered at the micro level.",
    p3t: "Weather",
    p3d: "The test, not the obstacle.",
    marquee: "Nike Storm Lab",
}

const AB_CSS = `
.nk-ab .ab-s1{position:relative;height:260vh;height:260svh}
.nk-ab .ab-s1__sticky{position:sticky;top:0;height:100vh;height:100svh;min-height:620px;display:flex;flex-direction:column;justify-content:flex-end;padding:var(--inset);overflow:hidden}
.nk-ab .ab-big{position:relative;margin:0;font-size:clamp(60px,min(12.4vw,21svh),300px);font-weight:700;line-height:.84;letter-spacing:-.055em;text-transform:uppercase}
.nk-ab .ab-big__line{position:relative;display:block;white-space:nowrap}
.nk-ab .ab-big__ghost{display:block;color:transparent;-webkit-text-stroke:1px rgb(255 255 255 / 42%)}
.nk-ab .ab-big__fill{position:absolute;inset:0;display:block;overflow:hidden;color:#fff;transform:translate3d(calc((var(--f,0) - 1) * 100%),0,0)}
.nk-ab .ab-big__fill>span{display:block;transform:translate3d(calc((1 - var(--f,0)) * 100%),0,0)}
.nk-ab .ab-s1__meta{position:absolute;left:var(--inset);right:var(--inset);top:calc(var(--inset) + clamp(80px,9svh,120px));display:flex;justify-content:space-between;align-items:baseline}
.nk-ab .ab-s1__meter{display:flex;align-items:center;gap:14px}
.nk-ab .ab-s1__meter i{position:relative;display:block;width:clamp(120px,12vw,220px);height:1px;background:var(--rule)}
.nk-ab .ab-s1__meter i:after{content:"";position:absolute;left:0;top:-1px;height:3px;width:100%;background:#fff;transform:scaleX(var(--m,0));transform-origin:0 50%}

.nk-ab .ab-s2{position:relative;height:200vh;height:200svh}
.nk-ab .ab-s2__sticky{position:sticky;top:0;height:100vh;height:100svh;min-height:620px;display:flex;flex-direction:column;justify-content:center;padding:var(--inset);overflow:hidden}
.nk-ab .ab-s2 .ab-big__line{transform:translate3d(calc((1 - var(--h,0)) * var(--dir,1) * 26vw),0,0);opacity:calc(.2 + var(--h,0) * .8)}
.nk-ab .ab-s2 .ab-big{font-size:clamp(56px,min(11.2vw,19svh),270px)}
.nk-ab .ab-s2 .ab-big__line:nth-child(2){margin-left:12%}
.nk-ab .ab-s2 .ab-big__line:nth-child(3){margin-left:4%}
.nk-ab .ab-accent{color:var(--signal)}

.nk-ab .ab-man{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gap);row-gap:clamp(40px,5vw,90px);padding:clamp(120px,13vw,240px) var(--inset)}
.nk-ab .ab-man__label{grid-column:1 / span 3}
.nk-ab .ab-man__lead{grid-column:4 / span 9;margin:0;font-size:clamp(28px,3.6vw,84px);font-weight:300;line-height:1.02;letter-spacing:-.05em;text-indent:20.5%}
.nk-ab .ab-man__lead b{font-weight:700;letter-spacing:-.04em}
.nk-ab .ab-man__body{grid-column:8 / span 4;margin:0;font-size:clamp(14px,1.05vw,22px);font-weight:300;line-height:1.45;letter-spacing:-.02em;color:rgb(255 255 255 / 82%);text-indent:30%}

.nk-ab .ab-pr{padding:0 var(--inset)}
.nk-ab .ab-pr__row{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,5fr) minmax(0,6fr);align-items:baseline;gap:var(--gap);padding:clamp(18px,2vw,36px) 0;border-top:1px solid var(--rule)}
.nk-ab .ab-pr__row>*{transition:transform .5s var(--ease)}
.nk-ab .ab-pr__row:hover>*{transform:translate3d(14px,0,0)}
.nk-ab .ab-pr__row:last-child{border-bottom:1px solid var(--rule)}
.nk-ab .ab-pr__row span{font-size:12px;letter-spacing:.08em;color:var(--fog);font-variant-numeric:tabular-nums;transition:color .3s}
.nk-ab .ab-pr__row h3{margin:0;font-size:clamp(40px,5.4vw,130px);font-weight:700;line-height:.86;letter-spacing:-.06em;text-transform:uppercase}
.nk-ab .ab-pr__row p{margin:0;font-size:clamp(18px,1.9vw,40px);font-weight:300;line-height:1.1;letter-spacing:-.04em}
.nk-ab .ab-pr__row:hover span{color:var(--signal)}

.nk-ab .ab-mq{position:relative;overflow:hidden;padding:clamp(100px,11vw,200px) 0 0}
.nk-ab .ab-mq__track{display:flex;width:max-content;animation:ab-mq 36s linear infinite}
.nk-ab .ab-mq__track span{flex:none;padding-right:.4em;font-size:clamp(90px,15vw,360px);font-weight:700;line-height:.86;letter-spacing:-.06em;text-transform:uppercase;color:transparent;-webkit-text-stroke:1px rgb(255 255 255 / 38%);white-space:nowrap}
.nk-ab .ab-mq__track span i{font-style:normal;color:#fff;-webkit-text-stroke:0}
@keyframes ab-mq{to{transform:translate3d(-50%,0,0)}}

@media /*W*/(max-width:1023px){
.nk-ab .ab-s1{height:200svh}
.nk-ab .ab-s1__sticky{justify-content:center}
.nk-ab .ab-big{font-size:clamp(46px,14.6vw,140px)}
.nk-ab .ab-big__line{white-space:normal}
.nk-ab .ab-s2 .ab-big__line:nth-child(n){margin-left:0}
.nk-ab .ab-man__label,.nk-ab .ab-man__lead,.nk-ab .ab-man__body{grid-column:1 / -1}
.nk-ab .ab-man__body{grid-column:3 / -1}
.nk-ab .ab-pr__row{grid-template-columns:40px minmax(0,1fr)}
.nk-ab .ab-pr__row p{grid-column:2}
}
@media(prefers-reduced-motion:reduce){
.nk-ab .ab-big__fill{clip-path:none}
.nk-ab .ab-s2 .ab-big__line{transform:none;opacity:1}
.nk-ab .ab-mq__track{animation:none}
}
.nk--canvas.nk-ab .ab-s1,.nk--canvas.nk-ab .ab-s2{height:auto}
.nk--canvas.nk-ab .ab-s1__sticky,.nk--canvas.nk-ab .ab-s2__sticky{position:relative;height:900px}
.nk--canvas.nk-ab .ab-big__fill{clip-path:none}
.nk--canvas.nk-ab .ab-s2 .ab-big__line{transform:none;opacity:1}
.nk--canvas.nk-ab .ab-mq__track{animation:none}
`

function Accent({ text, accent }) {
    if (!accent) return text
    const i = text.toLowerCase().lastIndexOf(accent.toLowerCase())
    if (i < 0) return text
    return (
        <>
            {text.slice(0, i)}
            <span className="ab-accent">
                {text.slice(i, i + accent.length)}
            </span>
            {text.slice(i + accent.length)}
        </>
    )
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 7200
 */
export default function NKAbout(props) {
    const p = nkProps(props, D, ["copy", "principles"])
    const { onCanvas, reduced } = useNKEnv()
    const s1Ref = React.useRef(null)
    const s2Ref = React.useRef(null)
    const l1 = String(p.s1).split("\n")
    const l2 = String(p.s2).split("\n")
    useScene(
        s1Ref,
        ({ el, pin }) => {
            const lines = el.querySelectorAll(".ab-big__line")
            const k = nkClamp(pin / 0.86) * lines.length
            lines.forEach((ln, j) =>
                ln.style.setProperty("--f", nkClamp(k - j).toFixed(4))
            )
            el.style.setProperty("--m", nkClamp(pin / 0.86).toFixed(4))
        },
        !onCanvas && !reduced
    )
    useScene(
        s2Ref,
        ({ el, pin }) => {
            const lines = el.querySelectorAll(".ab-big__line")
            lines.forEach((ln, j) => {
                const a = 0.08 + j * 0.16
                const h = nkClamp((pin - a) / 0.36)
                ln.style.setProperty("--h", (1 - Math.pow(1 - h, 3)).toFixed(4))
            })
        },
        !onCanvas && !reduced
    )
    const principles = [
        [p.p1t, p.p1d],
        [p.p2t, p.p2d],
        [p.p3t, p.p3d],
    ]
    const mq = (p.marquee + " — ").repeat(1)
    return (
        <NK.Shell
            page="about"
            logo={p.logo}
            legal={p.legal}
            css={AB_CSS}
            className="nk-ab"
        >
            {/* 01 */}
            <section
                ref={s1Ref}
                className="ab-s1"
                aria-label="We don't design for perfect conditions"
            >
                <div className="ab-s1__sticky">
                    <div className="ab-s1__meta">
                        <span className="nk-label">
                            <b>05</b> — About · Philosophy
                        </span>
                        <span
                            className="ab-s1__meter nk-label"
                            aria-hidden="true"
                        >
                            Statement 01 <i />
                        </span>
                    </div>
                    <h1 className="ab-big">
                        {l1.map((t, j) => (
                            <span
                                key={j}
                                className="ab-big__line"
                                style={
                                    onCanvas || reduced
                                        ? { "--f": 1 }
                                        : undefined
                                }
                            >
                                <span
                                    className="ab-big__ghost"
                                    aria-hidden="true"
                                >
                                    {t}
                                </span>
                                <span className="ab-big__fill">
                                    <span>{t}</span>
                                </span>
                            </span>
                        ))}
                    </h1>
                </div>
            </section>

            {/* 02 */}
            <section
                ref={s2Ref}
                className="ab-s2"
                aria-label="We design for what comes next"
            >
                <div className="ab-s2__sticky">
                    <h2 className="ab-big">
                        {l2.map((t, j) => (
                            <span
                                key={j}
                                className="ab-big__line"
                                style={{
                                    "--dir": j % 2 ? -1 : 1,
                                    ...(onCanvas || reduced
                                        ? { "--h": 1 }
                                        : {}),
                                }}
                            >
                                {j === l2.length - 1 ? (
                                    <Accent text={t} accent={p.accent} />
                                ) : (
                                    t
                                )}
                            </span>
                        ))}
                    </h2>
                </div>
            </section>

            {/* 03 */}
            <section className="ab-man" aria-label="Manifesto">
                <span className="ab-man__label nk-label nk-rv">
                    <b>05.1</b> — Nike Storm Lab
                </span>
                <p className="ab-man__lead nk-rv" style={{ "--d": 1 }}>
                    {p.lead}
                </p>
                <p className="ab-man__body nk-rv" style={{ "--d": 2 }}>
                    {p.body}
                </p>
            </section>

            {/* 04 */}
            <section className="ab-pr" aria-label="Principles">
                {principles.map(([t, d], i) => (
                    <div
                        key={i}
                        className="ab-pr__row nk-rv"
                        style={{ "--d": i }}
                    >
                        <span>{String(i + 1).padStart(2, "0")}</span>
                        <h3>{t}</h3>
                        <p>{d}</p>
                    </div>
                ))}
            </section>

            {/* 05 */}
            <section className="ab-mq" aria-hidden="true">
                <div className="ab-mq__track">
                    {[0, 1, 2, 3].map((k) => (
                        <span key={k}>
                            {p.marquee} <i>—</i>
                        </span>
                    ))}
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

addPropertyControls(NKAbout, {
    logo: { type: ControlType.Image, title: "Logo (Swoosh)" },
    copy: {
        type: ControlType.Object,
        title: "Statements",
        controls: {
            s1: S("Statement 1 (one line per row)", D.s1, true),
            s2: S("Statement 2 (one line per row)", D.s2, true),
            accent: S("Signal word (statement 2)", D.accent),
            lead: S("Manifesto lead", D.lead, true),
            body: S("Manifesto body", D.body, true),
            marquee: S("Marquee", D.marquee),
        },
    },
    principles: {
        type: ControlType.Object,
        title: "Principles",
        controls: {
            p1t: S("01 title", D.p1t),
            p1d: S("01 text", D.p1d),
            p2t: S("02 title", D.p2t),
            p2d: S("02 text", D.p2d),
            p3t: S("03 title", D.p3t),
            p3d: S("03 text", D.p3d),
        },
    },
    legal: S(
        "Footer legal line",
        "Concept project. Not affiliated with, endorsed or sponsored by Nike, Inc.",
        true
    ),
})
