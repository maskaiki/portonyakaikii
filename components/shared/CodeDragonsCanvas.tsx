"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function createCyberCodeTexture(glowHex: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = glowHex;
  ctx.fillStyle = glowHex;
  // Tanpa ctx.shadowBlur (karena material Three.js sudah memakai emissiveIntensity tinggi!)

  ctx.lineWidth = 2;
  for (let i = 0; i < 24; i++) {
    const x1 = (i * 53) % 512;
    const y1 = (i * 71) % 512;
    const x2 = x1 + (i % 2 === 0 ? 1 : -1) * 60;
    const y2 = y1 + 70;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y1);
    ctx.lineTo(x2 + 22, y2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x1, y1, 3, 0, Math.PI * 2);
    ctx.arc(x2 + 22, y2, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.font = "bold 12px monospace";
  const snippets = [
    "1 0 1 1 0 1",
    "0 1 1 0 1 1",
    "system(node){",
    "  return 1;",
    "}",
    "init_core();",
  ];

  for (let col = 0; col < 8; col++) {
    for (let row = 0; row < 14; row++) {
      const text = snippets[(col + row) % snippets.length];
      ctx.fillText(text, col * 64 + 6, row * 36 + 18);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// Build a 3D Extruded "<>" or "[]" Holo-Crown above the Dragon's Head
function create3DSymbolCrest(symbol: "<>" | "[]", colorHex: number): THREE.Group {
  const group = new THREE.Group();
  const mat = new THREE.MeshBasicMaterial({ color: colorHex });
  const barGeo = new THREE.BoxGeometry(1.4, 7.5, 1.4);

  if (symbol === "<>") {
    const l1 = new THREE.Mesh(barGeo, mat);
    l1.position.set(-4.5, 2.2, 0);
    l1.rotation.z = -0.65;
    const l2 = new THREE.Mesh(barGeo, mat);
    l2.position.set(-4.5, -2.2, 0);
    l2.rotation.z = 0.65;

    const r1 = new THREE.Mesh(barGeo, mat);
    r1.position.set(4.5, 2.2, 0);
    r1.rotation.z = 0.65;
    const r2 = new THREE.Mesh(barGeo, mat);
    r2.position.set(4.5, -2.2, 0);
    r2.rotation.z = -0.65;

    group.add(l1, l2, r1, r2);
  } else {
    const topGeo = new THREE.BoxGeometry(3.8, 1.4, 1.4);
    const vL = new THREE.Mesh(barGeo, mat);
    vL.position.set(-5, 0, 0);
    const tL = new THREE.Mesh(topGeo, mat);
    tL.position.set(-3.8, 3.2, 0);
    const bL = new THREE.Mesh(topGeo, mat);
    bL.position.set(-3.8, -3.2, 0);

    const vR = new THREE.Mesh(barGeo, mat);
    vR.position.set(5, 0, 0);
    const tR = new THREE.Mesh(topGeo, mat);
    tR.position.set(3.8, 3.2, 0);
    const bR = new THREE.Mesh(topGeo, mat);
    bR.position.set(3.8, -3.2, 0);

    group.add(vL, tL, bL, vR, tR, bR);
  }

  return group;
}

interface BuiltDragonRig {
  root: THREE.Group;
  neckJoints: THREE.Group[];
  tailJoints: THREE.Group[];
  leftShoulder: THREE.Group;
  leftElbow: THREE.Group;
  rightShoulder: THREE.Group;
  rightElbow: THREE.Group;
  jaw: THREE.Group;
  foreLegs: THREE.Group[];
  portalRing: THREE.Mesh;
}

function buildLowPolyCyberDragon(
  symbol: "<>" | "[]",
  glowHexStr: string,
  glowHexNum: number,
  armorColorHex: number
): BuiltDragonRig {
  const root = new THREE.Group();
  const codeTex = createCyberCodeTexture(glowHexStr);

  // Matte Black Faceted Obsidian Armor with Glowing Code Circuitry
  const armorMat = new THREE.MeshStandardMaterial({
    color: armorColorHex,
    roughness: 0.32,
    metalness: 0.78,
    flatShading: true,
    emissive: new THREE.Color(glowHexNum),
    emissiveMap: codeTex,
    emissiveIntensity: 1.65,
  });

  const darkPlateMat = new THREE.MeshStandardMaterial({
    color: 0x070a12,
    roughness: 0.4,
    metalness: 0.85,
    flatShading: true,
  });

  const wingMembraneMat = new THREE.MeshStandardMaterial({
    color: 0x080d18,
    roughness: 0.38,
    metalness: 0.65,
    flatShading: true,
    side: THREE.DoubleSide,
    emissive: new THREE.Color(glowHexNum),
    emissiveMap: codeTex,
    emissiveIntensity: 2.1,
  });

  const glowingEyeMat = new THREE.MeshBasicMaterial({
    color: glowHexNum,
  });

  // ── 1. TORSO & S-CURVE NECK (10 Articulated Faceted Segments) ─────
  const neckJoints: THREE.Group[] = [];
  let parentGroup = root;

  const spineRadii = [8.5, 9.8, 10.5, 9.2, 7.6, 6.4, 5.5, 4.8, 4.4, 4.0];
  for (let i = 0; i < spineRadii.length; i++) {
    const joint = new THREE.Group();
    if (i === 0) {
      joint.position.set(0, 0, 0);
    } else {
      joint.position.set(0, 5.2, 3.8);
    }

    const r = spineRadii[i];
    // Faceted Low-Poly Octagonal Armor Segment
    const segGeo = new THREE.CylinderGeometry(r * 0.88, r, 7.2, 7, 1);
    segGeo.rotateX(Math.PI * 0.38);
    const segMesh = new THREE.Mesh(segGeo, armorMat);
    joint.add(segMesh);

    // Front Chest Plate (Faceted Shield)
    const chestGeo = new THREE.BoxGeometry(r * 1.35, 5.5, r * 0.7);
    const chestMesh = new THREE.Mesh(chestGeo, armorMat);
    chestMesh.position.set(0, -0.5, r * 0.65);
    joint.add(chestMesh);

    // Sharp Low-Poly Dorsal Spine Spike on Back
    const spikeGeo = new THREE.ConeGeometry(r * 0.28, 6.5, 4);
    spikeGeo.rotateX(-Math.PI * 0.35);
    const spikeMesh = new THREE.Mesh(spikeGeo, darkPlateMat);
    spikeMesh.position.set(0, 1.5, -r * 0.85);
    joint.add(spikeMesh);

    parentGroup.add(joint);
    neckJoints.push(joint);
    parentGroup = joint;
  }

  // ── 2. SCULPTED 3D LOW-POLY DRAGON HEAD, GLOWING EYES, JAW & HORNS ─
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 5.0, 5.5);
  neckJoints[neckJoints.length - 1].add(headGroup);

  // Upper Cranium & Snout (Faceted Low-Poly)
  const skullGeo = new THREE.ConeGeometry(6.8, 18, 6);
  skullGeo.rotateX(Math.PI * 0.52);
  skullGeo.scale(0.85, 0.72, 1);
  const skullMesh = new THREE.Mesh(skullGeo, armorMat);
  skullMesh.position.set(0, 1.5, 6);
  headGroup.add(skullMesh);

  // Glowing Angular Eyes (Left & Right)
  const eyeGeo = new THREE.OctahedronGeometry(1.7, 0);
  eyeGeo.scale(1.6, 0.65, 0.8);
  const leftEye = new THREE.Mesh(eyeGeo, glowingEyeMat);
  leftEye.position.set(3.8, 2.2, 5.2);
  leftEye.rotation.y = 0.4;
  const rightEye = new THREE.Mesh(eyeGeo, glowingEyeMat);
  rightEye.position.set(-3.8, 2.2, 5.2);
  rightEye.rotation.y = -0.4;
  headGroup.add(leftEye, rightEye);

  // Articulated Lower Jaw with Sharp Teeth
  const jaw = new THREE.Group();
  jaw.position.set(0, -1.2, 1.5);
  const jawGeo = new THREE.ConeGeometry(5.2, 14, 5);
  jawGeo.rotateX(Math.PI * 0.55);
  jawGeo.scale(0.78, 0.5, 1);
  const jawMesh = new THREE.Mesh(jawGeo, darkPlateMat);
  jawMesh.position.set(0, -1.0, 5.5);
  jaw.add(jawMesh);

  // Teeth along Upper & Lower Jaw
  const toothGeo = new THREE.ConeGeometry(0.45, 2.1, 4);
  for (let t = 0; t < 4; t++) {
    const zPos = 4 + t * 2.2;
    const spread = 2.8 - t * 0.45;
    for (const side of [-1, 1]) {
      const uTooth = new THREE.Mesh(toothGeo, glowingEyeMat);
      uTooth.position.set(side * spread, -0.4, zPos);
      uTooth.rotation.x = Math.PI;
      headGroup.add(uTooth);

      const lTooth = new THREE.Mesh(toothGeo, glowingEyeMat);
      lTooth.position.set(side * (spread * 0.85), 0.2, zPos - 0.5);
      jaw.add(lTooth);
    }
  }
  headGroup.add(jaw);

  // 4 Swept-Back Faceted Low-Poly Horns
  for (const side of [-1, 1]) {
    const mainHornGeo = new THREE.ConeGeometry(2.1, 19, 5);
    mainHornGeo.rotateX(-Math.PI * 0.36);
    mainHornGeo.rotateZ(side * -0.28);
    const mainHorn = new THREE.Mesh(mainHornGeo, armorMat);
    mainHorn.position.set(side * 3.8, 6.5, -4.5);
    headGroup.add(mainHorn);

    const subHornGeo = new THREE.ConeGeometry(1.3, 11, 5);
    subHornGeo.rotateX(-Math.PI * 0.42);
    subHornGeo.rotateZ(side * -0.42);
    const subHorn = new THREE.Mesh(subHornGeo, darkPlateMat);
    subHorn.position.set(side * 4.8, 3.2, -3.0);
    headGroup.add(subHorn);
  }

  // 3D Extruded "<>" or "[]" Crest Floating Above Forehead
  const crest = create3DSymbolCrest(symbol, glowHexNum);
  crest.position.set(0, 11.5, 4);
  headGroup.add(crest);

  // ── 3. DUAL-JOINTED 3D FLAPPING LOW-POLY CYBER WINGS ──────────────
  const buildWing = (side: 1 | -1) => {
    const shoulder = new THREE.Group();
    shoulder.position.set(side * 8.5, 2.0, -1.0);

    // Upper Wing Bone (Shoulder -> Elbow)
    const armLen = 28;
    const armGeo = new THREE.CylinderGeometry(1.4, 2.2, armLen, 5);
    armGeo.rotateZ(side * -Math.PI * 0.5);
    const armMesh = new THREE.Mesh(armGeo, darkPlateMat);
    armMesh.position.set(side * (armLen * 0.5), 4, 0);
    armMesh.rotation.z = side * 0.28;
    shoulder.add(armMesh);

    const elbow = new THREE.Group();
    elbow.position.set(side * armLen, 8, 0);
    shoulder.add(elbow);

    // Outer Wing Spar & 4 Wing Fingers + Faceted Cyber Membranes
    const fingerConfigs = [
      { angZ: 0.12, angY: -0.05, len: 56 },
      { angZ: -0.18, angY: -0.12, len: 52 },
      { angZ: -0.48, angY: -0.18, len: 44 },
      { angZ: -0.78, angY: -0.22, len: 34 },
    ];

    const tipPoints: THREE.Vector3[] = [];

    fingerConfigs.forEach((fc) => {
      const fGeo = new THREE.ConeGeometry(1.1, fc.len, 4);
      fGeo.translate(0, fc.len * 0.5, 0);
      const fMesh = new THREE.Mesh(fGeo, darkPlateMat);
      fMesh.rotation.z = side * (-Math.PI * 0.5 + fc.angZ);
      fMesh.rotation.y = side * fc.angY;
      elbow.add(fMesh);

      const dir = new THREE.Vector3(0, fc.len, 0).applyEuler(fMesh.rotation);
      tipPoints.push(dir);
    });

    // Construct Faceted Low-Poly Wing Webbing Panels Between Fingers
    for (let w = 0; w < tipPoints.length - 1; w++) {
      const p1 = tipPoints[w];
      const p2 = tipPoints[w + 1];
      const webGeo = new THREE.BufferGeometry();
      const verts = new Float32Array([
        0, 0, 0,
        p1.x, p1.y, p1.z,
        p2.x, p2.y, p2.z,
      ]);
      const uvs = new Float32Array([0.5, 0, 0, 1, 1, 1]);
      webGeo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
      webGeo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
      webGeo.computeVertexNormals();

      const webMesh = new THREE.Mesh(webGeo, wingMembraneMat);
      elbow.add(webMesh);
    }

    // Inner Wing Membrane connecting Elbow to Torso
    const innerGeo = new THREE.BufferGeometry();
    const lastTip = tipPoints[tipPoints.length - 1];
    const innerVerts = new Float32Array([
      0, 0, 0,
      lastTip.x, lastTip.y, lastTip.z,
      -side * armLen, -18, -6,
    ]);
    const innerUvs = new Float32Array([0.5, 0, 1, 1, 0, 1]);
    innerGeo.setAttribute("position", new THREE.BufferAttribute(innerVerts, 3));
    innerGeo.setAttribute("uv", new THREE.BufferAttribute(innerUvs, 2));
    innerGeo.computeVertexNormals();
    elbow.add(new THREE.Mesh(innerGeo, wingMembraneMat));

    return { shoulder, elbow };
  };

  const leftWing = buildWing(1);
  const rightWing = buildWing(-1);
  neckJoints[2].add(leftWing.shoulder);
  neckJoints[2].add(rightWing.shoulder);

  // ── 4. CLAWED 3D FORELEGS & HINDLEGS (NO PEDESTAL STAND!) ─────────
  const foreLegs: THREE.Group[] = [];
  for (const side of [-1, 1]) {
    const legGroup = new THREE.Group();
    legGroup.position.set(side * 8.2, -2, 6);

    const thighGeo = new THREE.CylinderGeometry(2.8, 1.8, 14, 5);
    const thigh = new THREE.Mesh(thighGeo, armorMat);
    thigh.position.set(0, -6, 3);
    thigh.rotation.x = 0.45;
    legGroup.add(thigh);

    const forearmGeo = new THREE.CylinderGeometry(1.7, 1.1, 12, 5);
    const forearm = new THREE.Mesh(forearmGeo, darkPlateMat);
    forearm.position.set(0, -13, 8);
    forearm.rotation.x = -0.35;
    legGroup.add(forearm);

    // 3 Sharp Claws
    for (let c = -1; c <= 1; c++) {
      const clawGeo = new THREE.ConeGeometry(0.6, 4.5, 4);
      clawGeo.rotateX(Math.PI * 0.4);
      const claw = new THREE.Mesh(clawGeo, darkPlateMat);
      claw.position.set(c * 1.3, -18, 11.5);
      legGroup.add(claw);
    }

    neckJoints[2].add(legGroup);
    foreLegs.push(legGroup);
  }

  // ── 5. 18-SEGMENT ARTICULATED 3D WHIPPING TAIL + SPEARHEAD TIP ────
  const tailJoints: THREE.Group[] = [];
  let tailParent = neckJoints[0];

  for (let i = 0; i < 18; i++) {
    const tJoint = new THREE.Group();
    tJoint.position.set(0, -4.6, -2.8);

    const tRad = Math.max(1.1, 7.8 * (1 - i / 19));
    const tSegGeo = new THREE.CylinderGeometry(tRad * 0.88, tRad, 5.8, 6);
    tSegGeo.rotateX(-Math.PI * 0.22);
    const tSegMesh = new THREE.Mesh(tSegGeo, armorMat);
    tJoint.add(tSegMesh);

    // Dorsal Tail Spike
    if (i % 2 === 0 && i < 15) {
      const tSpikeGeo = new THREE.ConeGeometry(tRad * 0.35, 4.5, 4);
      tSpikeGeo.rotateX(-Math.PI * 0.4);
      const tSpike = new THREE.Mesh(tSpikeGeo, darkPlateMat);
      tSpike.position.set(0, 0, -tRad);
      tJoint.add(tSpike);
    }

    // Spearhead Arrow Tail Tip at Last Segment (Exact Image 3 Match!)
    if (i === 17) {
      const spearGeo = new THREE.ConeGeometry(3.8, 11, 4);
      spearGeo.rotateX(Math.PI);
      spearGeo.scale(0.55, 1, 1.35);
      const spearMesh = new THREE.Mesh(spearGeo, armorMat);
      spearMesh.position.set(0, -5, -1);
      tJoint.add(spearMesh);
    }

    tailParent.add(tJoint);
    tailJoints.push(tJoint);
    tailParent = tJoint;
  }

  // 3D Glowing Portal Ring for Box Entry/Exit
  const portalGeo = new THREE.RingGeometry(18, 22, 6);
  const portalMat = new THREE.MeshBasicMaterial({
    color: glowHexNum,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0,
  });
  const portalRing = new THREE.Mesh(portalGeo, portalMat);

  return {
    root,
    neckJoints,
    tailJoints,
    leftShoulder: leftWing.shoulder,
    leftElbow: leftWing.elbow,
    rightShoulder: rightWing.shoulder,
    rightElbow: rightWing.elbow,
    jaw,
    foreLegs,
    portalRing,
  };
}

export function CodeDragonsCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      3000
    );
    camera.position.set(0, 0, 560);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      precision: "mediump",
      stencil: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // Dramatic Studio Rim Lighting for Sharp Low-Poly Facets
    scene.add(new THREE.AmbientLight(0xdbeafe, 1.6));

    const sunLight = new THREE.DirectionalLight(0xffffff, 3.8);
    sunLight.position.set(250, 400, 320);
    scene.add(sunLight);

    const rimLightLeft = new THREE.DirectionalLight(0x00d2ff, 3.2);
    rimLightLeft.position.set(-300, 150, -100);
    scene.add(rimLightLeft);

    const rimLightRight = new THREE.DirectionalLight(0x0055ff, 2.8);
    rimLightRight.position.set(300, -150, 180);
    scene.add(rimLightRight);

    // Build Twin 3D Low-Poly Cyber Dragons: "<>" (Electric Cyan-Blue) & "[]" (Deep Royal Cobalt)
    const dragon1 = buildLowPolyCyberDragon("<>", "#00E5FF", 0x00e5ff, 0x101624);
    const dragon2 = buildLowPolyCyberDragon("[]", "#3B82F6", 0x3b82f6, 0x0b101d);

    scene.add(dragon1.root, dragon1.portalRing);
    scene.add(dragon2.root, dragon2.portalRing);

    const flights = [
      {
        rig: dragon1,
        progress: 0.1,
        speed: 0.00075,
        worldPageY: 520,
        phase: 0,
        curve: new THREE.CatmullRomCurve3(
          [
            new THREE.Vector3(-320, 80, -40),
            new THREE.Vector3(-80, 130, 95),
            new THREE.Vector3(170, -50, 110),
            new THREE.Vector3(330, 75, -50),
            new THREE.Vector3(60, 140, -90),
            new THREE.Vector3(-170, -75, 75),
          ],
          true,
          "catmullrom",
          0.5
        ),
      },
      {
        rig: dragon2,
        progress: 0.55,
        speed: 0.00068,
        worldPageY: 1650,
        phase: 2.4,
        curve: new THREE.CatmullRomCurve3(
          [
            new THREE.Vector3(320, -60, -40),
            new THREE.Vector3(75, 115, 105),
            new THREE.Vector3(-165, -55, 95),
            new THREE.Vector3(-330, 85, -60),
            new THREE.Vector3(-45, -120, -95),
            new THREE.Vector3(175, 95, 65),
          ],
          true,
          "catmullrom",
          0.5
        ),
      },
    ];

    const clock = new THREE.Clock();
    let animId: number = 0;
    let isRunning = false;
    let isTabVisible = !document.hidden;

    const startLoopIfNeeded = () => {
      if (!isRunning && isTabVisible && window.scrollY <= 3800) {
        isRunning = true;
        animId = requestAnimationFrame(animate);
      }
    };

    const onScroll = () => {
      if (window.scrollY <= 3800) {
        startLoopIfNeeded();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        startLoopIfNeeded();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const animate = () => {
      if (!isTabVisible || window.scrollY > 3800) {
        isRunning = false;
        return;
      }
      animId = requestAnimationFrame(animate);

      const scrollY = window.scrollY;
      const t = clock.getElapsedTime();

      for (const f of flights) {
        f.progress = (f.progress + f.speed) % 1;
        const pos = f.curve.getPointAt(f.progress);
        const tangent = f.curve.getTangentAt(f.progress).normalize();

        // World-space Y anchor so dragons stay in their page section and NEVER stick to scroll!
        const worldY = pos.y + (scrollY - f.worldPageY) * 0.72;
        const flapCycle = t * 5.2 + f.phase;
        const wingLift = Math.sin(flapCycle) * 11;

        f.rig.root.position.set(pos.x, worldY + wingLift, pos.z);

        // Smooth 3D Aerodynamic Banking, Pitching & Heading
        const targetYaw = Math.atan2(tangent.x, tangent.z) * 0.45;
        const targetPitch = -tangent.y * 0.4 + Math.cos(flapCycle) * 0.08;
        const targetRoll = -tangent.x * 0.35;

        f.rig.root.rotation.set(targetPitch, targetYaw, targetRoll);

        // 1. Natural 2-Joint Wing Flapping Physics (Shoulder + Lagging Elbow Flex)
        const shoulderAngle = Math.sin(flapCycle) * 0.62;
        const elbowAngle = Math.sin(flapCycle - 0.75) * 0.48;

        f.rig.leftShoulder.rotation.z = shoulderAngle;
        f.rig.leftElbow.rotation.z = elbowAngle;
        f.rig.rightShoulder.rotation.z = -shoulderAngle;
        f.rig.rightElbow.rotation.z = -elbowAngle;

        // 2. Serpentine S-Curve Neck Undulation & Breathing Jaw
        f.rig.neckJoints.forEach((joint, idx) => {
          joint.rotation.x = Math.sin(flapCycle - idx * 0.35) * 0.07;
          joint.rotation.y = Math.cos(t * 2.5 + idx * 0.4) * 0.06;
        });
        f.rig.jaw.rotation.x = 0.18 + Math.max(0, Math.sin(t * 3.2 + f.phase)) * 0.28;

        // 3. Foreleg Aerodynamic Tucking
        f.rig.foreLegs.forEach((leg, lIdx) => {
          leg.rotation.x = 0.25 + Math.sin(flapCycle + lIdx) * 0.14;
        });

        // 4. 18-Segment Whipping Tail Physics
        f.rig.tailJoints.forEach((tJoint, idx) => {
          tJoint.rotation.x = Math.sin(flapCycle - idx * 0.38) * 0.095;
          tJoint.rotation.z = Math.cos(t * 3.2 + f.phase - idx * 0.32) * 0.085 - tangent.x * 0.04;
        });

        // 5. Box-to-Box Portal Dive & Emerge Scaling at Curve Ends
        let scale = 1.15;
        const pMat = f.rig.portalRing.material as THREE.MeshBasicMaterial;
        if (f.progress > 0.91) {
          const k = (1 - f.progress) / 0.09;
          scale = 1.15 * k;
          pMat.opacity = Math.sin(k * Math.PI) * 0.85;
          f.rig.portalRing.position.set(pos.x, worldY, pos.z);
          f.rig.portalRing.rotation.z = t * 3;
        } else if (f.progress < 0.09) {
          const k = f.progress / 0.09;
          scale = 1.15 * k;
          pMat.opacity = Math.sin(k * Math.PI) * 0.85;
          f.rig.portalRing.position.set(pos.x, worldY, pos.z);
          f.rig.portalRing.rotation.z = t * 3;
        } else {
          pMat.opacity = 0;
        }

        f.rig.root.scale.setScalar(Math.max(0.001, scale));
      }

      renderer.render(scene, camera);
    };

    startLoopIfNeeded();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-[45] w-full h-full"
      aria-hidden="true"
    />
  );
}
