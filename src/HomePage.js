import { useState, useEffect, useRef } from "react";
import logo from './assets/logo.png';

const heroSlides = [
  {
    img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1400&q=90",
    heading: "Donde Cada Corte",
    sub: "Cuenta una Historia",
    tag: "Maestría en Estilo",
  },
  {
    img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1400&q=90",
    heading: "Barba y Cabello",
    sub: "Con Precisión",
    tag: "Grooming Premium",
  },
  {
    img: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1400&q=90",
    heading: "El Arte del",
    sub: "Caballero Moderno",
    tag: "Experiencia Única",
  },
  {
    img: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=1400&q=90",
    heading: "Lujo y",
    sub: "Distinción",
    tag: "Tratamientos VIP",
  },
];

const services = [
  {
    title: "Corte de Caballero",
    desc: "Esculpido por maestros estilistas, adaptado a tu estructura facial y personalidad única.",
    price: "Desde €18",
    img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80",
  },
  {
    title: "Arreglo de Barba",
    desc: "Perfilado, degradado y acabado de barba con productos premium de aceite y cera.",
    price: "Desde €12",
    img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80",
  },
  {
    title: "Corte & Barba",
    desc: "El combo perfecto — corte de cabello y arreglo de barba en una sola sesión de lujo.",
    price: "Desde €28",
    img: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80",
  },
  {
    title: "Tratamiento Capilar",
    desc: "Hidratación profunda, masaje de cuero cabelludo y tratamientos anti-caída para hombres.",
    price: "Desde €35",
    img: "https://images.unsplash.com/photo-1512690459411-b9245aed614b?w=600&q=80",
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&q=80",
  "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&q=80",
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=500&q=80",
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=500&q=80",
  "https://images.unsplash.com/photo-1512690459411-b9245aed614b?w=500&q=80",
  "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&q=80",
  "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&q=80",
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&q=80",
];

const testimonials = [
  {
    name: "Carlos Martínez",
    role: "Empresario",
    text: "Peluquero Hermano transformó completamente mi imagen. Cada visita es una experiencia de cinco estrellas que no encontrarás en ningún otro lugar.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80",
  },
  {
    name: "Alejandro García",
    role: "Director Creativo",
    text: "He visitado barberías por toda España — ninguna se compara con la maestría y calidez de este lugar. Simplemente el mejor.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80",
  },
  {
    name: "Miguel Rodríguez",
    role: "Arquitecto",
    text: "El equipo de Peluquero Hermano tiene un talento extraordinario. Mi corte siempre es perfecto y el ambiente es inigualable.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
  },
];

const timeSlots = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"];

function BookingPage({ onBack }) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({ nombre: "", email: "", telefono: "", notas: "" });
  const [confirmed, setConfirmed] = useState(false);

  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());

  const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  const dias = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];

  function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }
  function getFirstDayOfMonth(month, year) {
    let d = new Date(year, month, 1).getDay();
    return d === 0 ? 6 : d - 1;
  }

  const daysInMonth = getDaysInMonth(calMonth, calYear);
  const firstDay = getFirstDayOfMonth(calMonth, calYear);

  function handleConfirm() {
    if (!formData.nombre || !formData.email || !formData.telefono) return;
    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <div style={{
        minHeight: "100vh", background: "#faf9f7",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px 20px", fontFamily: "'Raleway', sans-serif",
      }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Raleway:wght@300;400;500;600&display=swap');`}</style>
        <div style={{
          background: "white", border: "1px solid rgba(184,149,42,0.2)",
          boxShadow: "0 20px 80px rgba(184,149,42,0.12)",
          padding: "40px 24px", maxWidth: 540, width: "100%",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>✂️</div>
          <div style={{
            width: 70, height: 1.5,
            background: "linear-gradient(to right, transparent, #b8952a, transparent)",
            margin: "0 auto 24px",
          }} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 400, color: "#1a1208", margin: "0 0 16px" }}>
            ¡Cita <em style={{ color: "#b8952a" }}>Confirmada!</em>
          </h2>
          <p style={{ color: "#8a7c6e", lineHeight: 1.8, marginBottom: 32, fontSize: 14 }}>
            Gracias, <strong>{formData.nombre}</strong>. Tu cita ha sido reservada para el <strong>{selectedDate} de {meses[calMonth]}</strong> a las <strong>{selectedTime}</strong> para <strong>{selectedService}</strong>.
            <br /><br />Recibirás una confirmación en <strong>{formData.email}</strong>.
          </p>
          <button onClick={onBack} style={{
            background: "linear-gradient(135deg, #b8952a, #d4ac3a, #b8952a)",
            color: "white", border: "none", padding: "14px 36px",
            fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: 3,
            textTransform: "uppercase", cursor: "pointer", fontWeight: 600,
          }}>
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#faf9f7", fontFamily: "'Raleway', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Raleway:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .step-btn { transition: all 0.3s; cursor: pointer; }
        .step-btn:hover { transform: translateY(-2px); }
        .slot-btn { transition: all 0.25s; cursor: pointer; border: 1.5px solid rgba(184,149,42,0.3); background: white; padding: 10px 8px; font-family: 'Raleway', sans-serif; font-size: 12px; color: #8a7c6e; }
        .slot-btn:hover { border-color: #b8952a; color: #b8952a; }
        .slot-btn.active { background: #b8952a; color: white; border-color: #b8952a; }
        .svc-card { transition: all 0.3s; cursor: pointer; border: 1.5px solid rgba(184,149,42,0.2); background: white; padding: 20px; }
        .svc-card:hover { border-color: #b8952a; box-shadow: 0 8px 30px rgba(184,149,42,0.12); transform: translateY(-3px); }
        .svc-card.active { border-color: #b8952a; background: #fdf8ee; box-shadow: 0 8px 30px rgba(184,149,42,0.18); }
        .form-inp { width: 100%; background: transparent; border: none; border-bottom: 1px solid rgba(184,149,42,0.3); color: #1a1208; padding: 14px 0; font-family: 'Raleway', sans-serif; font-size: 13px; outline: none; transition: border-color 0.3s; }
        .form-inp:focus { border-bottom-color: #b8952a; }
        .form-inp::placeholder { color: rgba(138,124,110,0.5); }
        .cal-day { width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; font-size: 12px; cursor: pointer; border-radius: 50%; transition: all 0.2s; }
        .cal-day:hover:not(.disabled):not(.past) { background: rgba(184,149,42,0.15); color: #b8952a; }
        .cal-day.active { background: #b8952a; color: white; }
        .cal-day.disabled { color: rgba(138,124,110,0.3); cursor: default; }
        .cal-day.past { color: rgba(138,124,110,0.25); cursor: default; }

        /* ── BOOKING RESPONSIVE ── */
        .booking-header { padding: 20px 60px; }
        .booking-steps  { padding: 24px 60px; }
        .booking-body   { padding: 50px 30px; }
        .booking-svc-grid        { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .booking-datetime-grid   { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .booking-form-grid       { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .booking-summary         { display: flex; gap: 40px; }
        @media (max-width: 600px) {
          .booking-header  { padding: 14px 16px !important; }
          .booking-steps   { padding: 16px 16px !important; }
          .booking-body    { padding: 28px 16px !important; max-width: 100% !important; }
          .booking-svc-grid      { grid-template-columns: 1fr !important; }
          .booking-datetime-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .booking-form-grid     { grid-template-columns: 1fr !important; }
          .booking-summary       { flex-direction: column !important; gap: 14px !important; }
          .booking-title         { font-size: 30px !important; }
          .step-label            { display: none; }
        }
      `}</style>

      {/* Header */}
      <div className="booking-header" style={{
        background: "#1a1208",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "2px solid #b8952a",
      }}>
        <button onClick={onBack} style={{
          background: "none", border: "1px solid rgba(184,149,42,0.4)",
          color: "rgba(184,149,42,0.8)", padding: "8px 16px",
          fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: 3,
          textTransform: "uppercase", cursor: "pointer",
        }}>
          ← Volver
        </button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, letterSpacing: 4, color: "#d4ac3a" }}>PELUQUERO</div>
          <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 8, letterSpacing: 7, color: "rgba(212,172,58,0.6)", marginTop: 1 }}>HERMANO</div>
        </div>
        <div style={{ width: 80 }} />
      </div>

      {/* Steps indicator */}
      <div className="booking-steps" style={{ background: "white", borderBottom: "1px solid rgba(184,149,42,0.12)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, maxWidth: 600, margin: "0 auto" }}>
          {[
            { n: 1, label: "Servicio" },
            { n: 2, label: "Fecha & Hora" },
            { n: 3, label: "Tus Datos" },
          ].map((s, i) => (
            <div key={s.n} style={{ display: "flex", alignItems: "center", flex: 1, justifyContent: i === 1 ? "center" : i === 0 ? "flex-start" : "flex-end" }}>
              {i > 0 && <div style={{ flex: 1, height: 1, background: step > i ? "#b8952a" : "rgba(184,149,42,0.2)", margin: "0 8px" }} />}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: step >= s.n ? "#b8952a" : "white",
                  border: `1.5px solid ${step >= s.n ? "#b8952a" : "rgba(184,149,42,0.3)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: step >= s.n ? "white" : "#8a7c6e",
                  fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 500,
                  transition: "all 0.4s",
                }}>{s.n}</div>
                <div className="step-label" style={{ fontFamily: "'Raleway', sans-serif", fontSize: 9, letterSpacing: 2, color: step >= s.n ? "#b8952a" : "#8a7c6e", textTransform: "uppercase" }}>{s.label}</div>
              </div>
              {i < 2 && <div style={{ flex: 1, height: 1, background: step > s.n ? "#b8952a" : "rgba(184,149,42,0.2)", margin: "0 8px" }} />}
            </div>
          ))}
        </div>
      </div>

      <div className="booking-body" style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: 5, color: "#b8952a", textTransform: "uppercase", marginBottom: 10 }}>Paso 1</div>
              <h2 className="booking-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 400, color: "#1a1208" }}>
                Elige tu <em style={{ color: "#b8952a" }}>Servicio</em>
              </h2>
            </div>
            <div className="booking-svc-grid" style={{ marginBottom: 32 }}>
              {services.map(s => (
                <div key={s.title} className={`svc-card${selectedService === s.title ? " active" : ""}`}
                  onClick={() => setSelectedService(s.title)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 400, color: "#1a1208" }}>{s.title}</h3>
                    {selectedService === s.title && <div style={{ color: "#b8952a", fontSize: 18 }}>✓</div>}
                  </div>
                  <p style={{ fontSize: 12, color: "#8a7c6e", lineHeight: 1.65, marginBottom: 10 }}>{s.desc}</p>
                  <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, fontWeight: 600, color: "#b8952a" }}>{s.price}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button className="step-btn" onClick={() => selectedService && setStep(2)} style={{
                background: selectedService ? "linear-gradient(135deg, #b8952a, #d4ac3a, #b8952a)" : "rgba(184,149,42,0.2)",
                color: selectedService ? "white" : "#b8952a",
                border: "none", padding: "14px 36px",
                fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: 3,
                textTransform: "uppercase", cursor: selectedService ? "pointer" : "not-allowed", fontWeight: 600,
              }}>
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: 5, color: "#b8952a", textTransform: "uppercase", marginBottom: 10 }}>Paso 2</div>
              <h2 className="booking-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 400, color: "#1a1208" }}>
                Fecha & <em style={{ color: "#b8952a" }}>Hora</em>
              </h2>
            </div>
            <div className="booking-datetime-grid">
              {/* Calendar */}
              <div style={{ background: "white", border: "1px solid rgba(184,149,42,0.15)", padding: "24px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <button onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); }}
                    style={{ background: "none", border: "1px solid rgba(184,149,42,0.3)", color: "#b8952a", width: 30, height: 30, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "#1a1208" }}>
                    {meses[calMonth]} {calYear}
                  </div>
                  <button onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); }}
                    style={{ background: "none", border: "1px solid rgba(184,149,42,0.3)", color: "#b8952a", width: 30, height: 30, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1, marginBottom: 6 }}>
                  {dias.map(d => (
                    <div key={d} style={{ textAlign: "center", fontSize: 9, letterSpacing: 1, color: "#b8952a", fontFamily: "'Raleway', sans-serif", fontWeight: 600, padding: "4px 0" }}>{d}</div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 1 }}>
                  {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} />)}
                  {Array(daysInMonth).fill(null).map((_, i) => {
                    const day = i + 1;
                    const isPast = calYear === today.getFullYear() && calMonth === today.getMonth() && day < today.getDate();
                    const isSelected = selectedDate === day;
                    const isSunday = new Date(calYear, calMonth, day).getDay() === 0;
                    return (
                      <div key={day}
                        className={`cal-day${isPast || isSunday ? " past" : ""}${isSelected ? " active" : ""}`}
                        onClick={() => !isPast && !isSunday && setSelectedDate(day)}
                        style={{ justifySelf: "center" }}>
                        {day}
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop: 12, fontFamily: "'Raleway', sans-serif", fontSize: 10, color: "rgba(138,124,110,0.6)", letterSpacing: 1 }}>
                  * Cerrado los domingos
                </div>
              </div>

              {/* Time slots */}
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#1a1208", marginBottom: 16 }}>
                  {selectedDate ? `${selectedDate} de ${meses[calMonth]}` : "Selecciona una fecha"}
                </div>
                {selectedDate ? (
                  <div>
                    <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: 3, color: "#b8952a", textTransform: "uppercase", marginBottom: 14 }}>Horarios disponibles</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                      {timeSlots.map(t => (
                        <button key={t} className={`slot-btn${selectedTime === t ? " active" : ""}`}
                          onClick={() => setSelectedTime(t)}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ color: "rgba(138,124,110,0.5)", fontSize: 13, fontStyle: "italic" }}>
                    Primero selecciona una fecha en el calendario
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 36 }}>
              <button className="step-btn" onClick={() => setStep(1)} style={{
                background: "none", border: "1px solid rgba(184,149,42,0.4)", color: "#b8952a",
                padding: "13px 28px", fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: 3,
                textTransform: "uppercase", cursor: "pointer",
              }}>← Atrás</button>
              <button className="step-btn" onClick={() => selectedDate && selectedTime && setStep(3)} style={{
                background: selectedDate && selectedTime ? "linear-gradient(135deg, #b8952a, #d4ac3a, #b8952a)" : "rgba(184,149,42,0.2)",
                color: selectedDate && selectedTime ? "white" : "#b8952a",
                border: "none", padding: "14px 32px",
                fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: 3,
                textTransform: "uppercase", cursor: selectedDate && selectedTime ? "pointer" : "not-allowed", fontWeight: 600,
              }}>Continuar →</button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: 5, color: "#b8952a", textTransform: "uppercase", marginBottom: 10 }}>Paso 3</div>
              <h2 className="booking-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 400, color: "#1a1208" }}>
                Tus <em style={{ color: "#b8952a" }}>Datos</em>
              </h2>
            </div>

            {/* Summary */}
            <div className="booking-summary" style={{ background: "#fdf8ee", border: "1px solid rgba(184,149,42,0.2)", padding: "20px 24px", marginBottom: 28 }}>
              {[["Servicio", selectedService], ["Fecha", `${selectedDate} ${meses[calMonth]}`], ["Hora", selectedTime]].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 9, letterSpacing: 3, color: "#b8952a", textTransform: "uppercase", marginBottom: 4 }}>{k}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, color: "#1a1208" }}>{v}</div>
                </div>
              ))}
            </div>

            <div className="booking-form-grid">
              <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
                <input className="form-inp" placeholder="Nombre completo *"
                  value={formData.nombre} onChange={e => setFormData(p => ({ ...p, nombre: e.target.value }))} />
                <input className="form-inp" placeholder="Correo electrónico *" type="email"
                  value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
                <input className="form-inp" placeholder="Teléfono *"
                  value={formData.telefono} onChange={e => setFormData(p => ({ ...p, telefono: e.target.value }))} />
                <textarea className="form-inp" placeholder="Notas adicionales (opcional)" rows={3}
                  style={{ resize: "none" }}
                  value={formData.notas} onChange={e => setFormData(p => ({ ...p, notas: e.target.value }))} />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 36 }}>
              <button className="step-btn" onClick={() => setStep(2)} style={{
                background: "none", border: "1px solid rgba(184,149,42,0.4)", color: "#b8952a",
                padding: "13px 28px", fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: 3,
                textTransform: "uppercase", cursor: "pointer",
              }}>← Atrás</button>
              <button className="step-btn" onClick={handleConfirm} style={{
                background: "linear-gradient(135deg, #b8952a, #d4ac3a, #b8952a)",
                color: "white", border: "none", padding: "14px 32px",
                fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: 3,
                textTransform: "uppercase", cursor: "pointer", fontWeight: 600,
                boxShadow: "0 4px 20px rgba(184,149,42,0.35)",
              }}>Confirmar Cita ✓</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PeluqueroHermano() {
  const [showBooking, setShowBooking] = useState(false);
  const [slide, setSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionRefs = useRef({});

  useEffect(() => {
    const timer = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => { setSlide(p => (p + 1) % heroSlides.length); setTransitioning(false); }, 600);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  function manualSlide(i) {
    if (i === slide) return;
    setTransitioning(true);
    setTimeout(() => { setSlide(i); setTransitioning(false); }, 600);
  }

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(p => (p + 1) % testimonials.length), 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }));
      }),
      { threshold: 0.15 }
    );
    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const registerRef = (id) => (el) => { sectionRefs.current[id] = el; };
  const isVisible = (id) => visibleSections[id];

  if (showBooking) return <BookingPage onBack={() => setShowBooking(false)} />;

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#faf9f7", color: "#1a1208", margin: 0, padding: 0, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Raleway:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --gold: #b8952a; --gold-light: #d4ac3a; --gold-pale: #e8c96a; --gold-bg: #fdf8ee; --white: #ffffff; --cream: #faf9f7; --warm-gray: #8a7c6e; --dark: #1a1208; }
        .serif { font-family: 'Playfair Display', Georgia, serif; }
        .sans  { font-family: 'Raleway', sans-serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #faf9f7; }
        ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }
        .nav-link { font-family: 'Raleway', sans-serif; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--warm-gray); text-decoration: none; transition: color 0.3s; cursor: pointer; position: relative; }
        .nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 1px; background: var(--gold); transition: width 0.3s ease; }
        .nav-link:hover { color: var(--gold); }
        .nav-link:hover::after { width: 100%; }
        .btn-gold { background: linear-gradient(135deg, #b8952a 0%, #d4ac3a 50%, #b8952a 100%); background-size: 200% auto; color: white; border: none; padding: 15px 40px; font-family: 'Raleway', sans-serif; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; cursor: pointer; transition: background-position 0.5s, transform 0.2s, box-shadow 0.3s; font-weight: 600; box-shadow: 0 4px 20px rgba(184,149,42,0.3); }
        .btn-gold:hover { background-position: right center; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(184,149,42,0.45); }
        .btn-outline { background: transparent; color: var(--gold); border: 1.5px solid var(--gold); padding: 14px 40px; font-family: 'Raleway', sans-serif; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; cursor: pointer; transition: all 0.3s; font-weight: 500; }
        .btn-outline:hover { background: var(--gold); color: white; box-shadow: 0 4px 20px rgba(184,149,42,0.3); }
        .service-card { position: relative; overflow: hidden; cursor: pointer; }
        .service-card img { width: 100%; height: 380px; object-fit: cover; display: block; transition: transform 0.7s ease; }
        .service-card:hover img { transform: scale(1.08); }
        .service-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(26,18,8,0.92) 0%, rgba(26,18,8,0.3) 55%, transparent 100%); padding: 28px; display: flex; flex-direction: column; justify-content: flex-end; }
        .service-card .book-btn { opacity: 0; transform: translateY(10px); transition: all 0.3s ease; margin-top: 12px; display: inline-flex; align-items: center; gap: 8px; color: var(--gold-pale); font-family: 'Raleway', sans-serif; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; cursor: pointer; background: none; border: none; }
        .service-card:hover .book-btn { opacity: 1; transform: translateY(0); }
        .gallery-item { overflow: hidden; position: relative; cursor: pointer; }
        .gallery-item img { width: 100%; height: 260px; object-fit: cover; display: block; transition: transform 0.6s ease, filter 0.4s ease; filter: saturate(0.85) brightness(0.95); }
        .gallery-item:hover img { transform: scale(1.07); filter: saturate(1.1) brightness(1); }
        .gallery-item .gallery-hover { position: absolute; inset: 0; background: linear-gradient(to top, rgba(184,149,42,0.4), transparent); opacity: 0; transition: opacity 0.4s; }
        .gallery-item:hover .gallery-hover { opacity: 1; }
        .reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-left { opacity: 0; transform: translateX(-50px); transition: opacity 0.9s ease, transform 0.9s ease; }
        .reveal-left.visible { opacity: 1; transform: translateX(0); }
        .reveal-right { opacity: 0; transform: translateX(50px); transition: opacity 0.9s ease, transform 0.9s ease; }
        .reveal-right.visible { opacity: 1; transform: translateX(0); }
        .reveal-delay-1 { transition-delay: 0.15s; }
        .reveal-delay-2 { transition-delay: 0.3s; }
        .reveal-delay-3 { transition-delay: 0.45s; }
        .reveal-delay-4 { transition-delay: 0.6s; }
        .gold-line { width: 70px; height: 1.5px; background: linear-gradient(to right, var(--gold), var(--gold-pale), var(--gold)); margin: 18px auto; }
        .sec-label { font-family: 'Raleway', sans-serif; font-size: 10px; letter-spacing: 5px; text-transform: uppercase; color: var(--gold); }
        .testi-card { background: white; box-shadow: 0 8px 50px rgba(184,149,42,0.1); border: 1px solid rgba(184,149,42,0.15); padding: 40px 36px; position: relative; }
        .testi-big-quote { font-family: 'Playfair Display', serif; font-size: 120px; line-height: 1; color: rgba(184,149,42,0.08); position: absolute; top: -10px; left: 24px; user-select: none; pointer-events: none; }
        .form-input { width: 100%; background: transparent; border: none; border-bottom: 1px solid rgba(184,149,42,0.3); color: var(--dark); padding: 14px 0; font-family: 'Raleway', sans-serif; font-size: 13px; letter-spacing: 0.5px; outline: none; transition: border-color 0.3s; }
        .form-input::placeholder { color: rgba(138,124,110,0.5); }
        .form-input:focus { border-bottom-color: var(--gold); }
        .stat-num { font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 400; color: var(--gold); line-height: 1; }
        .ornament { display: flex; align-items: center; gap: 12px; justify-content: center; margin: 20px 0; }
        .ornament-line { flex: 1; max-width: 80px; height: 1px; background: linear-gradient(to right, transparent, var(--gold)); }
        .ornament-line.rev { background: linear-gradient(to left, transparent, var(--gold)); }
        .ornament-diamond { width: 6px; height: 6px; background: var(--gold); transform: rotate(45deg); }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .ticker-inner { display: flex; white-space: nowrap; animation: ticker 22s linear infinite; }
        .ticker-inner:hover { animation-play-state: paused; }
        @keyframes pageLoad { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .hero-text-in { animation: pageLoad 1s ease both; }
        .hero-text-in-1 { animation-delay: 0.3s; }
        .hero-text-in-2 { animation-delay: 0.6s; }
        .hero-text-in-3 { animation-delay: 0.9s; }
        .hero-text-in-4 { animation-delay: 1.2s; }
        @keyframes floatBadge { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        .float-badge { animation: floatBadge 4s ease-in-out infinite; }
        .mobile-overlay { position: fixed; inset: 0; z-index: 200; background: white; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 36px; transform: translateX(100%); transition: transform 0.4s ease; }
        .mobile-overlay.open { transform: translateX(0); }

        /* ── MAIN RESPONSIVE ── */
        .section-pad { padding: 100px 80px; }
        .hero-inner   { padding: 0 80px; max-width: 780px; }
        .nav-inner    { padding: 20px 60px; }
        .footer-inner { padding: 50px 80px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 24px; }
        .about-grid   { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .service-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3px; }
        .gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; max-width: 1000px; margin: 0 auto; }
        .quote-banner { padding: 80px 80px; }

        @media (max-width: 900px) {
          .service-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
          .section-pad { padding: 60px 20px !important; }
          .hero-inner  { padding: 0 20px !important; max-width: 100% !important; }
          .nav-inner   { padding: 14px 16px !important; }
          .about-grid  { grid-template-columns: 1fr !important; gap: 40px !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .quote-banner { padding: 50px 20px !important; }
          .footer-inner { padding: 36px 20px !important; flex-direction: column !important; align-items: flex-start !important; }
          .float-badge  { display: none !important; }
          .hero-arrow   { display: none !important; }
          .stat-num     { font-size: 36px !important; }
          .stat-box     { left: 0 !important; right: 0 !important; bottom: -36px !important; }
          .service-grid { grid-template-columns: 1fr 1fr !important; }
          .gallery-grid { grid-template-columns: 1fr 1fr !important; }
          .service-card img { height: 260px !important; }
          .gallery-item img { height: 180px !important; }
        }

        @media (max-width: 480px) {
          .service-grid { grid-template-columns: 1fr !important; }
          .hero-dots    { bottom: 16px !important; }
          .testi-card   { padding: 28px 20px !important; }
          .testi-big-quote { font-size: 80px !important; }
          .btn-gold, .btn-outline { padding: 13px 24px !important; font-size: 9px !important; }
        }
      `}</style>

      {/* MOBILE MENU */}
      <div className={`mobile-overlay${menuOpen ? " open" : ""}`}>
        <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", fontSize: 28, color: "var(--gold)", cursor: "pointer" }}>✕</button>
        <div style={{ textAlign: "center" }}>
          <div className="serif" style={{ fontSize: 32, fontWeight: 400, color: "var(--gold)", letterSpacing: 2 }}>PELUQUERO</div>
          <div className="sans" style={{ fontSize: 9, letterSpacing: 7, color: "#b8952a", marginTop: -2 }}>HERMANO</div>
        </div>
        {[["Inicio", "home"], ["Servicios", "services"], ["Galería", "gallery"], ["Contacto", "contact"]].map(([l, id]) => (
          <a key={l} href={`#${id}`} className="nav-link" onClick={() => setMenuOpen(false)} style={{ fontSize: 14, letterSpacing: 4 }}>{l}</a>
        ))}
        <button className="btn-gold" onClick={() => { setMenuOpen(false); setShowBooking(true); }}>Reservar Cita</button>
      </div>

      {/* NAVBAR */}
      <nav className="nav-inner" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(250,249,247,0.97)" : "rgba(250,249,247,0.15)",
        borderBottom: scrolled ? "1px solid rgba(184,149,42,0.15)" : "none",
        backdropFilter: "blur(12px)", transition: "all 0.4s ease",
        boxShadow: scrolled ? "0 2px 30px rgba(184,149,42,0.08)" : "none",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1px", lineHeight: 1 }}>
          <img src={logo} alt="Logo" style={{ height: "55px", width: "auto" }} />
          <div>
            <div className="serif" style={{ fontSize: 18, fontWeight: 500, letterSpacing: 4, color: scrolled ? "var(--dark)" : "white", transition: "color 0.4s" }}>
              PELUQUERO
            </div>
            <div className="sans" style={{ fontSize: 8, letterSpacing: 8, color: "var(--gold)", marginTop: 1 }}>
              HERMANO
            </div>
          </div>
        </div>

        <div className="desktop-nav" style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {[["Inicio", "home"], ["Servicios", "services"], ["Galería", "gallery"], ["Contacto", "contact"]].map(([l, id]) => (
            <a key={l} href={`#${id}`} className="nav-link" style={{ color: scrolled ? "var(--warm-gray)" : "rgba(255,255,255,0.85)" }}>{l}</a>
          ))}
          <button className="btn-gold" style={{ padding: "10px 24px", fontSize: 9 }} onClick={() => setShowBooking(true)}>
            Reservar
          </button>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(true)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: 5 }}>
          {[0, 1, 2].map(i => <div key={i} style={{ width: 24, height: 1.5, background: scrolled ? "var(--dark)" : "white" }} />)}
        </button>
      </nav>

      {/* HERO */}
      <section id="home" style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
        {heroSlides.map((s, i) => (
          <img key={i} src={s.img} alt={s.heading} style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            opacity: i === slide ? 1 : 0, transform: i === slide ? "scale(1.06)" : "scale(1)",
            transition: "opacity 1s ease, transform 8s ease",
          }} />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(26,18,8,0.78) 0%, rgba(26,18,8,0.35) 60%, rgba(26,18,8,0.1) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "linear-gradient(to right, transparent 0%, var(--gold) 30%, var(--gold-pale) 50%, var(--gold) 70%, transparent 100%)" }} />

        <div className="hero-inner" style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="hero-text-in hero-text-in-1 sec-label" style={{ color: "var(--gold-pale)", marginBottom: 16 }}>
            {heroSlides[slide].tag}
          </div>
          <h1 className="serif hero-text-in hero-text-in-2" style={{
            fontSize: "clamp(38px, 7vw, 96px)", fontWeight: 400, lineHeight: 1.1, color: "white", margin: 0,
            opacity: transitioning ? 0 : 1, transform: transitioning ? "translateY(20px)" : "translateY(0)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}>
            {heroSlides[slide].heading}<br />
            <em style={{ color: "var(--gold-pale)" }}>{heroSlides[slide].sub}</em>
          </h1>
          <div className="hero-text-in hero-text-in-3" style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0 28px" }}>
            <div style={{ width: 40, height: 1, background: "var(--gold)" }} />
            <div className="sans" style={{ fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.7)" }}>
              BARBERÍA & GROOMING DE ÉLITE
            </div>
          </div>
          <div className="hero-text-in hero-text-in-4" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn-gold" onClick={() => setShowBooking(true)}>Reservar Cita</button>
            <button className="btn-outline" style={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}>
              <a href="#services" style={{ color: "inherit", textDecoration: "none" }}>Explorar</a>
            </button>
          </div>
        </div>

        <div className="hero-dots" style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 10, alignItems: "center" }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => manualSlide(i)} style={{
              width: i === slide ? 36 : 8, height: 3,
              background: i === slide ? "var(--gold-pale)" : "rgba(255,255,255,0.4)",
              border: "none", cursor: "pointer", padding: 0, transition: "all 0.4s ease", borderRadius: 2,
            }} />
          ))}
        </div>

        {[{ dir: -1, pos: { left: 16 }, label: "‹" }, { dir: 1, pos: { right: 16 }, label: "›" }].map(({ dir, pos, label }) => (
          <button key={label} className="hero-arrow" onClick={() => manualSlide((slide + dir + heroSlides.length) % heroSlides.length)}
            style={{
              position: "absolute", top: "50%", transform: "translateY(-50%)", ...pos,
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", backdropFilter: "blur(4px)",
              color: "white", width: 44, height: 44, fontSize: 22, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(184,149,42,0.5)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
            {label}
          </button>
        ))}

        <div className="float-badge" style={{
          position: "absolute", bottom: 100, right: 60,
          background: "rgba(250,249,247,0.95)", border: "1px solid rgba(184,149,42,0.3)",
          backdropFilter: "blur(10px)", padding: "20px 28px", minWidth: 210,
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
        }}>
          <div className="sans" style={{ fontSize: 9, letterSpacing: 4, color: "var(--gold)", textTransform: "uppercase" }}>Oferta Especial</div>
          <div className="serif" style={{ fontSize: 20, marginTop: 6, color: "var(--dark)" }}>Corte + Barba</div>
          <div className="sans" style={{ fontSize: 11, color: "var(--warm-gray)", marginTop: 4 }}>15% dto — Reserva Este Mes</div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ background: "var(--gold)", padding: "12px 0", overflow: "hidden" }}>
        <div className="ticker-inner">
          {[...Array(6)].fill(null).map((_, i) => (
            <span key={i} className="sans" style={{ fontSize: 10, letterSpacing: 4, color: "white", textTransform: "uppercase", paddingRight: 60, display: "inline-flex", alignItems: "center", gap: 24 }}>
              Peluquero Hermano
              <span style={{ display: "inline-block", width: 4, height: 4, background: "rgba(255,255,255,0.6)", transform: "rotate(45deg)" }} />
              Barbería & Grooming Premium
              <span style={{ display: "inline-block", width: 4, height: 4, background: "rgba(255,255,255,0.6)", transform: "rotate(45deg)" }} />
              Lo Mejor en Estilo Masculino
              <span style={{ display: "inline-block", width: 4, height: 4, background: "rgba(255,255,255,0.6)", transform: "rotate(45deg)" }} />
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section ref={registerRef("about")} id="about" className="section-pad" style={{ background: "var(--cream)" }}>
        <div className="about-grid">
          <div className={`reveal-left ${isVisible("about") ? "visible" : ""}`}>
            <div className="sec-label" style={{ marginBottom: 16 }}>Sobre Nosotros</div>
            <h2 className="serif" style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.15, margin: "0 0 10px", color: "var(--dark)" }}>
              El Arte del<br /><em style={{ color: "var(--gold)" }}>Caballero</em>
            </h2>
            <div className="ornament" style={{ justifyContent: "flex-start" }}>
              <div style={{ width: 70, height: 1.5, background: "linear-gradient(to right, var(--gold), transparent)" }} />
              <div style={{ width: 6, height: 6, background: "var(--gold)", transform: "rotate(45deg)" }} />
            </div>
            <p className="sans" style={{ fontSize: 13.5, lineHeight: 2, color: "var(--warm-gray)", maxWidth: 460, marginBottom: 32 }}>
              Peluquero Hermano es más que una barbería — es un santuario para el hombre moderno. Nuestros maestros barberos combinan arte y técnica, utilizando los mejores productos para esculpir looks que definen tu identidad. Cada visita es un ritual de distinción.
            </p>
            <button className="btn-gold" onClick={() => setShowBooking(true)}>Reservar Ahora</button>
          </div>
          <div className={`reveal-right ${isVisible("about") ? "visible" : ""}`}>
            <div style={{ position: "relative", marginBottom: 40 }}>
              <img src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=85" alt="Barbería interior"
                style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }} />
              <div className="stat-box" style={{
                position: "absolute", bottom: -30, left: -20,
                background: "white", padding: "22px 28px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.1)", border: "1px solid rgba(184,149,42,0.2)",
              }}>
                <div style={{ display: "flex", gap: 28 }}>
                  {[["1,800+", "Clientes"], ["6+", "Años"], ["8", "Maestros"]].map(([n, l]) => (
                    <div key={l} style={{ textAlign: "center" }}>
                      <div className="stat-num">{n}</div>
                      <div className="sans" style={{ fontSize: 9, letterSpacing: 2, color: "var(--warm-gray)", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ position: "absolute", top: -12, right: -12, width: 50, height: 50, border: "2px solid var(--gold)", borderLeft: "none", borderBottom: "none" }} />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section ref={registerRef("services")} id="services" className="section-pad" style={{ background: "white" }}>
        <div className={`reveal ${isVisible("services") ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 50 }}>
          <div className="sec-label" style={{ marginBottom: 16 }}>Lo Que Ofrecemos</div>
          <h2 className="serif" style={{ fontSize: "clamp(36px, 5vw, 54px)", fontWeight: 400, color: "var(--dark)", margin: 0 }}>
            Nuestros <em style={{ color: "var(--gold)" }}>Servicios</em>
          </h2>
          <div className="ornament"><div className="ornament-line" /><div className="ornament-diamond" /><div className="ornament-line rev" /></div>
        </div>
        <div className="service-grid">
          {services.map((s, i) => (
            <div key={i} className={`service-card reveal ${isVisible("services") ? "visible" : ""} reveal-delay-${i + 1}`}>
              <img src={s.img} alt={s.title} />
              <div className="service-overlay">
                <div className="sans" style={{ fontSize: 9, letterSpacing: 3, color: "var(--gold-pale)", textTransform: "uppercase", marginBottom: 8 }}>{s.price}</div>
                <h3 className="serif" style={{ fontSize: 22, fontWeight: 400, margin: "0 0 8px", color: "white" }}>{s.title}</h3>
                <p className="sans" style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
                <button className="book-btn" onClick={() => setShowBooking(true)}>Reservar Este Servicio →</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE BANNER */}
      <div className="quote-banner" style={{ background: "linear-gradient(135deg, #1a1208 0%, #2d1f0a 100%)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 30% 50%, rgba(184,149,42,0.07) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(184,149,42,0.05) 0%, transparent 60%)" }} />
        <div className="serif" style={{ fontSize: "clamp(18px, 4vw, 42px)", fontStyle: "italic", color: "white", lineHeight: 1.6, position: "relative" }}>
          "El estilo es una forma de decir<br />
          <span style={{ color: "var(--gold-pale)" }}>quién eres sin tener que hablar."</span>
        </div>
        <div className="ornament" style={{ marginTop: 20 }}>
          <div className="ornament-line" /><div className="ornament-diamond" /><div className="ornament-line rev" />
        </div>
        <div className="sans" style={{ fontSize: 10, letterSpacing: 4, color: "var(--gold)", textTransform: "uppercase", marginTop: 8 }}>— Rachel Zoe</div>
      </div>

      {/* GALLERY */}
      <section ref={registerRef("gallery")} id="gallery" className="section-pad" style={{ background: "var(--cream)" }}>
        <div className={`reveal ${isVisible("gallery") ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 50 }}>
          <div className="sec-label" style={{ marginBottom: 16 }}>Nuestro Trabajo</div>
          <h2 className="serif" style={{ fontSize: "clamp(36px, 5vw, 54px)", fontWeight: 400, color: "var(--dark)", margin: 0 }}>
            La <em style={{ color: "var(--gold)" }}>Galería</em>
          </h2>
          <div className="ornament"><div className="ornament-line" /><div className="ornament-diamond" /><div className="ornament-line rev" /></div>
        </div>
        <div className="gallery-grid">
          {gallery.map((src, i) => (
            <div key={i} className={`gallery-item reveal ${isVisible("gallery") ? "visible" : ""} reveal-delay-${(i % 4) + 1}`}
              style={{ gridRow: i === 0 || i === 4 ? "span 2" : "span 1" }}>
              <img src={src} alt={`Galería ${i}`} style={{ height: i === 0 || i === 4 ? "526px" : "260px" }} />
              <div className="gallery-hover" />
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section ref={registerRef("testi")} id="testi" className="section-pad" style={{ background: "var(--gold-bg)" }}>
        <div className={`reveal ${isVisible("testi") ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 50 }}>
          <div className="sec-label" style={{ marginBottom: 16 }}>Opiniones</div>
          <h2 className="serif" style={{ fontSize: "clamp(36px, 5vw, 54px)", fontWeight: 400, color: "var(--dark)", margin: 0 }}>
            Lo Que <em style={{ color: "var(--gold)" }}>Dicen</em>
          </h2>
          <div className="ornament"><div className="ornament-line" /><div className="ornament-diamond" /><div className="ornament-line rev" /></div>
        </div>
        <div className={`reveal ${isVisible("testi") ? "visible" : ""}`} style={{ maxWidth: 700, margin: "0 auto" }}>
          <div className="testi-card">
            <div className="testi-big-quote">"</div>
            <p className="serif" style={{ fontSize: "clamp(16px, 2.5vw, 22px)", fontStyle: "italic", lineHeight: 1.75, color: "var(--dark)", margin: "0 0 28px", position: "relative", zIndex: 1 }}>
              "{testimonials[testimonialIdx].text}"
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <img src={testimonials[testimonialIdx].avatar} alt={testimonials[testimonialIdx].name}
                style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(184,149,42,0.4)" }} />
              <div>
                <div className="serif" style={{ fontSize: 17, color: "var(--dark)", fontWeight: 500 }}>{testimonials[testimonialIdx].name}</div>
                <div className="sans" style={{ fontSize: 9, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", marginTop: 3 }}>{testimonials[testimonialIdx].role}</div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 3 }}>
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: "var(--gold)", fontSize: 14 }}>★</span>)}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 24 }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setTestimonialIdx(i)} style={{
                width: i === testimonialIdx ? 28 : 8, height: 3,
                background: i === testimonialIdx ? "var(--gold)" : "rgba(184,149,42,0.3)",
                border: "none", cursor: "pointer", padding: 0, transition: "all 0.4s", borderRadius: 2,
              }} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section ref={registerRef("contact")} id="contact" className="section-pad" style={{ background: "white" }}>
        <div className={`reveal ${isVisible("contact") ? "visible" : ""}`} style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="sec-label" style={{ marginBottom: 16 }}>Reserva Tu Plaza</div>
          <h2 className="serif" style={{ fontSize: "clamp(36px, 5vw, 54px)", fontWeight: 400, color: "var(--dark)", margin: 0 }}>
            Pide tu <em style={{ color: "var(--gold)" }}>Cita</em>
          </h2>
          <div className="ornament"><div className="ornament-line" /><div className="ornament-diamond" /><div className="ornament-line rev" /></div>
        </div>
        <div className="contact-grid">
          <div className={`reveal-left ${isVisible("contact") ? "visible" : ""}`}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {["Nombre Completo", "Correo Electrónico", "Número de Teléfono"].map(p => (
                <input key={p} placeholder={p} className="form-input sans" />
              ))}
              <select className="form-input sans" style={{ cursor: "pointer" }}>
                <option value="">Seleccionar Servicio</option>
                {services.map(s => <option key={s.title}>{s.title}</option>)}
              </select>
              <textarea placeholder="Fecha preferida, hora o cualquier petición especial..." className="form-input sans" rows={4} style={{ resize: "none" }} />
              <button className="btn-gold" style={{ alignSelf: "flex-start" }} onClick={() => setShowBooking(true)}>
                Enviar Solicitud de Cita
              </button>
            </div>
          </div>
          <div className={`reveal-right ${isVisible("contact") ? "visible" : ""}`}>
            <img src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=85" alt="Barbería"
              style={{ width: "100%", height: 240, objectFit: "cover", marginBottom: 32, display: "block" }} />
            {[
              ["Ubicación", "Calle Serrano 45, Madrid, España"],
              ["Teléfono", "+34 91 234 5678"],
              ["Email", "hola@peluquerohermano.es"],
              ["Horario", "Martes – Domingo: 10:00 – 20:00"],
            ].map(([label, val]) => (
              <div key={label} style={{ display: "flex", gap: 20, marginBottom: 18, alignItems: "flex-start", borderBottom: "1px solid rgba(184,149,42,0.1)", paddingBottom: 18 }}>
                <div className="sans" style={{ fontSize: 9, letterSpacing: 3, color: "var(--gold)", textTransform: "uppercase", width: 68, flexShrink: 0, paddingTop: 2 }}>{label}</div>
                <div className="sans" style={{ fontSize: 13, color: "var(--warm-gray)" }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-inner" style={{ background: "var(--dark)", borderTop: "3px solid var(--gold)" }}>
        <div>
          <div className="serif" style={{ fontSize: 20, fontWeight: 500, letterSpacing: 4, color: "var(--gold-pale)" }}>PELUQUERO HERMANO</div>
          <div className="sans" style={{ fontSize: 10, letterSpacing: 3, color: "rgba(184,149,42,0.5)", marginTop: 4 }}>Barbería & Grooming · Est. 2019</div>
        </div>
        <div className="sans" style={{ fontSize: 11, color: "rgba(184,149,42,0.4)", letterSpacing: 1 }}>© 2026 Peluquero Hermano. Todos los derechos reservados.</div>
        <div style={{ display: "flex", gap: 24 }}>
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
