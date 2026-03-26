import { useState, useEffect } from "react";

// ─── SAME THEME as Booking Page ───────────────────────────────────────────────
const T = {
  bg: "#285A48",
  bg2: "#336d58",
  card: "#285A48",
  border: "#408A71",
  borderHi: "#408A71",
  accent: "#FEF3E2",
  accentLt: "#FFEEA9",
  accentDk: "#408A71",
  brass: "#FABC3F",
  brassLt: "#B0E4CC",
  text: "#ffffff",
  textMid: "#B0E4CC",
  textDim: "#B0E4CC",
};

const S = {
  body: {
    fontFamily: "'Georgia', serif",
    background: T.bg,
    color: T.text,
    minHeight: "100vh",
    overflowX: "hidden",
    position: "relative",
  },
  // NAV
  nav: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "18px 48px",
    background: "rgba(40,90,72,0.92)",
    backdropFilter: "blur(12px)",
    borderBottom: `1px solid rgba(64,138,113,0.3)`,
  },
  navLogo: {
    fontFamily: "'Georgia', serif", fontSize: 22, fontWeight: 900,
    color: T.text, letterSpacing: 4, textTransform: "uppercase",
  },
  navLogoSub: { color: T.brass, fontSize: 11, letterSpacing: 6, display: "block", marginTop: -4 },
  navLinks: { display: "flex", gap: 32, alignItems: "center" },
  navLink: {
    fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
    color: T.brassLt, cursor: "pointer", fontWeight: 700,
    textDecoration: "none", transition: "color 0.3s",
  },
  navBtn: {
    background: `linear-gradient(135deg, ${T.accentDk}, ${T.brass})`,
    color: T.bg, border: "none", padding: "11px 26px",
    fontFamily: "'Georgia', serif", fontSize: 11, letterSpacing: 3,
    cursor: "pointer", borderRadius: 2, fontWeight: 700, textTransform: "uppercase",
  },
  // HERO
  hero: {
    minHeight: "100vh", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    textAlign: "center", padding: "120px 24px 80px",
    position: "relative",
  },
  heroBg: {
    position: "absolute", inset: 0, pointerEvents: "none",
    background: `
      radial-gradient(ellipse 80% 60% at 50% 30%, rgba(250,188,63,0.07) 0%, transparent 60%),
      radial-gradient(ellipse 50% 70% at 15% 80%, rgba(64,138,113,0.12) 0%, transparent 50%),
      radial-gradient(ellipse 40% 50% at 85% 20%, rgba(64,138,113,0.08) 0%, transparent 50%)
    `,
  },
  heroEyebrow: {
    fontSize: 18, letterSpacing: 10, textTransform: "uppercase",
    color: T.brass, marginBottom: 20, fontWeight: 700,
  },
  heroTitle: {
    fontFamily: "'Georgia', serif",
    fontSize: "clamp(56px,10vw,110px)",
    fontWeight: 900, letterSpacing: 4, lineHeight: 0.95,
    color: T.text, margin: "0 0 8px",
    textShadow: `0 0 80px rgba(250,188,63,0.12)`,
  },
  heroTitleAccent: { color: T.brass, display: "block" },
  heroDivider: {
    display: "flex", alignItems: "center", gap: 16, margin: "28px auto",
    maxWidth: 320,
  },
  heroDividerLine: {
    flex: 1, height: 1,
    background: `linear-gradient(90deg, transparent, ${T.accentLt})`,
  },
  heroDividerLineRev: {
    flex: 1, height: 1,
    background: `linear-gradient(90deg, ${T.accentLt}, transparent)`,
  },
  heroTagline: {
    fontStyle: "italic", fontSize: "clamp(15px,2.5vw,19px)", letterSpacing: 2,
    color: T.brassLt, maxWidth: 480, margin: "0 auto 48px", lineHeight: 1.7,
  },
  heroBtnRow: { display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" },
  btnPrimary: {
    display: "inline-flex", alignItems: "center", gap: 10,
    background: `linear-gradient(135deg, ${T.accentDk}, ${T.brass})`,
    color: T.bg, border: "none", padding: "17px 40px",
    fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: 3,
    cursor: "pointer", borderRadius: 2, fontWeight: 700, textTransform: "uppercase",
    boxShadow: `0 4px 28px rgba(250,188,63,0.2)`, transition: "all 0.3s",
  },
  btnSecondary: {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "transparent", color: T.brassLt,
    border: `1px solid rgba(176,228,204,0.35)`, padding: "16px 36px",
    fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: 3,
    cursor: "pointer", borderRadius: 2, fontWeight: 700, textTransform: "uppercase",
    transition: "all 0.3s",
  },

  // STATS BAR
  statsBar: {
    background: `linear-gradient(135deg, ${T.bg2}, rgba(64,138,113,0.3))`,
    borderTop: `1px solid rgba(64,138,113,0.3)`,
    borderBottom: `1px solid rgba(64,138,113,0.3)`,
    padding: "36px 24px",
    display: "flex", justifyContent: "center", gap: 0, flexWrap: "wrap",
  },
  statItem: {
    textAlign: "center", padding: "12px 48px",
    borderRight: `1px solid rgba(64,138,113,0.25)`,
  },
  statNum: {
    fontFamily: "'Georgia', serif", fontSize: 42, fontWeight: 900,
    color: T.brass, lineHeight: 1,
  },
  statLabel: {
    fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
    color: T.brassLt, marginTop: 6,
  },
  // SECTION
  section: (alt) => ({
    padding: "100px 24px",
    background: alt ? `rgba(51,109,88,0.4)` : "transparent",
  }),
  sectionInner: { maxWidth: 1100, margin: "0 auto" },
  sectionEye: {
    fontSize: 10, letterSpacing: 6, textTransform: "uppercase",
    color: T.brass, marginBottom: 12, fontWeight: 700, textAlign: "center",
  },
  sectionTitle: {
    fontFamily: "'Georgia', serif", fontSize: "clamp(32px,5vw,52px)",
    fontWeight: 900, textAlign: "center", color: T.text,
    marginBottom: 12, lineHeight: 1.1,
  },
  sectionSub: {
    textAlign: "center", fontStyle: "italic", color: T.brassLt,
    fontSize: 16, maxWidth: 480, margin: "0 auto 60px", lineHeight: 1.7, opacity: 0.8,
  },
  ornamentCenter: {
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: 16, marginBottom: 52,
  },
  ornLine: {
    width: 80, height: 1,
    background: `linear-gradient(90deg, transparent, ${T.accentLt})`,
  },
  ornLineRev: {
    width: 80, height: 1,
    background: `linear-gradient(90deg, ${T.accentLt}, transparent)`,
  },
  // SERVICES GRID
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 24,
  },
  serviceCard: {
    border: `1px solid ${T.border}`,
    borderRadius: 4, padding: "36px 28px",
    background: `linear-gradient(145deg, rgba(40,90,72,0.8), rgba(51,109,88,0.5))`,
    position: "relative", overflow: "hidden", transition: "all 0.4s",
    cursor: "default",
  },
  serviceTopBar: {
    position: "absolute", top: 0, left: 0, right: 0, height: 2,
    background: `linear-gradient(90deg, transparent, ${T.brass}, transparent)`,
  },
  serviceIconWrap: {
    width: 56, height: 56, borderRadius: "50%",
    background: `rgba(250,188,63,0.1)`,
    border: `1px solid rgba(250,188,63,0.25)`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 28, marginBottom: 20,
  },
  serviceName: {
    fontFamily: "'Georgia', serif", fontSize: 20, fontWeight: 700,
    color: T.text, marginBottom: 8,
  },
  serviceDesc: { fontSize: 13, color: T.brassLt, lineHeight: 1.6, marginBottom: 20, opacity: 0.8 },
  serviceFooter: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    borderTop: `1px solid rgba(64,138,113,0.25)`, paddingTop: 16, marginTop: 8,
  },
  servicePrice: { fontSize: 24, fontWeight: 700, color: T.brass, fontFamily: "'Georgia', serif" },
  serviceDur: { fontSize: 10, letterSpacing: 2, color: T.brassLt, textTransform: "uppercase" },
  // TEAM
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 28,
  },
  teamCard: {
    textAlign: "center", padding: "40px 24px",
    border: `1px solid rgba(64,138,113,0.3)`, borderRadius: 4,
    background: `linear-gradient(145deg, rgba(40,90,72,0.7), rgba(51,109,88,0.4))`,
    transition: "all 0.4s",
  },
  teamAvatar: {
    width: 96, height: 96, borderRadius: "50%",
    background: `linear-gradient(135deg, ${T.accentDk}, ${T.brass})`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 44, margin: "0 auto 20px",
    border: `3px solid rgba(250,188,63,0.25)`,
  },
  teamName: {
    fontFamily: "'Georgia', serif", fontSize: 18, fontWeight: 700,
    color: T.text, marginBottom: 6,
  },
  teamSpec: { fontSize: 12, color: T.brass, fontStyle: "italic", marginBottom: 12, letterSpacing: 1 },
  teamBio: { fontSize: 13, color: T.brassLt, lineHeight: 1.6, opacity: 0.75 },
  // TESTIMONIALS
  testiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 24,
  },
  testiCard: {
    padding: "32px 28px",
    border: `1px solid rgba(64,138,113,0.25)`, borderRadius: 4,
    background: "rgba(255,255,255,0.02)",
    position: "relative",
  },
  testiQuote: {
    position: "absolute", top: 20, right: 24,
    fontSize: 60, color: "rgba(250,188,63,0.12)",
    fontFamily: "Georgia", lineHeight: 1,
  },
  testiText: {
    fontStyle: "italic", color: T.brassLt, lineHeight: 1.7,
    fontSize: 15, marginBottom: 24, opacity: 0.9,
  },
  testiStars: { color: T.brass, fontSize: 14, letterSpacing: 2, marginBottom: 12 },
  testiAuthor: { fontFamily: "'Georgia', serif", fontSize: 14, fontWeight: 700, color: T.text },
  testiSub: { fontSize: 11, color: "rgba(176,228,204,0.5)", letterSpacing: 1, marginTop: 2 },
  // CTA
  ctaSection: {
    padding: "100px 24px",
    background: `linear-gradient(135deg, rgba(64,138,113,0.2), rgba(250,188,63,0.05))`,
    borderTop: `1px solid rgba(64,138,113,0.2)`,
    textAlign: "center",
  },
  ctaInner: { maxWidth: 640, margin: "0 auto" },
  ctaTitle: {
    fontFamily: "'Georgia', serif", fontSize: "clamp(32px,5vw,52px)",
    fontWeight: 900, color: T.text, marginBottom: 16, lineHeight: 1.1,
  },
  ctaSub: {
    fontStyle: "italic", color: T.brassLt, fontSize: 17, marginBottom: 40,
    lineHeight: 1.7, opacity: 0.85,
  },
  // FOOTER
  footer: {
    background: `rgba(30,65,52,0.9)`,
    borderTop: `1px solid rgba(64,138,113,0.2)`,
    padding: "48px 24px 32px",
  },
  footerInner: {
    maxWidth: 1100, margin: "0 auto",
    display: "grid", gridTemplateColumns: "2fr 1fr 1fr",
    gap: 48, marginBottom: 40,
  },
  footerLogo: {
    fontFamily: "'Georgia', serif", fontSize: 26, fontWeight: 900,
    color: T.text, letterSpacing: 4, marginBottom: 12,
  },
  footerDesc: { fontSize: 13, color: T.brassLt, lineHeight: 1.7, opacity: 0.75, maxWidth: 280 },
  footerColTitle: {
    fontSize: 10, letterSpacing: 4, textTransform: "uppercase",
    color: T.brass, marginBottom: 20, fontWeight: 700,
  },
  footerLink: {
    display: "block", fontSize: 13, color: T.brassLt,
    marginBottom: 10, cursor: "pointer", opacity: 0.75,
  },
  footerBottom: {
    borderTop: `1px solid rgba(64,138,113,0.15)`,
    paddingTop: 24, textAlign: "center",
    fontSize: 11, color: "rgba(176,228,204,0.35)", letterSpacing: 2,
  },
};

