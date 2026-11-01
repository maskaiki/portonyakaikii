---
name: quant-dashboard-redesign
description: Redesign cluttered, AI-slopped trading and quant bot dashboards into high-contrast, editorial, Kaiki-standard interfaces.
---

# Quant & Crypto Dashboard Editorial Redesign Skill
*Transforming chaotic "AI-slop" crypto bots into razor-sharp, high-contrast, editorial command cockpits.*

---

## 1. Diagnosis: Bedah Masalah "AI Slop" pada Dashboard Saat Ini

Berdasarkan screenshot bot trading (`Vibe-Quant Spot Bot V3.5 TURBO LIVE`), antarmuka tersebut memiliki semua karakteristik **AI-generated design slop** yang bikin sakit mata dan "keramean":

1. **Badge & Pill Proliferation (Penyakit Kebanyakan Kapsul):**
   * Ada 8+ tombol pill warna-warni di header saja (`TURBO SCALPER`, `BOT AKTIF`, `Pause`, `Panic Sell All`, `Reset $50`, dll.).
   * Setiap teks diberi label status kecil kelap-kelip yang tidak perlu.
2. **Techno-Babble & Teks Kecil Gak Jelas (Cliché Terminal):**
   * Teks seperti `Detak Jantung: 16:04:23 (Siklus #1427)`, `Circuit Breaker Harian: AMAN`, dan string acak yang memadati layar tanpa hierarki visual.
3. **Rainbow Neon Clash (Tabrakan Warna Lampu Disko):**
   * Kuning neon, hijau neon, merah muda menyala, biru dongker kusam, dan teks abu-abu pudar bertumpuk di satu viewport tanpa fokus utama.
4. **Micro-Table Di Dalam Kartu Kecil (Information Overload):**
   * Menjejalkan tabel transaksi Binance 10 baris dengan teks microscopic di dalam kartu BTC dan ETH, membuat chart candlestick terhimpit menjadi sempit dan tidak terbaca.
5. **Nesting Container Berlebihan (Kotak di dalam Kotak di dalam Kotak):**
   * Container kartu membungkus sub-kartu, yang membungkus sub-box posisi aktif, yang membungkus tombol merah lebar.

---

## 2. Standar Redesign: Kaiki Editorial Theme System

Terapkan standar visual website Kaiki untuk merombak antarmuka ini menjadi berkelas, tenang, dan ultra-jelas:

### A. Palet Warna (High-Contrast & Purposeful)
* **Background Utama:** `#0B0C10` (Deep Obsidian Void) / `#111112` (Deep Charcoal).
* **Card Surface:** `#141721` (Midnight Matte Glass) dengan border halus `rgba(255, 255, 255, 0.08)`.
* **Primary Text:** `#F4F4ED` (Warm Bone — 100% solid, kontras tinggi).
* **Accent Brand:** `#0055FF` (Editorial Cobalt Blue) & `#38bdf8` (Electric Sky Blue).
* **Status Trading:**
  * Profit / Bullish: `#10B981` (Clean Mint Emerald — bukan hijau neon silau).
  * Loss / Bearish: `#EF4444` (Crisp Crimson Red — tegas dan jelas).
  * Muted Label: `#94A3B8` (Slate — tetap kontras dan mudah dibaca).

### B. Tipografi & Hierarki (Mona Sans + Brier Serif)
* **Angka Utama & Judul Asset (`BTC`, `ETH`, `$29.95`):**
  * `font-display` (Mona Sans), uppercase, tracking-tight, font-black / bold.
* **Persentase Profit, Multiplier & Sub-Status:**
  * `font-brier` italic untuk sentuhan editorial khas Kaiki (misal: *+0.05% profit*, *1m scalper*).
* **Angka Data / Harga / Candlestick:**
  * `font-sans` dengan `tabular-nums` agar angka tidak bergeser saat data stream masuk secara live.

### C. Zero Slop Rules untuk Dashboard Ini
* ❌ Hapus string acak seperti "Detak Jantung: 16:04:23 (Siklus #1427)".
* ❌ Hapus tabel transaksi mikro 10-baris dari dalam kartu chart (pindahkan ke drawer/tab terpisah jika benar-benar butuh).
* ❌ Hilangkan garis pembatas strip berulang (`border-t border-b`).
* ❌ Hilangkan 5 pill status yang saling bersaing di header. Cukup **1 status ringkas** (`RUNNING` / `IDLE`) dan **1 emergency button** (`EMERGENCY KILL`).

---

