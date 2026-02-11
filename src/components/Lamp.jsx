import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Lamp({ isOn, onToggle }) {
    return (
        <div className="lampWrap">
            <svg viewBox="0 0 640 520" width="100%" height="auto" aria-label="Realistic lamp">
                <defs>
                    <radialGradient id="roomGlow" cx="50%" cy="40%" r="75%">
                        <stop offset="0%" stopColor="#ffe6a3" stopOpacity={isOn ? "0.55" : "0.05"} />
                        <stop offset="45%" stopColor="#ffe6a3" stopOpacity={isOn ? "0.18" : "0"} />
                        <stop offset="100%" stopColor="#000" stopOpacity="0" />
                    </radialGradient>

                    <radialGradient id="lampCore" cx="50%" cy="55%" r="60%">
                        <stop offset="0%" stopColor="#fff3c6" stopOpacity={isOn ? "0.75" : "0"} />
                        <stop offset="55%" stopColor="#ffe189" stopOpacity={isOn ? "0.22" : "0"} />
                        <stop offset="100%" stopColor="#ffe189" stopOpacity="0" />
                    </radialGradient>

                    <linearGradient id="metalStem" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.26)" />
                        <stop offset="40%" stopColor="rgba(255,255,255,0.10)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
                    </linearGradient>

                    <linearGradient id="metalBase" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.16)" />
                        <stop offset="55%" stopColor="rgba(255,255,255,0.06)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0.28)" />
                    </linearGradient>

                    <linearGradient id="shadeOuter" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={isOn ? "rgba(255,233,137,0.22)" : "rgba(255,255,255,0.12)"} />
                        <stop offset="100%" stopColor={isOn ? "rgba(255,233,137,0.10)" : "rgba(255,255,255,0.06)"} />
                    </linearGradient>

                    <linearGradient id="shadeInner" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={isOn ? "rgba(255,233,137,0.10)" : "rgba(0,0,0,0.20)"} />
                        <stop offset="100%" stopColor={isOn ? "rgba(255,233,137,0.18)" : "rgba(0,0,0,0.35)"} />
                    </linearGradient>

                    <filter id="dropShadow" x="-40%" y="-40%" width="180%" height="180%">
                        <feDropShadow dx="0" dy="22" stdDeviation="22" floodColor="#000" floodOpacity="0.48" />
                    </filter>

                    <filter id="softGlow">
                        <feGaussianBlur stdDeviation="9" result="b" />
                        <feMerge>
                            <feMergeNode in="b" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <rect x="0" y="0" width="640" height="520" fill="url(#roomGlow)" />
                <rect x="0" y="410" width="640" height="110" fill="rgba(255,255,255,0.035)" />

                <AnimatePresence>
                    {isOn && (
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                            <ellipse cx="320" cy="400" rx="190" ry="52" fill="rgba(255,233,137,0.10)" />
                            <ellipse cx="320" cy="400" rx="130" ry="38" fill="rgba(255,233,137,0.14)" />
                            <ellipse cx="320" cy="400" rx="70" ry="22" fill="rgba(255,233,137,0.18)" />
                        </motion.g>
                    )}
                </AnimatePresence>

                <g filter="url(#dropShadow)">
                    <path
                        d="M170 410 C210 360, 430 360, 470 410 L470 440 C470 470, 170 470, 170 440 Z"
                        fill="url(#metalBase)"
                        stroke="rgba(255,255,255,0.14)"
                        strokeWidth="2"
                    />
                    <path
                        d="M185 410 C220 372, 420 372, 455 410"
                        fill="none"
                        stroke="rgba(255,255,255,0.16)"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />

                    <rect x="304" y="160" width="32" height="280" rx="16" fill="url(#metalStem)" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
                    <rect x="310" y="210" width="6" height="205" rx="3" fill="rgba(255,255,255,0.12)" />

                    <path
                        d="M150 135 C175 40, 465 40, 490 135 L440 265 C420 300, 220 300, 200 265 Z"
                        fill="url(#shadeOuter)"
                        stroke={isOn ? "rgba(255,233,137,0.32)" : "rgba(255,255,255,0.16)"}
                        strokeWidth="2"
                    />

                    <path
                        d="M205 170 C225 90, 415 90, 435 170 L405 220 C388 242, 252 242, 235 220 Z"
                        fill="url(#shadeInner)"
                        stroke="rgba(255,255,255,0.10)"
                    />

                    <path d="M205 250 C235 190, 405 190, 435 250" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="2.5" strokeLinecap="round" />

                    <g filter={isOn ? "url(#softGlow)" : "none"}>
                        <ellipse cx="320" cy="305" rx="110" ry="56" fill="url(#lampCore)" />
                    </g>

                    <g>
                        {!isOn ? (
                            <>
                                <path d="M285 220 Q300 210 315 220" stroke="rgba(255,255,255,0.75)" strokeWidth="4" fill="none" strokeLinecap="round" />
                                <path d="M325 220 Q340 210 355 220" stroke="rgba(255,255,255,0.75)" strokeWidth="4" fill="none" strokeLinecap="round" />
                                <path d="M308 250 Q320 260 332 250" stroke="rgba(255,255,255,0.55)" strokeWidth="4" fill="none" strokeLinecap="round" />
                            </>
                        ) : (
                            <>
                                <circle cx="300" cy="220" r="6.5" fill="rgba(255,255,255,0.82)" />
                                <circle cx="340" cy="220" r="6.5" fill="rgba(255,255,255,0.82)" />
                                <path d="M302 250 Q320 260 338 250" stroke="rgba(255,255,255,0.82)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                            </>
                        )}
                    </g>

                    <circle cx="274" cy="250" r="9" fill={isOn ? "rgba(255,85,85,0.16)" : "rgba(255,85,85,0.08)"} />
                    <circle cx="366" cy="250" r="9" fill={isOn ? "rgba(255,85,85,0.16)" : "rgba(255,85,85,0.08)"} />
                </g>

                <AnimatePresence>
                    {!isOn && (
                        <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}>
                            <motion.text
                                x="430"
                                y="120"
                                fill="rgba(255,255,255,0.65)"
                                fontSize="30"
                                fontFamily="ui-sans-serif, system-ui"
                                animate={{ y: [0, -12, 0], opacity: [0.4, 0.9, 0.4] }}
                                transition={{ duration: 2.2, repeat: Infinity }}
                            >
                                Z
                            </motion.text>
                            <motion.text
                                x="450"
                                y="100"
                                fill="rgba(255,255,255,0.65)"
                                fontSize="25"
                                fontFamily="ui-sans-serif, system-ui"
                                animate={{ y: [0, -12, 0], opacity: [0.4, 0.9, 0.4] }}
                                transition={{ duration: 2.3, repeat: Infinity, delay: 0.2 }}
                            >
                                Z
                            </motion.text>
                            <motion.text
                                x="470"
                                y="80"
                                fill="rgba(255,255,255,0.65)"
                                fontSize="20"
                                fontFamily="ui-sans-serif, system-ui"
                                animate={{ y: [0, -12, 0], opacity: [0.4, 0.9, 0.4] }}
                                transition={{ duration: 2.4, repeat: Infinity, delay: 0.4 }}
                            >
                                Z
                            </motion.text>
                        </motion.g>
                    )}
                </AnimatePresence>
            </svg>

            <div className="lampSwitch">
                <motion.button
                    onClick={onToggle}
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.02 }}
                    aria-label={isOn ? "Turn lamp off" : "Turn lamp on"}
                    title={isOn ? "Switch off" : "Switch on"}
                    style={{
                        width: 96,
                        height: 52,
                        borderRadius: 18,
                        border: "1px solid rgba(255,255,255,0.18)",
                        background: "rgba(255,255,255,0.06)",
                        boxShadow: "0 18px 34px rgba(0,0,0,0.35)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        cursor: "pointer",
                        padding: 8,
                        display: "grid",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 14,
                            background: "rgba(0,0,0,0.30)",
                            border: "1px solid rgba(255,255,255,0.10)",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                left: 10,
                                top: 10,
                                width: 8,
                                height: 8,
                                borderRadius: 99,
                                background: isOn ? "rgba(80,250,123,0.9)" : "rgba(255,255,255,0.22)",
                                boxShadow: isOn ? "0 0 12px rgba(80,250,123,0.55)" : "none",
                            }}
                        />

                        <motion.div
                            animate={{ x: isOn ? 38 : 0, rotate: isOn ? -6 : 6 }}
                            transition={{ type: "spring", stiffness: 420, damping: 28 }}
                            style={{
                                position: "absolute",
                                left: 8,
                                top: 8,
                                width: 44,
                                height: 34,
                                borderRadius: 12,
                                background: isOn
                                    ? "linear-gradient(180deg, rgba(255,233,137,0.35), rgba(255,233,137,0.10))"
                                    : "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))",
                                border: "1px solid rgba(255,255,255,0.16)",
                                boxShadow: isOn ? "0 10px 22px rgba(255,233,137,0.14)" : "0 10px 22px rgba(0,0,0,0.28)",
                            }}
                        />
                    </div>
                </motion.button>

                <div style={{ textAlign: "center", marginTop: 10, color: "rgba(255,255,255,.66)", fontSize: 12 }}>
                    {isOn ? "On" : "Off"}
                </div>
            </div>
        </div>
    );
}