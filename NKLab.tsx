// @ts-nocheck
/*
 * NKLab — /lab. Nike Storm Lab technology page.
 * 01 Hero (scan line over the specimen, oversized emblem slot)
 * 02 Exploded construction view (scroll-driven, 4 layers, leader lines)
 * 03 Performance data (numbers dominate, rulers, count-up)
 * 04 Material detail (macro fabric + cursor magnifier, dry/wet surface test)
 * Layer visuals are generated from the specimen cutout until real layer renders are
 * uploaded (Layer 1–4 image controls). Specs are illustrative.
 */
import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import {
    NK,
    NK_IMG,
    NK_LOGO_SLOT,
    useNKEnv,
    useScene,
    nkClamp,
    nkMap,
    nkProps,
} from "./NKSystem.tsx"

const D = {
    line1: "NIKE",
    line2: "STORM LAB",
    heroCopy: "Engineered for conditions you can’t control.",
    specimen: "SL-04 · Storm shell platform",
    layersLabel: "Construction · exploded view",
    layersTitle: "Four layers.\nOne system.",
    layersHint: "Scroll to separate the shell",
    l1: "Outer shell",
    l1s: "40D ripstop · 3L",
    l1d: "Ripstop face fabric with a water-repellent finish. Rain beads and runs off before it can load the fabric.",
    l2: "Waterproof membrane",
    l2s: "30K MM",
    l2d: "Microporous barrier. Liquid water stays out, body vapour gets out.",
    l3: "Thermal layer",
    l3s: "60 G/M²",
    l3d: "Body-mapped insulation: warmth where heat is lost, mobility where you move.",
    l4: "Inner system",
    l4s: "20K G/M²/24H",
    l4d: "Brushed lining and ventilation channels move moisture off the skin.",
    dataLabel: "Performance data",
    dataNote: "Illustrative specifications",
    d1v: 30,
    d1s: "K",
    d1u: "MM",
    d1l: "Waterproof",
    d1n: "Hydrostatic head. Scale 0–40K mm.",
    d1m: 40,
    d2v: 20,
    d2s: "K",
    d2u: "G/M²/24H",
    d2l: "Breathability",
    d2n: "Moisture vapour transfer. Scale 0–30K.",
    d2m: 30,
    d3v: 100,
    d3s: "%",
    d3u: "",
    d3l: "Wind protection",
    d3n: "Air permeability blocked at 0 CFM.",
    d3m: 100,
    matLine1: "ENGINEERED",
    matLine2: "AT THE MICRO LEVEL.",
    matCopy:
        "Move across the surface to inspect the weave. Switch the surface test to see it under rain.",
    matSpec1: "Face fabric · Ripstop weave",
    matSpec2: "Finish · Water-repellent",
}

