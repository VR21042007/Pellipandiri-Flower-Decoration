import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, MapPin, X } from "lucide-react"
import Nav from "./components/Nav"
import WhatsAppIcon from "./components/WhatsAppIcon"
import { business, eventTypes, whatsappUrl } from "./data/site"

const photoLabels = {
  "1": "Traditional floral shrine backdrop",
  "2": "Plum and white wedding stage",
  "3": "Yellow marigold ceremony backdrop",
  "4": "Traditional floral entrance",
  "5": "Banana leaf and marigold backdrop",
  "6": "Colourful illuminated floral stage",
  "7": "Ivory floral wedding stage",
  "8": "Floral home entrance",
  "9": "Outdoor floral ceremony setting",
  "10": "Green floral reception stage",
  "11": "Colourful floral doorway decoration",
  "12": "Traditional hanging flower backdrop",
  "13": "Marigold mandap with floral pillars",
  "14": "Traditional kolam and marigold ceremony setting",
  "15": "Yellow and green marigold entrance",
}
const photoOrder = ["7", "2", "3", "6", "9", "5", "4", "8", "1", "10", "11", "12", "13", "14", "15"]
const photos = Object.entries(import.meta.glob("./assets/photos/*.{jpg,jpeg,png,webp,avif}", { eager: true, query: "?url", import: "default" }))
  .map(([path, src]) => {
    const id = path.split("/").at(-1).replace(/\.[^.]+$/, "")
    return { id, src, name: photoLabels[id] || id.replace(/[-_]+/g, " ") }
  })
  .sort((a, b) => photoOrder.indexOf(a.id) - photoOrder.indexOf(b.id))

const decorationDetails = {
  "1": { title: "Traditional Floral Shrine Backdrop", category: "Traditional & Rituals", description: "White and red flower garlands frame a traditional shrine backdrop." },
  "2": { title: "Wedding Stage Decoration", category: "Stages & Receptions", description: "A deep plum backdrop and fresh floral garlands frame a pair of ceremonial seats." },
  "3": { title: "Floral Mandap Decoration", category: "Traditional & Rituals", description: "A yellow floral circle and hanging garlands create a bright focal point for the ceremony." },
  "4": { title: "Wedding Entrance Decoration", category: "Entrances", description: "Traditional marigold garlands frame the doorway with a warm welcome." },
  "5": { title: "Banana Leaf Floral Backdrop", category: "Traditional & Rituals", description: "Banana leaves and marigold strands form a vivid traditional backdrop." },
  "6": { title: "Reception Decoration", category: "Stages & Receptions", description: "A colourful floral arch and illuminated drapery set the reception stage." },
  "7": { title: "Ivory Floral Wedding Stage", category: "Stages & Receptions", description: "An ivory backdrop, hanging flower strings and paired ceremonial chairs create a graceful stage." },
  "8": { title: "Family Celebration Entrance", category: "Entrances", description: "Colourful floral panels and a low flower arrangement welcome guests into a home celebration." },
  "9": { title: "Outdoor Floral Ceremony Setting", category: "Stages & Receptions", description: "An open-air ceremony setting centres on a flower-framed ceremonial seat." },
  "10": { title: "Green Floral Reception Stage", category: "Stages & Receptions", description: "A floral border and verdant backdrop frame an ivory loveseat for the celebration." },
  "11": { title: "Floral Doorway Decoration", category: "Entrances", description: "Layered roses and orchids outline the doorway in a vibrant floral frame." },
  "12": { title: "Traditional Garland Backdrop", category: "Traditional & Rituals", description: "A green backdrop with hanging flower garlands and red floral accents creates a ceremonial setting." },
  "13": { title: "Traditional Marigold Mandap", category: "Traditional & Rituals", description: "A marigold stage with carved pillars and hanging garlands frames the ceremony." },
  "14": { title: "Traditional Kolam Ceremony Setting", category: "Traditional & Rituals", description: "Marigold festoons, brass accents and kolam-inspired floor details shape a traditional setting." },
  "15": { title: "Marigold Entrance Decoration", category: "Entrances", description: "Yellow and green marigold garlands frame a bright home entrance." },
}
const portfolioOrder = ["2", "7", "10", "6", "9", "3", "13", "14", "1", "5", "12", "4", "11", "15", "8"]
const decorationPhotos = portfolioOrder
  .map((id) => ({ ...photos.find((photo) => photo.id === id), ...decorationDetails[id] }))
  .filter((photo) => photo.src)
