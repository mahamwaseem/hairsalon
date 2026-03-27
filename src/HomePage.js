import { useState, useEffect, useRef } from "react";

const heroSlides = [
  {
    img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1400&q=90",
    heading: "Where Every Cut",
    sub: "Tells a Story",
    tag: "Master Styling",
  },
  {
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=90",
    heading: "Color That",
    sub: "Captivates",
    tag: "Premium Color",
  },
  {
    img: "https://images.unsplash.com/photo-1519741347686-c1e331fcba41?w=1400&q=90",
    heading: "Bridal Beauty",
    sub: "Beyond Compare",
    tag: "Bridal Packages",
  },
  {
    img: "https://images.unsplash.com/photo-1470259078422-826894b933aa?w=1400&q=90",
    heading: "Luxury Spa",
    sub: "Pure Indulgence",
    tag: "Spa & Wellness",
  },
];

const services = [
  {
    title: "Signature Cut",
    desc: "Sculpted by master stylists, tailored to your unique face structure and personality.",
    price: "From Rs. 2,500",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
  },
  {
    title: "Luxury Color",
    desc: "Balayage, highlights & rich tones using premium European Schwarzkopf pigments.",
    price: "From Rs. 5,000",
    img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80",
  },
  {
    title: "Royal Spa",
    desc: "Deep-tissue treatments, gold masks & aromatherapy rituals for total renewal.",
    price: "From Rs. 3,800",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
  },
  {
    title: "Bridal Glam",
    desc: "Complete bridal packages — hair, makeup & skin prep for your most perfect day.",
    price: "From Rs. 15,000",
    img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&q=80",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=80",
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&q=80",
  "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=500&q=80",
  "https://images.unsplash.com/photo-1500840216050-6ffa99d75160?w=500&q=80",
  "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=500&q=80",
  "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500&q=80",
  "https://images.unsplash.com/photo-1614644147724-2d4785d69962?w=500&q=80",
];

const testimonials = [
  {
    name: "Ayesha Malik",
    role: "Fashion Designer",
    text: "Peluquero Hermano completely transformed my look. Every single visit feels like stepping into a five-star experience.",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&q=80",
  },
  {
    name: "Sara Khan",
    role: "TV Presenter",
    text: "I have been to salons across Pakistan — none compare to the artistry and warmth of this place. Simply the best.",
    avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=120&q=80",
  },
  {
    name: "Nadia Hussain",
    role: "Entrepreneur",
    text: "My bridal look was absolutely flawless. The team at Peluquero Hermano made me feel like pure royalty.",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=120&q=80",
  },
];

export default function PeluqueroHermano() {
  const [slide, setSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionRefs = useRef({});

  // Hero slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      goToSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  function goToSlide(nextFn) {
    setTransitioning(true);
    setTimeout(() => {
      setSlide(nextFn);
      setTransitioning(false);
    }, 600);
  }

  function manualSlide(i) {
    if (i === slide) return;
    setTransitioning(true);
    setTimeout(() => {
      setSlide(i);
      setTransitioning(false);
    }, 600);
  }

  // Testimonials auto-rotate
  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(p => (p + 1) % testimonials.length), 4500);
    return () => clearInterval(t);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer for scroll-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const registerRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  const isVisible = (id) => visibleSections[id];

  return (
    <div style={{
      fontFamily: "'Georgia', serif",
      background: "#faf9f7",
      color: "#1a1208",
      margin: 0, padding: 0,
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Raleway:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold: #b8952a;
          --gold-light: #d4ac3a;
          --gold-pale: #e8c96a;
          --gold-bg: #fdf8ee;
          --white: #ffffff;
          --cream: #faf9f7;
          --warm-gray: #8a7c6e;
          --dark: #1a1208;
        }

        .serif { font-family: 'Playfair Display', Georgia, serif; }
        .sans  { font-family: 'Raleway', sans-serif; }

        /* SCROLLBAR */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #faf9f7; }
        ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }

        /* NAV LINKS */
        .nav-link {
          font-family: 'Raleway', sans-serif;
          font-size: 10px; letter-spacing: 3px;
          text-transform: uppercase; color: var(--warm-gray);
          text-decoration: none; transition: color 0.3s;
          cursor: pointer; position: relative;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: -4px; left: 0;
          width: 0; height: 1px; background: var(--gold);
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: var(--gold); }
        .nav-link:hover::after { width: 100%; }

        /* BUTTONS */
        .btn-gold {
          background: linear-gradient(135deg, #b8952a 0%, #d4ac3a 50%, #b8952a 100%);
          background-size: 200% auto;
          color: white; border: none;
          padding: 15px 40px;
          font-family: 'Raleway', sans-serif;
          font-size: 10px; letter-spacing: 3px;
          text-transform: uppercase; cursor: pointer;
          transition: background-position 0.5s, transform 0.2s, box-shadow 0.3s;
          font-weight: 600;
          box-shadow: 0 4px 20px rgba(184,149,42,0.3);
        }
        .btn-gold:hover {
          background-position: right center;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(184,149,42,0.45);
        }
        .btn-outline {
          background: transparent;
          color: var(--gold); border: 1.5px solid var(--gold);
          padding: 14px 40px;
          font-family: 'Raleway', sans-serif;
          font-size: 10px; letter-spacing: 3px;
          text-transform: uppercase; cursor: pointer;
          transition: all 0.3s; font-weight: 500;
        }
        .btn-outline:hover {
          background: var(--gold); color: white;
          box-shadow: 0 4px 20px rgba(184,149,42,0.3);
        }

        /* HERO SLIDE TRANSITIONS */
        .slide-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover;
          transition: opacity 0.8s ease, transform 8s ease;
        }
        .slide-img.active { opacity: 1; transform: scale(1.06); }
        .slide-img.inactive { opacity: 0; transform: scale(1); }

        /* SCROLL ANIMATIONS */
        .reveal {
          opacity: 0; transform: translateY(40px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-left {
          opacity: 0; transform: translateX(-50px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .reveal-left.visible { opacity: 1; transform: translateX(0); }
        .reveal-right {
          opacity: 0; transform: translateX(50px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .reveal-right.visible { opacity: 1; transform: translateX(0); }
        .reveal-delay-1 { transition-delay: 0.15s; }
        .reveal-delay-2 { transition-delay: 0.3s; }
        .reveal-delay-3 { transition-delay: 0.45s; }
        .reveal-delay-4 { transition-delay: 0.6s; }

        /* SERVICE CARDS */
        .service-card {
          position: relative; overflow: hidden;
          cursor: pointer;
        }
        .service-card img {
          width: 100%; height: 380px;
          object-fit: cover; display: block;
          transition: transform 0.7s ease;
        }
        .service-card:hover img { transform: scale(1.08); }
        .service-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(26,18,8,0.92) 0%, rgba(26,18,8,0.3) 55%, transparent 100%);
          padding: 28px; display: flex;
          flex-direction: column; justify-content: flex-end;
        }
        .service-card .book-btn {
          opacity: 0; transform: translateY(10px);
          transition: all 0.3s ease;
          margin-top: 12px;
          display: inline-flex; align-items: center; gap: 8px;
          color: var(--gold-pale);
          font-family: 'Raleway', sans-serif;
          font-size: 10px; letter-spacing: 3px;
          text-transform: uppercase;
        }
        .service-card:hover .book-btn { opacity: 1; transform: translateY(0); }

        /* GALLERY */
        .gallery-item { overflow: hidden; position: relative; cursor: pointer; }
        .gallery-item img {
          width: 100%; height: 260px; object-fit: cover; display: block;
          transition: transform 0.6s ease, filter 0.4s ease;
          filter: saturate(0.85) brightness(0.95);
        }
        .gallery-item:hover img { transform: scale(1.07); filter: saturate(1.1) brightness(1); }
        .gallery-item .gallery-hover {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(184,149,42,0.4), transparent);
          opacity: 0; transition: opacity 0.4s;
        }
        .gallery-item:hover .gallery-hover { opacity: 1; }

        /* GOLD DIVIDER */
        .gold-line {
          width: 70px; height: 1.5px;
          background: linear-gradient(to right, var(--gold), var(--gold-pale), var(--gold));
          margin: 18px auto;
        }

        /* SECTION LABEL */
        .sec-label {
          font-family: 'Raleway', sans-serif;
          font-size: 10px; letter-spacing: 5px;
          text-transform: uppercase; color: var(--gold);
        }

        /* TESTIMONIAL */
        .testi-card {
          background: white;
          box-shadow: 0 8px 50px rgba(184,149,42,0.1);
          border: 1px solid rgba(184,149,42,0.15);
          padding: 48px 52px;
          position: relative;
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .testi-card.entering { opacity: 1; transform: translateY(0); }
        .testi-card.exiting { opacity: 0; transform: translateY(20px); }
        .testi-big-quote {
          font-family: 'Playfair Display', serif;
          font-size: 140px; line-height: 1;
          color: rgba(184,149,42,0.08);
          position: absolute; top: -10px; left: 30px;
          user-select: none; pointer-events: none;
        }

        /* INPUTS */
        .form-input {
          width: 100%; background: transparent;
          border: none; border-bottom: 1px solid rgba(184,149,42,0.3);
          color: var(--dark); padding: 14px 0;
          font-family: 'Raleway', sans-serif; font-size: 13px;
          letter-spacing: 0.5px; outline: none;
          transition: border-color 0.3s;
        }
        .form-input::placeholder { color: rgba(138,124,110,0.5); }
        .form-input:focus { border-bottom-color: var(--gold); }

        /* STATS */
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 56px; font-weight: 400;
          color: var(--gold); line-height: 1;
        }

        /* ORNAMENT */
        .ornament {
          display: flex; align-items: center; gap: 12px;
          justify-content: center; margin: 20px 0;
        }
        .ornament-line {
          flex: 1; max-width: 80px; height: 1px;
          background: linear-gradient(to right, transparent, var(--gold));
        }
        .ornament-line.rev {
          background: linear-gradient(to left, transparent, var(--gold));
        }
        .ornament-diamond {
          width: 6px; height: 6px;
          background: var(--gold);
          transform: rotate(45deg);
        }

        /* TICKER */
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-inner {
          display: flex; white-space: nowrap;
          animation: ticker 22s linear infinite;
        }
        .ticker-inner:hover { animation-play-state: paused; }

        /* FADE IN PAGE LOAD */
        @keyframes pageLoad {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-text-in {
          animation: pageLoad 1s ease both;
        }
        .hero-text-in-1 { animation-delay: 0.3s; }
        .hero-text-in-2 { animation-delay: 0.6s; }
        .hero-text-in-3 { animation-delay: 0.9s; }
        .hero-text-in-4 { animation-delay: 1.2s; }

        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        .float-badge { animation: floatBadge 4s ease-in-out infinite; }

        @keyframes shimmerLine {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        /* MOBILE MENU */
        .mobile-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: white;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 36px;
          transform: translateX(100%);
          transition: transform 0.4s ease;
        }
        .mobile-overlay.open { transform: translateX(0); }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .service-grid { grid-template-columns: 1fr 1fr !important; }
          .gallery-grid { grid-template-columns: 1fr 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-overlay${menuOpen ? " open" : ""}`}>
        <button onClick={() => setMenuOpen(false)} style={{
          position: "absolute", top: 24, right: 24,
          background: "none", border: "none", fontSize: 28, color: "var(--gold)", cursor: "pointer"
        }}>✕</button>
        <div style={{ textAlign: "center" }}>
          <div className="serif" style={{ fontSize: 32, fontWeight: 400, color: "var(--gold)", letterSpacing: 2 }}>PELUQUERO</div>
          <div className="sans" style={{ fontSize: 9, letterSpacing: 7, color: "#b8952a", marginTop: -2 }}>HERMANO</div>
        </div>
        {["Home", "Services", "Gallery", "Contact"].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" onClick={() => setMenuOpen(false)}
            style={{ fontSize: 14, letterSpacing: 4 }}>{l}</a>
        ))}
        <button className="btn-gold">Book Appointment</button>
      </div>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 60px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(250,249,247,0.97)" : "rgba(250,249,247,0.15)",
        borderBottom: scrolled ? "1px solid rgba(184,149,42,0.15)" : "none",
        backdropFilter: "blur(12px)",
        transition: "all 0.4s ease",
        boxShadow: scrolled ? "0 2px 30px rgba(184,149,42,0.08)" : "none",
      }}>
        {/* Logo */}
        <div style={{ lineHeight: 1 }}>
          <div className="serif" style={{
            fontSize: 22, fontWeight: 500, letterSpacing: 4,
            color: scrolled ? "var(--dark)" : "white",
            transition: "color 0.4s",
          }}>PELUQUERO</div>
          <div className="sans" style={{
            fontSize: 8, letterSpacing: 8,
            color: "var(--gold)", marginTop: 1,
          }}>HERMANO</div>
        </div>

        {/* Desktop links */}
        <div className="desktop-nav" style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {["Home", "Services", "Gallery", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link"
              style={{ color: scrolled ? "var(--warm-gray)" : "rgba(255,255,255,0.85)" }}>
              {l}
            </a>
          ))}
          <button className="btn-gold" style={{ padding: "10px 24px", fontSize: 9 }}>
            Book Now
          </button>
        </div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(true)} style={{
          display: "none", background: "none", border: "none", cursor: "pointer",
          flexDirection: "column", gap: 5,
        }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: 24, height: 1.5, background: scrolled ? "var(--dark)" : "white" }} />
          ))}
        </button>
      </nav>

      {/* ── HERO SLIDESHOW ── */}
      <section id="home" style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
        {/* Slides */}
        {heroSlides.map((s, i) => (
          <img
            key={i}
            src={s.img}
            alt={s.heading}
            className={`slide-img ${i === slide ? "active" : "inactive"}`}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%", objectFit: "cover",
              opacity: i === slide ? 1 : 0,
              transform: i === slide ? "scale(1.06)" : "scale(1)",
              transition: "opacity 1s ease, transform 8s ease",
            }}
          />
        ))}

        {/* Overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(26,18,8,0.72) 0%, rgba(26,18,8,0.3) 60%, rgba(26,18,8,0.1) 100%)",
        }} />

        {/* Gold bottom border */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
          background: "linear-gradient(to right, transparent 0%, var(--gold) 30%, var(--gold-pale) 50%, var(--gold) 70%, transparent 100%)",
        }} />

        {/* Hero content */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          justifyContent: "center", padding: "0 80px",
          maxWidth: 780,
        }}>
          <div className="hero-text-in hero-text-in-1 sec-label" style={{ color: "var(--gold-pale)", marginBottom: 20 }}>
            {heroSlides[slide].tag}
          </div>

          <h1 className="serif hero-text-in hero-text-in-2" style={{
            fontSize: "clamp(54px, 7vw, 96px)",
            fontWeight: 400, lineHeight: 1.08,
            color: "white", margin: 0,
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? "translateY(20px)" : "translateY(0)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}>
            {heroSlides[slide].heading}<br />
            <em style={{ color: "var(--gold-pale)" }}>{heroSlides[slide].sub}</em>
          </h1>

          <div className="hero-text-in hero-text-in-3" style={{
            display: "flex", alignItems: "center", gap: 12, margin: "24px 0 36px",
          }}>
            <div style={{ width: 50, height: 1, background: "var(--gold)" }} />
            <div className="sans" style={{ fontSize: 11, letterSpacing: 3, color: "rgba(255,255,255,0.7)" }}>
              RAWALPINDI'S PREMIER SALON
            </div>
          </div>

          <div className="hero-text-in hero-text-in-4" style={{ display: "flex", gap: 16 }}>
            <button className="btn-gold">Book Appointment</button>
            <button className="btn-outline" style={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}>
              Explore
            </button>
          </div>
        </div>

        {/* Slide indicators */}
        <div style={{
          position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: 10, alignItems: "center",
        }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => manualSlide(i)} style={{
              width: i === slide ? 36 : 8, height: 3,
              background: i === slide ? "var(--gold-pale)" : "rgba(255,255,255,0.4)",
              border: "none", cursor: "pointer", padding: 0,
              transition: "all 0.4s ease", borderRadius: 2,
            }} />
          ))}
        </div>

        {/* Slide arrows */}
        {[
          { dir: -1, pos: { left: 24 }, label: "‹" },
          { dir: 1,  pos: { right: 24 }, label: "›" },
        ].map(({ dir, pos, label }) => (
          <button key={label} onClick={() => manualSlide((slide + dir + heroSlides.length) % heroSlides.length)}
            style={{
              position: "absolute", top: "50%", transform: "translateY(-50%)",
              ...pos,
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)",
              backdropFilter: "blur(4px)",
              color: "white", width: 48, height: 48,
              fontSize: 24, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(184,149,42,0.5)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          >
            {label}
          </button>
        ))}

        {/* Floating badge */}
        <div className="float-badge" style={{
          position: "absolute", bottom: 100, right: 60,
          background: "rgba(250,249,247,0.95)",
          border: "1px solid rgba(184,149,42,0.3)",
          backdropFilter: "blur(10px)",
          padding: "20px 28px",
          minWidth: 210,
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
        }}>
          <div className="sans" style={{ fontSize: 9, letterSpacing: 4, color: "var(--gold)", textTransform: "uppercase" }}>
            Special Offer
          </div>
          <div className="serif" style={{ fontSize: 20, marginTop: 6, color: "var(--dark)" }}>
            Bridal Packages
          </div>
          <div className="sans" style={{ fontSize: 11, color: "var(--warm-gray)", marginTop: 4 }}>
            20% off — Book This Month
          </div>
        </div>
      </section>

      {/* ── TICKER STRIP ── */}
      <div style={{
        background: "var(--gold)",
        padding: "14px 0", overflow: "hidden",
      }}>
        <div className="ticker-inner">
          {[...Array(6)].fill(null).map((_, i) => (
            <span key={i} className="sans" style={{
              fontSize: 10, letterSpacing: 4, color: "white",
              textTransform: "uppercase", paddingRight: 60,
              display: "inline-flex", alignItems: "center", gap: 24,
            }}>
              Peluquero Hermano
              <span style={{ display: "inline-block", width: 4, height: 4, background: "rgba(255,255,255,0.6)", transform: "rotate(45deg)" }} />
              Premium Salon & Spa
              <span style={{ display: "inline-block", width: 4, height: 4, background: "rgba(255,255,255,0.6)", transform: "rotate(45deg)" }} />
              Rawalpindi's Finest
              <span style={{ display: "inline-block", width: 4, height: 4, background: "rgba(255,255,255,0.6)", transform: "rotate(45deg)" }} />
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT / STATS ── */}
      <section ref={registerRef("about")} id="about" style={{ padding: "100px 80px", background: "var(--cream)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div className={`reveal-left ${isVisible("about") ? "visible" : ""}`}>
            <div className="sec-label" style={{ marginBottom: 16 }}>About Us</div>
            <h2 className="serif" style={{ fontSize: 52, fontWeight: 400, lineHeight: 1.15, margin: "0 0 10px", color: "var(--dark)" }}>
              The Art of<br /><em style={{ color: "var(--gold)" }}>Fine Beauty</em>
            </h2>
            <div className="ornament" style={{ justifyContent: "flex-start" }}>
              <div style={{ width: 70, height: 1.5, background: "linear-gradient(to right, var(--gold), transparent)" }} />
              <div style={{ width: 6, height: 6, background: "var(--gold)", transform: "rotate(45deg)" }} />
            </div>
            <p className="sans" style={{ fontSize: 13.5, lineHeight: 2, color: "var(--warm-gray)", maxWidth: 460, marginBottom: 32 }}>
              Peluquero Hermano is more than a salon — it is a sanctuary. Our master stylists blend artistry with technique, using the finest European products to craft transformations that resonate with who you truly are. Every appointment is a ritual.
            </p>
            <button className="btn-gold">Our Story</button>
          </div>

          <div className={`reveal-right ${isVisible("about") ? "visible" : ""}`}>
            <div style={{ position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&q=85"
                alt="Salon interior"
                style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }}
              />
              {/* Overlapping stats card */}
              <div style={{
                position: "absolute", bottom: -30, left: -30,
                background: "white", padding: "28px 36px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
                border: "1px solid rgba(184,149,42,0.2)",
              }}>
                <div style={{ display: "flex", gap: 36 }}>
                  {[["2,400+", "Happy Clients"], ["8+", "Years"], ["12", "Experts"]].map(([n, l]) => (
                    <div key={l} style={{ textAlign: "center" }}>
                      <div className="stat-num">{n}</div>
                      <div className="sans" style={{ fontSize: 9, letterSpacing: 2, color: "var(--warm-gray)", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Gold corner decoration */}
              <div style={{
                position: "absolute", top: -12, right: -12,
                width: 60, height: 60,
                border: "2px solid var(--gold)", borderLeft: "none", borderBottom: "none",
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section ref={registerRef("services")} id="services" style={{ padding: "100px 80px", background: "white" }}>
        <div className={`reveal ${isVisible("services") ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="sec-label" style={{ marginBottom: 16 }}>What We Offer</div>
          <h2 className="serif" style={{ fontSize: 54, fontWeight: 400, color: "var(--dark)", margin: 0 }}>
            Our <em style={{ color: "var(--gold)" }}>Services</em>
          </h2>
          <div className="ornament"><div className="ornament-line" /><div className="ornament-diamond" /><div className="ornament-line rev" /></div>
        </div>

        <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 3 }}>
          {services.map((s, i) => (
            <div
              key={i}
              className={`service-card reveal ${isVisible("services") ? "visible" : ""} reveal-delay-${i + 1}`}
            >
              <img src={s.img} alt={s.title} />
              <div className="service-overlay">
                <div className="sans" style={{ fontSize: 9, letterSpacing: 3, color: "var(--gold-pale)", textTransform: "uppercase", marginBottom: 8 }}>
                  {s.price}
                </div>
                <h3 className="serif" style={{ fontSize: 24, fontWeight: 400, margin: "0 0 8px", color: "white" }}>
                  {s.title}
                </h3>
                <p className="sans" style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, margin: 0 }}>
                  {s.desc}
                </p>
                <div className="book-btn">
                  Book This Service →
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── QUOTE BANNER ── */}
      <div style={{
        padding: "80px 80px",
        background: "linear-gradient(135deg, #1a1208 0%, #2d1f0a 100%)",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 30% 50%, rgba(184,149,42,0.07) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(184,149,42,0.05) 0%, transparent 60%)",
        }} />
        <div className="serif" style={{
          fontSize: "clamp(24px, 4vw, 42px)", fontStyle: "italic",
          color: "white", lineHeight: 1.5, position: "relative",
        }}>
          "Beauty is not in the face —<br />
          <span style={{ color: "var(--gold-pale)" }}>beauty is a light in the heart."</span>
        </div>
        <div className="ornament" style={{ marginTop: 24 }}>
          <div className="ornament-line" /><div className="ornament-diamond" /><div className="ornament-line rev" />
        </div>
        <div className="sans" style={{ fontSize: 10, letterSpacing: 4, color: "var(--gold)", textTransform: "uppercase", marginTop: 8 }}>
          — Kahlil Gibran
        </div>
      </div>

      {/* ── GALLERY ── */}
      <section ref={registerRef("gallery")} id="gallery" style={{ padding: "100px 80px", background: "var(--cream)" }}>
        <div className={`reveal ${isVisible("gallery") ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="sec-label" style={{ marginBottom: 16 }}>Portfolio</div>
          <h2 className="serif" style={{ fontSize: 54, fontWeight: 400, color: "var(--dark)", margin: 0 }}>
            The <em style={{ color: "var(--gold)" }}>Gallery</em>
          </h2>
          <div className="ornament"><div className="ornament-line" /><div className="ornament-diamond" /><div className="ornament-line rev" /></div>
        </div>

        <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
          {gallery.map((src, i) => (
            <div
              key={i}
              className={`gallery-item reveal ${isVisible("gallery") ? "visible" : ""} reveal-delay-${(i % 4) + 1}`}
              style={{ gridRow: i === 0 || i === 4 ? "span 2" : "span 1" }}
            >
              <img src={src} alt={`Gallery ${i}`} style={{ height: i === 0 || i === 4 ? "526px" : "260px" }} />
              <div className="gallery-hover" />
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section ref={registerRef("testi")} style={{ padding: "100px 80px", background: "var(--gold-bg)" }}>
        <div className={`reveal ${isVisible("testi") ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="sec-label" style={{ marginBottom: 16 }}>Client Love</div>
          <h2 className="serif" style={{ fontSize: 54, fontWeight: 400, color: "var(--dark)", margin: 0 }}>
            What They <em style={{ color: "var(--gold)" }}>Say</em>
          </h2>
          <div className="ornament"><div className="ornament-line" /><div className="ornament-diamond" /><div className="ornament-line rev" /></div>
        </div>

        <div className={`reveal ${isVisible("testi") ? "visible" : ""}`} style={{ maxWidth: 740, margin: "0 auto" }}>
          <div className="testi-card">
            <div className="testi-big-quote">"</div>
            <p className="serif" style={{
              fontSize: 22, fontStyle: "italic", lineHeight: 1.75,
              color: "var(--dark)", margin: "0 0 32px",
              position: "relative", zIndex: 1,
              opacity: 1, transition: "opacity 0.4s",
            }}>
              "{testimonials[testimonialIdx].text}"
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <img
                src={testimonials[testimonialIdx].avatar}
                alt={testimonials[testimonialIdx].name}
                style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(184,149,42,0.4)" }}
              />
              <div>
                <div className="serif" style={{ fontSize: 18, color: "var(--dark)", fontWeight: 500 }}>
                  {testimonials[testimonialIdx].name}
                </div>
                <div className="sans" style={{ fontSize: 9, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", marginTop: 3 }}>
                  {testimonials[testimonialIdx].role}
                </div>
              </div>
              {/* Stars */}
              <div style={{ marginLeft: "auto", display: "flex", gap: 3 }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "var(--gold)", fontSize: 14 }}>★</span>
                ))}
              </div>
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 28 }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setTestimonialIdx(i)} style={{
                width: i === testimonialIdx ? 28 : 8, height: 3,
                background: i === testimonialIdx ? "var(--gold)" : "rgba(184,149,42,0.3)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "all 0.4s", borderRadius: 2,
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section ref={registerRef("contact")} id="contact" style={{ padding: "100px 80px", background: "white" }}>
        <div className={`reveal ${isVisible("contact") ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 70 }}>
          <div className="sec-label" style={{ marginBottom: 16 }}>Reserve Your Seat</div>
          <h2 className="serif" style={{ fontSize: 54, fontWeight: 400, color: "var(--dark)", margin: 0 }}>
            Book an <em style={{ color: "var(--gold)" }}>Appointment</em>
          </h2>
          <div className="ornament"><div className="ornament-line" /><div className="ornament-diamond" /><div className="ornament-line rev" /></div>
        </div>

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, maxWidth: 1000, margin: "0 auto" }}>
          <div className={`reveal-left ${isVisible("contact") ? "visible" : ""}`}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {["Full Name", "Email Address", "Phone Number"].map(p => (
                <input key={p} placeholder={p} className="form-input sans" />
              ))}
              <select className="form-input sans" style={{ cursor: "pointer" }}>
                <option value="">Select a Service</option>
                {services.map(s => <option key={s.title}>{s.title}</option>)}
              </select>
              <textarea placeholder="Preferred date, time or any special requests..." className="form-input sans" rows={4} style={{ resize: "none" }} />
              <button className="btn-gold" style={{ alignSelf: "flex-start" }}>
                Send Appointment Request
              </button>
            </div>
          </div>

          <div className={`reveal-right ${isVisible("contact") ? "visible" : ""}`}>
            <img
              src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&q=85"
              alt="Salon"
              style={{ width: "100%", height: 280, objectFit: "cover", marginBottom: 36, display: "block" }}
            />
            {[
              ["Location", "Blue Area, Rawalpindi, Punjab"],
              ["Phone", "+92 51 234 5678"],
              ["Email", "hello@peluquerohermano.pk"],
              ["Hours", "Tuesday – Sunday: 10am – 8pm"],
            ].map(([label, val]) => (
              <div key={label} style={{ display: "flex", gap: 24, marginBottom: 20, alignItems: "flex-start", borderBottom: "1px solid rgba(184,149,42,0.1)", paddingBottom: 20 }}>
                <div className="sans" style={{ fontSize: 9, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", width: 72, flexShrink: 0, paddingTop: 2 }}>
                  {label}
                </div>
                <div className="sans" style={{ fontSize: 13, color: "var(--warm-gray)" }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: "var(--dark)", padding: "50px 80px",
        borderTop: "3px solid var(--gold)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 24,
      }}>
        <div>
          <div className="serif" style={{ fontSize: 22, fontWeight: 500, letterSpacing: 4, color: "var(--gold-pale)" }}>
            PELUQUERO HERMANO
          </div>
          <div className="sans" style={{ fontSize: 10, letterSpacing: 3, color: "rgba(184,149,42,0.5)", marginTop: 4 }}>
            Salon & Spa · Est. 2019
          </div>
        </div>

        <div className="sans" style={{ fontSize: 11, color: "rgba(184,149,42,0.4)", letterSpacing: 1, textAlign: "center" }}>
          © 2026 Peluquero Hermano. All rights reserved.
        </div>

        <div style={{ display: "flex", gap: 28 }}>
          {["Instagram", "Facebook", "TikTok"].map(s => (
            <span key={s} className="nav-link" style={{ color: "rgba(184,149,42,0.5)", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--gold-pale)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(184,149,42,0.5)"}>
              {s}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
