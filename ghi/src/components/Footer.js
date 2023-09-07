import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Fitness Quest</p>
      <p>Made by Fullstack Alchemist</p>
    </footer>
  );
}