const decorationCategories = ["All decorations", ...new Set(decorationPhotos.map((photo) => photo.category))]

function PhotoFrame({ photo, className = "" }) {
  if (!photo) return <div className={`photo-pending ${className}`}><span className="photo-pending-mark" aria-hidden="true">✳</span><span>Pellipandiri event photographs</span><small>Owner photos can be added to the project gallery</small></div>
  return <img className={`photo-image photo-${photo.id} ${className}`} src={photo.src} alt={`${photo.name} by Pellipandiri Flower Decorations`} />
}

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } } }
const staggerWords = { hidden: {}, visible: { transition: { staggerChildren: 0.075, delayChildren: 0.12 } } }
const revealWord = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }

function Reveal({ as = "div", className, children, delay = 0, ...props }) {
  const Tag = motion[as]
  const reduced = useReducedMotion()
  return <Tag className={className} variants={fadeUp} initial={reduced ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ delay }} {...props}>{children}</Tag>
}

function RevealHeading({ first, emphasis, className = "", amount = 0.5, wordEmphasis = false }) {
  const reduced = useReducedMotion()
  const emphasizedWords = emphasis.split(" ")
  const emphasizedVariants = wordEmphasis
    ? { hidden: {}, visible: { transition: { staggerChildren: 0.075, delayChildren: 0.16 } } }
    : { ...revealWord, visible: { ...revealWord.visible, transition: { ...revealWord.visible.transition, delay: 0.16 } } }
  return <motion.h2 className={`serif ${className}`} variants={staggerWords} initial={reduced ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount }}>
    <span className="heading-words">{first.split(" ").map((word, index) => <motion.span key={`${word}-${index}`} variants={revealWord}>{word}&nbsp;</motion.span>)}</span>
    <motion.em className="heading-emphasis" variants={emphasizedVariants}>{wordEmphasis ? emphasizedWords.map((word, index) => <motion.span key={`${word}-${index}`} variants={revealWord}>{word}{index < emphasizedWords.length - 1 ? " " : ""}</motion.span>) : emphasis}</motion.em>
  </motion.h2>
}

function RevealParagraph({ children, className = "" }) {
  const reduced = useReducedMotion()
  const words = String(children).split(/\s+/)
  const groups = words.reduce((parts, word, index) => {
    if (index % 2 === 0) parts.push(words.slice(index, index + 2).join(" "))
    return parts
  }, [])
  const groupVariants = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] } } }
  return <motion.p className={className} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } } }} initial={reduced ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.25 }}>{groups.map((group, index) => <motion.span className="reveal-word-group" key={`${index}-${group}`} variants={groupVariants}>{group}{index < groups.length - 1 ? " " : ""}</motion.span>)}</motion.p>
}

