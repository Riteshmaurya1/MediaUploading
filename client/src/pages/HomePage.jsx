// src/pages/HomePage.jsx
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const imageLinks = [
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=640",
  "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=640", // Tech workspace
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=640",     // Portrait
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=640", // Forest/Nature
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=640", // Food (Burger)
  "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=640",
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=640",
];


const HomePage = () => {
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const btnRef = useRef(null);
  const imageSectionRef = useRef(null);

  useEffect(() => {
    if (!headingRef.current || !paraRef.current || !btnRef.current || !imageSectionRef.current) return;

    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      paraRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: paraRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      btnRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: btnRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    const images = imageSectionRef.current.querySelectorAll("img");
    gsap.fromTo(
      images,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: imageSectionRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 text-center relative">

      {/* Hero Section */}
      <section className="pt-40 pb-20 flex flex-col items-center justify-center">
        <h1 ref={headingRef} className="text-5xl font-bold mb-4 opacity-0">
          📸 Media Vault
        </h1>
        <p ref={paraRef} className="text-lg text-zinc-400 max-w-xl mb-8 opacity-0">
          Upload, view, and download your photos and videos from anywhere. Secure. Fast. Beautiful.
          Experience lightning-fast uploads, seamless browsing, and 24/7 access to your memories.
          Whether you’re a creator or a consumer — this vault is for you. Organize and access your media effortlessly with intuitive controls and modern design.
        </p>
        <div ref={btnRef} className="space-x-4 opacity-0">
          <Link
            to="/upload"
            className="bg-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-500 transition"
          >
            Upload Media
          </Link>
          <Link
            to="/gallery"
            className="border border-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition"
          >
            View Gallery
          </Link>
        </div>
      </section>

      {/* Image Section */}
      <section ref={imageSectionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 pb-20">
        {imageLinks.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Media ${i}`}
            className="rounded-xl shadow-md hover:scale-105 transition duration-300"
          />
        ))}
      </section>
    </div>
  );
};

export default HomePage;
