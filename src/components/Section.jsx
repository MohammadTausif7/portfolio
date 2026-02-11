import React from "react";
import { motion } from "framer-motion";

export default function Section({ id, kicker, title, subtitle, children, rightSlot }) {
    return (
        <section id={id} className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-18% 0px -12% 0px" }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className="card sectionCard"
                    style={{ position: "relative", overflow: "hidden" }}
                >
                    <div
                        aria-hidden
                        style={{
                            position: "absolute",
                            inset: -2,
                            background:
                                "radial-gradient(900px 400px at 10% 0%, rgba(139,233,253,.10), transparent 60%)," +
                                "radial-gradient(900px 400px at 90% 100%, rgba(255,233,137,.10), transparent 60%)",
                            pointerEvents: "none",
                        }}
                    />

                    <div className={rightSlot ? "grid2" : ""} style={{ position: "relative" }}>
                        <div>
                            {kicker ? <div className="kicker">{kicker}</div> : null}
                            <h2 className="h1" style={{ marginTop: kicker ? 14 : 0 }}>
                                {title}
                            </h2>
                            {subtitle ? (
                                <p className="p" style={{ marginTop: 10, marginBottom: 0, color: "rgba(255,255,255,.78)" }}>
                                    {subtitle}
                                </p>
                            ) : null}
                            <div className="hr" />
                            <div>{children}</div>
                        </div>

                        {rightSlot ? (
                            <div className="cardSoft" style={{ padding: 18, borderRadius: 22, background: "rgba(0,0,0,.22)" }}>
                                {rightSlot}
                            </div>
                        ) : null}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}