import "../styles.css";
import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>© {year} Moviedux. All rights reserved.</p>
    </footer>
  );
}
