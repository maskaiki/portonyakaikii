# 🌌 MUKAROMAH PORTFOLIO — ZERO AI-SLOP ARCHITECTURAL & DESIGN SYSTEM RULES
> **Project Target:** Personal Portfolio for **Mukaromah** (Informatics Engineering @ Universitas Negeri Malang — GPA 3.94/4.00)  
> **Use Case:** Scholarship applications, academic research collaboration, international student exchange (KOSEN Japan / UiTM Malaysia), and professional career recruitment.  
> **Aesthetic Philosophy:** *Celestial Midnight Editorial & Blue Hour Horizon* (Refined, Mature, Elegant, Academic Authority).  
> **Author & Curated By:** Antigravity × Kaiki Studio Standards.

---

## 1. 🚨 DIAGNOSIS: WHAT WENT WRONG IN THE AI STUDIO OUTPUT ("AI SLOP")

Setelah menganalisis file `mukaromah-portofolio.zip` (`index.html` 66 KB, `main.js` 52 KB, `main.css` 52 KB), berikut adalah **penyakit AI Slop** yang merusak kredibilitas portofolio Mukaromah:

| AI Slop Gimmick di Kode Lama | Mengapa Ini Merusak Portofolio? | Solusi Antigravity (Kaiki Standard) |
|---|---|---|
| **Pseudo-Sci-Fi "Blackhole Singularity"** (`RELATIVISTIC LUNAR CORE`, `PHOTON RING Rs = 1.45`, `AUTODIVE INTO SINGULARITY`) | Mukaromah adalah mahasiswi **Teknik Informatika & IoT/Robotika**, bukan karakter fiksi film *Interstellar*. Istilah fisika kuantum palsu ini membuat reviewer beasiswa & dosen menganggap websitenya halusinasi AI murahan. | Ganti dengan **Celestial Horizon Centerpiece**: Foto bulan asli yang dibungkus *radial soft atmospheric halo* yang elegan, dipadukan dengan tipografi editorial anggun. |
| **HUD Frame Clutter** (`hud-mark-tl`, `DEPTH GAUGE 000-100`, `hud-lens-text`) | Garis bidik HUD kaku ala game FPS memakan ruang layar, mengaburkan foto portrait asli, dan terasa sangat *childish*. | Hapus seluruh frame HUD game. Ganti dengan **Architectural Grid Lines** beropasitas tipis (4%) dan **Paper-Cut Wave Dividers** bertekstur. |
| **Monolithic 1225-Line Single File Mess** | Semua shader WebGL berat, ribuan baris CSS ad-hoc, dan HTML bercampur aduk, menyebabkan lag di mobile dan sulit dimodifikasi. | Restrukturisasi modular: Komponen bersih, CSS tokens berbasis variabel, animasi GSAP ScrollTrigger yang ringan dan efisien. |
| **Typography Clichés** (Font monospace di mana-mana, bracket `[01]`, double slashes `//`) | Ciri khas prompt AI malas yang menganggap semua anak informatika harus bergaya hacker cyberpunk murahan. | Hirarki murni: **Cormorant Garamond** (Serif Italic anggun untuk aksen) + **Plus Jakarta Sans** (Heading & Body modern) + **JetBrains Mono** (Hanya untuk angka faktual seperti IPK `3.94`). |

---

## 2. 🛡️ STRICT VISUAL GUARDRAILS (ATURAN MUTLAK ANTI-AI SLOP)

Saat memasukkan instruksi ini ke Antigravity / AI Studio, **WAJIB sertakan aturan guardrail ini di awal prompt**:

```markdown
### 🛑 CRITICAL NEGATIVE CONSTRAINTS (NO AI SLOP):
1. NO Sci-Fi / Cyberpunk Tropes:
   - DILARANG menggunakan istilah fiktif: "Relativistic core", "accretion singularity", "lunar dive", "cyber HUD".
   - DILARANG menggunakan corner marks bidik senjata (`hud-mark-tl`, `+` reticles) dan telemetry meter palsu.
   - DILARANG menggunakan bracket kaku seperti `[01]`, double slashes `//`, atau teks ASCII deco.

