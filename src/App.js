import { useState } from "react";
import HomePage from "./HomePage";
import PeluqueroHermano from "./BookingPage";

export default function App() {
  const [page, setPage] = useState("home"); // "home" | "booking"

  return (
    <>
      {page === "home" && (
        <HomePage onBook={() => setPage("booking")} />
      )}
      {page === "booking" && (
        <div>
          {/* Back to Home button */}
          <div style={{
            position: "fixed", top: 20, left: 24, zIndex: 9999,
          }}>
            <button
              onClick={() => setPage("home")}
              style={{
                background: "rgba(40,90,72,0.9)",
                border: "1px solid #408A71",
                color: "#B0E4CC",
                padding: "10px 20px",
                fontFamily: "'Georgia', serif",
                fontSize: 11, letterSpacing: 3,
                cursor: "pointer", borderRadius: 2,
                textTransform: "uppercase", fontWeight: 700,
                backdropFilter: "blur(8px)",
              }}
            >
              ← Home
            </button>
          </div>
          <PeluqueroHermano />
        </div>
      )}
    </>
  );
}
