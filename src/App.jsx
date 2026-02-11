import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Welcome from "./pages/Welcome.jsx";
import ResumeStory from "./pages/ResumeStory.jsx";
import Feedback from "./pages/Feedback.jsx";

function ScrollToTop() {
    const { pathname } = useLocation();
    React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
    return null;
}

export default function App() {
    const location = useLocation();
    return (
        <>
            <ScrollToTop />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/story" element={<ResumeStory />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AnimatePresence>
        </>
    );
}