2. NO Neon or Toxic Palette:
   - DILARANG menggunakan neon cyan (`#00FFFF`), toxic green (`#00FF88`), atau glowing purple.
   - PALET RESMI: 
     * Deep Midnight Navy (`#0A0F1D` / `#101D3A`) — 55% dominasi
     * Twilight Slate & Royal Blue (`#1E2C4A` / `#0055FF`) — 25% aksen terarah
     * Cloud / Ice Crystal (`#C9DDF9` / `#E2EDFC`) — 10% highlight teks
     * Soft Bone & Ivory (`#F4F7FC` / `#FAF9F5`) — 10% surface readability

3. NO Heavy Screen-Blocking 3D Blobs:
   - WebGL shader tidak boleh menutupi teks atau membuat baterai HP panas.
   - Foto bulan asli dipadukan menggunakan `mix-blend-mode: screen` + radial gradient mask dan pergerakan paralaks lembut sumbu Z.

4. 100% FACTUAL INTEGRITY:
   - Data diri wajib 100% selaras dengan CV resmi:
     * Nama: Mukaromah
     * Institusi: S1 Teknik Informatika, Universitas Negeri Malang (UM)
     * IPK: 3.94 / 4.00
     * Riset & Organisasi: Sekretaris Umum Dewantara Research Team (DRT), LPPM UM
     * International Exposure: Kagoshima KOSEN (Jepang 2026) & UiTM (Malaysia 2025)
     * Publikasi: International Symposium on Materials and Electrical Engineering (ISMEE) 2025
     * Prestasi: 7 Penghargaan Resmi
```

---

## 3. 🎨 DESIGN TOKENS & SYSTEM SPECIFICATION

```css
:root {
  /* ── Background & Atmospheric Surface Colors ── */
  --bg-deep-space: #07090e;
  --bg-midnight: #0a0f1d;
  --bg-midnight-card: rgba(16, 29, 58, 0.65);
  --bg-surface-glass: rgba(255, 255, 255, 0.06);
  --bg-surface-elevated: #141b2d;

  /* ── Accent & Brand Colors ── */
  --accent-royal-blue: #0055FF;
  --accent-ice-blue: #38bdf8;
  --accent-cloud: #c9ddf9;
  --accent-bone: #f4f7fc;

  /* ── Text Hierarchy ── */
  --text-primary: #f4f7fc;
  --text-secondary: rgba(244, 247, 252, 0.72);
  --text-muted: rgba(244, 247, 252, 0.45);
  --text-accent: #c9ddf9;

  /* ── Borders & Glass Sheen ── */
  --border-subtle: rgba(255, 255, 255, 0.12);
  --border-active: rgba(201, 221, 249, 0.55);
  --glass-shadow: 0 24px 60px rgba(0, 0, 0, 0.85);
  --glass-inner-bevel: inset 0 1px 1px rgba(255, 255, 255, 0.55), inset 0 -1px 2px rgba(255, 255, 255, 0.15);

  /* ── Typography Pairing ── */
  --font-serif: "Cormorant Garamond", Georgia, serif;
  --font-sans: "Plus Jakarta Sans", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}
```

---

## 4. 🏛️ STRUKTUR HALAMAN & BLUEPRINT KOMPONEN

### 01. NAVIGATION & STATUS BAR
- **Brand Logo:** `MUKAROMAH` dalam font Sans Bold berjarak rapat, dengan bullet aksen biru `#0055FF`.
- **Status Indicator:** `Universitas Negeri Malang · S1 Teknik Informatika (GPA 3.94)`.
- **Navigation Links:** `01 Works`, `02 Academic & Global`, `03 Experience`, `04 Awards`, `05 Contact`.
- **Action CTA:** Tombol pill elegan bertuliskan **Download CV (PDF) ↗** yang membuka/mengunduh file `CV_Mukaromah_OIA.pdf`.

---

