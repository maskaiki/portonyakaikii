"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { PptSnakeShowcase } from "./PptSnakeShowcase";

export function PptAndVideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoStageRef = useRef<HTMLDivElement>(null);

  const toggleVideo = () => {
    if (!hasStartedPlaying) {
      setHasStartedPlaying(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
          setIsPlaying(true);
        }
      }, 50);
      return;
    }
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      id="work-storytelling"
      className="section-stage relative w-full py-24 lg:py-36 bg-[#0a0d14] text-[#f4f4ed] overflow-hidden"
    >
      <div className="w-full px-5 sm:px-10 lg:px-14 xl:px-20 relative z-10 space-y-28 lg:space-y-36">
        {/* ── PART 1: 10 PPT SLIDE DECKS (3D SNAKE TRAIN) ────────── */}
        <div id="work-ppt">
          <PptSnakeShowcase />
        </div>

        {/* ── PART 2: 1 FEATURED VIDEO EDIT ────────────────────────── */}
        <div id="work-video" style={{ perspective: "1200px" }}>
          <div className="flex items-baseline justify-between mb-10">
            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#f4f4ed]">
              Video Editing{" "}
              <span className="font-brier italic font-normal text-[#0055FF] lowercase ml-1">
                (featured reel)
              </span>
            </h3>
            <span className="font-display text-xs font-bold tracking-[0.16em] text-[#60a5fa] uppercase">
              Edited in CapCut
            </span>
          </div>

          <div
            ref={videoStageRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center p-6 sm:p-10 rounded-[28px] bg-[#141824]/80 backdrop-blur-xl border border-white/15 will-change-transform shadow-[0_24px_60px_rgba(0,0,0,0.8)]"
          >
            <div className="lg:col-span-8">
              <div
                onClick={!isPlaying ? toggleVideo : undefined}
                className="relative w-full aspect-video rounded-[20px] overflow-hidden bg-[#0b0d13] border border-white/15 hover:border-[#f4f4ed] group cursor-pointer flex items-center justify-center transition-colors"
              >
                {/* Responsive Next.js Image Poster */}
                {!isPlaying && (
                  <Image
                    src="/assets/projects/featured-video-poster.webp"
                    alt="Kaiki Video Editing Portfolio Reel"
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 800px"
                    quality={85}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}

                <video
                  ref={videoRef}
                  src={hasStartedPlaying ? "/assets/projects/featured-video.mp4" : undefined}
                  preload="none"
                  loop
                  playsInline
                  controls={isPlaying}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => setIsPlaying(false)}
                  className={`w-full h-full object-cover ${!isPlaying ? "hidden" : "block"}`}
                >
                  <track
                    kind="captions"
                    src="data:text/vtt;charset=utf-8,WEBVTT"
                    srcLang="en"
                    label="English"
                    default
                  />
                </video>

                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center z-10">
                    <div className="w-16 h-16 rounded-full bg-[#f4f4ed] text-[#111112] group-hover:bg-[#0055FF] group-hover:text-white flex items-center justify-center group-hover:scale-110 transition-all mb-4 shadow-[0_12px_32px_rgba(0,0,0,0.6)]">
                      <svg className="w-6 h-6 fill-current ml-0.5" viewBox="0 0 16 16">
                        <path d="m4 2 10 6-10 6z" />
                      </svg>
                    </div>
                    <span className="font-display text-xs font-extrabold tracking-[0.2em] text-[#f4f4ed] uppercase">
                      Play Featured Video Edit
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-5">
              <span className="font-brier italic text-2xl text-[#0055FF] block">
                CapCut Showcase
              </span>
              <h4 className="font-display text-3xl sm:text-5xl font-black uppercase text-[#f4f4ed] leading-[0.95]">
                VISUAL STORYTELLING &amp; RHYTHM CUTS.
              </h4>
              <p className="font-sans text-sm sm:text-base text-[#f4f4ed] leading-relaxed">
                A featured showcase of my short-form editing craft, combining smooth speed ramps, beat-synced transitions, and engaging visual pacing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