const LAB_CSS = `
.nk-lab .lab-hero{position:relative;height:100vh;height:100svh;min-height:640px;overflow:hidden;background:radial-gradient(60% 70% at 64% 46%,#262626 0%,#141414 38%,#0d0d0d 72%)}
.nk-lab .lab-hero__emblem{position:absolute;left:-14%;top:6%;width:118%;height:auto;opacity:.075;filter:brightness(0) invert(1);transform:translate3d(0,calc(var(--p,0) * -12svh),0);pointer-events:none}
.nk-lab .lab-spec{position:absolute;right:4vw;bottom:0;height:min(94svh,1100px);aspect-ratio:1;transform:translate3d(0,calc(var(--p,0) * 8svh),0) scale(calc(1 + var(--p,0) * .08));transform-origin:60% 100%}
.nk-lab .lab-spec img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;object-position:50% 100%}
.nk-lab .lab-spec__base{filter:grayscale(1) brightness(calc(.62 - var(--p,0) * .25)) contrast(1.1)}
.nk-lab .lab-spec__scan{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.nk-lab .lab-spec__band,.nk-lab .lab-spec__beam{position:absolute;left:0;right:0;top:0;height:20%;will-change:transform;animation:lab-band 5.2s var(--ease-io) infinite alternate}
.nk-lab .lab-spec__band{overflow:hidden;-webkit-mask-image:linear-gradient(to bottom,transparent,#000 70%);mask-image:linear-gradient(to bottom,transparent,#000 70%)}
.nk-lab .lab-spec .lab-spec__band img{inset:auto;left:0;top:0;width:100%;height:500%;filter:grayscale(1) brightness(2.3) contrast(1.25);will-change:transform;animation:lab-band-in 5.2s var(--ease-io) infinite alternate}
.nk-lab .lab-spec__band:after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(to bottom,rgb(13 13 13 / 70%) 0 2px,transparent 2px 5px)}
.nk-lab .lab-spec__line{position:absolute;left:-8%;right:-4%;bottom:0;height:1px;background:var(--signal);box-shadow:0 0 18px 2px rgb(255 51 0 / 55%)}
.nk-lab .lab-spec__line span{position:absolute;left:0;top:8px;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--signal);white-space:nowrap}
@keyframes lab-band{from{transform:translate3d(0,-100%,0)}to{transform:translate3d(0,400%,0)}}
@keyframes lab-band-in{from{transform:translate3d(0,20%,0)}to{transform:translate3d(0,-80%,0)}}
.nk-lab .lab-hero__type{position:absolute;z-index:3;left:var(--inset);bottom:calc(var(--inset) + 2svh);transform:translate3d(0,calc(var(--p,0) * -16svh),0)}
.nk-lab .lab-hero__type .nk-display{font-size:clamp(78px,min(14.6vw,25svh),330px);line-height:.79}
.nk-lab .lab-hero__copy{position:absolute;z-index:3;top:calc(var(--inset) + clamp(80px,9svh,120px));left:var(--inset);width:clamp(260px,22vw,460px)}
.nk-lab .lab-hero__copy .nk-lead{text-indent:20.5%}
.nk-lab .lab-readout{position:absolute;z-index:3;right:var(--inset);top:calc(var(--inset) + clamp(80px,9svh,120px));display:flex;flex-direction:column;align-items:flex-end;gap:14px;text-align:right}
.nk-lab .lab-readout .nk-pill{font-size:clamp(40px,min(3.6vw,6.4svh),92px)}
.nk-lab .lab-readout p{margin:0;font-size:clamp(12px,.9vw,20px);font-weight:300;line-height:1.15;letter-spacing:-.04em;text-transform:uppercase}
.nk-lab .lab-tag{position:absolute;z-index:3;right:var(--inset);bottom:calc(var(--inset) + 2svh);width:clamp(180px,14vw,280px)}
.nk-lab .lab-tag__frame{position:relative;padding:12px 14px;border:1px solid rgb(255 255 255 / 35%)}
.nk-lab .lab-tag__frame:after{content:"";position:absolute;right:0;top:0;width:clamp(8px,.8333vw,14px);aspect-ratio:1;transform:translate(100%,-100%);background:#fff}
.nk-lab .lab-tag .nk-barcode{margin-top:12px;font-size:clamp(26px,2.1vw,40px)}

/* exploded view */
.nk-lab .lab-layers{position:relative;height:440vh;height:440svh}
.nk-lab .lab-layers__sticky{position:sticky;top:0;height:100vh;height:100svh;min-height:640px;overflow:hidden;--lh:min(64svh,760px);--lw:calc(var(--lh) * .654);--spread:clamp(150px,17vw,330px)}
.nk-lab .lab-layers__head{position:absolute;z-index:3;left:var(--inset);top:calc(var(--inset) + clamp(80px,9svh,120px));display:grid;gap:18px;max-width:32vw}
.nk-lab .lab-layers__head .nk-title{font-size:clamp(30px,3.1vw,78px);white-space:pre-line}
.nk-lab .lab-layers__meta{position:absolute;z-index:3;right:var(--inset);top:calc(var(--inset) + clamp(80px,9svh,120px));display:grid;grid-template-columns:auto auto;gap:6px 18px;font-size:11px;font-weight:300;letter-spacing:.08em;text-transform:uppercase;color:var(--fog);text-align:right}
.nk-lab .lab-layers__meta b{font-weight:400;color:#fff;font-variant-numeric:tabular-nums}
.nk-lab .lab-stage{position:absolute;inset:0;perspective:1900px;perspective-origin:50% 42%}
.nk-lab .lab-stack{position:absolute;left:54%;top:46%;width:var(--lw);height:var(--lh);margin:calc(var(--lh) / -2) 0 0 calc(var(--lw) / -2);transform-style:preserve-3d;transform:rotateX(calc(var(--s,0) * 7deg)) rotateY(calc(var(--s,0) * -30deg))}
.nk-lab .lab-layer{position:absolute;inset:0;transform-style:preserve-3d;transform:translate3d(calc(var(--s,0) * var(--k) * var(--spread)),0,calc(var(--s,0) * var(--k) * -70px + var(--z0)));transition:opacity .5s ease,filter .5s ease}
.nk-lab .lab-layer>img,.nk-lab .lab-layer>.lab-skin{position:absolute;inset:0;width:100%;height:100%}
.nk-lab .lab-layer>img{object-fit:contain;filter:grayscale(1) contrast(1.08)}
.nk-lab .lab-skin{-webkit-mask-image:var(--src);mask-image:var(--src);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-position:center;mask-position:center;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}
.nk-lab .lab-skin--membrane{background:radial-gradient(circle,rgb(255 255 255 / 85%) 0 1px,transparent 1.5px) 0 0/7px 7px,linear-gradient(160deg,rgb(255 255 255 / 30%),rgb(255 255 255 / 4%) 60%,rgb(255 255 255 / 16%))}
.nk-lab .lab-skin--thermal{background:repeating-linear-gradient(45deg,rgb(255 255 255 / 55%) 0 1px,transparent 1px 18px),repeating-linear-gradient(-45deg,rgb(255 255 255 / 55%) 0 1px,transparent 1px 18px),radial-gradient(70% 60% at 50% 45%,rgb(255 255 255 / 22%),rgb(255 255 255 / 4%))}
.nk-lab .lab-skin--inner{background:radial-gradient(14% 8% at 50% 37%,rgb(255 51 0 / 72%),transparent 70%),radial-gradient(7% 10% at 31% 32%,rgb(255 51 0 / 45%),transparent 72%),radial-gradient(7% 10% at 69% 32%,rgb(255 51 0 / 45%),transparent 72%),repeating-linear-gradient(to bottom,rgb(255 255 255 / 50%) 0 1px,transparent 1px 5px)}
.nk-lab .lab-layer:not(.lab-layer--shell){opacity:calc(.15 + var(--s,0) * .85)}
.nk-lab .lab-layers__sticky[data-active] .lab-layer{opacity:.3;filter:blur(.4px)}
.nk-lab .lab-layers__sticky[data-active="0"] .lab-layer[data-i="0"],.nk-lab .lab-layers__sticky[data-active="1"] .lab-layer[data-i="1"],.nk-lab .lab-layers__sticky[data-active="2"] .lab-layer[data-i="2"],.nk-lab .lab-layers__sticky[data-active="3"] .lab-layer[data-i="3"],.nk-lab .lab-layers__sticky[data-active="all"] .lab-layer{opacity:1;filter:none}
.nk-lab .lab-leaders{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}
.nk-lab .lab-leaders path{fill:none;stroke:rgb(255 255 255 / 55%);stroke-width:1;vector-effect:non-scaling-stroke}
.nk-lab .lab-leaders rect{fill:#fff}
.nk-lab .lab-leaders .is-on path{stroke:#fff}
.nk-lab .lab-leaders .is-on rect{fill:var(--signal)}
.nk-lab .lab-leaders g{opacity:calc(var(--s,0) * 1.4 - .4)}
.nk-lab .lab-labels{position:absolute;z-index:3;left:var(--inset);right:var(--inset);bottom:var(--inset);display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:var(--gap);margin:0;padding:0;list-style:none}
.nk-lab .lab-label{padding-top:14px;border-top:1px solid var(--rule);opacity:calc(var(--s,0) * 1.6 - .6);transition:border-color .4s ease}
.nk-lab .lab-label__head{display:flex;align-items:baseline;gap:12px}
.nk-lab .lab-label__i{font-size:12px;font-weight:400;letter-spacing:.06em;font-variant-numeric:tabular-nums;color:var(--fog);transition:color .3s}
.nk-lab .lab-label h3{margin:0;font-size:clamp(14px,1.05vw,22px);font-weight:600;letter-spacing:-.03em;text-transform:uppercase}
.nk-lab .lab-label__s{display:block;margin-top:6px;font-size:11px;letter-spacing:.08em;color:var(--fog);text-transform:uppercase}
.nk-lab .lab-label p{margin:10px 0 0;max-width:30ch;font-size:clamp(12px,.8vw,16px);font-weight:300;line-height:1.4;letter-spacing:-.02em;color:rgb(255 255 255 / 78%);max-height:0;opacity:0;overflow:hidden;transition:max-height .6s var(--ease),opacity .5s ease}
.nk-lab .lab-label.is-on{border-color:#fff}
.nk-lab .lab-label.is-on .lab-label__i{color:var(--signal)}
.nk-lab .lab-label.is-on p,.nk-lab .lab-layers__sticky[data-active="all"] .lab-label p{max-height:8em;opacity:1}

/* data */
.nk-lab .lab-data{position:relative;padding:clamp(120px,13vw,240px) var(--inset) clamp(80px,8vw,160px)}
.nk-lab .lab-data__head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:clamp(30px,3vw,60px)}
.nk-lab .lab-row{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:var(--gap);align-items:end;padding:clamp(18px,2vw,36px) 0 clamp(22px,2.4vw,44px);border-top:1px solid var(--rule)}
.nk-lab .lab-row:last-child{border-bottom:1px solid var(--rule)}
.nk-lab .lab-row--flip{grid-template-columns:minmax(0,8fr) minmax(0,4fr)}
.nk-lab .lab-row--flip .lab-row__meta{order:2;text-align:right;justify-items:end}
.nk-lab .lab-row__meta{display:grid;gap:10px;align-self:start;padding-top:8px}
.nk-lab .lab-row__meta h3{margin:0;font-size:clamp(20px,2vw,44px);font-weight:700;letter-spacing:-.03em;line-height:.95;text-transform:uppercase}
.nk-lab .lab-row__meta p{margin:0;max-width:28ch;font-size:clamp(12px,.8vw,16px);font-weight:300;line-height:1.4;color:var(--fog)}
.nk-lab .lab-row__fig{display:grid;justify-items:end}
.nk-lab .lab-row--flip .lab-row__fig{justify-items:start}
.nk-lab .lab-row__num{display:flex;align-items:flex-start;font-size:clamp(120px,min(19vw,32svh),420px)}
.nk-lab .lab-row__sfx{display:flex;flex-direction:column;gap:.5em;margin:.1em 0 0 .08em}
.nk-lab .lab-row__sfx small{font-size:.22em;font-weight:300;line-height:1;letter-spacing:.02em}
.nk-lab .lab-row__sfx em{font-style:normal;font-size:clamp(11px,.75vw,14px);font-weight:400;letter-spacing:.1em;line-height:1.2;color:var(--fog)}
.nk-lab .lab-ruler{position:relative;width:min(100%,62vw);height:28px;margin-top:clamp(12px,1.2vw,22px);background:repeating-linear-gradient(to right,rgb(255 255 255 / 40%) 0 1px,transparent 1px 2.5%) 0 100%/100% 8px no-repeat,repeating-linear-gradient(to right,rgb(255 255 255 / 70%) 0 1px,transparent 1px 25%) 0 100%/100% 16px no-repeat;border-bottom:1px solid rgb(255 255 255 / 40%)}
.nk-lab .lab-ruler__fill{position:absolute;left:0;bottom:-1px;height:3px;width:calc(var(--v,0) * 100%);background:#fff;transition:width 1.6s var(--ease)}
.nk-lab .lab-ruler__fill:after{content:"";position:absolute;right:0;bottom:-5px;width:12px;height:12px;transform:translateX(50%);background:var(--signal)}
.nk-lab .lab-ruler__ends{display:flex;justify-content:space-between;width:min(100%,62vw);margin-top:8px}

/* material */
.nk-lab .lab-mat{position:relative;height:110vh;height:110svh;min-height:680px;overflow:hidden;cursor:none;touch-action:pan-y}
.nk-lab .lab-mat__base{position:absolute;inset:0}
.nk-lab .lab-mat__base img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:opacity .8s var(--ease)}
.nk-lab .lab-mat__base img.is-off{opacity:0}
.nk-lab .lab-mat__shade{position:absolute;inset:0;background:linear-gradient(to bottom,rgb(13 13 13 / 70%),rgb(13 13 13 / 0%) 35%,rgb(13 13 13 / 0%) 65%,rgb(13 13 13 / 85%))}
.nk-lab .lab-mat__type{position:absolute;z-index:3;left:var(--inset);top:calc(var(--inset) + clamp(80px,9svh,120px));pointer-events:none}
.nk-lab .lab-mat__type .nk-display{font-size:clamp(56px,min(8.4vw,15svh),200px);line-height:.8}
.nk-lab .lab-mat__foot{position:absolute;z-index:3;left:var(--inset);right:var(--inset);bottom:var(--inset);display:grid;grid-template-columns:minmax(0,4fr) minmax(0,5fr) auto;gap:var(--gap);align-items:end}
.nk-lab .lab-mat__foot .nk-body{max-width:34ch;text-indent:20.5%}
.nk-lab .lab-mat__specs{display:grid;gap:8px}
.nk-lab .lab-test{display:flex;gap:4px;padding:1px;border:3px solid rgb(255 255 255 / 28%);background:#fff3;-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);cursor:auto}
.nk-lab .lab-test button{min-height:40px;padding:0 16px;border:0;background:#fff;color:#777;font-size:15px;cursor:pointer;transition:background .2s,color .2s}
.nk-lab .lab-test button[aria-pressed="true"]{background:#0d0d0d;color:#fff}
.nk-lab .lab-lens{--r:clamp(110px,10vw,180px);position:absolute;z-index:4;left:0;top:0;width:calc(var(--r) * 2);height:calc(var(--r) * 2);border:2px solid #fff;border-radius:50%;overflow:hidden;pointer-events:none;transform:translate3d(calc(var(--mx,50vw) - var(--r)),calc(var(--my,50svh) - var(--r)),0);box-shadow:0 30px 80px rgb(0 0 0 / 55%);will-change:transform}
.nk-lab .lab-lens__view{position:absolute;left:0;top:0;width:var(--W,100vw);height:var(--H,110svh);transform-origin:0 0;transform:translate3d(calc(var(--r) - 2px - var(--mx,50vw) * var(--z,3)),calc(var(--r) - 2px - var(--my,50svh) * var(--z,3)),0) scale(var(--z,3))}
.nk-lab .lab-lens__view img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:opacity .8s var(--ease)}
.nk-lab .lab-lens__view img.is-off{opacity:0}
.nk-lab .lab-lens__hud{position:absolute;inset:0}
.nk-lab .lab-lens__hud:before,.nk-lab .lab-lens__hud:after{content:"";position:absolute;background:rgb(255 255 255 / 60%)}
.nk-lab .lab-lens__hud:before{left:50%;top:22%;bottom:22%;width:1px}
.nk-lab .lab-lens__hud:after{top:50%;left:22%;right:22%;height:1px}
.nk-lab .lab-lens__z{position:absolute;left:50%;bottom:14%;transform:translateX(-50%);font-size:10px;letter-spacing:.12em;color:#fff;text-transform:uppercase;white-space:nowrap}
.nk-lab .lab-coords{position:absolute;z-index:4;left:0;top:0;transform:translate3d(calc(var(--mx,50vw) + var(--r2,190px)),calc(var(--my,50svh) - 8px),0);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#fff;white-space:nowrap;pointer-events:none;font-variant-numeric:tabular-nums}

@media /*W*/(max-width:1023px){
.nk-lab .lab-spec{right:-12vw;height:min(78svh,820px)}
.nk-lab .lab-hero__copy{width:min(56vw,360px)}
.nk-lab .lab-readout{display:none}
.nk-lab .lab-tag{display:none}
.nk-lab .lab-layers{height:380svh}
.nk-lab .lab-layers__sticky{--lh:min(48svh,520px);--spread:clamp(70px,13vw,140px)}
.nk-lab .lab-layers__head{max-width:none;right:var(--inset)}
.nk-lab .lab-layers__meta{display:none}
.nk-lab .lab-stack{top:50%;left:50%;transform:rotateX(calc(var(--s,0) * 5deg)) rotateY(calc(var(--s,0) * -18deg))}
.nk-lab .lab-labels{grid-template-columns:minmax(0,1fr)}
.nk-lab .lab-label{display:none}
.nk-lab .lab-label.is-on,.nk-lab .lab-layers__sticky:not([data-active]) .lab-label[data-i="0"]{display:block}
.nk-lab .lab-layers__sticky[data-active="all"] .lab-label{display:none}
.nk-lab .lab-layers__sticky[data-active="all"] .lab-label[data-i="3"]{display:block}
.nk-lab .lab-leaders{display:none}
.nk-lab .lab-row,.nk-lab .lab-row--flip{grid-template-columns:minmax(0,1fr)}
.nk-lab .lab-row--flip .lab-row__meta{order:0;text-align:left;justify-items:start}
.nk-lab .lab-row__fig,.nk-lab .lab-row--flip .lab-row__fig{justify-items:start}
.nk-lab .lab-row__num{font-size:clamp(96px,27vw,240px)}
.nk-lab .lab-ruler,.nk-lab .lab-ruler__ends{width:100%}
.nk-lab .lab-mat{cursor:auto;height:100svh}
.nk-lab .lab-mat__foot{grid-template-columns:minmax(0,1fr)}
.nk-lab .lab-test{justify-self:start}
.nk-lab .lab-mat__specs{display:none}
.nk-lab .lab-coords{display:none}
}
@media /*W*/(max-width:599px){
.nk-lab .lab-spec{right:-30vw;height:70svh}
.nk-lab .lab-hero__type .nk-display{font-size:clamp(64px,21vw,120px)}
.nk-lab .lab-layers__sticky{--lh:min(44svh,420px);--spread:clamp(48px,14vw,90px)}
.nk-lab .lab-lens{--r:84px}
}
@media(prefers-reduced-motion:reduce){
.nk-lab .lab-spec__scan,.nk-lab .lab-spec__beam{display:none}
}
.nk--canvas.nk-lab .lab-layers{height:auto}
.nk--canvas.nk-lab .lab-layers__sticky{position:relative;--s:1}
.nk--canvas.nk-lab .lab-label p{max-height:8em;opacity:1}
.nk--canvas.nk-lab .lab-spec__band,.nk--canvas.nk-lab .lab-spec__beam{animation:none;transform:translate3d(0,150%,0)}
.nk--canvas.nk-lab .lab-spec .lab-spec__band img{animation:none;transform:translate3d(0,-30%,0)}
.nk--canvas.nk-lab .lab-mat{height:900px}
`

