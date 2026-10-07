import { useState } from "react";
import Logo from "./Logo.jsx";
import { brand, navLinks } from "../data.js";

export default function Navbar() {
  const [active, setActive] = useState("home");

  return (
    <>
      <Logo name={brand.name} />
      <nav className="nav" aria-label="Main">
        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={active === link.id ? "is-active" : ""}
                aria-current={active === link.id ? "page" : undefined}
                onClick={() => setActive(link.id)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
