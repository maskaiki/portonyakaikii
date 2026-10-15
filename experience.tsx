// @ts-nocheck
/*
 * Experience — pinned hero -> gear stage (nav, gear test panel, 3D jacket, hero copy, readout, callout, product detail, gallery). Starts NFEngine in preview/live.
 * Text and images are editable in the right-hand property panel.
 */
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { addPropertyControls, ControlType, RenderTarget } from "framer";
import {
  nfCss,
  renderMarkup,
  textControls,
  NF_IMG,
  NF_MODEL,
} from "./NFstyles";
import { startNF } from "./NFengine";

export const MARKUP = `
<div class="experience" id="home">
  <div class="hero">
    <img class="hero__emblem hero__emblem--slot" src="{{img:emblem}}" alt="" aria-hidden="true">

    <section class="collection-panel" aria-label="More outerwear designs" aria-hidden="true" inert="">
      <div class="collection-gallery" aria-label="Three outerwear styles, scrolling upwards">
        <div class="collection-gallery__track">
          <div class="collection-gallery__group">
            <img src="{{img:g1}}" alt="Technical black hooded jacket with chest straps and front pockets" width="1024" height="1536">
            <img src="{{img:g2}}" alt="Black expedition jacket with a belted waist and layered shoulder panels" width="1024" height="1536">
            <img src="{{img:g3}}" alt="Black hooded shell with an asymmetric cape and diagonal harness" width="1024" height="1536">
          </div>
          <div class="collection-gallery__group" aria-hidden="true">
            <img src="{{img:g1}}" alt="" width="1024" height="1536">
            <img src="{{img:g2}}" alt="" width="1024" height="1536">
            <img src="{{img:g3}}" alt="" width="1024" height="1536">
          </div>
        </div>
        <button class="collection-gallery__pause" type="button" aria-label="Pause image gallery" title="Pause gallery">
          <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
            <path class="gallery-pause-symbol" d="M4 3h3v10H4zM9 3h3v10H9z"></path>
            <path class="gallery-play-symbol" d="m5 2 9 6-9 6z"></path>
          </svg>
        </button>
      </div>
    </section>

    <div class="hero__model" id="model-stage" aria-hidden="true"></div>

    <section class="rain-panel" aria-labelledby="rain-panel-title">
      <div class="rain-panel__heading">
        <h2 id="rain-panel-title">{{e0}}</h2>
        <button class="rain-panel__toggle" type="button" aria-expanded="false" aria-controls="rain-controls" aria-label="Show rain controls">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path d="m3 6 5 5 5-5"></path>
          </svg>
        </button>
        <button class="rain-panel__pause" type="button" aria-label="Pause rain simulation" title="Pause rain">
          <svg viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
            <path class="rain-panel__pause-symbol" d="M4 3h3v10H4zM9 3h3v10H9z"></path>
            <path class="rain-panel__play-symbol" d="m5 2 9 6-9 6z"></path>
          </svg>
        </button>
      </div>
      <div class="rain-panel__controls" id="rain-controls">
        <div class="rain-control">
          <div class="rain-control__label">
            <label for="rain-intensity">{{e1}}</label>
            <output for="rain-intensity">{{e2}}</output>
          </div>
          <input id="rain-intensity" name="intensity" type="range" min="0" max="100" value="35">
        </div>
        <div class="rain-control">
          <div class="rain-control__label">
            <label for="drop-speed">{{e3}}</label>
            <output for="drop-speed">{{e4}}</output>
          </div>
          <input id="drop-speed" name="speed" type="range" min="0" max="100" value="80">
        </div>
        <div class="rain-control">
          <div class="rain-control__label">
            <label for="drop-size">{{e5}}</label>
            <output for="drop-size">{{e6}}</output>
          </div>
          <input id="drop-size" name="size" type="range" min="0" max="100" value="24">
        </div>
      </div>
    </section>

    <nav class="site-nav" aria-label="Main navigation">
      <a class="site-nav__link site-nav__link--active" href="#home" aria-current="page">{{e7}}</a>
      <a class="site-nav__link" href="#gear">{{e8}}</a>
      <a class="site-nav__link site-nav__link--secondary" href="{{e9h}}">{{e9}}</a>
      <a class="site-nav__link site-nav__link--secondary" href="{{e10h}}">{{e10}}</a>
      <a class="site-nav__link site-nav__link--bag" href="#cart">{{e11}}</a>
      <a class="site-nav__link site-nav__link--menu" href="#menu">{{e56}}</a>
    </nav>

    <h1 class="hero__title">
      <span>{{e12}}</span>
      <span>{{e13}}</span>
      <span>{{e14}}</span>
    </h1>

    <aside class="surface-readout" aria-label="Jacket surface wetness: 0 percent. Illustrative simulation." title="Illustrative surface response, not a laboratory measurement">
      <div class="surface-readout__connector" aria-hidden="true">
        <svg viewBox="0 0 280 200" preserveAspectRatio="none">
          <path d="M0 200 280 0" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke"></path>
        </svg>
      </div>
      <div class="surface-readout__measurement" aria-hidden="true">
        <svg class="surface-readout__drop" viewBox="0 0 24 32" fill="currentColor">
          <path d="M12 0C9 6 1 16 1 21a11 11 0 0 0 22 0C23 16 15 6 12 0Z"></path>
        </svg>
        <div class="surface-readout__value"><span class="surface-readout__number">{{e15}}</span><span class="surface-readout__unit">%</span></div>
      </div>
      <p>{{e16}}<br>{{e17}}</p>
    </aside>

    <div class="hero__intro">
      <img class="hero__logo" src="{{img:logo}}" alt="Brand">
      <h2><span>{{e18}}</span><span>{{e19}}</span><span>{{e20}}</span><span>{{e21}}</span></h2>
      <p>{{e22}}</p>
    </div>

    <aside class="product-callout" aria-label="Performance eyewear">
      <div class="product-callout__frame">
        <div class="product-callout__image">
          <img src="{{img:gog}}" alt="Goggles">
        </div>
      </div>
      <div class="product-callout__barcode" aria-hidden="true">
        <span class="product-callout__barcode-row">{{e23}}</span>
        <span class="product-callout__barcode-row product-callout__barcode-row--split"><span>{{e24}}</span><span>{{e25}}</span><span>{{e26}}</span></span>
        <span class="product-callout__barcode-row product-callout__barcode-row--short">{{e27}}</span>
      </div>
      <p>{{e28}}<br>{{e29}}<br>{{e30}}</p>
    </aside>
  </div>
</div>
`;

export default function Experience(props) {
  return null;
}
