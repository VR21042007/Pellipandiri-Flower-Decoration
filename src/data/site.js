export const business = {
  name: "Pellipandiri",
  fullName: "Pellipandiri Flower Decorations",
  whatsapp: "",
  addressLines: ["KPHB Phase 4, Kukatpally", "Hyderabad, Telangana"],
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pellipandiri+Flower+Decorations+Kukatpally",
}

export function whatsappUrl(message) {
  const recipient = business.whatsapp ? `/${business.whatsapp}` : "/"
  return `https://wa.me${recipient}?text=${encodeURIComponent(message)}`
}

export const quickEnquiry = whatsappUrl(
  "Hello Pellipandiri Flower Decorations, I would like to enquire about an event decoration.",
)

// These are enquiry categories, not verified packages or fixed-price products.
export const services = [
  { number: "01", title: "Wedding Stage Decoration", photo: "2" },
  { number: "02", title: "Floral Mandap Decoration", photo: "3" },
  { number: "03", title: "Wedding Entrance Decoration", photo: "4" },
  { number: "04", title: "Family Celebrations", photo: "8" },
  { number: "05", title: "Reception Decoration", photo: "6" },
]

export const eventTypes = ["Wedding", "Engagement", "Reception", "Housewarming", "Other celebration"]

export const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#work", label: "Our Work" },
  { href: "#our-decorations", label: "Our Decorations" },
  { href: "#enquire", label: "Enquire" },
]