## 3. Arsitektur Layout Baru (4 Zona Utama)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 01. EDITORIAL HEADER                                                        │
│ [ KAIKI QUANT ENGINE ]          [ TOTAL EQUITY: $29.95 ]      [ BOT: ACTIVE ]│
├─────────────────────────────────────────────────────────────────────────────┤
│ 02. HERO METRICS (4 KARTU BERSIH — BOLD NUMBERS, NO MICRO-CLUTTER)          │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐ │
│ │ PORTFOLIO    │ │ CASH (USDT)  │ │ NET PNL      │ │ WIN RATE             │ │
│ │ $29.95       │ │ $0.97        │ │ -$0.054      │ │ 33.3%                │ │
│ │ Rp 497.106   │ │ Rp 16.099    │ │ -0.18% net   │ │ Profit Factor: 0.42  │ │
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ 03. ASSET COCKPIT DUAL (BTC/USDT & ETH/USDT)                                │
│ ┌─────────────────────────────────────────┐ ┌─────────────────────────────┐ │
│ │ BTC / USDT     $78,237.67  (+0.05%)     │ │ ETH / USDT  $2,274.70       │ │
│ │ [ Gedein Chart Candlestick Di Sini ]    │ │ [ Gedein Chart Di Sini ]    │ │
│ │                                         │ │                             │ │
│ │ Posisi Aktif: 0.00019 BTC               │ │ Posisi Aktif: 0.00637 ETH   │ │
│ │ Entry: $78,253 | TP: $78,686 | SL:...   │ │ Entry: $2,273 | TP: $2,284  │ │
│ │ [ Tombol Exit Bersih & Tegas ]          │ │ [ Tombol Exit Bersih ]      │ │
│ └─────────────────────────────────────────┘ └─────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│ 04. STREAM & LOG CONSOLE (MINIMAL & COLLAPSIBLE DI BAWAH)                   │
│ [ LIVE EXECUTION STREAM — 3 BARIS TERBARU DENGAN TOGGLE EXPAND ]           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Blueprint Template Komponen (HTML + Tailwind CSS)

Gunakan blueprint kode ini saat merombak UI dashboard bot tersebut:

