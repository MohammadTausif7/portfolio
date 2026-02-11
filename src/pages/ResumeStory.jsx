import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Section from "../components/Section.jsx";
import MiniNav from "../components/MiniNav.jsx";
import avatar from "../assets/tausif1.jpg";

const NAME_KEY = "visitorName";

const resume = {
    headline: "Software Engineer, MS in CS at OU",
    contact: {
        github: "https://github.com/MohammadTausif7",
        linkedin: "https://www.linkedin.com/in/mohammad7/",
        email: "mohammedtausif64559@gmail.com",
        phone: "405-816-4158",
    },
    education: [
        {
            school: "University of Oklahoma",
            location: "Norman, OK",
            degree: "Master of Science in Computer Science",
            dates: "Jan 2024 – May 2026",
            extra: "CGPA: 3.90",
        },
        {
            school: "Vellore Institute of Technology",
            location: "Andhra Pradesh, India",
            degree: "Integrated Master of Technology in Software Engineering",
            dates: "Aug 2017 – May 2022",
            extra: "GPA: 8.76",
        },
    ],
    experience: [
        {
            title: "Graduate Teaching Assistant — Data Mining",
            org: "University of Oklahoma",
            location: "Norman, OK",
            dates: "Aug 2025 – Dec 2025",
            bullets: [
                "Assisted the instructor with grading and course website management.",
                "Held office hours to support students on assignments and projects.",
            ],
        },
        {
            title: "MTS Software Engineer 2",
            org: "NetApp",
            location: "Bengaluru, India",
            dates: "Jul 2022 – Mar 2023",
            bullets: [
                "Worked across AWS, Azure, and GCP to configure, deploy, and run performance measurements (IOPS) for different protocols.",
                "Built automation scripts and resolved 10+ major tickets in the codebase.",
            ],
        },
        {
            title: "Intern — Software Developer",
            org: "Continental",
            location: "Bengaluru, India",
            dates: "Jul 2021 – May 2022",
            bullets: [
                "Delivered feature enhancements in Agile sprints for an Adaptive Cruise Control (ACC) project.",
                "Performed regression analysis for on-road events and improved code coverage up to 96%.",
            ],
        },
    ],
    projects: [
        { name: "Internship Project Management System", when: "Spring 2025", context: "Software Engineering Practices (OU)", bullets: ["Semester-long web app built using Agile + SDLC to guide students through the internship process."] },
        { name: "3D Chess", when: "Spring 2025", context: "Computer Graphics (OU)", bullets: ["Interactive 3D chess game with animations/effects using Java + OpenGL."] },
        { name: "Patient Network DBMS", when: "Fall 2024", context: "Database Management Systems (OU)", bullets: ["Interactive Java app to store/manage patient data on an Azure SQL DB configured from scratch."] },
        { name: "Food Ordering App", when: "Winter 2020", context: "Mobile App Development (VIT)", bullets: ["In-store restaurant ordering app (COVID-era) to support contactless ordering and safety."] },
        { name: "Welcome Home", when: "Winter 2018", context: "Engineering Clinics — System Design (VIT)", bullets: ["Smart automation entry/exit concept using weight detection + recognition."] },
        { name: "Smart Classroom", when: "Winter 2017", context: "Engineering Clinics — Python & Raspberry Pi (VIT)", bullets: ["Automation system to control classroom appliances using sensors to conserve energy."] }
    ],
    skills: [
        "C++", "Java", "Python", "JavaScript",
        "DBMS", "SQL", "Web Development & APIs",
        "Linux", "Cloud (AWS, GCP, Azure)",
        "Data Mining", "AI/ML",
        "SDLC", "Agile", "Software Engineering"
    ],
    certs: [
        "AWS — Going Cloud Native (Coursera)",
        "Data Science in Python (Coursera)"
    ]
};

const page = {
    initial: { opacity: 0, y: 10, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -8, filter: "blur(8px)" }
};

