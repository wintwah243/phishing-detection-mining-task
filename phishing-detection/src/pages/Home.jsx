import React, { useEffect } from "react";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import StatsStrip from "../components/StatsStrip";
import Overview from "../components/Overview";
import Methodology from "../components/Methodology";
import Dataset from "../components/Dataset";
import MiningLog from "../components/MiningLog";
import Footer from "../components/Footer";
import { c, globalCss } from "../constants/theme";

export default function Home() {
  useEffect(() => {
    document.documentElement.style.backgroundColor = c.void;
  }, []);

  return (
    <div className="bg-void min-h-screen font-body">
      <style>{globalCss}</style>
      <Nav />
      <Hero />
      <StatsStrip />
      <Overview />
      <Methodology />
      <Dataset />
      <MiningLog />
      <Footer />
    </div>
  );
}