### 02. HERO SECTION — THE CELESTIAL HORIZON
Menggantikan blackhole fiksi dengan **Asymmetric Editorial Composition**:
- **Kolom Kiri (60%):**
  - Eyebrow pill: `MALANG, INDONESIA · RESEARCH & ENGINEERING`
  - Headline Utama:
    ```html
    <h1 class="font-sans text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[#f4f7fc] leading-[0.94]">
      Curiosity takes <br />
      <span class="font-serif italic font-normal text-[#c9ddf9] lowercase">
        us further.
      </span>
    </h1>
    ```
  - Narasi Profil Faktual:
    *"Mahasiswi Teknik Informatika Universitas Negeri Malang (IPK 3.94 / 4.00) dengan fokus pada rekayasa web berstandar tinggi, riset IoT & sistem otonom robotika di Dewantara Research Team, serta kepemimpinan kolaboratif lintas batas (KOSEN Jepang & UiTM Malaysia)."*
  - Dual Action Buttons:
    1. Primary: **Explore Selected Work ↓** (Navy gradient dengan border `#c9ddf9/40`)
    2. Secondary: **Download Official CV (PDF) ↗**
- **Kolom Kanan (40%):**
  - **The Celestial Centerpiece:** Foto bulan asli Mukaromah diolah dengan radial gradient mask lembut (tanpa batas kotak), dipadukan dengan cincin orbit tipis berputar pelan (`animation: spin-slow 90s linear infinite`).
  - **Portrait Identity Card:** Kartu foto profil Mukaromah berbingkai *Liquid Glass* (`rounded-[24px] backdrop-blur-xl border border-white/20`) dengan efek 3D tilt interaktif saat mouse digerakkan.
  - Floating Badge: `Kagoshima KOSEN Alumni · UiTM Global Engagement`.

---

### 03. SELECTED WORK & RESEARCH GRANTS (GALERI 3D / GRID EDITORIAL)
Menampilkan 4–6 proyek unggulan (kombinasi Software, IoT Hardware, dan Publikasi):
1. **Spektrum Teknologi (Digital Media Platform)** — Web Platform / Next.js
2. **Eksas Bakes (Commercial Web Order System)** — Front-End Web
3. **Smart Air Quality Telemetry Station** — IoT Hardware & Research Grant LPPM UM
4. **Autonomous Mobile Robot System (DRT UM)** — Robotics & Embedded Control
5. **ISMEE 2025 Paper Publication** — International Symposium Proceeding

Setiap kartu proyek menggunakan standar **Liquid Glass Shell**:
```html
<div class="rounded-[24px] p-2.5 bg-white/[0.07] backdrop-blur-2xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_24px_55px_rgba(0,0,0,0.85)] hover:border-[#c9ddf9] transition-all group">
  <!-- Inner Image Container -->
  <div class="relative aspect-[16/10] rounded-[18px] overflow-hidden bg-[#0c1220]">
    <img src="..." class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
    <span class="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-black/60 text-[#c9ddf9] backdrop-blur-md border border-white/10">
      Research Grant
    </span>
  </div>
  <!-- Meta Information -->
  <div class="p-4">
    <span class="font-mono text-xs text-[#38bdf8] uppercase tracking-widest">01 · IoT & Robotics</span>
    <h3 class="font-sans text-xl font-black uppercase text-white mt-1">Smart Air Quality Telemetry</h3>
    <p class="font-sans text-xs text-white/70 mt-2 leading-relaxed">Sistem stasiun pemantauan kualitas udara terdistribusi berbasis ESP32 dan LoRaWAN yang didanai hibah riset mahasiswa UM.</p>
  </div>
</div>
```

---

### 04. ACADEMIC EXCELLENCE & GLOBAL EXPOSURE (KOSEN & UiTM HIGHLIGHT)
Section khusus yang membuktikan kapasitas internasional Mukaromah:
- **Kartu 1 — Kagoshima KOSEN, Jepang (2026):**
  - Kolaborasi akademik teknologi dan riset robotika di Jepang.
  - Badge bendera Jepang / KOSEN logo.
- **Kartu 2 — Universiti Teknologi MARA (UiTM), Malaysia (2025):**
  - Global academic immersion & cultural agility program.
- **Kartu 3 — IPK & Pencapaian Akademik:**
  - IPK Sempurna `3.94 / 4.00` dengan detail matakuliah unggulan (Algoritma & Pemrograman, Basis Data, IoT).

---

