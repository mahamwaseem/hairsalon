import { useState } from "react";

// ─── THEME: Warm Dark + Dusty Rose + Golden Brass ───────────────────────────────
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

// ─── INLINE STYLES ─────────────────────────────────────────────────────────
const S = {
  body: {
    fontFamily: "'Georgia', serif",
    background: T.bg,
    color: T.text,
    minHeight: "100vh",
    overflowX: "hidden",
    position: "relative",
  },
  bgOverlay: {
    position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
    background: `
      radial-gradient(ellipse 70% 50% at 15% 10%, #336d58 0, transparent 60%),
      radial-gradient(ellipse 50% 70% at 85% 90%, #336d58 0%, transparent 60%),
      repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(157,107,92,0.01) 60px, rgba(157,107,92,0.01) 61px)
    `,
  },
  header: {
    position: "relative", zIndex: 1, textAlign: "center",
    padding: "56px 20px 32px",
  },
  ornamentRow: {
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: 18, marginBottom: 14,
  },
  line: (rev) => ({
    flex: 1, maxWidth: 110, height: 1,
    background: rev
      ? `linear-gradient(90deg, ${T.accentLt}, transparent)`
      : `linear-gradient(90deg, transparent, ${T.accentLt})`,
  }),
  shopNameTop: {
    fontFamily: "'Georgia', serif",
    fontSize: "clamp(11px,2vw,14px)",
    letterSpacing: 10,
    color: T.brass,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  shopNameMain: {
    fontFamily: "'Georgia', serif",
    fontSize: "clamp(44px,9vw,96px)",
    fontWeight: 900,
    letterSpacing: 4,
    color: T.text,
    lineHeight: 1,
    textShadow: `0 0 50px rgba(157,107,92,0.15)`,
    margin: 0,
  },
  tagline: {
    fontStyle: "italic", fontSize: 15, letterSpacing: 3,
    color: T.accentLt, marginTop: 10, opacity: 0.8,
  },
  stepsNav: {
    display: "flex", justifyContent: "center", maxWidth: 680,
    margin: "36px auto 0", padding: "0 20px", position: "relative", zIndex: 1,
  },
  stepItem: { display: "flex", flexDirection: "column", alignItems: "center", flex: 1, position: "relative", cursor: "pointer" },
  stepLine: (done) => ({
    position: "absolute", top: 18, left: "60%", right: "-40%", height: 1,
    background: done ? T.accent : "#FEF3E2",
    transition: "background 0.4s",
  }),
  stepNum: (active, done) => ({
    width: 36, height: 36, borderRadius: "50%", display: "flex",
    alignItems: "center", justifyContent: "center",
    fontFamily: "'Georgia', serif", fontSize: 15, fontWeight: 700,
    border: `1.5px solid ${active ? T.accent : done ? T.accent : "rgba(157,107,92,0.15)"}`,
    color: active ? T.bg : done ? T.accent : T.textDim,
    background: active ? T.accent : "transparent",
    boxShadow: active ? `0 0 18px rgba(157,107,92,0.35)` : "none",
    position: "relative", zIndex: 2, transition: "all 0.4s",
  }),
  stepLabel: (active, done) => ({
    fontSize: 10, letterSpacing: 2, textTransform: "uppercase",
    color: active ? T.accent : done ? "rgba(157,107,92,0.6)" : "rgba(157,107,92,0.3)",
    marginTop: 7, fontWeight: 700, transition: "color 0.4s",
  }),
  mainCard: {
    maxWidth: 1100, margin: "36px auto 60px",
    padding: "0 20px", position: "relative", zIndex: 1,
  },
  cardInner: {
    background: `linear-gradient(145deg, ${T.card}, ${T.bg2})`,
    border: `1px solid ${T.border}`,
    borderRadius: 4, padding: "48px 48px",
    position: "relative", overflow: "hidden",
    boxShadow: `0 8px 20px rgba(90,74,56,0.1), inset 0 1px 0 rgba(201,166,97,0.15)`,
  },
  topBar: {
    position: "absolute", top: 0, left: 0, right: 0, height: 3,
    background: `linear-gradient(90deg, transparent, ${T.accentDk}, ${T.accent}, ${T.accentLt}, ${T.accent}, transparent)`,
  },
  corner: (pos) => {
    const map = {
      tl: { top: 16, left: 16, borderWidth: "1px 0 0 1px" },
      tr: { top: 16, right: 16, borderWidth: "1px 1px 0 0" },
      bl: { bottom: 16, left: 16, borderWidth: "0 0 1px 1px" },
      br: { bottom: 16, right: 16, borderWidth: "0 1px 1px 0" },
    };
    return { position: "absolute", width: 22, height: 22, borderColor: "rgba(157,107,92,0.25)", borderStyle: "solid", ...map[pos] };
  },
  panelTitle: {
    fontFamily: "'Georgia', serif", fontSize: 28, fontWeight: 700,
    color: T.text, marginBottom: 6,
  },
  panelSub: {
    fontStyle: "italic", color: T.accentLt, fontSize: 15, opacity: 0.75,
    letterSpacing: 1, marginBottom: 30,
  },
  // Service grid
  serviceGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
    gap: 14, marginBottom: 34,
  },
  serviceCard: (sel) => ({
    border: `1px solid ${sel ? T.accent : T.border}`,
    borderRadius: 3, padding: "20px 18px", cursor: "pointer",
    background: sel ? "rgba(157,107,92,0.05)" : "rgba(255,255,255,0.02)",
    boxShadow: sel ? `0 0 22px rgba(157,107,92,0.12)` : "none",
    transition: "all 0.3s",
    position: "relative", overflow: "hidden",
  }),
  serviceIcon: { fontSize: 26, marginBottom: 10, display: "block" },
  serviceName: {
    fontFamily: "'Georgia', serif", fontSize: 15, fontWeight: 700,
    color: T.text, marginBottom: 4,
  },
  servicePrice: { fontSize: 20, color: T.brass, fontWeight: 700, letterSpacing: 1 },
  serviceDur: { fontSize: 11, color: T.textDim, letterSpacing: 2, textTransform: "uppercase", marginTop: 4 },
  // Barber grid
  barberGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))",
    gap: 16, marginBottom: 34,
  },
  barberCard: (sel) => ({
    border: `1px solid ${sel ? T.accent : T.border}`,
    borderRadius: 3, padding: "24px 16px", textAlign: "center", cursor: "pointer",
    background: sel ? "rgba(157,107,92,0.05)" : "rgba(255,255,255,0.02)",
    boxShadow: sel ? `0 0 22px rgba(157,107,92,0.12)` : "none",
    transition: "all 0.3s",
  }),
  barberAvatar: (sel) => ({
    width: 72, height: 72, borderRadius: "50%",
    background: `linear-gradient(135deg, ${T.accentDk}, ${T.accent})`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 30, margin: "0 auto 12px",
    border: `2px solid ${sel ? T.accent : "rgba(157,107,92,0.15)"}`,
    transition: "border-color 0.3s",
  }),
  barberName: {
    fontFamily: "'Georgia', serif", fontSize: 14, fontWeight: 700,
    color: T.text, marginBottom: 4,
  },
  barberSpec: { fontSize: 12, color: T.accentLt, fontStyle: "italic", opacity: 0.8 },
  // DateTime
  dtGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 34 },
  dtSectionTitle: {
    fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
    color: "#FEF3E2", marginBottom: 12, fontWeight: 700,
  },
  calNav: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  calNavBtn: {
    background: "none", border: `1px solid ${T.border}`,
    color: T.accent, width: 28, height: 28, borderRadius: 2,
    cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center",
  },
  calMonth: { fontFamily: "'Georgia', serif", fontSize: 15, letterSpacing: 3, color: T.text, fontWeight: 700 },
  calGrid: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3 },
  calHeader: { textAlign: "center", fontSize: 10, letterSpacing: 1, color: "rgba(157,107,92,0.4)", padding: "4px 0", textTransform: "uppercase" },
  calDay: (sel, disabled, today) => ({
    aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 13, borderRadius: 2, cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s",
    background: sel ? T.accent : "transparent",
    color: sel ? T.bg : disabled ? T.textDim : T.text,
    fontWeight: sel ? 700 : 400,
    border: today && !sel ? `1px solid rgba(157,107,92,0.28)` : "none",
    opacity: disabled ? 0.3 : 1,
  }),
  timeGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 7 },
  timeSlot: (sel, occupied) => ({
    border: `1px solid ${sel ? T.accent : occupied ? "rgba(157,107,92,0.06)" : T.border}`,
    borderRadius: 2, padding: "9px 4px", textAlign: "center",
    fontSize: 12, cursor: occupied ? "not-allowed" : "pointer",
    letterSpacing: 1, transition: "all 0.2s",
    background: sel ? T.accent : "transparent",
    color: sel ? T.bg : occupied ? T.textDim : T.text,
    fontWeight: sel ? 700 : 400,
    textDecoration: occupied ? "line-through" : "none",
  }),
  // Form
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 34 },
  formGroup: (full) => ({ display: "flex", flexDirection: "column", gap: 7, gridColumn: full ? "1/-1" : undefined }),
  formLabel: { fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "#FFEEA9", fontWeight: 700 },
  formInput: {
    background: "#FEF3E2", border: `1px solid ${T.border}`,
    borderRadius: 2, padding: "12px 14px", color: "#285A48",
    fontFamily: "'Georgia', serif", fontSize: 16, outline: "none",
  },
  // Summary
  summaryBox: {
    border: `1px solid rgba(157,107,92,0.15)`, borderRadius: 3,
    padding: 28, marginBottom: 28, background: "rgba(157,107,92,0.02)",
  },
  summaryRow: (total) => ({
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "10px 0", borderBottom: total ? "none" : "1px solid #FFEEA9",
  }),
  summaryLabel: { fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#FFEEA9" },
  summaryVal: (total) => ({
    fontFamily: "'Georgia', serif", fontSize: total ? 24 : 16,
    color: total ? T.brass : T.text, fontWeight: total ? 700 : 400,
  }),
  divider: { height: 1, background: `linear-gradient(90deg,transparent,rgba(157,107,92,0.15),transparent)`, margin: "8px 0" },
  // Buttons
  btnRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" },
  btnPrimary: {
    display: "inline-flex", alignItems: "center", gap: 10,
    background: `linear-gradient(135deg, ${T.accentDk}, ${T.accent}, ${T.accentLt})`,
    color: T.bg, border: "none", padding: "15px 36px",
    fontFamily: "'Georgia', serif", fontSize: 14, letterSpacing: 3,
    cursor: "pointer", borderRadius: 2, fontWeight: 700, textTransform: "uppercase",
    boxShadow: `0 4px 20px rgba(157,107,92,0.25)`, transition: "all 0.3s",
  },
  btnSecondary: {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "transparent", color: "#FEF3E2",
    border: `1px solid #FEF3E2`, padding: "14px 28px",
    fontFamily: "'Georgia', serif", fontSize: 13, letterSpacing: 3,
    cursor: "pointer", borderRadius: 2, fontWeight: 700, textTransform: "uppercase",
    transition: "all 0.3s",
  },
  // Success
  successPanel: { textAlign: "center", padding: "20px 0" },
  successIcon: { fontSize: 64, display: "block", marginBottom: 20 },
  successTitle: { fontFamily: "'Georgia', serif", fontSize: 36, fontWeight: 900, color: T.accent, marginBottom: 12 },
  successMsg: { fontSize: 17, color: T.textMid, fontStyle: "italic", maxWidth: 420, margin: "0 auto 32px", lineHeight: 1.7 },
  confirmCode: {
    background: "rgba(157,107,92,0.05)", border: `1px solid rgba(157,107,92,0.2)`,
    padding: "18px 32px", borderRadius: 3, display: "inline-block", marginBottom: 32,
  },
  confirmCodeLabel: { fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(157,107,92,0.4)", marginBottom: 6 },
  confirmCodeVal: { fontFamily: "'Georgia', serif", fontSize: 32, letterSpacing: 8, color: T.brass, fontWeight: 700 },
  // Info bar
  infoBar: {
    display: "flex", gap: 24, justifyContent: "center", padding: "20px",
    borderTop: `1px solid rgba(157,107,92,0.08)`, marginTop: 16, flexWrap: "wrap",
  },
  infoItem: { display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#B0E4CC", letterSpacing: 1 },
  // Toast
  toast: (show) => ({
    position: "fixed", bottom: 30, left: "50%",
    transform: `translateX(-50%) translateY(${show ? 0 : 20}px)`,
    background: T.card, border: `1px solid ${T.accent}`, color: T.text,
    padding: "13px 24px", borderRadius: 3, fontSize: 14, letterSpacing: 1,
    opacity: show ? 1 : 0, transition: "all 0.4s", zIndex: 999,
    whiteSpace: "nowrap", boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
    pointerEvents: "none",
  }),
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  { img: "https://cdn-icons-png.flaticon.com/512/3050/3050155.png", name: "Corte Clásico", price: 18, dur: "30 min" },
  { img: "https://cdn-icons-png.flaticon.com/512/921/921347.png", name: "Corte + Barba", price: 28, dur: "50 min" },
  { img: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png", name: "Afeitado Navaja", price: 22, dur: "40 min" },
  { img: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png", name: "Degradado Moderno", price: 20, dur: "35 min" },
  { img: "https://cdn-icons-png.flaticon.com/512/1686/1686396.png", name: "Tratamiento Capilar", price: 35, dur: "60 min" },
  { img: "https://cdn-icons-png.flaticon.com/512/2583/2583344.png", name: "Paquete Caballero", price: 65, dur: "90 min" },
];
const BARBERS = [
  { img: "https://randomuser.me/api/portraits/men/32.jpg", name: "Carlos Hermano", spec: "Degradados & Fade" },
  { img: "https://randomuser.me/api/portraits/men/45.jpg", name: "Miguel Ángel", spec: "Barbas & Afeitado" },
  { img: "https://randomuser.me/api/portraits/men/65.jpg", name: "Diego Ruiz", spec: "Clásico & Vintage" },
  { img: "https://randomuser.me/api/portraits/men/12.jpg", name: "Sin Preferencia", spec: "Cualquier barbero" },
];
const TIMES_OCCUPIED = new Set(["09:00", "10:30", "12:00", "16:30", "18:00"]);
const ALL_TIMES = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"];
const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const DIAS = ["LU", "MA", "MI", "JU", "VI", "SÁ", "DO"];

// ─── CALENDAR HOOK ─────────────────────────────────────────────────────────────
function useCalendar(selectedDate, onSelect) {
  const [calDate, setCalDate] = useState(new Date());
  const changeMonth = (dir) => {
    const d = new Date(calDate);
    d.setMonth(d.getMonth() + dir);
    setCalDate(d);
  };
  const month = calDate.getMonth(), year = calDate.getFullYear();
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const label = `${MESES[month]} ${year}`;
  const isSel = (d) => selectedDate === `${d}/${month + 1}/${year}`;
  const isToday = (d) => new Date(year, month, d).getTime() === today.getTime();
  const isDisabled = (d) => new Date(year, month, d) < today;
  const handleDay = (d) => { if (!isDisabled(d)) onSelect(`${d}/${month + 1}/${year}`); };

  return { label, cells, changeMonth, isSel, isToday, isDisabled, handleDay };
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function useToast() {
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const showToast = (m) => {
    setMsg(m); setShow(true);
    setTimeout(() => setShow(false), 3000);
  };
  return { msg, show, showToast };
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function PeluqueroHermano() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState(null);
  const [barber, setBarber] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [form, setForm] = useState({ nombre: "", apellido: "", telefono: "", email: "", notas: "" });
  const [bookingCode, setBookingCode] = useState("");
  const { msg, show, showToast } = useToast();
  const cal = useCalendar(date, setDate);

  const STEPS = ["Servicio", "Barbero", "Fecha", "Datos", "Confirmar"];

  const goTo = (target) => {
    if (target === 2 && !service) return showToast("⚠ Selecciona un servicio");
    if (target === 3 && !barber) return showToast("⚠ Selecciona un barbero");
    if (target === 4 && !date) return showToast("⚠ Selecciona una fecha");
    if (target === 4 && !time) return showToast("⚠ Selecciona una hora");
    if (target === 5) {
      if (!form.nombre.trim()) return showToast("⚠ Ingresa tu nombre");
      if (!form.telefono.trim()) return showToast("⚠ Ingresa tu teléfono");
      if (!form.email.trim()) return showToast("⚠ Ingresa tu correo");
    }
    setStep(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmar = () => {
    const code = "PH-" + Math.floor(1000 + Math.random() * 9000);
    setBookingCode(code); setStep(6);
    showToast(" ¡Reserva confirmada!");
  };

  const reset = () => {
    setStep(1); setService(null); setBarber(null);
    setDate(null); setTime(null);
    setForm({ nombre: "", apellido: "", telefono: "", email: "", notas: "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inp = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div style={S.body}>
      <div style={S.bgOverlay} />

      {/* ── HEADER ── */}
      <header style={S.header}>
        <div style={S.ornamentRow}>
          <div style={S.line(false)} />
          <span style={{ color: T.brass, fontSize: 20 }}>✂</span>
          <div style={S.line(true)} />
        </div>
        <div style={S.shopNameTop}>Peluquero</div>
        <h1 style={S.shopNameMain}>HERMANO</h1>
        <div style={S.tagline}>Arte & Estilo para el Caballero Moderno</div>
      </header>

      {/* ── STEPS NAV ── */}
      {step <= 5 && (
        <div style={S.stepsNav}>
          {STEPS.map((label, i) => {
            const num = i + 1;
            const active = step === num, done = step > num;
            return (
              <div key={num} style={S.stepItem}>
                {i < STEPS.length - 1 && <div style={S.stepLine(done)} />}
                <div style={S.stepNum(active, done)}>{done ? "✓" : num}</div>
                <div style={S.stepLabel(active, done)}>{label}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── MAIN CARD ── */}
      <div style={S.mainCard}>
        <div style={S.cardInner}>
          <div style={S.topBar} />
          {["tl", "tr", "bl", "br"].map(p => <div key={p} style={S.corner(p)} />)}

          {/* ── STEP 1: SERVICIO ── */}
          {step === 1 && (
            <div>
              <div style={S.panelTitle}>Elige tu Servicio</div>
              <div style={S.panelSub}>Selecciona el servicio que deseas reservar</div>
              <div style={S.serviceGrid}>
                {SERVICES.map((svc) => (
                  <div key={svc.name} style={S.serviceCard(service?.name === svc.name)}
                    onClick={() => setService(svc)}>
                    <img
                      src={svc.img}
                      alt={svc.name}
                      style={{
                        width: 40,
                        height: 40,
                        objectFit: "contain",
                        marginBottom: 10,
                        filter: "brightness(0) invert(1)"
                      }}
                    />
                    <div style={S.serviceName}>{svc.name}</div>
                    <div style={S.servicePrice}>€ {svc.price}</div>
                    <div style={S.serviceDur}>{svc.dur}</div>
                  </div>
                ))}
              </div>
              <div style={S.btnRow}>
                <div />
                <button style={S.btnPrimary} onClick={() => goTo(2)}>Siguiente →</button>
              </div>
            </div>
          )}

          {/* ── STEP 2: BARBERO ── */}
          {step === 2 && (
            <div>
              <div style={S.panelTitle}>Elige tu Barbero</div>
              <div style={S.panelSub}>Nuestros maestros a tu disposición</div>
              <div style={S.barberGrid}>
                {BARBERS.map((b) => (
                  <div key={b.name} style={S.barberCard(barber?.name === b.name)}
                    onClick={() => setBarber(b)}>
                    <div style={S.barberAvatar(barber?.name === b.name)}>
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
                    <div style={S.barberName}>{b.name}</div>
                    <div style={S.barberSpec}>{b.spec}</div>
                  </div>
                ))}
              </div>
              <div style={S.btnRow}>
                <button style={S.btnSecondary} onClick={() => goTo(1)}>← Atrás</button>
                <button style={S.btnPrimary} onClick={() => goTo(3)}>Siguiente →</button>
              </div>
            </div>
          )}

          {/* ── STEP 3: FECHA & HORA ── */}
          {step === 3 && (
            <div>
              <div style={S.panelTitle}>Fecha y Hora</div>
              <div style={S.panelSub}>Selecciona cuándo quieres visitarnos</div>
              <div style={{ ...S.dtGrid, gridTemplateColumns: "1fr 1fr" }}>
                {/* Calendar */}
                <div>
                  <div style={S.dtSectionTitle}>Seleccionar Fecha</div>
                  <div style={S.calNav}>
                    <button style={S.calNavBtn} onClick={() => cal.changeMonth(-1)}>‹</button>
                    <div style={S.calMonth}>{cal.label}</div>
                    <button style={S.calNavBtn} onClick={() => cal.changeMonth(1)}>›</button>
                  </div>
                  <div style={S.calGrid}>
                    {DIAS.map(d => <div key={d} style={S.calHeader}>{d}</div>)}
                    {cal.cells.map((d, i) =>
                      d === null
                        ? <div key={i} />
                        : <div key={i} style={S.calDay(cal.isSel(d), cal.isDisabled(d), cal.isToday(d))}
                          onClick={() => !cal.isDisabled(d) && cal.handleDay(d)}>{d}</div>
                    )}
                  </div>
                </div>
                {/* Times */}
                <div>
                  <div style={S.dtSectionTitle}>Seleccionar Hora</div>
                  <div style={S.timeGrid}>
                    {ALL_TIMES.map(t => {
                      const occ = TIMES_OCCUPIED.has(t);
                      return (
                        <div key={t} style={S.timeSlot(time === t, occ)}
                          onClick={() => !occ && setTime(t)}>{t}</div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div style={S.btnRow}>
                <button style={S.btnSecondary} onClick={() => goTo(2)}>← Atrás</button>
                <button style={S.btnPrimary} onClick={() => goTo(4)}>Siguiente →</button>
              </div>
            </div>
          )}

          {/* ── STEP 4: DATOS ── */}
          {step === 4 && (
            <div>
              <div style={S.panelTitle}>Tus Datos</div>
              <div style={S.panelSub}>Para confirmar tu reserva</div>
              <div style={S.formGrid}>
                {[
                  { label: "Nombre", name: "nombre", placeholder: "Tu nombre", full: false },
                  { label: "Apellidos", name: "apellido", placeholder: "Tus apellidos", full: false },
                  { label: "Teléfono", name: "telefono", placeholder: "+34 600 000 000", full: false },
                  { label: "Correo Electrónico", name: "email", placeholder: "correo@ejemplo.com", full: false },
                ].map(f => (
                  <div key={f.name} style={S.formGroup(f.full)}>
                    <label style={S.formLabel}>{f.label}</label>
                    <input style={S.formInput} name={f.name} value={form[f.name]}
                      onChange={inp} placeholder={f.placeholder} />
                  </div>
                ))}
                <div style={S.formGroup(true)}>
                  <label style={S.formLabel}>Notas Adicionales (opcional)</label>
                  <textarea style={{ ...S.formInput, minHeight: 80, resize: "vertical" }}
                    name="notas" value={form.notas} onChange={inp}
                    placeholder="¿Alguna preferencia especial?" />
                </div>
              </div>
              <div style={S.btnRow}>
                <button style={S.btnSecondary} onClick={() => goTo(3)}>← Atrás</button>
                <button style={S.btnPrimary} onClick={() => goTo(5)}>Revisar Reserva →</button>
              </div>
            </div>
          )}

          {/* ── STEP 5: RESUMEN ── */}
          {step === 5 && (
            <div>
              <div style={S.panelTitle}>Resumen de tu Cita</div>
              <div style={S.panelSub}>Revisa los detalles antes de confirmar</div>
              <div style={S.summaryBox}>
                {[
                  { label: "Servicio", val: service?.name },
                  { label: "Barbero", val: barber?.name },
                  { label: "Fecha", val: date },
                  { label: "Hora", val: time ? time + " h" : "—" },
                  { label: "Cliente", val: `${form.nombre} ${form.apellido}`.trim() },
                ].map(r => (
                  <div key={r.label} style={S.summaryRow(false)}>
                    <div style={S.summaryLabel}>{r.label}</div>
                    <div style={S.summaryVal(false)}>{r.val || "—"}</div>
                  </div>
                ))}
                <div style={S.divider} />
                <div style={S.summaryRow(true)}>
                  <div style={S.summaryLabel}>Total</div>
                  <div style={S.summaryVal(true)}>€ {service?.price || "—"}</div>
                </div>
              </div>
              <div style={S.btnRow}>
                <button style={S.btnSecondary} onClick={() => goTo(4)}>← Editar</button>
                <button style={S.btnPrimary} onClick={confirmar}>✓ Confirmar Reserva</button>
              </div>
            </div>
          )}

          {/* ── STEP 6: ÉXITO ── */}
          {step === 6 && (
            <div style={S.successPanel}>
              
              <div style={S.successTitle}>¡Reserva Confirmada!</div>
              <div style={S.successMsg}>
                Tu cita ha sido registrada con éxito. Te esperamos en <strong>Peluquero Hermano</strong>, caballero.
              </div>
              <div style={S.confirmCode}>
                <div style={S.confirmCodeLabel}>Código de Reserva</div>
                <div style={S.confirmCodeVal}>{bookingCode}</div>
              </div>
              <br />
              <button style={S.btnPrimary} onClick={reset}>✂ Nueva Reserva</button>
            </div>
          )}

          {/* ── INFO BAR ── */}
          <div style={S.infoBar}>
            <div style={S.infoItem}>📍 Calle Mayor 42, Madrid</div>
            <div style={S.infoItem}>📞 +34 91 000 00 00</div>
            <div style={S.infoItem}>🕐 Lun–Sáb: 9:00 – 20:00</div>
          </div>
        </div>
      </div>

      {/* ── TOAST ── */}
      <div style={S.toast(show)}>{msg}</div>
    </div>
  );
}