const SERVICES = [
  {
    img: "https://cdn-icons-png.flaticon.com/512/3050/3050155.png",
    name: "Corte Clásico",
    price: 18,
    dur: "30 min",
    desc: "El corte atemporal para el caballero de estilo refinado. Precisión máxima."
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/921/921347.png",
    name: "Corte + Barba",
    price: 28,
    dur: "50 min",
    desc: "El combo perfecto: look completo que define tu presencia."
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png",
    name: "Afeitado Navaja",
    price: 22,
    dur: "40 min",
    desc: "La experiencia clásica con navaja recta. Ritual de verdaderos caballeros."
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png",
    name: "Degradado Moderno",
    price: 20,
    dur: "35 min",
    desc: "Fade y degradados al más alto nivel, tendencia y técnica unidas."
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/1686/1686396.png",
    name: "Tratamiento Capilar",
    price: 35,
    dur: "60 min",
    desc: "Nutrición profunda con productos premium para tu melena."
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/2583/2583344.png",
    name: "Paquete Caballero",
    price: 65,
    dur: "90 min",
    desc: "La experiencia completa: corte, barba, tratamiento y más."
  }
];

const TEAM = [
  {
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Carlos Hermano",
    spec: "Degradados & Fade",
    bio: "12 años dando forma a los mejores estilos de Madrid."
  },
  {
    img: "https://randomuser.me/api/portraits/men/45.jpg",
    name: "Miguel Ángel",
    spec: "Barbas & Afeitado",
    bio: "Maestro del afeitado clásico con navaja. Precisión artesanal."
  },
  {
    img: "https://randomuser.me/api/portraits/men/65.jpg",
    name: "Diego Ruiz",
    spec: "Clásico & Vintage",
    bio: "Especialista en cortes clásicos y estilos atemporales."
  }
];