const LAYER_KEYS = [
    ["l1", "l1s", "l1d"],
    ["l2", "l2s", "l2d"],
    ["l3", "l3s", "l3d"],
    ["l4", "l4s", "l4d"],
]
const SKINS = ["", "membrane", "thermal", "inner"]
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

function useCount(target, run, reduced) {
    const [v, setV] = React.useState(reduced ? target : 0)
    React.useEffect(() => {
        if (!run) return
        if (reduced) return setV(target)
        let raf = 0
        const t0 = performance.now()
        const tick = (t) => {
            const k = nkClamp((t - t0) / 1500)
            setV(Math.round(target * (1 - Math.pow(1 - k, 4))))
            if (k < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [run, target, reduced])
    return v
}

function DataRow({
    i,
    value,
    suffix,
    unit,
    label,
    note,
    max,
    flip,
    onCanvas,
    reduced,
}) {
    const ref = React.useRef(null)
    const [run, setRun] = React.useState(onCanvas)
    React.useEffect(() => {
        if (
            onCanvas ||
            !ref.current ||
            typeof IntersectionObserver === "undefined"
        )
            return setRun(true)
        const io = new IntersectionObserver(
            (e) => e[0].isIntersecting && (setRun(true), io.disconnect()),
            { threshold: 0.35 }
        )
        io.observe(ref.current)
        return () => io.disconnect()
    }, [onCanvas])
    const n = useCount(Number(value) || 0, run, reduced || onCanvas)
    const frac = nkClamp((Number(value) || 0) / (Number(max) || 1))
    return (
        <div ref={ref} className={"lab-row" + (flip ? " lab-row--flip" : "")}>
            <div className="lab-row__meta nk-rv">
                <span className="nk-label">
                    <b>{String(i + 1).padStart(2, "0")}</b> — Test result
                </span>
                <h3>{label}</h3>
                <p>{note}</p>
            </div>
            <div className="lab-row__fig">
                <div
                    className="lab-row__num nk-num"
                    aria-label={value + suffix + " " + unit}
                >
                    {n}
                    <span className="lab-row__sfx">
                        <small>{suffix}</small>
                        {unit ? <em>{unit}</em> : null}
                    </span>
                </div>
                <div
                    className="lab-ruler"
                    style={{ "--v": run ? frac : 0 }}
                    aria-hidden="true"
                >
                    <span className="lab-ruler__fill" />
                </div>
                <div className="lab-ruler__ends nk-label" aria-hidden="true">
                    <span>0</span>
                    <span>{max + (suffix === "%" ? "%" : suffix)}</span>
                </div>
            </div>
        </div>
    )
}

function Material({ p, onCanvas, reduced }) {
    const ref = React.useRef(null)
    const lensRef = React.useRef(null)
    const [wet, setWet] = React.useState(false)
    React.useEffect(() => {
        const el = ref.current
        if (!el || onCanvas) return
        let tx = 0,
            ty = 0,
            x = 0,
            y = 0,
            w = 0,
            h = 0,
            raf = 0,
            last = 0,
            active = false,
            vis = false,
            txt = ""
        const t0 = performance.now()
        const coords = el.querySelector(".lab-coords")
        const size = () => {
            w = el.clientWidth
            h = el.clientHeight
            el.style.setProperty("--W", w + "px")
            el.style.setProperty("--H", h + "px")
            if (!active) {
                tx = x = w * 0.62
                ty = y = h * 0.52
            }
        }
        size()
        const move = (e) => {
            const r = el.getBoundingClientRect()
            tx = e.clientX - r.left
            ty = e.clientY - r.top
            active = true
            last = performance.now()
            if (vis && !raf) raf = requestAnimationFrame(loop)
        }
        // runs only while the section is on screen (reduced motion: stops once the lens settles)
        const loop = (t) => {
            raf = 0
            if (!vis) return
            const drift = !reduced && (!active || t - last > 3200)
            if (drift) {
                const k = (t - t0) / 1000
                tx = w * (0.58 + Math.sin(k * 0.45) * 0.22)
                ty = h * (0.52 + Math.sin(k * 0.7 + 1) * 0.18)
            }
            const f = reduced ? 1 : 0.14
            x += (tx - x) * f
            y += (ty - y) * f
            el.style.setProperty("--mx", x.toFixed(1) + "px")
            el.style.setProperty("--my", y.toFixed(1) + "px")
            const next =
                "X " +
                String(Math.round(x)).padStart(4, "0") +
                " · Y " +
                String(Math.round(y)).padStart(4, "0")
            if (coords && next !== txt) coords.textContent = txt = next
            if (!reduced || Math.abs(tx - x) + Math.abs(ty - y) > 0.3)
                raf = requestAnimationFrame(loop)
        }
        const io = new IntersectionObserver(([en]) => {
            vis = en.isIntersecting
            if (vis && !raf) raf = requestAnimationFrame(loop)
        })
        io.observe(el)
        el.addEventListener("pointermove", move)
        el.addEventListener("pointerdown", move)
        window.addEventListener("resize", size)
        return () => {
            io.disconnect()
            cancelAnimationFrame(raf)
            el.removeEventListener("pointermove", move)
            el.removeEventListener("pointerdown", move)
            window.removeEventListener("resize", size)
        }
    }, [onCanvas, reduced])
    const dry = p.matImage || NK_IMG.weave
    const wetImg = p.matWetImage || NK_IMG.droplets
    return (
        <section ref={ref} className="lab-mat" aria-label="Material detail">
            <div className="lab-mat__base">
                <img
                    className={"nk-mono" + (wet ? " is-off" : "")}
                    src={dry}
                    alt="Macro view of the ripstop face fabric"
                    loading="lazy"
                    decoding="async"
                />
                <img
                    className={"nk-mono" + (wet ? "" : " is-off")}
                    src={wetImg}
                    alt="Water beading on the fabric surface"
                    loading="lazy"
                    decoding="async"
                />
            </div>
            <div className="lab-mat__shade" aria-hidden="true" />
            <div className="lab-mat__type nk-blend">
                <NK.Lines
                    as="h2"
                    className="nk-display"
                    lines={[p.matLine1, p.matLine2]}
                />
            </div>
            <div ref={lensRef} className="lab-lens" aria-hidden="true">
                <div className="lab-lens__view">
                    <img
                        className={"nk-mono" + (wet ? " is-off" : "")}
                        src={dry}
                        alt=""
                    />
                    <img
                        className={"nk-mono" + (wet ? "" : " is-off")}
                        src={wetImg}
                        alt=""
                    />
                </div>
                <div className="lab-lens__hud" />
                <span className="lab-lens__z">
                    ×3.0 · {wet ? "Wet" : "Dry"}
                </span>
            </div>
            <span className="lab-coords" aria-hidden="true">
                X 0000 · Y 0000
            </span>
            <div className="lab-mat__foot">
                <p className="nk-body nk-rv">{p.matCopy}</p>
                <div className="lab-mat__specs nk-rv" style={{ "--d": 1 }}>
                    <span className="nk-label">
                        <b>{p.matSpec1}</b>
                    </span>
                    <span className="nk-label">{p.matSpec2}</span>
                </div>
                <div
                    className="lab-test"
                    role="group"
                    aria-label="Surface test"
                >
                    <button
                        type="button"
                        aria-pressed={!wet}
                        onClick={() => setWet(false)}
                    >
                        Dry
                    </button>
                    <button
                        type="button"
                        aria-pressed={wet}
                        onClick={() => setWet(true)}
                    >
                        Wet
                    </button>
                </div>
            </div>
        </section>
    )
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 9000
 */
export default function NKLab(props) {
    const p = nkProps(props, D, ["hero", "layers", "data", "material"])
    const { onCanvas, reduced } = useNKEnv()
    const heroRef = React.useRef(null)
    const layersRef = React.useRef(null)
    const stickyRef = React.useRef(null)
    const svgRef = React.useRef(null)
    const src = p.layerSource || NK_IMG.gear
    const specimen = p.heroImage || NK_IMG.hero

    useScene(
        heroRef,
        ({ el, pass, rect, vh }) => {
            const k = nkClamp(-rect.top / vh)
            el.style.setProperty("--p", k.toFixed(4))
        },
        !onCanvas && !reduced
    )

    useScene(
        layersRef,
        ({ pin }) => {
            const st = stickyRef.current
            if (!st) return
            const s = ease(nkMap(pin, 0.08, 0.38))
            st.style.setProperty("--s", s.toFixed(4))
            let active = null
            if (pin >= 0.4 && pin < 0.92)
                active = String(
                    Math.min(3, Math.floor(nkMap(pin, 0.4, 0.92) * 4))
                )
            else if (pin >= 0.92) active = "all"
            if (active === null) st.removeAttribute("data-active")
            else if (st.getAttribute("data-active") !== active)
                st.setAttribute("data-active", active)
            const meta = st.querySelector(".lab-layers__meta b[data-k='s']")
            if (meta) meta.textContent = s.toFixed(2)
            const labels = st.querySelectorAll(".lab-label")
            labels.forEach((l, i) =>
                l.classList.toggle(
                    "is-on",
                    active === String(i) || active === "all"
                )
            )
            const svg = svgRef.current
            if (!svg || window.innerWidth < 1024) return
            const sr = st.getBoundingClientRect()
            const groups = svg.querySelectorAll("g")
            ;[0, 1, 2, 3].forEach((i) => {
                const ly = st.querySelector('.lab-layer[data-i="' + i + '"]')
                if (!ly) return
                const r = ly.getBoundingClientRect()
                const lr = labels[i] && labels[i].getBoundingClientRect()
                const g = groups[i]
                if (!lr || !g) return
                const nx = r.left - sr.left + r.width * 0.5
                const ny = r.top - sr.top + r.height * (0.42 + i * 0.05)
                const lx = lr.left - sr.left
                const ly2 = lr.top - sr.top
                g.querySelector("path").setAttribute(
                    "d",
                    "M" +
                        (lx + 0.5).toFixed(1) +
                        " " +
                        ly2.toFixed(1) +
                        " L" +
                        nx.toFixed(1) +
                        " " +
                        ny.toFixed(1)
                )
                const sq = g.querySelector("rect")
                sq.setAttribute("x", (nx - 4).toFixed(1))
                sq.setAttribute("y", (ny - 4).toFixed(1))
                g.classList.toggle(
                    "is-on",
                    active === String(i) || active === "all"
                )
            })
        },
        !onCanvas
    )

    const data = [
        { v: p.d1v, s: p.d1s, u: p.d1u, l: p.d1l, n: p.d1n, m: p.d1m },
        { v: p.d2v, s: p.d2s, u: p.d2u, l: p.d2l, n: p.d2n, m: p.d2m },
        { v: p.d3v, s: p.d3s, u: p.d3u, l: p.d3l, n: p.d3n, m: p.d3m },
    ]
    const layerImgs = [p.layer1, p.layer2, p.layer3, p.layer4]

    return (
        <NK.Shell
            page="lab"
            logo={p.logo}
            legal={p.legal}
            css={LAB_CSS}
            className="nk-lab"
        >
            {/* 01 HERO */}
            <section
                ref={heroRef}
                className="lab-hero"
                aria-label="Nike Storm Lab"
            >
                <img
                    className="lab-hero__emblem"
                    src={p.emblem || NK_LOGO_SLOT}
                    alt=""
                    aria-hidden="true"
                />
                <div className="lab-spec" aria-hidden="true">
                    <img
                        className="lab-spec__base"
                        src={specimen}
                        alt=""
                        decoding="async"
                        fetchpriority="high"
                    />
                    <div className="lab-spec__scan">
                        <div className="lab-spec__band">
                            <img src={specimen} alt="" decoding="async" />
                        </div>
                    </div>
                    <div className="lab-spec__beam">
                        <div className="lab-spec__line">
                            <span>Scan · chamber 04</span>
                        </div>
                    </div>
                </div>
                <div className="lab-hero__copy">
                    <span
                        className="nk-label nk-rv"
                        style={{ marginBottom: 14 }}
                    >
                        <b>01</b> — Lab
                    </span>
                    <p className="nk-lead nk-rv" style={{ "--d": 1 }}>
                        {p.heroCopy}
                    </p>
                </div>
                <div className="lab-readout nk-rv" style={{ "--d": 2 }}>
                    <span className="nk-pill">
                        −24<span style={{ fontSize: ".6em" }}>°C</span>
                    </span>
                    <p>
                        Chamber
                        <br />
                        temperature
                    </p>
                    <span className="nk-label nk-live">
                        Wind 82 km/h · Rain 120 mm/h
                    </span>
                </div>
                <div className="lab-hero__type nk-blend">
                    <NK.Lines
                        as="h1"
                        className="nk-display"
                        lines={[p.line1, p.line2]}
                    />
                </div>
                <div className="lab-tag nk-rv" style={{ "--d": 3 }}>
                    <div className="lab-tag__frame">
                        <span className="nk-label">Specimen</span>
                        <span className="nk-label">
                            <b>{p.specimen}</b>
                        </span>
                    </div>
                    <NK.Barcode text="SL750STORMLAB" />
                </div>
            </section>

            {/* 02 EXPLODED VIEW */}
            <section
                ref={layersRef}
                className="lab-layers"
                aria-label="Construction"
            >
                <div ref={stickyRef} className="lab-layers__sticky">
                    <div className="lab-layers__head">
                        <span className="nk-label">
                            <b>02</b> — {p.layersLabel}
                        </span>
                        <h2 className="nk-title">{p.layersTitle}</h2>
                        <span className="nk-label">{p.layersHint} ↓</span>
                    </div>
                    <div className="lab-layers__meta" aria-hidden="true">
                        <span>View</span>
                        <b>Exploded · ISO</b>
                        <span>Separation</span>
                        <b data-k="s">0.00</b>
                        <span>Layers</span>
                        <b>04</b>
                    </div>
                    <div className="lab-stage" aria-hidden="true">
                        <div className="lab-stack">
                            {[3, 2, 1, 0].map((i) => (
                                <div
                                    key={i}
                                    data-i={i}
                                    className={
                                        "lab-layer" +
                                        (i === 0 ? " lab-layer--shell" : "")
                                    }
                                    style={{
                                        "--k": i - 1.5,
                                        "--z0": (3 - i) * 0.6 + "px",
                                    }}
                                >
                                    {layerImgs[i] || i === 0 ? (
                                        <img
                                            src={layerImgs[i] || src}
                                            alt=""
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    ) : (
                                        <div
                                            className={
                                                "lab-skin lab-skin--" + SKINS[i]
                                            }
                                            style={{
                                                "--src": "url(" + src + ")",
                                            }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <svg
                        ref={svgRef}
                        className="lab-leaders"
                        aria-hidden="true"
                    >
                        {[0, 1, 2, 3].map((i) => (
                            <g key={i}>
                                <path d="" />
                                <rect width="8" height="8" />
                            </g>
                        ))}
                    </svg>
                    <ol className="lab-labels">
                        {LAYER_KEYS.map(([n, s, d], i) => (
                            <li key={n} className="lab-label" data-i={i}>
                                <div className="lab-label__head">
                                    <span className="lab-label__i">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3>{p[n]}</h3>
                                </div>
                                <span className="lab-label__s">{p[s]}</span>
                                <p>{p[d]}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* 03 PERFORMANCE DATA */}
            <section className="lab-data" aria-label="Performance data">
                <div className="lab-data__head">
                    <span className="nk-label nk-rv">
                        <b>03</b> — {p.dataLabel}
                    </span>
                    <span className="nk-label nk-rv" style={{ "--d": 1 }}>
                        {p.dataNote}
                    </span>
                </div>
                {data.map((d, i) => (
                    <DataRow
                        key={i}
                        i={i}
                        value={d.v}
                        suffix={d.s}
                        unit={d.u}
                        label={d.l}
                        note={d.n}
                        max={d.m}
                        flip={i === 1}
                        onCanvas={onCanvas}
                        reduced={reduced}
                    />
                ))}
            </section>

            {/* 04 MATERIAL */}
            <Material p={p} onCanvas={onCanvas} reduced={reduced} />
        </NK.Shell>
    )
}

const S = (title, def, area = false) => ({
    type: ControlType.String,
    title,
    defaultValue: def,
    displayTextArea: area,
})
const N = (title, def, max = 1000) => ({
    type: ControlType.Number,
    title,
    defaultValue: def,
    min: 0,
    max,
    step: 1,
    displayStepper: true,
})
const I = (title) => ({ type: ControlType.Image, title })

addPropertyControls(NKLab, {
    logo: I("Logo (Swoosh)"),
    emblem: I("Hero emblem (oversized Swoosh)"),
    heroImage: I("Hero specimen (PNG cutout)"),
    hero: {
        type: ControlType.Object,
        title: "Hero copy",
        controls: {
            line1: S("Line 1", D.line1),
            line2: S("Line 2", D.line2),
            heroCopy: S("Copy", D.heroCopy, true),
            specimen: S("Specimen tag", D.specimen),
        },
    },
    layerSource: I("Layer silhouette (PNG cutout)"),
    layer1: I("Layer 1 render (optional)"),
    layer2: I("Layer 2 render (optional)"),
    layer3: I("Layer 3 render (optional)"),
    layer4: I("Layer 4 render (optional)"),
    layers: {
        type: ControlType.Object,
        title: "Layers copy",
        controls: {
            layersLabel: S("Label", D.layersLabel),
            layersTitle: S("Title", D.layersTitle, true),
            layersHint: S("Hint", D.layersHint),
            l1: S("01 name", D.l1),
            l1s: S("01 spec", D.l1s),
            l1d: S("01 text", D.l1d, true),
            l2: S("02 name", D.l2),
            l2s: S("02 spec", D.l2s),
            l2d: S("02 text", D.l2d, true),
            l3: S("03 name", D.l3),
            l3s: S("03 spec", D.l3s),
            l3d: S("03 text", D.l3d, true),
            l4: S("04 name", D.l4),
            l4s: S("04 spec", D.l4s),
            l4d: S("04 text", D.l4d, true),
        },
    },
    data: {
        type: ControlType.Object,
        title: "Performance data",
        controls: {
            dataLabel: S("Label", D.dataLabel),
            dataNote: S("Note", D.dataNote),
            d1v: N("01 value", D.d1v),
            d1s: S("01 suffix", D.d1s),
            d1u: S("01 unit", D.d1u),
            d1l: S("01 label", D.d1l),
            d1n: S("01 note", D.d1n, true),
            d1m: N("01 scale max", D.d1m),
            d2v: N("02 value", D.d2v),
            d2s: S("02 suffix", D.d2s),
            d2u: S("02 unit", D.d2u),
            d2l: S("02 label", D.d2l),
            d2n: S("02 note", D.d2n, true),
            d2m: N("02 scale max", D.d2m),
            d3v: N("03 value", D.d3v),
            d3s: S("03 suffix", D.d3s),
            d3u: S("03 unit", D.d3u),
            d3l: S("03 label", D.d3l),
            d3n: S("03 note", D.d3n, true),
            d3m: N("03 scale max", D.d3m),
        },
    },
    matImage: I("Material — dry (macro)"),
    matWetImage: I("Material — wet (macro)"),
    material: {
        type: ControlType.Object,
        title: "Material copy",
        controls: {
            matLine1: S("Line 1", D.matLine1),
            matLine2: S("Line 2", D.matLine2),
            matCopy: S("Copy", D.matCopy, true),
            matSpec1: S("Spec 1", D.matSpec1),
            matSpec2: S("Spec 2", D.matSpec2),
        },
    },
    legal: S(
        "Footer legal line",
        "Concept project. Not affiliated with, endorsed or sponsored by Nike, Inc.",
        true
    ),
})
