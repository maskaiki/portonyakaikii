// @ts-nocheck
/*
 * NFEngine — North Face "Storm Lab" experience engine.
 * Scroll timeline (hero -> gear -> bag), three.js jacket model, rain + surface-wetness
 * simulation, gallery, gear bag and checkout logic. Ported 1:1 from the reference build
 * (three.js r180). Started once by the Experience component (never on the Framer canvas).
 */
import * as THREE from "https://esm.sh/three@0.180.0"
import { GLTFLoader } from "https://esm.sh/three@0.180.0/examples/jsm/loaders/GLTFLoader.js"

export function startNF(A) {
    return runNF(A, THREE, GLTFLoader)
}

function runNF(A, THREE, GLTFLoader) {
    const I = THREE.Vector3,
        Kn = THREE.WebGLRenderTarget,
        Mt = THREE.NearestFilter,
        mn = THREE.ShaderMaterial,
        Wt = THREE.DoubleSide,
        Ln = THREE.NoBlending,
        Ar = THREE.OrthographicCamera,
        De = THREE.Matrix4,
        Un = THREE.Quaternion,
        Pe = THREE.Color,
        Dd = THREE.InstancedBufferGeometry,
        dn = THREE.Float32BufferAttribute,
        Ui = THREE.InstancedBufferAttribute,
        Ur = THREE.DynamicDrawUsage,
        It = THREE.Mesh,
        Cn = THREE.Group,
        ut = THREE.MathUtils,
        at = THREE.Object3D,
        en = THREE.BufferGeometry,
        R_ = THREE.WebGLRenderer,
        _t = THREE.SRGBColorSpace,
        Sl = THREE.ACESFilmicToneMapping,
        Jh = THREE.Scene,
        wt = THREE.PerspectiveCamera,
        Id = THREE.AmbientLight,
        Fo = THREE.DirectionalLight,
        ke = THREE.Vector2,
        C_ = GLTFLoader
    if (typeof window === "undefined") return () => {}
    // One engine per page. A live engine bound to the current DOM is kept; a stale one
    // (left behind by a preview reload, hot reload or remount) is disposed first.
    const prevNF = window.__nfEngine
    if (prevNF) {
        if (prevNF.hero && prevNF.hero.isConnected) return () => {}
        try {
            prevNF.dispose()
        } catch (e) {}
    }
    window.__nfStarted = true
    const NF_AC = new AbortController(),
        NF_SIG = { signal: NF_AC.signal },
        NF_OFF = []
    let NF_DEAD = false
    try {
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            document.documentElement.style.scrollBehavior = "smooth"
        document.documentElement.classList.add("nfx-page")
        const u0 = A.model
        class h0 {
            constructor() {
                ;((this.value = 0),
                    (this.pendingWater = 0),
                    (this.exposure = 0),
                    (this.responseAge = 0),
                    (this.shedding = 0))
            }
            setExposure(e) {
                ;(e > this.exposure + 1e-4 &&
                    ((this.responseAge = 0), (this.shedding *= 0.35)),
                    (this.exposure = e))
            }
            impact(e) {
                this.pendingWater += e
            }
            update(e) {
                this.responseAge += e
                const t = this.responseAge > 1.6 || this.exposure === 0 ? 1 : 0
                return (
                    (this.shedding +=
                        (t - this.shedding) * (1 - Math.exp(-e * 1.7))),
                    (this.value +=
                        this.pendingWater * (1 - this.shedding * 0.82)),
                    (this.pendingWater = 0),
                    (this.value *= Math.exp(
                        -e * (0.22 + this.shedding * 0.95)
                    )),
                    (this.value = Math.min(95, this.value)),
                    this.exposure === 0 &&
                        this.value < 0.025 &&
                        (this.value = 0),
                    this.value
                )
            }
        }
        const _s = new I(-0.55, -1, -0.3).normalize(),
            us = 2600,
            xa = 6e3,
            va = 900,
            d0 = new I(1, 0, 0)
        class f0 {
            constructor(e, t, n) {
                ;((this.renderer = e),
                    (this.scene = t),
                    (this.model = n),
                    (this.resolution = 384),
                    (this.pixels = new Uint8Array(this.resolution ** 2 * 4)),
                    (this.target = new Kn(this.resolution, this.resolution, {
                        minFilter: Mt,
                        magFilter: Mt,
                        depthBuffer: !0,
                        stencilBuffer: !1,
                    })),
                    (this.material = new mn({
                        side: Wt,
                        blending: Ln,
                        toneMapped: !1,
                        vertexShader: `
        varying vec3 worldNormal;
        void main() {
          worldNormal = normalize((vec4(normalMatrix * normal, 0.0) * viewMatrix).xyz);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
                        fragmentShader: `
        #include <packing>
        varying vec3 worldNormal;
        void main() {
          vec3 n = normalize(worldNormal);
          n /= abs(n.x) + abs(n.y) + abs(n.z);
          vec2 oct = n.xy;
          if (n.z < 0.0) oct = (1.0 - abs(oct.yx)) * sign(oct.xy);
          gl_FragColor = vec4(packDepthToRG(gl_FragCoord.z), oct * 0.5 + 0.5);
        }
      `,
                    })),
                    (this.camera = new Ar(-0.8, 0.8, 0.8, -0.8, 0.1, 4)))
                const i = new I(0, 0.55, 0)
                ;(this.camera.position.copy(i).addScaledVector(_s, -2),
                    this.camera.lookAt(i),
                    this.camera.updateMatrixWorld(),
                    (this.matrix = new De().multiplyMatrices(
                        this.camera.projectionMatrix,
                        this.camera.matrixWorldInverse
                    )),
                    (this.lastRotation = new Un()),
                    (this.age = 1 / 0),
                    (this.ready = !1),
                    (this.refreshes = 0),
                    (this.clearColor = new Pe()))
            }
            refresh(e, t) {
                if (
                    ((this.age += e),
                    this.ready &&
                        (this.age < 0.12 ||
                            this.lastRotation.angleTo(this.model.quaternion) <
                                0.006))
                )
                    return
                const n = this.renderer,
                    i = n.getRenderTarget()
                n.getClearColor(this.clearColor)
                const r = n.getClearAlpha(),
                    a = this.scene.overrideMaterial,
                    o = t.visible
                try {
                    ;((t.visible = !1),
                        (this.scene.overrideMaterial = this.material),
                        n.setRenderTarget(this.target),
                        n.setClearColor(16777215, 1),
                        n.render(this.scene, this.camera),
                        n.readRenderTargetPixels(
                            this.target,
                            0,
                            0,
                            this.resolution,
                            this.resolution,
                            this.pixels
                        ))
                } finally {
                    ;(n.setRenderTarget(i),
                        n.setClearColor(this.clearColor, r),
                        (this.scene.overrideMaterial = a),
                        (t.visible = o))
                }
                ;(this.lastRotation.copy(this.model.quaternion),
                    (this.age = 0),
                    (this.ready = !0),
                    this.refreshes++)
            }
            intersect(e, t, n, i) {
                const r = this.matrix.elements,
                    a =
                        (r[0] * t.x + r[4] * t.y + r[8] * t.z + r[12]) * 0.5 +
                        0.5,
                    o =
                        (r[1] * t.x + r[5] * t.y + r[9] * t.z + r[13]) * 0.5 +
                        0.5
                if (a <= 0 || a >= 1 || o <= 0 || o >= 1) return !1
                const c =
                        (Math.floor(o * this.resolution) * this.resolution +
                            Math.floor(a * this.resolution)) *
                        4,
                    l = (this.pixels[c] + this.pixels[c + 1] / 255) / 256
                if (l >= 0.999) return !1
                const h =
                        (r[2] * e.x + r[6] * e.y + r[10] * e.z + r[14]) * 0.5 +
                        0.5,
                    u =
                        (r[2] * t.x + r[6] * t.y + r[10] * t.z + r[14]) * 0.5 +
                        0.5
                if (h > l || u < l || u <= h) return !1
                if (
                    (n.copy(e).lerp(t, (l - h) / (u - h)),
                    i.set(
                        (this.pixels[c + 2] / 255) * 2 - 1,
                        (this.pixels[c + 3] / 255) * 2 - 1,
                        0
                    ),
                    (i.z = 1 - Math.abs(i.x) - Math.abs(i.y)),
                    i.z < 0)
                ) {
                    const d = i.x
                    ;((i.x = (1 - Math.abs(i.y)) * Math.sign(d)),
                        (i.y = (1 - Math.abs(d)) * Math.sign(i.y)))
                }
                return (i.normalize(), i.dot(_s) > 0 && i.negate(), !0)
            }
            dispose() {
                ;(this.target.dispose(), this.material.dispose())
            }
        }
        class Ma {
            constructor(e, t = !1) {
                const n = new Dd()
                ;(n.setAttribute(
                    "position",
                    new dn([-1, 0, 0, 1, 0, 0, -1, 1, 0, 1, 1, 0], 3)
                ),
                    n.setIndex([0, 1, 2, 2, 1, 3]),
                    (this.head = new Ui(new Float32Array(e * 3), 3).setUsage(
                        Ur
                    )),
                    (this.tail = new Ui(new Float32Array(e * 3), 3).setUsage(
                        Ur
                    )),
                    (this.style = new Ui(new Float32Array(e * 2), 2).setUsage(
                        Ur
                    )),
                    n.setAttribute("dropHead", this.head),
                    n.setAttribute("dropTail", this.tail),
                    n.setAttribute("dropStyle", this.style),
                    (n.instanceCount = 0))
                const i = new mn({
                    transparent: !0,
                    depthWrite: !1,
                    depthTest: !0,
                    toneMapped: !1,
                    side: Wt,
                    uniforms: {
                        round: { value: t ? 1 : 0 },
                        visibility: { value: 1 },
                    },
                    vertexShader: `
        attribute vec3 dropHead;
        attribute vec3 dropTail;
        attribute vec2 dropStyle;
        varying vec2 waterUv;
        varying float opacity;
        void main() {
          vec3 axis = normalize(dropTail - dropHead + vec3(0.0, 0.000001, 0.0));
          vec3 center = mix(dropHead, dropTail, position.y);
          vec3 side = normalize(cross(axis, cameraPosition - center));
          vec3 world = center + side * position.x * dropStyle.x;
          waterUv = vec2(position.x, position.y);
          opacity = dropStyle.y;
          gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
        }
      `,
                    fragmentShader: `
        uniform float round;
        uniform float visibility;
        varying vec2 waterUv;
        varying float opacity;
        void main() {
          float edge = 1.0 - smoothstep(0.3, 1.0, abs(waterUv.x));
          float tip = smoothstep(0.0, 0.15, waterUv.y) * (1.0 - smoothstep(0.75, 1.0, waterUv.y));
          float bead = 1.0 - smoothstep(0.45, 1.0, length(vec2(waterUv.x, waterUv.y * 2.0 - 1.0)));
          float alpha = opacity * visibility * mix(edge * tip, bead, round);
          if (alpha < 0.005) discard;
          gl_FragColor = vec4(0.85, 0.94, 1.0, alpha);
        }
      `,
                })
                ;((this.mesh = new It(n, i)),
                    (this.mesh.frustumCulled = !1),
                    (this.mesh.renderOrder = 2),
                    (this.count = 0))
            }
            add(e, t, n, i) {
                const r = this.count++
                ;(this.head.setXYZ(r, e.x, e.y, e.z),
                    this.tail.setXYZ(r, t.x, t.y, t.z),
                    this.style.setXY(r, n, i))
            }
            commit() {
                this.mesh.geometry.instanceCount = this.count
                for (const e of [this.head, this.tail, this.style])
                    (e.clearUpdateRanges(),
                        this.count &&
                            e.addUpdateRange(0, this.count * e.itemSize),
                        (e.needsUpdate = !0))
                this.count = 0
            }
            dispose() {
                ;(this.mesh.geometry.dispose(), this.mesh.material.dispose())
            }
        }
        class p0 {
            constructor({
                renderer: e,
                scene: t,
                camera: n,
                model: i,
                onWetness: r,
            }) {
                ;((this.renderer = e),
                    (this.scene = t),
                    (this.camera = n),
                    (this.model = i),
                    (this.onWetness = r),
                    (this.settings = { intensity: 35, speed: 80, size: 24 }),
                    (this.wetness = new h0()),
                    (this.collider = new f0(e, t, i)),
                    (this.group = new Cn()),
                    (this.rainBatch = new Ma(us)),
                    (this.splashBatch = new Ma(xa, !0)),
                    (this.beadBatch = new Ma(va, !0)),
                    this.group.add(
                        this.rainBatch.mesh,
                        this.splashBatch.mesh,
                        this.beadBatch.mesh
                    ),
                    t.add(this.group),
                    (this.drops = Array.from({ length: us }, () => ({
                        position: new I(),
                        active: !1,
                        variation: 0.7 + Math.random() * 0.6,
                    }))),
                    (this.splashes = Array.from({ length: xa }, () => ({
                        position: new I(),
                        velocity: new I(),
                        life: 0,
                        duration: 1,
                        width: 0,
                    }))),
                    (this.beads = Array.from({ length: va }, () => ({
                        position: new I(),
                        normal: new I(),
                        life: 0,
                        duration: 1,
                        width: 0,
                    }))),
                    (this.splashCursor = 0),
                    (this.beadCursor = 0),
                    (this.spawnBudget = 0),
                    (this.dropCursor = 0),
                    (this.hits = 0),
                    (this.elapsed = 0),
                    (this.previous = new I()),
                    (this.point = new I()),
                    (this.normal = new I()),
                    (this.tail = new I()),
                    (this.reflected = new I()),
                    (this.tangent = new I()),
                    (this.bitangent = new I()),
                    (this.inverseModel = new De()),
                    (this.uiAge = 0),
                    (this.paused = !1),
                    (this.visibility = 1),
                    (this.stats = {
                        drops: 0,
                        splashes: 0,
                        beads: 0,
                        hits: 0,
                        wetness: 0,
                    }),
                    this.setSettings(this.settings))
            }
            setSettings(e) {
                Object.assign(this.settings, e)
                const { intensity: t, speed: n, size: i } = this.settings
                this.wetness.setExposure(
                    (t / 100) * (0.3 + (n / 100) * 0.7) * (0.5 + i / 100)
                )
            }
            setPaused(e) {
                ;((this.paused = e),
                    (this.group.visible = !e && this.visibility > 0))
            }
            setVisibility(e) {
                ;((this.visibility = ut.clamp(e, 0, 1)),
                    (this.group.visible = !this.paused && this.visibility > 0))
                for (const t of [
                    this.rainBatch,
                    this.splashBatch,
                    this.beadBatch,
                ])
                    t.mesh.material.uniforms.visibility.value = this.visibility
            }
            spawn(e) {
                const n =
                    Math.tan(ut.degToRad(this.camera.fov / 2)) *
                        0.95 *
                        this.camera.aspect +
                    0.25
                ;(e.position.set(
                    ut.randFloat(-n, n + 0.8),
                    ut.randFloat(1.2, 1.52),
                    ut.randFloat(-0.2, 0.62)
                ),
                    (e.active = !0))
            }
            burst(e, t, n, i) {
                ;(this.hits++,
                    this.wetness.impact(
                        0.025 + (this.settings.size / 100) * 0.075
                    ),
                    this.reflected.copy(_s).reflect(t),
                    this.tangent
                        .crossVectors(
                            t,
                            Math.abs(t.y) < 0.9 ? at.DEFAULT_UP : d0
                        )
                        .normalize(),
                    this.bitangent.crossVectors(t, this.tangent).normalize())
                const r = 4 + Math.round(this.settings.size / 25)
                for (let o = 0; o < r; o++) {
                    const c = this.splashes[this.splashCursor++ % xa],
                        l = Math.random() * Math.PI * 2,
                        h = ut.randFloat(0.03, 0.11) * (0.6 + i)
                    ;(c.position.copy(e).addScaledVector(t, 0.002),
                        c.velocity
                            .copy(t)
                            .multiplyScalar(ut.randFloat(0.04, 0.11))
                            .addScaledVector(this.reflected, 0.07 * i)
                            .addScaledVector(this.tangent, Math.cos(l) * h)
                            .addScaledVector(this.bitangent, Math.sin(l) * h))
                    const u = c.velocity.dot(t)
                    ;(u < 0.035 && c.velocity.addScaledVector(t, 0.035 - u),
                        (c.duration = ut.randFloat(0.22, 0.5)),
                        (c.life = c.duration),
                        (c.width = n * ut.randFloat(0.6, 1.4)))
                }
                const a = this.beads[this.beadCursor++ % va]
                ;(a.position
                    .copy(e)
                    .addScaledVector(t, 0.0015)
                    .applyMatrix4(this.inverseModel),
                    a.normal.copy(t).transformDirection(this.inverseModel),
                    (a.duration = ut.randFloat(0.25, 0.95)),
                    (a.life = a.duration),
                    (a.width = n * ut.randFloat(1, 1.9)))
            }
            update(e) {
                if (this.paused || this.visibility === 0) return
                ;((this.elapsed += e),
                    this.model.updateWorldMatrix(!0, !0),
                    this.inverseModel.copy(this.model.matrixWorld).invert(),
                    this.collider.refresh(e, this.group))
                const { intensity: t, speed: n, size: i } = this.settings,
                    r = 0.32 + (n / 100) * 1.15,
                    a = 25e-5 + (i / 100) * 95e-5,
                    o = 0.008 + (i / 100) * 0.012 + r * 0.009
                this.spawnBudget += (t / 100) * 1550 * r * e
                let c = Math.min(us, Math.floor(this.spawnBudget))
                this.spawnBudget -= c
                for (let f = 0; f < us && c > 0; f++) {
                    const g = this.drops[this.dropCursor++ % us]
                    g.active || (this.spawn(g), c--)
                }
                let l = 0
                for (const f of this.drops)
                    if (f.active) {
                        if (
                            (this.previous.copy(f.position),
                            f.position.addScaledVector(_s, e * r * f.variation),
                            this.collider.intersect(
                                this.previous,
                                f.position,
                                this.point,
                                this.normal
                            ))
                        ) {
                            ;(this.burst(this.point, this.normal, a, r),
                                (f.active = !1))
                            continue
                        }
                        if (f.position.y < 0.22 || f.position.x < -2.5) {
                            f.active = !1
                            continue
                        }
                        ;(this.tail
                            .copy(f.position)
                            .addScaledVector(_s, -o * f.variation),
                            this.rainBatch.add(
                                f.position,
                                this.tail,
                                a * f.variation,
                                0.23 + f.variation * 0.2
                            ),
                            l++)
                    }
                let h = 0
                for (const f of this.splashes)
                    f.life <= 0 ||
                        ((f.life -= e),
                        !(f.life <= 0) &&
                            (f.position.addScaledVector(f.velocity, e),
                            (f.velocity.y -= e * 0.36),
                            this.tail
                                .copy(f.position)
                                .addScaledVector(f.velocity, -0.022),
                            (this.tail.y += f.width * 1.7),
                            this.splashBatch.add(
                                f.position,
                                this.tail,
                                f.width,
                                0.9 * Math.min(1, (f.life / f.duration) * 2)
                            ),
                            h++))
                let u = 0
                for (const f of this.beads)
                    f.life <= 0 ||
                        ((f.life -= e),
                        !(f.life <= 0) &&
                            (this.point
                                .copy(f.position)
                                .applyMatrix4(this.model.matrixWorld),
                            this.tail.copy(this.point),
                            (this.tail.y += f.width * 2.6),
                            this.beadBatch.add(
                                this.point,
                                this.tail,
                                f.width,
                                0.8 * Math.min(1, (f.life / f.duration) * 3)
                            ),
                            u++))
                ;(this.rainBatch.commit(),
                    this.splashBatch.commit(),
                    this.beadBatch.commit())
                const d = this.wetness.update(e)
                ;((this.uiAge += e),
                    this.uiAge >= 0.1 && (this.onWetness(d), (this.uiAge = 0)),
                    Object.assign(this.stats, {
                        drops: l,
                        splashes: h,
                        beads: u,
                        hits: this.hits,
                        wetness: d,
                    }))
            }
            get active() {
                return (
                    !this.paused &&
                    this.visibility > 0 &&
                    (this.settings.intensity > 0 ||
                        this.stats.drops > 0 ||
                        this.stats.splashes > 0 ||
                        this.stats.beads > 0 ||
                        this.wetness.value > 0)
                )
            }
            dispose() {
                ;(this.scene.remove(this.group),
                    this.collider.dispose(),
                    this.rainBatch.dispose(),
                    this.splashBatch.dispose(),
                    this.beadBatch.dispose())
            }
        }
        const Ho = (s) => Math.max(0, Math.min(1, s)),
            Bt = (s, e, t) => {
                const n = Ho((t - s) / (e - s))
                return n * n * (3 - 2 * n)
            }
        function Rr(s, e = !1) {
            const t = Ho(s)
            return {
                camera: Bt(0.02, 0.84, t),
                turn: e ? 0 : Math.PI * 2 * Bt(0.05, 0.85, t),
                intro: 1 - Bt(0.02, 0.27, t),
                rain: 1 - Bt(0.02, 0.22, t),
                panel: Bt(0.34, 0.88, t),
                collection: Bt(0.57, 0.92, t),
                galleryActive: t > 0.88,
            }
        }
        function Cr(s, e = !1) {
            const t = Ho(s)
            return {
                progress: t,
                exit: Bt(0.02, 0.3, t),
                galleryExit: Bt(0.02, 0.4, t),
                travel: Bt(0.04, 0.68, t),
                turn: e ? 0 : Math.PI * 0.65 * Bt(0.02, 0.7, t),
                model: 1 - Bt(0.57, 0.8, t),
                boundary: Bt(0.12, 0.76, t),
                surface: Bt(0.68, 0.94, t),
                accessible: t > 0.985,
            }
        }
        const m0 = A.img.g2,
            g0 = A.img.g1,
            _0 = A.img.g3,
            x0 = A.img.gog,
            ya =
                A.products && A.products.length
                    ? A.products
                    : [
                          {
                              id: "shadow",
                              name: "Shadow Falcon 750",
                              variant: "Black / Size M",
                              price: 75900,
                              image: m0,
                          },
                          {
                              id: "alpine",
                              name: "Alpine Shield",
                              variant: "Black / Size M",
                              price: 68900,
                              image: g0,
                          },
                          {
                              id: "storm",
                              name: "Storm Veil",
                              variant: "Black / Size M",
                              price: 82900,
                              image: _0,
                          },
                          {
                              id: "goggles",
                              name: "Summit Goggles",
                              variant: "Black / One size",
                              price: 15900,
                              image: x0,
                          },
                      ],
            Gn = (s) =>
                new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(s / 100)
        function v0() {
            const s = new AbortController(),
                e = (u, d, f) => u.addEventListener(d, f, { signal: s.signal }),
                t = document.querySelector(".cart"),
                n = t.querySelector("#cart-items"),
                i = document.querySelector("#cart-item-template"),
                r = t.querySelector("#checkout-form"),
                a = document.querySelector(".order-preview"),
                o = new Map(ya.map((u) => [u.id, { ...u, quantity: 1 }]))
            let c
            function l(u = !1) {
                const d = [...o.values()].reduce((m, p) => m + p.quantity, 0),
                    f = [...o.values()].reduce(
                        (m, p) => m + p.price * p.quantity,
                        0
                    ),
                    g = r.elements.delivery.value === "courier",
                    _ = d && g ? 1500 : 0
                c = { quantity: d, subtotal: f, delivery: _, total: f + _ }
                for (const m of n.children) {
                    const p = o.get(m.dataset.id)
                    ;((m.querySelector(".cart-quantity__value").textContent =
                        p.quantity),
                        m
                            .querySelector(".cart-quantity")
                            .setAttribute(
                                "aria-label",
                                `${p.name} quantity: ${p.quantity}`
                            ),
                        (m.querySelector('[data-quantity="-1"]').disabled =
                            p.quantity === 1),
                        (m.querySelector('[data-quantity="1"]').disabled =
                            p.quantity === 9),
                        (m.querySelector(".cart-item__total").textContent = Gn(
                            p.price * p.quantity
                        )))
                }
                ;((t.querySelector(".cart-count").textContent = String(
                    d
                ).padStart(2, "0")),
                    t
                        .querySelector(".cart-count")
                        .setAttribute(
                            "aria-label",
                            `${d} ${d === 1 ? "item" : "items"}`
                        ),
                    (t.querySelector("#cart-item-count").textContent = d
                        ? `You have ${d} ${d === 1 ? "item" : "items"} ready for your next adventure.`
                        : "There’s room for your next adventure."),
                    (t.querySelector("#cart-subtotal").textContent = Gn(f)),
                    (t.querySelector("#cart-delivery").textContent = _
                        ? Gn(_)
                        : "Complimentary"),
                    (t.querySelector("#cart-total").textContent = Gn(c.total)),
                    (t.querySelector(".checkout-submit__total").textContent =
                        `— ${Gn(c.total)}`),
                    (t.querySelector(".checkout-submit").disabled = !d),
                    (t.querySelector(".cart-table").hidden = !d),
                    (t.querySelector(".cart-empty").hidden = !!d),
                    u &&
                        (t.querySelector("#cart-announcement").textContent =
                            `${d} ${d === 1 ? "item" : "items"} in your bag. Total ${Gn(c.total)}.`))
            }
            function h() {
                n.replaceChildren()
                for (const u of o.values()) {
                    const d = i.content.querySelector("tr").cloneNode(!0)
                    ;((d.dataset.id = u.id),
                        (d.querySelector("h3").textContent = u.name),
                        (d.querySelector(".cart-item__variant").textContent =
                            u.variant),
                        (d.querySelector(".cart-item__unit-price").textContent =
                            Gn(u.price)),
                        (d.querySelector("img").src = u.image),
                        d
                            .querySelector(".cart-quantity")
                            .setAttribute("role", "group"),
                        d
                            .querySelector('[data-quantity="-1"]')
                            .setAttribute(
                                "aria-label",
                                `Decrease ${u.name} quantity`
                            ),
                        d
                            .querySelector('[data-quantity="1"]')
                            .setAttribute(
                                "aria-label",
                                `Increase ${u.name} quantity`
                            ),
                        d
                            .querySelector(".cart-item__remove")
                            .setAttribute("aria-label", `Remove ${u.name}`),
                        n.appendChild(d))
                }
                l()
            }
            return (
                e(n, "click", (u) => {
                    const d = u.target.closest("button"),
                        f = d?.closest(".cart-item")
                    if (!f) return
                    const g = o.get(f.dataset.id)
                    if (d.classList.contains("cart-item__remove")) {
                        const _ = (
                            f.nextElementSibling || f.previousElementSibling
                        )?.querySelector(".cart-item__remove")
                        ;(o.delete(g.id),
                            f.remove(),
                            l(!0),
                            (_ || t.querySelector(".cart-restore")).focus({
                                preventScroll: !0,
                            }))
                    } else
                        ((g.quantity = Math.max(
                            1,
                            Math.min(9, g.quantity + Number(d.dataset.quantity))
                        )),
                            l(!0))
                }),
                e(r, "change", () => l(!0)),
                e(t.querySelector(".cart-restore"), "click", () => {
                    for (const u of ya) o.set(u.id, { ...u, quantity: 1 })
                    ;(h(),
                        n
                            .querySelector('[data-quantity="1"]')
                            .focus({ preventScroll: !0 }))
                }),
                e(
                    document.querySelector(".collection-copy__order"),
                    "click",
                    () => {
                        o.has("shadow") ||
                            (o.set("shadow", { ...ya[0], quantity: 1 }), h())
                    }
                ),
                e(r, "submit", (u) => {
                    ;(u.preventDefault(),
                        c.quantity &&
                            ((a.querySelector(
                                "#preview-item-count"
                            ).textContent =
                                `${c.quantity} ${c.quantity === 1 ? "item" : "items"}`),
                            (a.querySelector("#preview-delivery").textContent =
                                r.elements.delivery.value === "courier"
                                    ? "Doorstep delivery"
                                    : "Store pickup"),
                            (a.querySelector("#preview-total").textContent = Gn(
                                c.total
                            )),
                            a.showModal()))
                }),
                e(a.querySelector(".order-preview__close"), "click", () =>
                    a.close()
                ),
                e(a.querySelector(".order-preview__return"), "click", () =>
                    a.close()
                ),
                h(),
                () => {
                    ;(s.abort(), a.open && a.close())
                }
            )
        }
        const Sa = (s, e, t) => Math.max(e, Math.min(t, s))
        function M0({ hero: s, reducedMotion: e, requestFrame: t }) {
            const n = document.documentElement,
                i = document.querySelector(".cart-stage"),
                r = i.querySelector(".cart"),
                a = document.querySelector("#gear"),
                o = document.querySelector(".collection-copy__order"),
                c = window.matchMedia("(max-width: 1023px)"),
                l = new AbortController(),
                h = (A, C, R, U = {}) =>
                    A.addEventListener(C, R, { ...U, signal: l.signal })
            let u = {
                    start: 0,
                    end: 1,
                    distance: 1,
                    height: 1,
                    width: 1,
                    split: 2 / 3,
                    x: 0,
                    y: 0,
                    scale: 0.1,
                },
                d = 0,
                f = null,
                g = null
            n.classList.add("has-cart-transition")
            function _() {
                const A = s.clientHeight,
                    C = s.clientWidth,
                    R = a.getBoundingClientRect().top + window.scrollY,
                    U = i.getBoundingClientRect().top + window.scrollY,
                    S = document.documentElement.clientHeight,
                    M = c.matches ? U - S : R,
                    P =
                        r.querySelector(
                            '[data-id="shadow"] .cart-item__image'
                        ) || r.querySelector(".cart-item__image")
                let B = 0,
                    k = 0
                if (P)
                    for (let X = P; X && X !== r; X = X.offsetParent)
                        ((B += X.offsetLeft), (k += X.offsetTop))
                const K = P?.offsetHeight || 86,
                    W = P?.offsetWidth || 78
                return (
                    (u = {
                        start: M,
                        end: U,
                        gear: R,
                        distance: Math.max(1, c.matches ? S * 0.5 : U - M),
                        height: A,
                        width: C,
                        split: r.querySelector(".cart-bag").offsetWidth / C,
                        x: B + W / 2 - C / 2,
                        y: k + K / 2 - A / 2,
                        scale: K / A,
                    }),
                    m(),
                    u
                )
            }
            function m() {
                const A = c.matches
                    ? 0
                    : Sa(u.end - window.scrollY, 0, u.distance)
                r.style.setProperty("--cart-pin", `${-A}px`)
            }
            function p(A) {
                m()
                const R = e.matches ? 0 : A.travel
                ;(s.style.setProperty("--cart-exit", A.exit.toFixed(5)),
                    s.style.setProperty(
                        "--cart-gallery-exit",
                        A.galleryExit.toFixed(5)
                    ),
                    s.style.setProperty(
                        "--cart-model-opacity",
                        A.model.toFixed(5)
                    ),
                    s.style.setProperty("--cart-model-x", `${u.x * R}px`),
                    s.style.setProperty("--cart-model-y", `${u.y * R}px`),
                    s.style.setProperty(
                        "--cart-model-scale",
                        (1 + (u.scale - 1) * R).toFixed(5)
                    ),
                    s.style.setProperty("--cart-edge-feather", `${R * 14}%`))
                const U = c.matches ? 0.58 : 0.5083
                if (
                    (s.style.setProperty(
                        "--collection-panel-left",
                        `${(U + (u.split - U) * A.boundary) * 100}%`
                    ),
                    r.style.setProperty(
                        "--cart-progress",
                        A.progress.toFixed(5)
                    ),
                    r.style.setProperty("--cart-surface", A.surface.toFixed(5)),
                    s.classList.toggle("hero--cart", A.progress > 0.001),
                    g !== A.accessible &&
                        ((g = A.accessible),
                        (r.inert = !g),
                        r.setAttribute("aria-hidden", String(!g))),
                    !d && f && (f === "cart" ? g : A.progress < 0.01))
                ) {
                    const M = c.matches
                        ? document.querySelector(".collection-mobile-prompt")
                        : o
                    ;((f === "cart" ? r : M).focus({ preventScroll: !0 }),
                        (f = null))
                }
            }
            function b() {
                ;(cancelAnimationFrame(d), (d = 0), (f = null))
            }
            ;(h(document, "click", (A) => {
                const C = A.target.closest(
                    'a[href="#cart"], a.cart-back[href="#gear"]'
                )
                if (
                    !C ||
                    A.defaultPrevented ||
                    A.button !== 0 ||
                    A.metaKey ||
                    A.ctrlKey ||
                    A.shiftKey ||
                    A.altKey
                )
                    return
                ;(A.preventDefault(), b(), _())
                const R = C.getAttribute("href"),
                    U = R === "#cart" ? u.end : u.gear,
                    S = window.scrollY
                if (
                    (location.hash !== R && history.pushState(null, "", R),
                    (f = R.slice(1)),
                    e.matches || Math.abs(S - U) < 1)
                ) {
                    ;(window.scrollTo({ top: U, behavior: "instant" }),
                        m(),
                        t())
                    return
                }
                const M = c.matches ? 900 : 1450,
                    P = performance.now(),
                    B = (k) => {
                        const K = Sa((k - P) / M, 0, 1),
                            W = (1 - Math.cos(Math.PI * K)) / 2
                        ;(window.scrollTo({
                            top: S + (U - S) * W,
                            behavior: "instant",
                        }),
                            m(),
                            K < 1
                                ? (d = requestAnimationFrame(B))
                                : ((d = 0), t()))
                    }
                d = requestAnimationFrame(B)
            }),
                h(window, "wheel", b, { passive: !0 }),
                h(window, "touchstart", b, { passive: !0 }),
                h(window, "keydown", (A) => {
                    ;[
                        "ArrowUp",
                        "ArrowDown",
                        "PageUp",
                        "PageDown",
                        "Home",
                        "End",
                        " ",
                        "Escape",
                        "Tab",
                    ].includes(A.key) && b()
                }),
                h(window, "popstate", b))
            let T = window.innerWidth
            ;(h(window, "resize", () => {
                ;((!c.matches || window.innerWidth !== T) && b(),
                    (T = window.innerWidth))
            }),
                h(e, "change", b))
            const y = new ResizeObserver(() => {
                ;(_(), t())
            })
            return (
                y.observe(r),
                {
                    measure: _,
                    pin: m,
                    render: p,
                    get target() {
                        return Sa((window.scrollY - u.start) / u.distance, 0, 1)
                    },
                    dispose() {
                        ;(b(),
                            l.abort(),
                            y.disconnect(),
                            n.classList.remove("has-cart-transition"),
                            (r.inert = !1),
                            r.removeAttribute("aria-hidden"))
                    },
                }
            )
        }
        function y0({ onChange: s }) {
            const e = window.matchMedia("(max-width: 1023px)"),
                t = new AbortController(),
                n = document.querySelector(".hero"),
                i = document.querySelector(".mobile-collection-details"),
                r = document.querySelector(".collection-copy"),
                a = document.querySelector(".hero__logo"),
                o = document.createComment("collection copy"),
                c = document.createComment("hero logo")
            ;(r.before(o), a.before(c))
            const l = document.querySelector(".rain-panel"),
                h = l.querySelector(".rain-panel__toggle"),
                u = l.querySelector(".rain-panel__controls")
            let d = !1
            function f() {
                ;((u.hidden = e.matches && !d),
                    h.setAttribute("aria-expanded", String(d)),
                    h.setAttribute(
                        "aria-label",
                        d ? "Hide rain controls" : "Show rain controls"
                    ))
            }
            function g() {
                ;(e.matches
                    ? ((i.hidden = !1),
                      i.appendChild(r),
                      n.appendChild(a),
                      (r.inert = !1),
                      r.removeAttribute("aria-hidden"))
                    : (o.after(r), c.after(a), (i.hidden = !0)),
                    f())
            }
            return (
                h.addEventListener(
                    "click",
                    () => {
                        ;((d = !d), f())
                    },
                    { signal: t.signal }
                ),
                e.addEventListener(
                    "change",
                    () => {
                        ;(g(), s())
                    },
                    { signal: t.signal }
                ),
                g(),
                {
                    get active() {
                        return e.matches
                    },
                    dispose() {
                        ;(t.abort(),
                            o.after(r),
                            c.after(a),
                            o.remove(),
                            c.remove(),
                            (i.hidden = !0),
                            (u.hidden = !1))
                    },
                }
            )
        }
        NF_OFF.push(v0())
        const mo = {}
        let ln
        document.querySelectorAll(".rain-control input").forEach((s) => {
            const e = s.closest(".rain-control").querySelector("output"),
                t = () => {
                    const n =
                        ((Number(s.value) - Number(s.min)) /
                            (Number(s.max) - Number(s.min))) *
                        100
                    ;(s.style.setProperty("--range-progress", `${n}%`),
                        (e.value = `${s.value}%`),
                        (mo[s.name] = Number(s.value)),
                        ln && (ln.setSettings(mo), $n()))
                }
            ;(s.addEventListener("input", t, NF_SIG), t())
        })
        const qi = document.querySelector("#model-stage"),
            on = document.querySelector(".hero"),
            S0 = document.querySelector(".experience"),
            E0 = [
                ...document.querySelectorAll(
                    ".rain-panel, .site-nav, .hero__title, .surface-readout, .hero__intro, .hero__logo, .product-callout"
                ),
            ],
            T0 = [
                ...document.querySelectorAll(
                    ".collection-panel, .collection-copy, .collection-title, .collection-mobile-prompt"
                ),
            ],
            b0 = document.querySelector(".collection-gallery__track"),
            dr = document.querySelector(".collection-gallery__pause"),
            vt = window.matchMedia("(prefers-reduced-motion: reduce)"),
            fr = document.querySelector(".rain-panel__pause"),
            A0 = document.querySelector(".surface-readout"),
            xl = document.querySelector(".surface-readout__number")
        let qn = vt.matches,
            Fi = vt.matches,
            go = !1,
            au = !0,
            vl = !0,
            _o = !1,
            An = 0,
            Pi = 0,
            wn = 0,
            Li = 0,
            xo = 0,
            ou = 1
        const qt = new R_({
            alpha: !0,
            antialias: !0,
            powerPreference: "high-performance",
        })
        qt.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
        qt.setClearColor(0, 0)
        qt.outputColorSpace = _t
        qt.toneMapping = Sl
        qt.toneMappingExposure = 0.9
        qi.appendChild(qt.domElement)
        const jn = new Jh(),
            Lt = new wt(35, 1, 0.01, 10),
            Mr = new I(-0.02, 0.77, 0.77),
            vo = new I(0, 0.55, 1.6)
        Lt.position.copy(Mr)
        Lt.lookAt(-0.02, 0.77, 0)
        jn.add(new Id(16777215, 1.3))
        const cu = new Fo(16777215, 2.1)
        cu.position.set(-1.2, 1.6, 1.8)
        jn.add(cu)
        const lu = new Fo(12107464, 1.25)
        lu.position.set(1, 1.3, -1)
        jn.add(lu)
        const Pr = 0.6,
            rr = { yaw: ut.degToRad(6), pitch: ut.degToRad(2), smoothing: 9 },
            As = new ke(),
            sn = new ke(),
            un = new Cn()
        un.position.y = 0.8
        un.rotation.order = "YXZ"
        un.rotation.y = Pr
        jn.add(un)
        let uu = !1,
            Yi = 0,
            fs = 0
        const pr = y0({
                onChange() {
                    ;((_o = null), Go())
                },
            }),
            yr = M0({ hero: on, reducedMotion: vt, requestFrame: $n })
        function Qi() {
            ;((b0.style.animationPlayState =
                go && au && !Fi && !document.hidden ? "running" : "paused"),
                dr.classList.toggle("is-paused", Fi))
            const s = Fi ? "Resume image gallery" : "Pause image gallery"
            ;(dr.setAttribute("aria-label", s), (dr.title = s))
        }
        dr.addEventListener(
            "click",
            () => {
                ;((Fi = !Fi), Qi())
            },
            NF_SIG
        )
        function hu(s, e) {
            ;(on.style.setProperty("--intro-opacity", s.intro.toFixed(4)),
                on.style.setProperty(
                    "--intro-shift",
                    `${-(1 - s.intro) * 80}px`
                ),
                on.style.setProperty("--panel-reveal", s.panel.toFixed(4)),
                on.style.setProperty(
                    "--collection-opacity",
                    s.collection.toFixed(4)
                ),
                on.style.setProperty(
                    "--collection-shift",
                    `${(1 - s.collection) * 48}px`
                ))
            const t = s.intro > 0.1,
                n = s.collection * (1 - e.exit) > 0.5
            if (vl !== t) {
                vl = t
                for (const r of E0)
                    ((r.inert = !t), r.setAttribute("aria-hidden", String(!t)))
            }
            if (_o !== n) {
                _o = n
                for (const r of T0) {
                    if (pr.active && r.classList.contains("collection-copy")) {
                        ;((r.inert = !1), r.removeAttribute("aria-hidden"))
                        continue
                    }
                    ;((r.inert = !n), r.setAttribute("aria-hidden", String(!n)))
                }
            }
            const i = s.galleryActive && e.progress < 0.02
            ;(go !== i && ((go = i), Qi()),
                ln?.setVisibility(s.rain),
                yr.render(e))
        }
        function ko(s, e) {
            ;(Lt.position.lerpVectors(Mr, vo, s.camera),
                vt.matches || (Lt.position.z += e.travel * 0.16),
                Lt.lookAt(Lt.position.x, Lt.position.y, 0))
        }
        function du(s) {
            if (NF_DEAD) return
            Yi = 0
            const e = fs ? Math.min((s - fs) / 1e3, 0.1) : 1 / 60
            ;((fs = s), (An = vt.matches ? Pi : ut.damp(An, Pi, 8, e)))
            const t = Math.abs(An - Pi) < 1e-4
            ;(t && (An = Pi), (wn = vt.matches ? Li : ut.damp(wn, Li, 10, e)))
            const n = Math.abs(wn - Li) < 1e-4
            n && (wn = Li)
            const i = Rr(An, vt.matches),
                r = Cr(wn, vt.matches)
            ;(hu(i, r), ko(i, r))
            const a = (1 - i.camera * 0.7) * (1 - r.travel),
                o = As.y * rr.pitch * a,
                c = As.x * rr.yaw * a
            ;((sn.x = ut.damp(sn.x, o, rr.smoothing, e)),
                (sn.y = ut.damp(sn.y, c, rr.smoothing, e)))
            const l = Math.abs(sn.x - o) < 1e-4 && Math.abs(sn.y - c) < 1e-4
            ;(l && sn.set(o, c),
                un.rotation.set(sn.x, Pr + i.turn + r.turn + sn.y, 0),
                ln?.update(e),
                qt.render(jn, Lt),
                !l || !t || !n || ln?.active
                    ? (Yi = requestAnimationFrame(du))
                    : (fs = 0))
        }
        function $n() {
            !NF_DEAD &&
                !document.hidden &&
                !Yi &&
                (Yi = requestAnimationFrame(du))
        }
        function fu() {
            ;(As.set(0, 0), $n())
        }
        on.addEventListener(
            "pointermove",
            (s) => {
                if (vt.matches || s.pointerType === "touch") return
                const e = on.getBoundingClientRect()
                ;(As.set(
                    ut.clamp(((s.clientX - e.left) / e.width) * 2 - 1, -1, 1),
                    ut.clamp(((s.clientY - e.top) / e.height) * 2 - 1, -1, 1)
                ),
                    $n())
            },
            { passive: !0, signal: NF_AC.signal }
        )
        on.addEventListener("pointerleave", fu, NF_SIG)
        window.addEventListener("blur", fu, NF_SIG)
        function pu() {
            ;(cancelAnimationFrame(Yi),
                (Yi = 0),
                (fs = 0),
                As.set(0, 0),
                sn.set(0, 0),
                un.rotation.set(
                    0,
                    Pr + Rr(An, vt.matches).turn + Cr(wn, vt.matches).turn,
                    0
                ),
                Qi(),
                $n())
        }
        function Vo() {
            ;(fr.classList.toggle("is-paused", qn),
                fr.setAttribute(
                    "aria-label",
                    qn ? "Resume rain simulation" : "Pause rain simulation"
                ),
                (fr.title = qn ? "Resume rain" : "Pause rain"),
                ln?.setPaused(qn),
                $n())
        }
        fr.addEventListener(
            "click",
            () => {
                ;((qn = !qn), Vo())
            },
            NF_SIG
        )
        vt.addEventListener(
            "change",
            () => {
                ;(vt.matches && ((qn = !0), (Fi = !0)), Vo(), Qi(), pu())
            },
            NF_SIG
        )
        document.addEventListener("visibilitychange", pu, NF_SIG)
        Vo()
        Qi()
        function mu() {
            ;((Pi = ut.clamp((window.scrollY - xo) / ou, 0, 1)),
                yr.pin(),
                (Li = yr.target),
                $n())
        }
        window.addEventListener("scroll", mu, {
            passive: !0,
            signal: NF_AC.signal,
        })
        new C_().load(
            u0,
            ({ scene: s }) => {
                if (NF_DEAD) return
                ;((s.position.y -= un.position.y),
                    s.traverse((n) => {
                        n.isMesh && (n.frustumCulled = !1)
                    }),
                    un.add(s),
                    (ln = new p0({
                        renderer: qt,
                        scene: jn,
                        camera: Lt,
                        model: un,
                        onWetness(n) {
                            const i = Math.round(n),
                                r = String(i).padStart(2, "0")
                            xl.textContent !== r &&
                                ((xl.textContent = r),
                                A0.setAttribute(
                                    "aria-label",
                                    `Jacket surface wetness: ${i} percent. Illustrative simulation.`
                                ))
                        },
                    })),
                    ln.setSettings(mo),
                    ln.setPaused(qn))
                const e = Rr(An, vt.matches),
                    t = Cr(wn, vt.matches)
                ;(ln.setVisibility(e.rain),
                    ko(e, t),
                    un.rotation.set(0, Pr + e.turn + t.turn, 0),
                    (uu = !0),
                    qt.render(jn, Lt),
                    qi.classList.add("hero__model--ready"),
                    $n())
            },
            void 0,
            (s) => {
                ;(console.error("Could not load the 3D model:", s),
                    qi.classList.add("hero__model--error"))
            }
        )
        function Go() {
            const s = qi.clientWidth,
                e = qi.clientHeight
            ;((Lt.aspect = s / e), Lt.updateProjectionMatrix())
            const t = document.documentElement.clientHeight,
                n = Math.max(0, e - t)
            if (pr.active) {
                Mr.set(-0.02, 0.72, Math.max(1.15, 0.6 / Lt.aspect))
                const o = Math.min(e * 0.75, t * 0.85),
                    c = e / o,
                    l = 0.5 + ((n + t / 2) / e - 0.5) * c
                vo.set(0.075, l, c / (2 * Math.tan(ut.degToRad(17.5))))
            } else
                (Mr.set(-0.02, 0.77, 0.77),
                    vo.set(
                        0,
                        0.55,
                        1.6 + Math.max(0, 40 / e - 40 / 1080) * 2.4
                    ))
            ;(qt.setPixelRatio(
                Math.min(window.devicePixelRatio, pr.active ? 1.25 : 1.5)
            ),
                (xo = S0.offsetTop + (pr.active ? n : 0)))
            const i = yr.measure()
            ;((ou = Math.max(1, i.gear - xo)),
                mu(),
                uu || ((An = Pi), (wn = Li)))
            const r = Rr(An, vt.matches),
                a = Cr(wn, vt.matches)
            ;(hu(r, a), ko(r, a), qt.setSize(s, e, !1), qt.render(jn, Lt))
        }
        const w0 = new ResizeObserver(Go)
        w0.observe(qi)
        const R0 = new IntersectionObserver(
            ([s]) => {
                ;((au = s.intersectionRatio > 0.01), Qi())
            },
            { threshold: 0.01 }
        )
        R0.observe(on)
        Go()
        // Full teardown so the engine can be restarted on remount (preview reload, hot reload).
        const NF_DISPOSE = () => {
            if (NF_DEAD) return
            NF_DEAD = true
            NF_AC.abort()
            cancelAnimationFrame(Yi)
            Yi = 0
            for (const f of [
                () => w0.disconnect(),
                () => R0.disconnect(),
                ...NF_OFF,
                () => yr.dispose(),
                () => pr.dispose(),
                () => ln && ln.dispose(),
            ])
                try {
                    f && f()
                } catch (e) {}
            try {
                jn.traverse((o) => {
                    if (o.geometry) o.geometry.dispose()
                    if (o.material)
                        for (const mt of [].concat(o.material)) {
                            for (const k in mt)
                                mt[k] && mt[k].isTexture && mt[k].dispose()
                            mt.dispose()
                        }
                })
                qt.dispose()
                qt.forceContextLoss()
                qt.domElement.remove()
            } catch (e) {}
            b0.style.animationPlayState = ""
            qi.classList.remove("hero__model--ready")
            document.documentElement.classList.remove("nfx-page")
            document.documentElement.style.scrollBehavior = ""
            if (window.__nfEngine && window.__nfEngine.hero === on)
                window.__nfEngine = null
            window.__nfStarted = false
        }
        window.__nfEngine = { hero: on, dispose: NF_DISPOSE }
        return NF_DISPOSE
    } catch (e) {
        console.error("[NF] engine failed", e)
        NF_AC.abort()
        window.__nfStarted = false
        return () => {}
    }
}
