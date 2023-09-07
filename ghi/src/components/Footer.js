import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Fitness Quest</p>
      <p>Made by Fullstack Alchemist</p>
    </footer>
  );
}
