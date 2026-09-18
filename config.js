/*
  CENTRAL CUSTOMIZATION FILE
  Change the values below and the website updates automatically.
  You can edit this file without changing index.html.
*/
const SITE_CONFIG = {
  year: 2026,
 business: {
  name: "Ved Digital Services",
  email: "veddigitalservices777@gmail.com",
  phoneDisplay: "+91 9844379777",
  phoneLink: "+919844379777",
  whatsapp: "919844379777",
  instagram: "https://instagram.com/ved_digitalservices",
  instagramDisplay: "@ved_digitalservices",
  location: "Belagavi, Karnataka, India",
  tagline: "Professional Digital Solutions for Local Businesses",
  heroMessage: "Professional websites, digital QR menus, online ordering and payment solutions designed for cafes, restaurants and small businesses."
},
  theme: {
    accent: "#7c5cff",
    accent2: "#20d3a2",
    dark: "#0b1020"
  },
  services: [
    {
      id: "qr-menu",
      name: "Digital QR Menu",
      price: "Starting at ₹999",
      short: "A professional mobile menu customers can open instantly by scanning a QR code.",
      features: ["Professional digital menu website", "QR code", "Menu categories", "Food/item names", "Prices", "Item descriptions", "Food images", "Cafe/shop logo", "Business branding", "Mobile-friendly design", "Easy menu access through QR code", "Basic menu updates"]
    },
    {
      id: "menu-ordering",
      name: "Digital Menu + Online Ordering",
      price: "₹2,999",
      short: "Turn the digital menu into a simple ordering experience with owner controls.",
      features: ["Everything in Digital QR Menu", "Online ordering", "Add to cart", "Customer name", "Table number", "Order summary", "Cash payment option", "Customer order confirmation", "Order number", "Order status", "Owner/chef dashboard", "View incoming orders", "Accept orders", "Mark order as preparing", "Mark order as ready", "Order tracking"]
    },
    {
      id: "full-ordering-payment",
      name: "Full Ordering + Payment System",
      price: "₹4,999 – ₹6,999",
      short: "A fuller ordering flow with online payment options using the business's own payment details.",
      features: ["Everything in the previous package", "Online payment option", "Cafe/restaurant's own UPI QR code", "Payment instructions", "Payment confirmation flow", "Order tracking", "Professional ordering interface", "Owner/chef dashboard", "Better business branding", "More advanced features"],
      note: "The business owner uses their own UPI/payment account and receives payments directly. Payment gateway/provider charges, when applicable, are paid by the business owner."
    },
    {
      id: "business-website",
      name: "Professional Business Website",
      price: "₹3,000 – ₹7,000",
      short: "A polished website that explains the business, services, location and contact options.",
      features: ["Professional business website", "Home page", "About page", "Services page", "Menu page", "Contact page", "WhatsApp button", "Google Maps/location section", "Business photos", "Logo and branding", "Mobile responsive design", "Basic SEO setup", "HTTPS hosting setup", "Contact/request button"]
    },
    {
      id: "website-qr",
      name: "Website + Digital QR Menu",
      price: "₹4,000 – ₹8,000",
      short: "A complete website plus a professional QR menu experience.",
      features: ["Complete business website", "Digital QR menu", "Custom branding", "Menu categories", "Food/item images", "QR code", "Mobile-friendly design", "Contact section", "WhatsApp button", "Location/map", "Hosting setup"]
    },
    {
      id: "website-ordering",
      name: "Website + QR Menu + Online Ordering",
      price: "₹7,999 – ₹12,999",
      short: "A full business website connected to digital menu, ordering and payment experiences.",
      features: ["Professional business website", "Digital QR menu", "Online ordering", "Cart", "Customer details", "Table number", "Cash payment option", "Online payment option", "Cafe's own UPI QR", "Order confirmation", "Order number", "Owner dashboard", "Order management", "Order status", "Mobile responsive design", "Hosting/deployment setup"]
    }
  ],
  maintenance: [
    { name: "Basic Maintenance", monthly: "₹199/month", yearly: "₹1,999/year", features: ["Basic menu updates", "Price updates", "Item additions/removals", "Minor content changes"] },
    { name: "Ordering System Maintenance", monthly: "₹399/month", yearly: "₹3,999/year", features: ["Menu updates", "Price updates", "Ordering system maintenance", "Minor website changes", "Basic troubleshooting"] },
    { name: "Full System Maintenance", monthly: "₹699/month", yearly: "₹6,999/year", features: ["Website maintenance", "Menu updates", "Ordering system maintenance", "Payment/order system support", "Minor design/content changes", "Basic troubleshooting"] }
  ],
  benefits: ["Professional Design", "Mobile-Friendly Website", "QR Code", "Digital Menu", "Online Ordering", "Owner Dashboard", "Payment Options", "WhatsApp Contact", "Hosting Setup", "Custom Branding", "Menu Updates", "Technical Support"],
  steps: [
    { title: "Contact Us", text: "Client contacts us through WhatsApp, phone or email." },
    { title: "Share Your Requirements", text: "Client shares their menu, logo, business information, photos and required features." },
    { title: "We Build It", text: "We design and develop the website, menu or order system." },
    { title: "Review & Changes", text: "Client checks the website and requests reasonable changes." },
    { title: "Launch", text: "Website is published and the QR code/link is provided." }
  ],
  portfolio: [
    { name: "Cafe Website Concept", type: "Cafe Website", description: "Modern homepage, menu, location and contact flow.", icon: "☕" },
    { name: "Restaurant QR Menu", type: "Digital QR Menu", description: "Mobile-first menu with clear categories and pricing.", icon: "▦" },
    { name: "Table Ordering Concept", type: "Online Ordering", description: "Cart, table number, order confirmation and status UI.", icon: "🛎" },
    { name: "Local Shop Website", type: "Small Business Website", description: "Services, products, WhatsApp and location-focused design.", icon: "⌂" }
  ],
  faq: [
    { q: "How can I get a digital QR menu?", a: "Send us your existing menu, logo and business details. We will create the digital menu and provide the QR code." },
    { q: "Can customers order directly from the website?", a: "Yes. Our ordering packages can include cart, customer details, table number, order confirmation and an owner/chef dashboard." },
    { q: "Can customers pay online?", a: "Yes. The full ordering package can include an online payment option using the business owner's own payment/UPI details." },
    { q: "Will payments come directly to my business?", a: "Yes. The business should use its own UPI/payment account so payments go directly to the business." },
    { q: "Can I update my menu later?", a: "Yes. Menu updates and maintenance can be provided according to the selected package." },
    { q: "Can you create a complete website?", a: "Yes. We can create a complete professional business website with pages such as Home, About, Services, Menu, Order Online and Contact." },
    { q: "Do you provide maintenance?", a: "Yes. Monthly and yearly maintenance plans are available." },
    { q: "Can you customize the website?", a: "Yes. Design, colors, branding, content, sections and features can be customized based on the business requirements." }
  ]
};
