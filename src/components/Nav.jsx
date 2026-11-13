import { useState } from "react"
import { Menu, X } from "lucide-react"
import { business, navLinks, quickEnquiry } from "../data/site"
import WhatsAppIcon from "./WhatsAppIcon"

export default function Nav() {
  const [open, setOpen] = useState(false)
  return <header className="site-header">
    <a className="brand" href="#top" onClick={() => setOpen(false)}><span className="brand-name">{business.name}</span><span className="brand-tag">Flower Decorations</span></a>
    <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-nav" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav id="primary-nav" className={open ? "primary-nav is-open" : "primary-nav"} aria-label="Main navigation">
      {navLinks.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
      <a className="nav-whatsapp" href={quickEnquiry} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp</a>
    </nav>
  </header>
}
