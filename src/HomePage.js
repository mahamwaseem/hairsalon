import { useState, useEffect } from "react";

const services = [
  {
    title: "Signature Haircut",
    desc: "Tailored cuts by master stylists, sculpted to your unique bone structure.",
    price: "From Rs. 2,500",
    img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",
  },
  {
    title: "Luxury Hair Color",
    desc: "Balayage, highlights & rich color blends using premium European pigments.",
    price: "From Rs. 5,000",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
  },
  {
    title: "Royal Spa & Facial",
    desc: "Indulge in deep-tissue treatments, gold masks & aromatherapy rituals.",
    price: "From Rs. 3,800",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
  },
  {
    title: "Bridal Glam",
    desc: "Full bridal packages — hair, makeup & skin prep for your perfect day.",
    price: "From Rs. 15,000",
    img: "https://images.unsplash.com/photo-1519741347686-c1e331fcba41?w=600&q=80",
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&q=80",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=80",
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&q=80",
  "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=500&q=80",
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&q=80",
  "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=500&q=80",
  "https://images.unsplash.com/photo-1500840216050-6ffa99d75160?w=500&q=80",
  "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500&q=80",
];

const testimonials = [
  {
    name: "Ayesha Malik",
    role: "Fashion Designer",
    text: "Luxe Salon ne mera look completely transform kar diya. Every visit feels like a five-star experience.",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80",
  },
  {
    name: "Sara Khan",
    role: "TV Host",
    text: "I've been to salons across Pakistan — none come close to the artistry and warmth here.",
    avatar: "https://images.unsplash.com/photo-1614644147724-2d4785d69962?w=100&q=80",
  },
  {
    name: "Nadia Hussain",
    role: "Entrepreneur",
    text: "My bridal day hair was absolutely flawless. The team made me feel like royalty.",
    avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=100&q=80",
  },
];

export default function LuxeSalon() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    const timer = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 4000);
    return () => { window.removeEventListener("scroll", handleScroll); clearInterval(timer); };
  }, []);

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#0a0804", color: "#f0ead6", margin: 0, padding: 0, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');

        * { box-sizing: border-box; }

        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .sans { font-family: 'Montserrat', sans-serif; }

        .gold { color: #c9a84c; }
        .gold-light { color: #e8c97d; }

        .nav-link {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #b8a98a;
          text-decoration: none;
          transition: color 0.3s;
          cursor: pointer;
        }
        .nav-link:hover { color: #e8c97d; }

        .btn-gold {
          background: linear-gradient(135deg, #c9a84c, #e8c97d, #c9a84c);
          background-size: 200% auto;
          color: #0a0804;
          border: none;
          padding: 14px 36px;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background-position 0.4s, transform 0.2s;
          font-weight: 500;
        }
        .btn-gold:hover { background-position: right center; transform: translateY(-1px); }

        .btn-outline {
          background: transparent;
          color: #c9a84c;
          border: 1px solid #c9a84c;
          padding: 13px 36px;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 400;
        }
        .btn-outline:hover { background: rgba(201,168,76,0.1); }

        .service-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .service-card img {
          width: 100%;
          height: 320px;
          object-fit: cover;
          transition: transform 0.6s ease;
          display: block;
        }
        .service-card:hover img { transform: scale(1.06); }
        .service-card .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,8,4,0.95) 0%, rgba(10,8,4,0.3) 60%, transparent 100%);
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          transition: background 0.3s;
        }

        .gallery-img {
          width: 100%;
          height: 240px;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease, filter 0.3s ease;
          filter: brightness(0.85) saturate(0.9);
        }
        .gallery-item:hover .gallery-img {
          transform: scale(1.04);
          filter: brightness(1) saturate(1.1);
        }
        .gallery-item { overflow: hidden; position: relative; }

        .divider {
          width: 60px;
          height: 1px;
          background: linear-gradient(to right, transparent, #c9a84c, transparent);
          margin: 16px auto;
        }

        .testimonial-card {
          background: rgba(201,168,76,0.05);
          border: 1px solid rgba(201,168,76,0.15);
          padding: 40px;
          position: relative;
        }
        .testimonial-card::before {
          content: '"';
          font-family: 'Cormorant Garamond', serif;
          font-size: 120px;
          color: rgba(201,168,76,0.12);
          position: absolute;
          top: -10px;
          left: 20px;
          line-height: 1;
        }

        .stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 52px;
          font-weight: 300;
          color: #c9a84c;
          line-height: 1;
        }

        .hero-line {
          position: absolute;
          background: linear-gradient(to bottom, transparent, #c9a84c, transparent);
          width: 1px;
          height: 120px;
          left: 50%;
          bottom: 0;
        }

        .section-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: #c9a84c;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeInUp 0.8s ease forwards; }
        .fade-delay-1 { animation-delay: 0.2s; opacity: 0; }
        .fade-delay-2 { animation-delay: 0.4s; opacity: 0; }
        .fade-delay-3 { animation-delay: 0.6s; opacity: 0; }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .contact-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,168,76,0.2);
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom: 1px solid rgba(201,168,76,0.3);
          color: #f0ead6;
          padding: 14px 0;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          letter-spacing: 1px;
          outline: none;
          background: transparent;
          transition: border-color 0.3s;
        }
        .contact-input::placeholder { color: rgba(184,169,138,0.5); }
        .contact-input:focus { border-bottom-color: #c9a84c; }

        .noise-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "20px 60px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(10,8,4,0.95)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.1)" : "none",
        transition: "all 0.4s ease",
        backdropFilter: scrolled ? "blur(10px)" : "none",
      }}>
        <div>
          <div className="serif" style={{ fontSize: 28, fontWeight: 300, color: "#e8c97d", letterSpacing: 2 }}>
            LUXE
          </div>
          <div className="sans" style={{ fontSize: 8, letterSpacing: 6, color: "#c9a84c", marginTop: -4 }}>
            SALON & SPA
          </div>
        </div>

        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {["Home", "Services", "Gallery", "Contact"].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="nav-link">{link}</a>
          ))}
          <button className="btn-gold" style={{ padding: "10px 24px", fontSize: 10 }}>
            Book Now
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{
        minHeight: "100vh",
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        overflow: "hidden",
      }}>
        {/* Left side */}
        <div style={{
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "140px 60px 80px",
          position: "relative", zIndex: 2,
        }}>
          <div className="section-label fade-in" style={{ marginBottom: 24 }}>
            Est. 2019 · Rawalpindi's Premier Salon
          </div>

          <h1 className="serif fade-in fade-delay-1" style={{
            fontSize: "clamp(52px, 6vw, 86px)",
            fontWeight: 300,
            lineHeight: 1.1,
            margin: 0,
            color: "#f0ead6",
          }}>
            Where Beauty<br />
            <em style={{ color: "#c9a84c" }}>Meets</em><br />
            Artistry
          </h1>

          <div className="divider" style={{ margin: "28px 0", textAlign: "left" }}>
            <div style={{ width: 60, height: 1, background: "linear-gradient(to right, #c9a84c, transparent)" }} />
          </div>

          <p className="sans fade-in fade-delay-2" style={{
            fontSize: 13, lineHeight: 1.9, color: "#b8a98a",
            letterSpacing: 0.5, maxWidth: 380,
          }}>
            Step into a world of refined elegance. Our master stylists craft transformations that speak to your soul — because true luxury is feeling like yourself, perfected.
          </p>

          <div className="fade-in fade-delay-3" style={{ display: "flex", gap: 16, marginTop: 40 }}>
            <button className="btn-gold">Book Appointment</button>
            <button className="btn-outline">Our Services</button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 48, marginTop: 60 }}>
            {[["2,400+", "Happy Clients"], ["8+", "Years of Excellence"], ["12", "Expert Stylists"]].map(([num, label]) => (
              <div key={label}>
                <div className="stat-number">{num}</div>
                <div className="sans" style={{ fontSize: 10, letterSpacing: 2, color: "#b8a98a", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side — hero image */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=900&q=85"
            alt="Luxury salon"
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.75) saturate(0.9)" }}
          />
          {/* Gold gradient overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, #0a0804 0%, rgba(10,8,4,0.2) 40%, rgba(10,8,4,0.1) 100%)",
          }} />
          {/* Floating badge */}
          <div style={{
            position: "absolute", bottom: 60, left: -30,
            background: "rgba(10,8,4,0.9)",
            border: "1px solid rgba(201,168,76,0.3)",
            backdropFilter: "blur(10px)",
            padding: "20px 28px",
            minWidth: 200,
          }}>
            <div className="sans" style={{ fontSize: 9, letterSpacing: 3, color: "#c9a84c", textTransform: "uppercase" }}>This Month</div>
            <div className="serif" style={{ fontSize: 20, marginTop: 4, color: "#f0ead6" }}>Bridal Special</div>
            <div className="sans" style={{ fontSize: 11, color: "#b8a98a", marginTop: 2 }}>20% off all bridal packages</div>
          </div>
        </div>

        {/* Bottom line decoration */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 1, background: "linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)"
        }} />
      </section>

      {/* ABOUT STRIP */}
      <section style={{
        background: "linear-gradient(135deg, #1a1206, #0f0c06)",
        padding: "60px",
        display: "flex", alignItems: "center", gap: 60,
        borderTop: "1px solid rgba(201,168,76,0.1)",
        borderBottom: "1px solid rgba(201,168,76,0.1)",
      }}>
        <img
          src="https://images.unsplash.com/photo-1559599101-f09722fb4948?w=500&q=80"
          alt="Salon interior"
          style={{ width: 320, height: 220, objectFit: "cover", flexShrink: 0 }}
        />
        <div>
          <div className="section-label" style={{ marginBottom: 16 }}>Our Philosophy</div>
          <h2 className="serif" style={{ fontSize: 40, fontWeight: 300, margin: "0 0 16px", color: "#e8c97d" }}>
            Crafting Beauty,<br /><em>One Strand at a Time</em>
          </h2>
          <p className="sans" style={{ fontSize: 13, lineHeight: 1.9, color: "#b8a98a", maxWidth: 500 }}>
            At Luxe Salon, we believe beauty is not a destination — it's an experience. Our artisans blend technique with intuition, using only the finest Moroccan oils, Schwarzkopf pigments, and European skincare to deliver results that don't just look stunning, they feel extraordinary.
          </p>
        </div>
        <div style={{ marginLeft: "auto", flexShrink: 0, textAlign: "right" }}>
          <div className="serif" style={{ fontSize: 60, fontWeight: 300, color: "rgba(201,168,76,0.2)", lineHeight: 1 }}>"</div>
          <div className="serif" style={{ fontSize: 18, fontStyle: "italic", color: "#b8a98a", maxWidth: 260 }}>
            Beauty begins the moment you decide to be yourself.
          </div>
          <div className="sans" style={{ fontSize: 10, letterSpacing: 2, color: "#c9a84c", marginTop: 12 }}>— COCO CHANEL</div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "100px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>What We Offer</div>
          <h2 className="serif" style={{ fontSize: 52, fontWeight: 300, color: "#e8c97d", margin: 0 }}>
            Our Services
          </h2>
          <div style={{ width: 80, height: 1, background: "linear-gradient(to right, transparent, #c9a84c, transparent)", margin: "20px auto 0" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
          {services.map((s, i) => (
            <div key={i} className="service-card">
              <img src={s.img} alt={s.title} />
              <div className="overlay">
                <div className="sans" style={{ fontSize: 9, letterSpacing: 3, color: "#c9a84c", textTransform: "uppercase", marginBottom: 8 }}>
                  {s.price}
                </div>
                <h3 className="serif" style={{ fontSize: 24, fontWeight: 400, margin: "0 0 8px", color: "#f0ead6" }}>
                  {s.title}
                </h3>
                <p className="sans" style={{ fontSize: 12, color: "#b8a98a", lineHeight: 1.6, margin: 0 }}>
                  {s.desc}
                </p>
                <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8, color: "#c9a84c" }}>
                  <span className="sans" style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Book This</span>
                  <span style={{ fontSize: 14 }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={{
        padding: "100px 60px",
        background: "linear-gradient(to bottom, #0a0804, #0f0c06)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>Portfolio</div>
          <h2 className="serif" style={{ fontSize: 52, fontWeight: 300, color: "#e8c97d", margin: 0 }}>
            The Gallery
          </h2>
          <div style={{ width: 80, height: 1, background: "linear-gradient(to right, transparent, #c9a84c, transparent)", margin: "20px auto 0" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4 }}>
          {gallery.map((src, i) => (
            <div key={i} className="gallery-item" style={{ gridRow: i === 0 || i === 5 ? "span 2" : "span 1" }}>
              <img
                src={src}
                alt={`Gallery ${i}`}
                className="gallery-img"
                style={{ height: i === 0 || i === 5 ? "484px" : "240px" }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "transparent",
                transition: "background 0.3s",
              }} />
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{
        padding: "100px 60px",
        background: "#0a0804",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: 600, height: 600,
          background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>Client Stories</div>
          <h2 className="serif" style={{ fontSize: 52, fontWeight: 300, color: "#e8c97d", margin: 0 }}>
            What They Say
          </h2>
          <div style={{ width: 80, height: 1, background: "linear-gradient(to right, transparent, #c9a84c, transparent)", margin: "20px auto 0" }} />
        </div>

        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card"
              style={{
                display: i === activeTestimonial ? "block" : "none",
                animation: "fadeInUp 0.5s ease forwards",
              }}
            >
              <p className="serif" style={{
                fontSize: 22, fontStyle: "italic", lineHeight: 1.7,
                color: "#e8c97d", margin: "0 0 28px", position: "relative", zIndex: 1
              }}>
                "{t.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <img src={t.avatar} alt={t.name}
                  style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(201,168,76,0.4)" }} />
                <div>
                  <div className="serif" style={{ fontSize: 18, color: "#f0ead6" }}>{t.name}</div>
                  <div className="sans" style={{ fontSize: 10, letterSpacing: 2, color: "#c9a84c", textTransform: "uppercase" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}

          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 32 }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                style={{
                  width: i === activeTestimonial ? 24 : 8,
                  height: 2,
                  background: i === activeTestimonial ? "#c9a84c" : "rgba(201,168,76,0.3)",
                  border: "none", cursor: "pointer",
                  transition: "all 0.3s",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{
        padding: "100px 60px",
        background: "linear-gradient(135deg, #0f0c06, #1a1206)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 80,
        alignItems: "center",
      }}>
        <div>
          <div className="section-label" style={{ marginBottom: 16 }}>Get In Touch</div>
          <h2 className="serif" style={{ fontSize: 52, fontWeight: 300, color: "#e8c97d", margin: "0 0 20px" }}>
            Book Your<br /><em>Experience</em>
          </h2>
          <p className="sans" style={{ fontSize: 13, lineHeight: 1.9, color: "#b8a98a", marginBottom: 40 }}>
            Ready to transform? Reach out to us and our team will craft the perfect appointment for you.
          </p>

          {[
            ["Location", "Blue Area, Rawalpindi, Punjab"],
            ["Phone", "+92 51 234 5678"],
            ["Hours", "Tue–Sun: 10am – 8pm"],
          ].map(([label, val]) => (
            <div key={label} style={{ marginBottom: 20, display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div className="sans" style={{ fontSize: 9, letterSpacing: 3, color: "#c9a84c", textTransform: "uppercase", width: 70, paddingTop: 2, flexShrink: 0 }}>{label}</div>
              <div className="serif" style={{ fontSize: 16, color: "#b8a98a" }}>{val}</div>
            </div>
          ))}
        </div>

        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {["Full Name", "Email Address", "Phone Number"].map(placeholder => (
              <input
                key={placeholder}
                placeholder={placeholder}
                className="contact-input sans"
              />
            ))}
            <select className="contact-input sans" style={{ cursor: "pointer" }}>
              <option value="" style={{ background: "#0a0804" }}>Select Service</option>
              {services.map(s => <option key={s.title} style={{ background: "#0a0804" }}>{s.title}</option>)}
            </select>
            <textarea
              placeholder="Your message or preferred timing..."
              className="contact-input sans"
              rows={4}
              style={{ resize: "none", border: "1px solid rgba(201,168,76,0.2)", padding: 16 }}
            />
            <button className="btn-gold" style={{ alignSelf: "flex-start" }}>
              Send Request
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: "#060503",
        padding: "40px 60px",
        borderTop: "1px solid rgba(201,168,76,0.1)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div className="serif" style={{ fontSize: 24, fontWeight: 300, color: "#e8c97d", letterSpacing: 2 }}>LUXE</div>
          <div className="sans" style={{ fontSize: 8, letterSpacing: 5, color: "#c9a84c", marginTop: -2 }}>SALON & SPA</div>
        </div>
        <div className="sans" style={{ fontSize: 11, color: "rgba(184,169,138,0.4)", letterSpacing: 1 }}>
          © 2026 Luxe Salon. All rights reserved.
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {["Instagram", "Facebook", "TikTok"].map(s => (
            <span key={s} className="nav-link" style={{ cursor: "pointer" }}>{s}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}