const TESTIMONIALS = [
  { text: "El mejor sitio de Madrid, sin duda. Carlos es un artista. Cada vez que salgo me siento otro hombre.", stars: 5, author: "Alejandro M.", sub: "Cliente desde 2019" },
  { text: "Miguel Ángel me hizo la mejor barba de mi vida. El afeitado con navaja es una experiencia única.", stars: 5, author: "Roberto S.", sub: "Cliente desde 2021" },
  { text: "Ambiente inmejorable, trato excelente y resultado perfecto. Mi barbería de cabecera para siempre.", stars: 5, author: "Fernando L.", sub: "Cliente desde 2020" },
];

const STATS = [
  { num: "12+", label: "Años de Experiencia" },
  { num: "8K+", label: "Clientes Satisfechos" },
  { num: "3", label: "Maestros Barberos" },
  { num: "98%", label: "Satisfacción" },
];

export default function HomePage({ onBook }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={S.body}>
      {/* NAV */}
      <nav style={{ ...S.nav, boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.25)" : "none" }}>
        <div style={S.navLogo}>
          HERMANO
          <span style={S.navLogoSub}>Peluquero</span>
        </div>
        <div style={S.navLinks}>

          <button style={S.navBtn} onClick={onBook}>Reservar Cita</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={S.hero}>
        <div style={S.heroBg} />
        <div style={S.heroEyebrow}>✂ Barbería Premium · Madrid ✂</div>
        <h1 style={S.heroTitle}>
          Arte &amp; Estilo
          <span style={S.heroTitleAccent}>para el Caballero</span>
        </h1>
        <div style={S.heroDivider}>
          <div style={S.heroDividerLine} />
          <span style={{ color: T.brass, fontSize: 18 }}>✦</span>
          <div style={S.heroDividerLineRev} />
        </div>
        <div style={S.heroTagline}>
          Donde la tradición se encuentra con la modernidad.<br />
          Cada corte, una obra de arte.
        </div>
        <div style={S.heroBtnRow}>
          <button style={S.btnPrimary} onClick={onBook}>✂ Reservar Cita</button>

        </div>

      </section>

      {/* STATS */}
      <div style={S.statsBar}>
        {STATS.map((s, i) => (
          <div key={i} style={{ ...S.statItem, borderRight: i < STATS.length - 1 ? `1px solid rgba(64,138,113,0.25)` : "none" }}>
            <div style={S.statNum}>{s.num}</div>
            <div style={S.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* SERVICES */}
      <section style={S.section(false)}>
        <div style={S.sectionInner}>
          <div style={S.sectionEye}>Nuestros Servicios</div>
          <h2 style={S.sectionTitle}>Todo lo que Necesita el Caballero</h2>
          <div style={S.ornamentCenter}>
            <div style={S.ornLine} />
            <span style={{ color: T.brass, fontSize: 16 }}>✦</span>
            <div style={S.ornLineRev} />
          </div>
          <div style={S.servicesGrid}>
            {SERVICES.map((svc) => (
              <div key={svc.name} style={S.serviceCard}>
                <div style={S.serviceTopBar} />
                <img
                  src={svc.img}
                  alt={svc.name}
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: "contain",
                    marginBottom: 10,
                    filter: "brightness(0) invert(1)" // white icon for dark theme
                  }}
                />
                <div style={S.serviceName}>{svc.name}</div>
                <div style={S.serviceDesc}>{svc.desc}</div>
                <div style={S.serviceFooter}>
                  <div style={S.servicePrice}>€ {svc.price}</div>
                  <div style={S.serviceDur}>{svc.dur}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section style={S.section(true)}>
        <div style={S.sectionInner}>
          <div style={S.sectionEye}>Nuestro Equipo</div>
          <h2 style={S.sectionTitle}>Maestros de su Arte</h2>
          <div style={S.ornamentCenter}>
            <div style={S.ornLine} />
            <span style={{ color: T.brass, fontSize: 16 }}>✦</span>
            <div style={S.ornLineRev} />
          </div>
          <div style={S.teamGrid}>
            {TEAM.map((b) => (
              <div key={b.name} style={S.teamCard}>
                <div style={S.teamAvatar}>
                  <img
                    src={b.img}
                    alt={b.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover"
                    }}
                  />
                </div>
                <div style={S.teamName}>{b.name}</div>
                <div style={S.teamSpec}>{b.spec}</div>
                <div style={S.teamBio}>{b.bio}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={S.section(false)}>
        <div style={S.sectionInner}>
          <div style={S.sectionEye}>Testimonios</div>
          <h2 style={S.sectionTitle}>Lo que Dicen Nuestros Clientes</h2>
          <div style={S.ornamentCenter}>
            <div style={S.ornLine} />
            <span style={{ color: T.brass, fontSize: 16 }}>✦</span>
            <div style={S.ornLineRev} />
          </div>
          <div style={S.testiGrid}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={S.testiCard}>
                <div style={S.testiQuote}>"</div>
                <div style={S.testiStars}>{"★".repeat(t.stars)}</div>
                <div style={S.testiText}>{t.text}</div>
                <div style={S.testiAuthor}>{t.author}</div>
                <div style={S.testiSub}>{t.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={S.ctaSection}>
        <div style={S.ctaInner}>
          <div style={{ ...S.sectionEye, marginBottom: 16 }}>¿Listo para el Cambio?</div>
          <h2 style={S.ctaTitle}>Reserva tu Cita Hoy</h2>
          <p style={S.ctaSub}>
            No esperes más. El caballero que llevas dentro merece lo mejor.<br />
            Reserva en segundos y vive la experiencia Hermano.
          </p>
          <div style={S.heroBtnRow}>
            <button style={S.btnPrimary} onClick={onBook}>✂ Reservar Ahora</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={S.footer}>
        <div style={S.footerInner}>
          <div>
            <div style={S.footerLogo}>HERMANO</div>
            <div style={S.footerDesc}>
              La barbería premium de Madrid donde tradición y modernidad se fusionan para el caballero de hoy.
            </div>
          </div>
          
          <div>
            <div style={S.footerColTitle}>Contacto</div>
            <span style={S.footerLink}>📍 Calle Mayor 42, Madrid</span>
            <span style={S.footerLink}>📞 +34 91 000 00 00</span>
            <span style={S.footerLink}>🕐 Lun–Sáb: 9:00 – 20:00</span>
            <span style={S.footerLink}>✉ hola@hermano.es</span>
          </div>
        </div>
        <div style={S.footerBottom}>
          © 2024 Peluquero Hermano · Todos los derechos reservados
        </div>
      </footer>
    </div>
  );
}
