import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import { logFeedback } from "../lib/api.js";

const FEEDBACK_KEY = "portfolioFeedback";

const page = {
    initial: { opacity: 0, y: 10, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -8, filter: "blur(8px)" }
};

function fireworks(duration = 1600) {
    const end = Date.now() + duration;
    (function frame() {
        confetti({
            particleCount: 4,
            startVelocity: 28,
            spread: 78,
            ticks: 200,
            origin: { x: Math.random(), y: Math.random() * 0.48 }
        });
        if (Date.now() < end) requestAnimationFrame(frame);
    })();
}

function celebrate() {
    confetti({ particleCount: 120, spread: 70, startVelocity: 38, ticks: 220, origin: { x: 0.22, y: 0.72 } });
    confetti({ particleCount: 120, spread: 70, startVelocity: 38, ticks: 220, origin: { x: 0.78, y: 0.72 } });
    setTimeout(() => fireworks(1200), 140);
    setTimeout(() => fireworks(1200), 520);
}

export default function Feedback() {
    const nav = useNavigate();
    const [liked, setLiked] = React.useState(null);
    const [noPos, setNoPos] = React.useState({ x: 0, y: 0 });
    const [freezeNo, setFreezeNo] = React.useState(false);

    const wrapRef = React.useRef(null);
    const noRef = React.useRef(null);

    React.useEffect(() => {
        const saved = localStorage.getItem(FEEDBACK_KEY);
        if (saved === "yes") setLiked(true);
        if (saved === "no") setLiked(false);
    }, []);

    React.useEffect(() => {
        function onMove(e) {
            if (liked === true) return;
            if (freezeNo) return;

            const wrap = wrapRef.current;
            const btn = noRef.current;
            if (!wrap || !btn) return;

            const w = wrap.getBoundingClientRect();
            const b = btn.getBoundingClientRect();

            const mx = e.clientX;
            const my = e.clientY;

            const cx = b.left + b.width / 2;
            const cy = b.top + b.height / 2;

            const dx = mx - cx;
            const dy = my - cy;
            const dist = Math.hypot(dx, dy);

            const danger = 96;

            if (dist < danger) {
                const push = (danger - dist) + 46;
                const ang = Math.atan2(dy, dx);
                const moveX = -Math.cos(ang) * push;
                const moveY = -Math.sin(ang) * push;

                const maxX = (w.width / 2) - 70;
                const maxY = (w.height / 2) - 70;

                const nx = Math.max(-maxX, Math.min(maxX, noPos.x + moveX));
                const ny = Math.max(-maxY, Math.min(maxY, noPos.y + moveY));

                setNoPos({ x: nx, y: ny });
            } else if (dist > danger + 170 && (Math.abs(noPos.x) > 2 || Math.abs(noPos.y) > 2)) {
                setNoPos({ x: noPos.x * 0.90, y: noPos.y * 0.90 });
            }
        }

        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, [liked, noPos, freezeNo]);

    async function chooseYes() {
        setLiked(true);
        localStorage.setItem(FEEDBACK_KEY, "yes");
        celebrate();
        try { await logFeedback({ liked: true }); } catch (e) { console.warn(e); }
    }

    async function chooseNo() {
        setLiked(false);
        localStorage.setItem(FEEDBACK_KEY, "no");
        try { await logFeedback({ liked: false }); } catch (e) { console.warn(e); }
    }

    function reset() {
        localStorage.removeItem(FEEDBACK_KEY);
        setLiked(null);
        setNoPos({ x: 0, y: 0 });
        setFreezeNo(false);
    }

    return (
        <motion.div
            className="grain"
            variants={page}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
                minHeight: "100vh",
                background: liked === true
                    ? "radial-gradient(1000px 700px at 30% 12%, rgba(80,250,123,.20) 0%, transparent 55%), linear-gradient(180deg, #060709 0%, #050607 100%)"
                    : undefined
            }}
        >
            <div className="container" style={{ padding: "62px 0 26px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <div>
                        <div className="kicker"><span>🎯</span><span>Feedback</span></div>
                        <h1 className="h1" style={{ marginTop: 14 }}>Did you like my portfolio?</h1>
                        <p className="p" style={{ marginTop: 10, maxWidth: 700 }}>
                            Choose a vibe. If you pick “yeah!”, it turns into a mini celebration.
                        </p>
                    </div>

                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <button className="btn" onClick={() => nav("/story")}>← Back</button>
                        <button className="btn" onClick={reset}>Reset</button>
                    </div>
                </div>
            </div>

            <div className="container" ref={wrapRef} style={{ paddingBottom: 76 }}>
                <div className="card" style={{ padding: 26, overflow: "hidden" }}>
                    <AnimatePresence>
                        {liked === true && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.45 }}
                                className="kicker"
                                style={{
                                    background: "rgba(80,250,123,.14)",
                                    borderColor: "rgba(80,250,123,.25)",
                                    color: "rgba(255,255,255,.84)"
                                }}
                            >
                                <span>🎉</span><span>Thank you so much for choosing YES!</span>
                            </motion.div>
                        )}
                        {liked === false && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.45 }}
                                className="kicker"
                                style={{
                                    background: "rgba(255,85,85,.12)",
                                    borderColor: "rgba(255,85,85,.22)",
                                    color: "rgba(255,255,255,.84)"
                                }}
                            >
                                <span>😅</span><span>Honesty appreciated — I’ll improve it.</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="hr" />

                    <div style={{ display: "grid", placeItems: "center", padding: "22px 0 10px" }}>
                        <div className="cardSoft" style={{ padding: 18, borderRadius: 26, background: "rgba(0,0,0,.22)", width: "min(760px, 100%)" }}>
                            <div className="featureGrid" style={{ alignItems: "center" }}>
                                <div className="fcol6">
                                    <h2 className="h2">One tap. Big delight.</h2>
                                    <p className="p" style={{ marginTop: 10 }}>
                                        'No' is tricky & it might dodge your cursor. However, you can freeze it.
                                    </p>
                                </div>
                                <div className="fcol6" style={{ display: "flex", gap: 14, justifyContent: "flex-end", flexWrap: "wrap" }}>
                                    <motion.button className="btn btnPrimary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={chooseYes}
                                        style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 16, padding: "14px 16px" }}>
                                        <span style={{ fontSize: 20 }}>🔥</span><span>yeah!</span>
                                    </motion.button>

                                    <motion.button
                                        ref={noRef}
                                        className="btn"
                                        onClick={chooseNo}
                                        style={{
                                            display: "flex", gap: 10, alignItems: "center", fontSize: 16, padding: "14px 16px",
                                            transform: `translate(${noPos.x}px, ${noPos.y}px)`,
                                            transition: "transform 120ms ease"
                                        }}
                                        title="Try to click me 😉"
                                    >
                                        <span style={{ fontSize: 20 }}>🙅‍♂️</span><span>no</span>
                                    </motion.button>
                                </div>
                            </div>

                            <div className="hr" />
                            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
                                <div className="small">You can control the 'No'.</div>
                                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                                    <button className="btn" onClick={() => setNoPos({ x: 0, y: 0 })}>🧲 Re-center “no”</button>
                                    <button className="btn" onClick={() => setFreezeNo(v => !v)}>{freezeNo ? "▶️ Unfreeze" : "🪵 Freeze"} “no”</button>
                                </div>
                            </div>
                        </div>

                        <AnimatePresence>
                            {liked !== null && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                    style={{ display: "flex", justifyContent: "center", marginTop: 22 }}
                                >
                                    <button
                                        className="btn btnBlue"
                                        onClick={() => nav("/")}
                                        style={{ padding: "14px 18px", fontSize: 15 }}
                                    >
                                        ✨ Back to welcome
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="small" style={{ marginTop: 14, textAlign: "center" }}>
                            This page is built for fun, to make you smile.
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}