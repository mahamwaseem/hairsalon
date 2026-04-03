import { useState } from "react";
import HomePage from "./HomePage";
import ContactPage from "./ContactPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home"); // "home" or "contact"

  return currentPage === "home" ? (
    <HomePage onNavigateToContact={() => setCurrentPage("contact")} />
  ) : (
    <ContactPage onBack={() => setCurrentPage("home")} />
  );
}