function WorkRow({ photo, number, label, title, emphasis, description, reverse = false, enquire = false }) {
  const reduced = useReducedMotion()
  const slideFrom = reverse ? 30 : -30
  const textFrom = reverse ? -22 : 22
  const photoShape = photo && ["2", "4", "5", "8"].includes(photo.id) ? "work-photo--portrait" : photo?.id === "7" ? "work-photo--near-square" : photo?.id === "6" || photo?.id === "9" ? `work-photo--wide-${photo.id}` : ""
  return <article className={`work-row${reverse ? " work-row--reverse" : ""}`}>
    <motion.div className={`work-photo ${photoShape}`} initial={reduced ? false : { opacity: 0, x: slideFrom }} whileInView={{ opacity: 1, x: 0 }} whileHover={reduced ? undefined : { rotateY: reverse ? -3 : 3, rotateX: 2, z: 18, scale: 1.01 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduced ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }} style={{ transformStyle: "preserve-3d" }}><PhotoFrame photo={photo} /></motion.div>
    <motion.div className="work-copy" initial={reduced ? false : { opacity: 0, x: textFrom }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: reduced ? 0 : 0.82, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}><motion.p className="work-label" initial={reduced ? false : { opacity: 0, x: textFrom * 0.4 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: reduced ? 0 : 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>{number} / {label}</motion.p><RevealHeading first={title} emphasis={emphasis} amount={0.25} wordEmphasis /><RevealParagraph className="work-description">{description}</RevealParagraph>{enquire && <Reveal><a className="text-link" href="#enquire">Enquire about this decoration <ArrowRight size={16} /></a></Reveal>}</motion.div>
  </article>
}

function PortfolioPhoto({ photo, index, onOpen }) {
  const reduced = useReducedMotion()
  return <motion.button className="portfolio-card" type="button" layout initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduced ? 0 : 0.55, delay: Math.min(index % 5, 4) * 0.035, ease: [0.22, 1, 0.36, 1] }} onClick={() => onOpen(photo)} aria-label={`View ${photo.title}`}>
    <PhotoFrame photo={photo} className="portfolio-card-image" />
    <span className="portfolio-card-caption"><span>{photo.category}</span><strong>{photo.title}</strong><ArrowRight size={16} /></span>
  </motion.button>
}