```html
<!-- KAIKI EDITORIAL QUANT COCKPIT -->
<div className="min-h-screen bg-[#0b0c10] text-[#f4f4ed] p-6 sm:p-10 font-sans selection:bg-[#0055FF] selection:text-white">

  <!-- 01. MINIMAL EDITORIAL TOP BAR -->
  <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-white/10 gap-4">
    <div>
      <span className="font-display text-xs font-extrabold tracking-[0.2em] text-[#0055FF] uppercase block mb-1">
        Algorithmic Spot Terminal
      </span>
      <h1 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#f4f4ed]">
        VIBE QUANT <span className="font-brier italic font-normal text-[#38bdf8]">scalper.</span>
      </h1>
    </div>

    <!-- Clean Controls (No Slop Buttons) -->
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/10 border border-[#10b981]/30">
        <span className="w-2 h-2 rounded-full bg-[#10b981]" />
        <span className="font-display text-xs font-bold uppercase tracking-wider text-[#10b981]">
          Engine Live
        </span>
      </div>

      <button className="px-5 py-2 rounded-full bg-[#1e2230] hover:bg-[#2a3045] font-display text-xs font-extrabold uppercase tracking-wider text-[#f4f4ed] transition-colors">
        Pause
      </button>

      <button className="px-5 py-2 rounded-full bg-[#ef4444] hover:bg-[#dc2626] font-display text-xs font-extrabold uppercase tracking-wider text-white transition-colors">
        Panic Sell
      </button>
    </div>
  </header>

  <!-- 02. HERO METRIC CARDS (4 COLS — BOLD & CRISP) -->
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
    <!-- Metric 1: Equity -->
    <div className="p-6 rounded-[20px] bg-[#141721] border border-white/10 flex flex-col justify-between">
      <span className="font-display text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
        Total Portfolio
      </span>
      <div className="my-3">
        <span className="font-display text-3xl sm:text-4xl font-black tracking-tight text-[#f4f4ed] tabular-nums">
          $29.95
        </span>
        <span className="font-brier italic text-sm text-[#38bdf8] block mt-1">
          ≈ Rp 497.106
        </span>
      </div>
      <span className="font-display text-[11px] font-bold uppercase tracking-wider text-[#94a3b8]">
        Binance Spot Balance
      </span>
    </div>

    <!-- Metric 2: Cash Available -->
    <div className="p-6 rounded-[20px] bg-[#141721] border border-white/10 flex flex-col justify-between">
      <span className="font-display text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
        Free Capital
      </span>
      <div className="my-3">
        <span className="font-display text-3xl sm:text-4xl font-black tracking-tight text-[#f4f4ed] tabular-nums">
          $0.97
        </span>
        <span className="font-brier italic text-sm text-[#94a3b8] block mt-1">
          Ready to Allocate
        </span>
      </div>
      <span className="font-display text-[11px] font-bold uppercase tracking-wider text-[#94a3b8]">
        Reserve: 3.2%
      </span>
    </div>

    <!-- Metric 3: Net PnL -->
    <div className="p-6 rounded-[20px] bg-[#141721] border border-white/10 flex flex-col justify-between">
      <span className="font-display text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
        Net Profit / Loss
      </span>
      <div className="my-3">
        <span className="font-display text-3xl sm:text-4xl font-black tracking-tight text-[#ef4444] tabular-nums">
          -$0.054
        </span>
        <span className="font-brier italic text-sm text-[#ef4444] block mt-1">
          -0.18% today
        </span>
      </div>
      <span className="font-display text-[11px] font-bold uppercase tracking-wider text-[#94a3b8]">
        Circuit Breaker: Normal
      </span>
    </div>

    <!-- Metric 4: Win Rate -->
    <div className="p-6 rounded-[20px] bg-[#141721] border border-white/10 flex flex-col justify-between">
      <span className="font-display text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
        Win Rate &amp; Ratio
      </span>
      <div className="my-3">
        <span className="font-display text-3xl sm:text-4xl font-black tracking-tight text-[#f4f4ed] tabular-nums">
          33.3%
        </span>
        <span className="font-brier italic text-sm text-[#38bdf8] block mt-1">
          Profit Factor: 0.42
        </span>
      </div>
      <span className="font-display text-[11px] font-bold uppercase tracking-wider text-[#94a3b8]">
        1 Win · 2 Losses
      </span>
    </div>
  </div>

  <!-- 03. DUAL ASSET COCKPIT (BTC & ETH — GIVING CHARTS BREATHING ROOM) -->
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
    <!-- BTC TERMINAL -->
    <div className="p-7 sm:p-8 rounded-[24px] bg-[#141721] border border-white/10 flex flex-col justify-between">
      <div>
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <span className="font-display text-3xl font-black uppercase text-[#f4f4ed] tracking-tight">
              BTC / USDT
            </span>
            <span className="font-brier italic text-sm text-[#38bdf8] ml-2">
              1m timeframe
            </span>
          </div>
          <div className="text-right">
            <span className="font-display text-2xl sm:text-3xl font-black text-[#10b981] tabular-nums block">
              $78,237.67
            </span>
            <span className="font-brier italic text-xs text-[#10b981]">
              +0.05% 24h
            </span>
          </div>
        </div>

        <!-- High-Legibility Chart Stage (Lebar & Tanpa Terhimpit Tabel Mikro) -->
        <div className="relative w-full h-[240px] bg-[#0c0e15] rounded-[16px] border border-white/5 p-4 mb-6 flex items-center justify-center overflow-hidden">
          <!-- Canvas / Lightweight Charts Render Here -->
          <span className="font-display text-xs text-[#94a3b8] uppercase tracking-wider">
            [ High-Res Candlestick &amp; EMA Bands Canvas ]
          </span>
        </div>

        <!-- Orderbook Ratio Bar (Clean & Editorial) -->
        <div className="mb-6">
          <div className="flex justify-between text-xs font-display font-bold uppercase tracking-wider mb-2">
            <span className="text-[#10b981]">Buyers: 96.1%</span>
            <span className="text-[#ef4444]">Sellers: 3.9%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#ef4444] overflow-hidden flex">
            <div className="h-full bg-[#10b981]" style={{ width: "96.1%" }} />
          </div>
        </div>
      </div>

      <!-- Active Position Footer -->
      <div className="pt-5 border-t border-white/10">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-display font-bold uppercase text-[#f4f4ed]">
            Position: 0.00019 BTC
          </span>
          <span className="font-brier italic text-[#10b981]">
            +$0.032 (+0.02%)
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-[11px] font-sans text-[#94a3b8] mb-4">
          <div>Buy: <strong className="text-[#f4f4ed] tabular-nums">$78,253</strong></div>
          <div>TP: <strong className="text-[#10b981] tabular-nums">$78,686</strong></div>
          <div>SL: <strong className="text-[#ef4444] tabular-nums">$78,044</strong></div>
        </div>
        <button className="w-full py-3 rounded-[12px] bg-[#ef4444]/15 hover:bg-[#ef4444] text-[#ef4444] hover:text-white font-display text-xs font-extrabold uppercase tracking-wider transition-all border border-[#ef4444]/40 hover:border-transparent">
          Close Position Now
        </button>
      </div>
    </div>

    <!-- ETH TERMINAL -->
    <div className="p-7 sm:p-8 rounded-[24px] bg-[#141721] border border-white/10 flex flex-col justify-between">
      <div>
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <span className="font-display text-3xl font-black uppercase text-[#f4f4ed] tracking-tight">
              ETH / USDT
            </span>
            <span className="font-brier italic text-sm text-[#38bdf8] ml-2">
              1m timeframe
            </span>
          </div>
          <div className="text-right">
            <span className="font-display text-2xl sm:text-3xl font-black text-[#10b981] tabular-nums block">
              $2,274.70
            </span>
            <span className="font-brier italic text-xs text-[#10b981]">
              +0.00% 24h
            </span>
          </div>
        </div>

        <!-- High-Legibility Chart Stage -->
        <div className="relative w-full h-[240px] bg-[#0c0e15] rounded-[16px] border border-white/5 p-4 mb-6 flex items-center justify-center overflow-hidden">
          <span className="font-display text-xs text-[#94a3b8] uppercase tracking-wider">
            [ High-Res Candlestick &amp; EMA Bands Canvas ]
          </span>
        </div>

        <!-- Orderbook Ratio Bar -->
        <div className="mb-6">
          <div className="flex justify-between text-xs font-display font-bold uppercase tracking-wider mb-2">
            <span className="text-[#10b981]">Buyers: 98.7%</span>
            <span className="text-[#ef4444]">Sellers: 1.3%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#ef4444] overflow-hidden flex">
            <div className="h-full bg-[#10b981]" style={{ width: "98.7%" }} />
          </div>
        </div>
      </div>

      <!-- Active Position Footer -->
      <div className="pt-5 border-t border-white/10">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-display font-bold uppercase text-[#f4f4ed]">
            Position: 0.00637 ETH
          </span>
          <span className="font-brier italic text-[#10b981]">
            +$0.021 (+0.06%)
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-[11px] font-sans text-[#94a3b8] mb-4">
          <div>Buy: <strong className="text-[#f4f4ed] tabular-nums">$2,273</strong></div>
          <div>TP: <strong className="text-[#10b981] tabular-nums">$2,284</strong></div>
          <div>SL: <strong className="text-[#ef4444] tabular-nums">$2,267</strong></div>
        </div>
        <button className="w-full py-3 rounded-[12px] bg-[#ef4444]/15 hover:bg-[#ef4444] text-[#ef4444] hover:text-white font-display text-xs font-extrabold uppercase tracking-wider transition-all border border-[#ef4444]/40 hover:border-transparent">
          Close Position Now
        </button>
      </div>
    </div>
  </div>

  <!-- 04. STREAM & LOG CONSOLE (CLEAN MONOCHROME TERMINAL) -->
  <div className="p-6 rounded-[20px] bg-[#141721] border border-white/10">
    <div className="flex items-center justify-between mb-4">
      <span className="font-display text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
        Execution Log Stream
      </span>
      <span className="font-brier italic text-xs text-[#0055FF]">
        Live Stream 2s
      </span>
    </div>
    <div className="bg-[#0b0c10] rounded-[12px] p-4 font-mono text-xs text-[#f4f4ed] space-y-1.5 border border-white/5">
      <p><span className="text-[#94a3b8]">[16:03:17]</span> <span className="text-[#10b981]">AUTO OPEN BUY BTC/USDT</span> Beli 0.00019 @ $78,253.85 | TP: $78,686.99 | SL: $78,044.74</p>
      <p><span className="text-[#94a3b8]">[16:03:51]</span> <span className="text-[#38bdf8]">MANUAL CLOSE SELL BTC/USDT</span> Closed @ $78,286.91 | PnL: +$0.032 (+0.15%)</p>
    </div>
  </div>

</div>
```

---

## 5. Ringkasan Perubahan Drastis (Sebelum vs Sesudah)

| Aspek | Tampilan Lama (AI Slop & Rame) | Tampilan Baru (Kaiki Editorial Standard) |
| :--- | :--- | :--- |
| **Header** | 8 pill badge warna-warni, string cycle acak, teks microscopic | 1 baris judul tegas, 1 status engine rapi, 2 action button jelas |
| **Kartu Metrik** | Teks abu-abu pudar, format uang bertumpuk membingungkan | 4 kartu tebal berjarak lega, angka heroik Mona Sans + aksen Brier Serif |
| **Candlestick Chart** | Terhimpit sempit oleh tabel orderbook 10-baris | Penuh, lega, rasio buyer/seller ditampilkan dengan bar horizontal elegan |
| **Tabel Transaksi** | Jejalan angka kecil tak terbaca di kartu utama | Dihilangkan dari cockpit utama agar mata trader fokus pada eksekusi |
| **Warna** | Pink, kuning neon, hijau silau, abu-abu kusam | Deep Obsidian (`#0b0c10`), Warm Bone (`#f4f4ed`), Cobalt & Sky Blue, Mint & Crimson |
