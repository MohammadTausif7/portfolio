import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lamp from "../components/lamp.jsx";
import { logVisit } from "../lib/api.js";

const NAME_KEY = "visitorName";

function validateName(raw) {
    const name = raw.trim();
    if (name.length < 2) return "Please enter at least 2 characters.";
    if (name.length > 26) return "Keep it under 26 characters.";
    if (!/^[a-zA-Z][a-zA-Z\s.'-]*$/.test(name)) return "Use letters (and spaces).";
    return null;
}

const page = {
    initial: { opacity: 0, y: 10, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -8, filter: "blur(8px)" }
};

export default function Welcome() {
    const nav = useNavigate();
    const [isOn, setIsOn] = React.useState(false);
    const [name, setName] = React.useState(() => localStorage.getItem(NAME_KEY) || "");
    const [touched, setTouched] = React.useState(false);

    const error = touched ? validateName(name) : null;
    const canContinue = isOn && !validateName(name);

    React.useEffect(() => {
        if (isOn) {
            const t = setTimeout(() => document.getElementById("nameInput")?.focus(), 360);
            return () => clearTimeout(t);
        }
    }, [isOn]);

    async function handleContinue() {
        setTouched(true);
        const err = validateName(name);
        if (err) return;

        const clean = name.trim();
        localStorage.setItem(NAME_KEY, clean);

        // Optional: logs visit to Supabase Edge Function if VITE_API_BASE is set
        try { await logVisit({ name: clean }); } catch (e) { console.warn(e); }

        nav("/story");
    }

    return (
        <motion.div className="grain" variants={page} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <div className="container" style={{ padding: "66px 0 34px" }}>
                <div style={{ display: "grid", gap: 18 }}>
                    <div className="kicker">
                        <span>🪄</span>
                        <span>Welcome</span>
                        <span style={{ opacity: .6 }}>•</span>
                        <span style={{ opacity: .8 }}>Tausif's Portfolio</span>
                    </div>

                    <h1 className="h0">A portfolio that feels like a product.</h1>

                    <p className="p" style={{ maxWidth: 1000, margin: 0 }}>
                        Click on the switch to “power on” the experience. Then enter your name please, and we'll move on to my portfolio.
                    </p>

                    <div className="scrollHint">
                        <span className="kicker" style={{ padding: "7px 12px" }}><span>⌘</span><span>Tip</span></span>
                        <span>Press <b>Enter</b> after typing your name.</span>
                    </div>
                </div>
            </div>

            <div className="container" style={{ paddingBottom: 72 }}>
                <div className="card" style={{ padding: 26 }}>
                    <div className="featureGrid">
                        <div className="fcol12" style={{ gridColumn: "span 7" }}>
                            <div style={{ padding: 8 }}>
                                <Lamp isOn={isOn} onToggle={() => setIsOn(v => !v)} />
                            </div>
                        </div>

                        <div className="fcol12" style={{ gridColumn: "span 5", display: "grid", alignContent: "center", gap: 12 }}>
                            <div className="cardSoft" style={{ padding: 18, borderRadius: 22, background: "rgba(0,0,0,.22)" }}>
                                <div className="kicker"><span>{isOn ? "💡" : "🕯️"}</span><span>{isOn ? "Powered on" : "Powered off"}</span></div>
                                <div className="hr" />
                                <div className="p" style={{ margin: 0 }}>
                                    {isOn ? "Nice. Now the fun part — introduce yourself." : "Click the switch to turn on the light and begin."}
                                </div>
                            </div>

                            <div className="cardSoft" style={{ padding: 18, borderRadius: 22, background: "rgba(0,0,0,.22)", opacity: isOn ? 1 : 0.55 }}>
                                <div className="kicker"><span>👋</span><span>Your name</span></div>
                                <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
                                    <input
                                        id="nameInput"
                                        className="input"
                                        placeholder={isOn ? "Type your name…" : "Turn on first…"}
                                        value={name}
                                        disabled={!isOn}
                                        onChange={(e) => { setName(e.target.value); if (!touched) setTouched(true); }}
                                        onKeyDown={(e) => { if (e.key === "Enter") handleContinue(); }}
                                        aria-invalid={!!error}
                                    />

                                    <div className="small" style={{ color: error ? "rgba(255,85,85,.92)" : "rgba(255,255,255,.58)", minHeight: 18 }}>
                                        {error ? error : "We’ll use this for a personalized greeting on the next page."}
                                    </div>

                                    <button
                                        className={`btn btnPrimary`}
                                        onClick={handleContinue}
                                        disabled={!canContinue}
                                        style={{ opacity: canContinue ? 1 : 0.55, pointerEvents: canContinue ? "auto" : "none" }}
                                    >
                                        Continue →
                                    </button>

                                    {/* <div className="small">
                    Privacy note: name is stored locally on the viewer’s device; visit logs go to your private backend (optional).
                  </div> */}
                                </div>
                            </div>

                            {/* <div className="small" style={{ textAlign: "center", opacity: .75 }}>
                Built with React + Vite • smooth transitions • Apple-style layout
              </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}