function App() {
  const noPhotos = photos.length === 0
  const enquiry = whatsappUrl("Hello Pellipandiri Flower Decorations, I would like to enquire about an event decoration.")
  const reducedMotion = useReducedMotion()
  const heroPhotoRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroPhotoRef, offset: ["start end", "end start"] })
  const imageScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.055]), { stiffness: 72, damping: 24, mass: 0.5 })
  const [activeCategory, setActiveCategory] = useState("All decorations")
  const [activePhotoId, setActivePhotoId] = useState(null)
  const touchStartX = useRef(null)
  const visibleDecorations = activeCategory === "All decorations" ? decorationPhotos : decorationPhotos.filter((photo) => photo.category === activeCategory)
  const activePhoto = visibleDecorations.find((photo) => photo.id === activePhotoId)

  const showAdjacentPhoto = (step) => {
    if (!visibleDecorations.length) return
    const index = visibleDecorations.findIndex((photo) => photo.id === activePhotoId)
    setActivePhotoId(visibleDecorations[(index + step + visibleDecorations.length) % visibleDecorations.length].id)
  }

  useEffect(() => {
    if (!activePhoto) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActivePhotoId(null)
      if (event.key === "ArrowLeft") showAdjacentPhoto(-1)
      if (event.key === "ArrowRight") showAdjacentPhoto(1)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [activePhotoId, activeCategory])

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Nav />
    <main id="main">
      <section id="top" className={`hero ${photos[0] ? "hero-with-photo" : "hero-no-photo"}`}>
        <div className="hero-copy">
          <Reveal as="p" className="eyebrow"><span /> Flowers · Celebrations · Experiences</Reveal>
          <motion.h1 className="serif" variants={staggerWords} initial={reducedMotion ? false : "hidden"} animate="visible">
            <span className="hero-title-line">{["Beautiful", "settings"].map((word, index) => <motion.span key={word} variants={revealWord}>{word}{index === 0 ? " " : ""}</motion.span>)}</span>
            <span className="hero-title-line">{["for", "your"].map((word) => <motion.span key={word} variants={revealWord}>{word}&nbsp;</motion.span>)}<motion.em variants={{ ...revealWord, visible: { ...revealWord.visible, transition: { ...revealWord.visible.transition, delay: 0.22 } } }}>special moments.</motion.em></span>
          </motion.h1>
          <Reveal as="p" className="hero-description" delay={0.2}>Thoughtful floral decoration for weddings and celebrations in KPHB, Kukatpally.</Reveal>
          <motion.div className="hero-actions" variants={fadeUp} initial={reducedMotion ? false : "hidden"} animate="visible" transition={{ delay: 0.42 }}><a className="button button-light" href="#our-decorations">Explore decorations <ArrowDown size={16} /></a><a className="button button-outline" href="#enquire">Enquire now <ArrowRight size={16} /></a></motion.div>
          <Reveal className="hero-place" delay={0.35}><MapPin size={15} /> KPHB Phase 4, Kukatpally, Hyderabad</Reveal>
        </div>
        {photos[0] ? <motion.div ref={heroPhotoRef} className="hero-photo hero-art" initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 1.1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}><motion.div className="hero-image" style={{ scale: reducedMotion ? 1 : imageScale, transformStyle: "preserve-3d" }} whileHover={reducedMotion ? undefined : { rotateY: -3, rotateX: 2, z: 18 }}><PhotoFrame photo={photos[0]} /></motion.div><span className="photo-caption">Pellipandiri celebrations</span></motion.div> : <div className="hero-photo hero-photo-pending"><PhotoFrame /></div>}
        <div className="hero-bottom"><span>PELLIPANDIRI FLOWER DECORATIONS</span><span>HYDERABAD · TELANGANA</span></div>
      </section>

      <section id="work" className="work-section section-wrap">
        <Reveal as="p" className="section-label">01 <span>—</span> OUR WORK</Reveal>
        <div className="work-intro"><RevealHeading first="Made with" emphasis="flowers." amount={0.25} wordEmphasis /><RevealParagraph>Thoughtful floral details turn meaningful gatherings into memories that stay with you.</RevealParagraph></div>
        <WorkRow photo={photos.find((photo) => photo.id === "3")} number="01" label="FLORAL STAGE DESIGN" title="A stage" emphasis="in full bloom." description="A sweeping circle of yellow and white flowers creates a radiant focal point for a ceremony made to be remembered." />
      </section>

      <section id="our-decorations" className="decorations section-wrap">
        <div className="section-heading"><div><Reveal as="div" className="section-label"><span>02</span> OUR DECORATIONS</Reveal><RevealHeading first="A setting for" emphasis="every gathering." /></div><Reveal as="p">Tell us what you’re celebrating and we’ll discuss the details with you.</Reveal></div>
        <div className="portfolio-filters" role="group" aria-label="Filter decoration photographs">{decorationCategories.map((category) => <button key={category} type="button" className={`portfolio-filter${activeCategory === category ? " is-active" : ""}`} aria-pressed={activeCategory === category} onClick={() => { setActiveCategory(category); setActivePhotoId(null) }}>{category}<span>{category === "All decorations" ? decorationPhotos.length : decorationPhotos.filter((photo) => photo.category === category).length}</span></button>)}</div>
        <motion.div layout className="decoration-masonry" aria-live="polite"><AnimatePresence initial={false} mode="popLayout">{visibleDecorations.map((photo, index) => <PortfolioPhoto key={photo.id} photo={photo} index={index} onOpen={(item) => setActivePhotoId(item.id)} />)}</AnimatePresence></motion.div>
      </section>

      <section className="enquiry-band"><div><p className="eyebrow">Let’s plan something beautiful</p><h2 className="serif">Start with your <em>occasion.</em></h2></div><a className="button button-light" href="#enquire">Make an enquiry <ArrowRight size={16} /></a></section>

      <section id="enquire" className="contact section-wrap">
        <div className="contact-intro"><div className="section-label"><span>03</span> GET IN TOUCH</div><h2 className="serif">Tell us what<br />you’re <em>celebrating.</em></h2><p>Share a few details and continue to WhatsApp to start the conversation.</p><a className="location-link" href={business.mapsUrl} target="_blank" rel="noreferrer"><MapPin size={18} /><span>{business.addressLines.join(", ")}<small>View location on Google Maps</small></span><ArrowRight size={16} /></a></div>
        <form className="contact-form" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const message = [`Hello Pellipandiri Flower Decorations, I would like to enquire about an event.`, `Name: ${data.get("name")}`, `Phone: ${data.get("phone")}`, `Celebration: ${data.get("event")}`, `Event date: ${data.get("date") || "Not decided"}`, `Venue: ${data.get("venue") || "Not decided"}`, `Notes: ${data.get("notes") || "Please share decoration options."}`].join("\n"); window.open(whatsappUrl(message), "_blank", "noopener,noreferrer") }}>
          <label>Name<input name="name" autoComplete="name" required placeholder="Your name" /></label><label>Phone number<input name="phone" autoComplete="tel" inputMode="tel" required placeholder="Your phone number" /></label>
          <label>Celebration<select name="event" defaultValue="" required><option value="" disabled>Select an occasion</option>{eventTypes.map((type) => <option key={type}>{type}</option>)}</select></label><label>Event date<input type="date" name="date" /></label>
          <label className="wide">Venue or area<input name="venue" placeholder="Venue or area in Hyderabad" /></label><label className="wide">A few details<textarea name="notes" rows="3" placeholder="Colours, flowers or anything you have in mind" /></label>
          <button className="button button-burgundy wide" type="submit"><WhatsAppIcon className="whatsapp-mark" /> Continue to WhatsApp <ArrowRight size={16} /></button>
          {!business.whatsapp && <p className="form-note wide">The business WhatsApp number can be connected when confirmed.</p>}
        </form>
      </section>
    </main>
    <footer className="footer"><a className="footer-brand serif" href="#top">Pellipandiri</a><span className="footer-subtitle">FLOWER DECORATIONS</span><nav aria-label="Footer navigation"><a href="#top">Home</a><a href="#work">Our work</a><a href="#our-decorations">Our Decorations</a><a href="#enquire">Enquire</a></nav><span className="footer-location">KPHB Phase 4 · Kukatpally · Hyderabad</span><span className="footer-copy">© {new Date().getFullYear()} Pellipandiri Flower Decorations</span></footer>
    <AnimatePresence>{activePhoto && <motion.div className="portfolio-lightbox" role="dialog" aria-modal="true" aria-label={`${activePhoto.title} photograph`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActivePhotoId(null)} onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX }} onTouchEnd={(event) => { if (touchStartX.current === null) return; const delta = event.changedTouches[0].clientX - touchStartX.current; if (Math.abs(delta) > 48) showAdjacentPhoto(delta > 0 ? -1 : 1); touchStartX.current = null }}><button type="button" className="portfolio-lightbox-close" aria-label="Close photograph" onClick={() => setActivePhotoId(null)}><X /></button><button type="button" className="portfolio-lightbox-nav portfolio-lightbox-prev" aria-label="Previous photograph" onClick={(event) => { event.stopPropagation(); showAdjacentPhoto(-1) }}><ChevronLeft /></button><figure onClick={(event) => event.stopPropagation()}><img src={activePhoto.src} alt={`${activePhoto.name} by Pellipandiri Flower Decorations`} /><figcaption><span>{activePhoto.category}</span><strong>{activePhoto.title}</strong><small>{activePhoto.description}</small></figcaption></figure><button type="button" className="portfolio-lightbox-nav portfolio-lightbox-next" aria-label="Next photograph" onClick={(event) => { event.stopPropagation(); showAdjacentPhoto(1) }}><ChevronRight /></button></motion.div>}</AnimatePresence>
    {noPhotos && <div className="photo-notice" role="note">This preview has no Google Business Profile photographs yet. Add approved files to <code>src/assets/photos</code> to show them.</div>}
  </>
}

export default App