function Tile({ icon, title, text }) {
    return (
        <div className="cardSoft hoverZoom" style={{ padding: 18, borderRadius: 22, background: "rgba(0,0,0,.22)" }}>
            <div className="kicker"><span>{icon}</span><span>{title}</span></div>
            <div className="hr" />
            <p className="p" style={{ margin: 0, color: "rgba(255,255,255,.78)" }}>{text}</p>
        </div>
    );
}

export default function ResumeStory() {
    const nav = useNavigate();
    const visitorName = (localStorage.getItem(NAME_KEY) || "").trim();
    const greetName = visitorName ? visitorName : "friend";

    return (
        <motion.div className="grain pageBg" variants={page} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <div className="topBar">
                <div className="container topBarInner">
                    <div className="topBrand">
                        <span className="kicker"><span>🧔🏻</span><span>Portfolio</span></span>
                        <span className="small" style={{ color: "rgba(255,255,255,.70)" }}>
                            Hi {greetName} — welcome.
                        </span>
                    </div>

                    <div className="topNav">
                        <a className="navPill hoverZoom" href="#experience"><span>🧰</span><span>Experience</span></a>
                        <a className="navPill hoverZoom" href="#projects"><span>🧩</span><span>Projects</span></a>
                        <a className="navPill hoverZoom" href="#skills"><span>🛠️</span><span>Skills</span></a>
                        <a className="navPill hoverZoom" href="#contact"><span>📫</span><span>Contact</span></a>

                        <button
                            className="btn btnPrimary"
                            onClick={() => nav("/feedback")}
                            style={{ padding: "10px 14px" }}
                        >
                            Submit feedback →
                        </button>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: "72px 0 26px" }}>
                <div className="kicker"><span>✨</span><span>Greetings!</span></div>
                <div className="PhotoFrame heroFrame" style={{ marginTop: 18, width: 250, height: 250, borderRadius: 28, background: "rgba(0,0,0,.22)" }}>
                    <img
                        src={avatar}
                        alt="Tausif Ibrahim Mohammad"
                        className="heroPhoto"
                    />
                </div>
                <h1 className="h0" style={{ marginTop: 14 }}>
                    Hey, I'm Tausif
                    <span style={{ display: "block", color: "rgba(255,255,255,.65)", fontWeight: 700, letterSpacing: "-0.03em", marginTop: 10 }}>
                        {resume.headline}
                    </span>
                </h1>

                <div style={{ marginTop: 22 }} className="featureGrid">
                    <div className="fcol4"><Tile icon="⚙️" title="Software Development" text="Building scalable, maintainable software systems with a focus on clean code and performance." /></div>
                    <div className="fcol4"><Tile icon="☁️" title="Cloud Computing" text="Hands-on across AWS, Azure, and GCP, with a focus on practical deployments and performance." /></div>
                    <div className="fcol4"><Tile icon="✏️" title="Guiding & Teaching" text="Graduate Teaching Assistant experience supporting students, explaining concepts clearly, and improving outcomes." /></div>
                </div>
            </div>

            <Section
                id="experience"
                kicker={<><span>🧰</span><span>Experience</span></>}
                title="Where I’ve worked"
                subtitle="Roles that taught me how to handle, respond, and adapt."
                rightSlot={
                    <div>
                        <div className="kicker"><span>📌</span><span>Quick summary</span></div>
                        <div className="hr" />
                        <div className="small" style={{ color: "rgba(255,255,255,.78)" }}>
                            <div>• NetApp: cloud performance + automation</div>
                            <div>• Continental: ACC project + testing</div>
                            <div>• OU: Data Mining TA</div>
                        </div>
                    </div>
                }
            >
                <div className="featureGrid">
                    {resume.experience.map((role) => (
                        <motion.div
                            key={role.title}
                            className="cardSoft hoverZoom fcol6"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            style={{ padding: 18, borderRadius: 22, background: "rgba(0,0,0,.22)" }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                                <div style={{ fontWeight: 850, fontSize: 16 }}>
                                    {role.title}
                                    <div className="small" style={{ marginTop: 4, color: "rgba(255,255,255,.70)" }}>
                                        {role.org} • {role.location}
                                    </div>
                                </div>
                                <div className="kicker" style={{ opacity: .95 }}>
                                    <span>🗓️</span><span>{role.dates}</span>
                                </div>
                            </div>
                            <div className="hr" />
                            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
                                {role.bullets.map((b, i) => <li key={i}>{b}</li>)}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </Section>

            <Section
                id="projects"
                kicker={<><span>🧩</span><span>Projects</span></>}
                title="Things I’ve built"
                subtitle="A mix of coursework, systems, and interactive builds."
            >
                <div className="featureGrid">
                    {resume.projects.map((p) => (
                        <motion.div
                            key={p.name}
                            className="cardSoft hoverZoom fcol4"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            style={{ padding: 18, borderRadius: 22, background: "rgba(0,0,0,.22)" }}
                        >
                            <div className="kicker"><span>📦</span><span>{p.when}</span></div>
                            <h3 className="h2" style={{ marginTop: 10 }}>{p.name}</h3>
                            <div className="small" style={{ marginTop: 6 }}>{p.context}</div>
                            <div className="hr" />
                            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
                                {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </Section>

            <Section
                id="skills"
                kicker={<><span>🛠️</span><span>Skills</span></>}
                title="Skills & certifications"
                subtitle="Programming & Technologies I’m familiar with."
                rightSlot={
                    <div>
                        <div className="kicker"><span>🏅</span><span>Certifications</span></div>
                        <div className="hr" />
                        <ul className="small" style={{ margin: 0, paddingLeft: 18, color: "rgba(255,255,255,.78)" }}>
                            {resume.certs.map((c) => <li key={c}>{c}</li>)}
                        </ul>
                    </div>
                }
            >
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {resume.skills.map((s) => (
                        <span key={s} className="kicker" style={{ background: "rgba(0,0,0,.22)", borderColor: "rgba(255,255,255,.10)" }}>
                            <span>•</span><span>{s}</span>
                        </span>
                    ))}
                </div>
            </Section>

            <Section
                id="contact"
                kicker={<><span>📫</span><span>Contact</span></>}
                title="Let’s connect"
                subtitle="Links, email, and a quick way to reach me."
                rightSlot={
                    <div>
                        <div className="kicker"><span>🎓</span><span>Education</span></div>
                        <div className="hr" />
                        <div className="small" style={{ color: "rgba(255,255,255,.78)" }}>
                            {resume.education.map((e) => (
                                <div key={e.school} style={{ marginBottom: 10 }}>
                                    <b style={{ color: "rgba(255,255,255,.86)" }}>{e.school}</b><br />
                                    {e.degree}<br />
                                    <span style={{ opacity: .75 }}>{e.dates}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            >
                <div className="cardSoft" style={{ padding: 18, borderRadius: 22, background: "rgba(0,0,0,.22)" }}>
                    <div className="kicker"><span>🔗</span><span>Find me here</span></div>
                    <p></p>
                    <div className="contactRow">
                        <a
                            href="https://github.com/MohammadTausif7"
                            target="_blank"
                            rel="noreferrer"
                            className="contactPill github"
                        >
                            <span className="icon">🐙</span>
                            GitHub
                        </a>

                        <a
                            href="https://www.linkedin.com/in/mohammad7/"
                            target="_blank"
                            rel="noreferrer"
                            className="contactPill linkedin"
                        >
                            <span className="icon">💼</span>
                            LinkedIn
                        </a>

                        <a
                            href="mailto:mohammedtausif64559@gmail.com"
                            className="contactPill email"
                        >
                            <span className="icon">✉️</span>
                            Email
                        </a>

                        <a
                            href="tel:+14058164158"
                            className="contactPill phone"
                        >
                            <span className="icon">📞</span>
                            Phone
                        </a>
                    </div>
                    <div className="hr" />
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <button className="btn btnPrimary" onClick={() => nav("/feedback")}>Submit feedback →</button>
                        <button className="btn btnBlue" onClick={() => nav("/")}>Restart intro</button>
                    </div>
                </div>
            </Section>
        </motion.div>
    );
}