### 05. EXPERIENCE TIMELINE — SCRUBBED COBALT LINE
Adaptasi langsung dari `JourneySection.tsx` website Kaiki:
- Garis vertikal biru elektrik (`#0055FF`) yang memanjang otomatis saat di-scroll (`ScrollTrigger scrub: 0.4`).
- **Milestone 01 (2025 – Sekarang):** *General Secretary — Dewantara Research Team (DRT) UM*.
- **Milestone 02 (2024 – 2025):** *Student Academic Research Assistant — LPPM Universitas Negeri Malang*.
- **Milestone 03 (2024):** *Computer & Network Engineering Tutor — New Primagama & SMK Partner*.
- **Milestone 04 (2024):** *Author & Presenter — International Symposium ISMEE*.

---

### 06. AWARDS & COMPETITION ARCHIVE
Tabel/Grid 7 Prestasi Resmi tanpa klaim berlebihan:
- Juara Kompetisi Inovasi Teknologi Mahasiswa.
- Penerima Pendanaan Hibah Riset Institusional.
- Delegasi Resmi Program Pertukaran Mahasiswa Luar Negeri.

---

### 07. CONTACT & INQUIRIES — BEYOND THE HORIZON
- **Headline:** *"Let's build meaningful technology together."*
- **Aksi Cepat:**
  - Tombol **Copy Email (`mukaromah...@gmail.com`)** dengan *Toast Notification Feedback*.
  - Link langsung ke WhatsApp, LinkedIn, GitHub, dan Portal OIA UM.
  - Tombol unduh resmi **Download Official Academic CV (PDF)**.

---

## 5. 📝 READY-TO-USE PROMPT UNTUK ANTIGRAVITY / AI STUDIO

Saat kamu mengirim file ini ke Antigravity untuk merevisi proyek Mukaromah, kamu cukup copy-paste instruksi di bawah ini:

```markdown
# TASK: Refactor Mukaromah Portfolio by Purging AI Slop & Applying Kaiki Studio Editorial Standards

Tolong buka file portofolio Mukaromah (HTML/CSS/JS) dan lakukan pembersihan total dari 'AI Slop' dengan panduan berikut:

1. HAPUS SELURUH GIMMICK SCI-FI PALSU:
   - Buang canvas shader WebGL blackhole yang berat, HUD telemetry gauge, dan teks fiktif (Rs = 1.45, relativistic core, singularity dive).
   - Gantikan dengan "Celestial Horizon Centerpiece": gunakan foto bulan asli yang dibungkus radial alpha mask halus, berpadu dengan langit malam Midnight Navy (#0a0f1d s/d #101d3a).

2. TERAPKAN DESIGN TOKENS KAIKI EDITORIAL:
   - Warna: Midnight Navy (#0a0f1d), Twilight Blue (#1e2c4a), Cobalt Blue (#0055FF), Cloud Ice (#c9ddf9), dan Bone White (#f4f7fc).
   - Tipografi: Headline memakai font sans bold dipadu aksen italic 'Cormorant Garamond'. Body copy memakai 'Plus Jakarta Sans'. Data teknis memakai 'JetBrains Mono' (hanya untuk IPK 3.94, tahun, dan tag).
   - Glassmorphism: Ubah seluruh kartu proyek menjadi 'Liquid Glass' (rounded-[24px], p-3, border border-white/20, backdrop-blur-xl, shadow tebal).

3. SUSUN ULANG KONTEN SESUAI CV RESMI (100% FAKTUAL):
   - Hero: Headline "Curiosity takes us further", identitas Mukaromah S1 Teknik Informatika UM (IPK 3.94/4.00), dual tombol CTA (Explore Work & Download CV PDF).
   - Selected Work: 5 kartu proyek riset & web nyata (Smart Air Quality Telemetry, DRT Autonomous Robotics, Spektrum Teknologi, Eksas Bakes, ISMEE Paper).
   - International Exposure: Sorotan khusus Kagoshima KOSEN Jepang & UiTM Malaysia.
   - Timeline: Linimasa kepemimpinan Sekretaris Umum DRT UM dan asisten riset LPPM.
   - Contact: 1-click copy email, WhatsApp, LinkedIn, GitHub, dan link unduh CV.

Pastikan hasil akhirnya bersih, elegan, berkecepatan tinggi, bebas error di console, dan sangat layak dipresentasikan ke panel beasiswa maupun institusi internasional!
```
