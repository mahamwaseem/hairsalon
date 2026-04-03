import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function ContactPage({ onBack }) {
  const [formData, setFormData] = useState({
    full_name: '',
    address: '',
    contact: '',
    dni_nie: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.full_name || !formData.address || !formData.contact || !formData.dni_nie) {
      setError('Todos los campos son obligatorios');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('customers')
        .insert([
          {
            full_name: formData.full_name,
            address: formData.address,
            contact: formData.contact,
            dni_nie: formData.dni_nie
          }
        ]);

      if (insertError) {
        setError(insertError.message);
      } else {
        setSubmitted(true);
        setFormData({ full_name: '', address: '', contact: '', dni_nie: '' });
        setTimeout(() => {
          setSubmitted(false);
          onBack();
        }, 2000);
      }
    } catch (err) {
      setError('Error al enviar el formulario: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
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
          <div style={{ fontSize: 64, marginBottom: 20 }}>✓</div>
          <div style={{
            width: 70, height: 1.5,
            background: "linear-gradient(to right, transparent, #b8952a, transparent)",
            margin: "0 auto 24px",
          }} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 400, color: "#1a1208", margin: "0 0 16px" }}>
            ¡Mensaje <em style={{ color: "#b8952a" }}>Enviado!</em>
          </h2>
          <p style={{ color: "#8a7c6e", lineHeight: 1.8, marginBottom: 32, fontSize: 14 }}>
            Gracias <strong>{formData.full_name}</strong>, tu mensaje ha sido recibido. Pronto nos pondremos en contacto contigo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#faf9f7", fontFamily: "'Raleway', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Raleway:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .form-input { width: 100%; background: transparent; border: none; border-bottom: 1px solid rgba(184,149,42,0.3); color: #1a1208; padding: 14px 0; font-family: 'Raleway', sans-serif; font-size: 13px; outline: none; transition: border-color 0.3s; }
        .form-input:focus { border-bottom-color: #b8952a; }
        .form-input::placeholder { color: rgba(138,124,110,0.5); }
        .contact-header { padding: 20px 60px; }
        .contact-body { padding: 50px 30px; }
        @media (max-width: 600px) {
          .contact-header  { padding: 14px 16px !important; }
          .contact-body    { padding: 28px 16px !important; max-width: 100% !important; }
          .contact-title   { font-size: 30px !important; }
          .contact-grid    { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Header */}
      <div className="contact-header" style={{
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

      <div className="contact-body" style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: 5, color: "#b8952a", textTransform: "uppercase", marginBottom: 10 }}>Ponte en Contacto</div>
          <h2 className="contact-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 400, color: "#1a1208" }}>
            Contacta <em style={{ color: "#b8952a" }}>con Nosotros</em>
          </h2>
          <p style={{ color: "#8a7c6e", marginTop: 16, fontSize: 14, lineHeight: 1.6 }}>
            Nos gustaría escuchar de ti. Rellena el formulario y nos pondremos en contacto lo antes posible.
          </p>
        </div>

        {error && (
          <div style={{
            background: "rgba(220, 53, 69, 0.1)", border: "1px solid rgba(220, 53, 69, 0.3)",
            color: "#c82333", padding: "14px 16px", marginBottom: 24, borderRadius: 4,
            fontFamily: "'Raleway', sans-serif", fontSize: 12,
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 32 }}>
            <div>
              <label style={{ fontFamily: "'Raleway', sans-serif", fontSize: 9, letterSpacing: 2, color: "#b8952a", textTransform: "uppercase", marginBottom: 12, display: "block" }}>
                Nombre Completo *
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                className="form-input"
              />
            </div>
            <div>
              <label style={{ fontFamily: "'Raleway', sans-serif", fontSize: 9, letterSpacing: 2, color: "#b8952a", textTransform: "uppercase", marginBottom: 12, display: "block" }}>
                DNI / NIE *
              </label>
              <input
                type="text"
                name="dni_nie"
                value={formData.dni_nie}
                onChange={handleChange}
                placeholder="Tu DNI o NIE"
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 32 }}>
            <div>
              <label style={{ fontFamily: "'Raleway', sans-serif", fontSize: 9, letterSpacing: 2, color: "#b8952a", textTransform: "uppercase", marginBottom: 12, display: "block" }}>
                Dirección *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Tu dirección completa"
                className="form-input"
              />
            </div>
            <div>
              <label style={{ fontFamily: "'Raleway', sans-serif", fontSize: 9, letterSpacing: 2, color: "#b8952a", textTransform: "uppercase", marginBottom: 12, display: "block" }}>
                Contacto (Teléfono/Email) *
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Tu teléfono o email"
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 16, marginTop: 48 }}>
            <button
              type="button"
              onClick={onBack}
              style={{
                background: "none", border: "1px solid rgba(184,149,42,0.4)", color: "#b8952a",
                padding: "13px 28px", fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: 3,
                textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s",
              }}
            >
              ← Atrás
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? "rgba(184,149,42,0.4)" : "linear-gradient(135deg, #b8952a, #d4ac3a, #b8952a)",
                color: "white", border: "none", padding: "14px 32px",
                fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: 3,
                textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", fontWeight: 600,
                boxShadow: loading ? "none" : "0 4px 20px rgba(184,149,42,0.35)", transition: "all 0.3s",
              }}
            >
              {loading ? "Enviando..." : "Enviar Mensaje ✓"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
