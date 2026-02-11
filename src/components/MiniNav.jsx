import React from "react";

export default function MiniNav({ items }) {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
            {items.map((it) => {
                const isExternal = it.href.startsWith("http") || it.href.startsWith("mailto:") || it.href.startsWith("tel:");
                return (
                    <a
                        key={it.href}
                        href={it.href}
                        className="kicker"
                        style={{ cursor: "pointer", background: "rgba(0,0,0,.22)", borderColor: "rgba(255,255,255,.10)" }}
                        target={isExternal && it.href.startsWith("http") ? "_blank" : undefined}
                        rel={isExternal && it.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                        <span>{it.icon}</span>
                        <span>{it.label}</span>
                    </a>
                );
            })}
        </div>
    );
}