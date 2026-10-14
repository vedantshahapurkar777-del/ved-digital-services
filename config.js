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
  heroMessage: "Websites, NFC tap cards, QR digital menus, Google Reviews, social media setup, WhatsApp chat and payment options for cafes, restaurants and small businesses."
},
  theme: {
    accent: "#7c5cff",
    accent2: "#20d3a2",
    dark: "#0b1020"
  },
  services: [
    {
      id: "nfc-website-card",
      name: "NFC Website Tap Card Setup",
      price: "₹699 setup",
      short: "A programmed NFC card that opens the business’s existing website when a customer taps it with a compatible phone.",
      features: ["Program one NFC card/tag with one live website URL", "Test the tap link on a compatible phone", "Provide the programmed destination URL", "Explain how customers can tap or use the QR backup if supplied"],
      exclusions: ["Physical NFC card, printing and delivery", "Building a new website or buying a domain", "Bulk cards or multiple destination links"],
      note: "The business website must already be live. Physical card supply is quoted separately."
    },
    {
      id: "nfc-smart-loyalty",
      name: "NFC Smart Loyalty Card",
      price: "₹2,999 setup + ₹599/month",
      short: "A digital loyalty and stamp-card experience customers can open by tapping an NFC card or scanning a QR code.",
      features: ["Branded digital loyalty-card page for one business", "NFC tap and QR-code entry points", "Reward/stamp rules agreed with the business", "Owner-facing loyalty management view within the agreed scope", "Setup, testing and handover"],
      exclusions: ["Physical NFC cards, printing and delivery unless quoted", "Payment processing or guaranteed repeat visits", "Secure multi-device live stamp syncing until backend/database integration is implemented", "Third-party hosting or provider fees unless quoted"],
      note: "₹2,999 setup + ₹599/month maintenance. A real live stamp system requires a secure backend/database; a static GitHub Pages demo alone cannot securely store shared customer stamps."
    },
    {
      id: "nfc-review-card",
      name: "NFC Google Review Card Setup",
      price: "₹799 setup",
      short: "A dedicated NFC card programmed to open the business’s Google review page directly.",
      features: ["Find or prepare the business’s available review link", "Program one NFC card/tag with that review URL", "Test tap-to-open behaviour", "Provide a QR version of the link when requested"],
      exclusions: ["Physical card/stand, printing and delivery", "Google Business Profile verification or approval", "Guaranteed reviews, ratings or ranking"],
      note: "The client should request honest reviews and must not offer rewards in exchange for reviews."
    },
    {
      id: "google-business-review",
      name: "Google Business & Review Link Setup",
      price: "₹999 setup",
      short: "Set up or improve the essential information customers use to find and contact a local business.",
      features: ["Assist with one business location/profile", "Add business name, category, hours and contact details supplied by the client", "Add website/contact link where available", "Create or locate the review link and QR code", "Show the owner how to retain access to the profile"],
      exclusions: ["Google verification or reinstatement decisions", "Guaranteed ranking, reviews or customer enquiries", "Ongoing review replies, posting, ads or extra locations"],
      note: "Google controls eligibility, verification and search placement. The client keeps ownership of the profile."
    },
    {
      id: "social-profiles",
      name: "Instagram & Facebook Business Setup",
      price: "₹1,499 for both",
      short: "Set up or tidy one Instagram business profile and one Facebook business Page, then connect them to the business website.",
      features: ["Setup assistance for one Instagram profile and one Facebook Page", "Bio/about text and contact details using information from the client", "Add website, WhatsApp and location links where supported", "Place supplied logo/profile image and cover image", "Connect social links to the business website", "Hand account ownership and access back to the client"],
      exclusions: ["Logo design, photo/video production or regular content posting", "Paid advertising, ad spend or influencer campaigns", "Meta verification, account recovery or guaranteed followers"],
      note: "The client must own the accounts and keep their own passwords and recovery details."
    },
    {
      id: "whatsapp-chat",
      name: "WhatsApp Direct Chat Setup",
      price: "₹499 setup",
      short: "Add a button or link that opens a direct chat with the business’s own WhatsApp number.",
      features: ["Create a click-to-chat link for one business number", "Optional pre-filled enquiry message", "Add the button to one website or digital menu", "Test the link on mobile"],
      exclusions: ["WhatsApp API, chatbot or automated workflows", "Bulk messaging, campaign management or paid messaging charges", "Number ownership, verification or account recovery"],
      note: "The business must provide and control the WhatsApp number."
    },
    {
      id: "upi-qr-setup",
      name: "Business UPI QR Display Setup",
      price: "₹699 setup",
      short: "Display the business’s own UPI QR code on its website or digital menu so customers can pay the business directly.",
      features: ["Place one client-supplied UPI QR image on one website/menu", "Add simple payment instructions", "Check that the QR image is readable on mobile", "Keep the payment destination under the business owner’s control"],
      exclusions: ["Opening a bank or merchant account or creating the QR with a provider", "Payment gateway integration or automatic payment verification", "Provider/transaction fees, refunds or payment disputes"],
      note: "Displaying a UPI QR is not the same as automatically confirming that an order has been paid."
    },
    {
      id: "qr-menu",
      name: "Digital QR Menu",
      price: "₹1,999 starting price",
      short: "A mobile-friendly digital menu customers can open by scanning a QR code.",
      features: ["One branded digital menu page", "Up to 30 food/product items across categories", "Names, prices and descriptions supplied by the client", "Use supplied logo and up to 15 supplied item photos", "QR code file for printing or sharing", "One round of corrections before launch"],
      exclusions: ["Food photography, logo design or writing a full menu from scratch", "More than 30 items, extra language versions or frequent future updates", "Physical menu printing, paid domain/hosting or online ordering"],
      note: "Menu content and images must be supplied by the client. Ongoing changes are covered by a maintenance plan or separate quote."
    },
    {
      id: "menu-ordering",
      name: "Digital Menu + WhatsApp Ordering",
      price: "₹4,999 starting price",
      short: "A digital menu with a simple order-request flow that sends the customer’s selected items to the café through WhatsApp.",
      features: ["Branded digital menu with up to 30 items", "Simple item selection/order summary as agreed in the scope", "Send the order request to the café’s WhatsApp number", "Optional table number and customer name fields", "QR code and mobile testing", "One round of corrections before launch"],
      exclusions: ["Live database, automatic order syncing or owner/chef dashboard", "Automatic order status tracking or SMS notifications", "Online payment processing or payment verification", "Paid domain/hosting and third-party service fees"],
      note: "This entry package uses WhatsApp to receive orders. A live dashboard/database is a separate custom project."
    },
    {
      id: "full-ordering-payment",
      name: "Live Ordering + Payment System",
      price: "From ₹19,999 — custom quote",
      short: "A custom build for businesses that need live order management and a supported online payment integration.",
      features: ["Requirements and feature scope agreed before work starts", "Order/cart flow and customer details based on the agreed scope", "Owner-side order management dashboard when included in the approved scope", "Payment gateway/UPI integration setup using the client’s own merchant account", "Payment-status handling where the chosen provider supports it", "Testing and launch handover"],
      exclusions: ["Payment-provider fees, transaction charges, paid hosting and domain", "POS, inventory, delivery partner or accounting integrations unless quoted", "Unlimited features, revisions or ongoing maintenance", "Approval by banks/payment providers or guaranteed transaction acceptance"],
      note: "This is a custom project, not a plug-and-play add-on. Final price and delivery plan are confirmed after requirements and provider eligibility are checked."
    },
    {
      id: "business-website",
      name: "Professional Business Website",
      price: "₹6,999–₹11,999",
      short: "A professional mobile-friendly website that explains the business and helps customers get in touch.",
      features: ["Up to 5 pages/sections, based on the agreed design", "Home, About, Services/Products and Contact sections as relevant", "WhatsApp/contact button and location/map link", "Mobile-responsive layout and basic on-page SEO", "Use of client-supplied logo, text and images", "Two rounds of reasonable revisions", "Deployment to an agreed hosting option"],
      exclusions: ["Paid domain, paid hosting, premium assets or recurring platform fees", "Professional copywriting, translation or commercial photography", "Booking systems, custom databases, online payments or advanced integrations", "Extra pages, major redesigns or unlimited revisions"],
      note: "A final quote depends on page count, content readiness and features. Third-party recurring charges are paid by the client."
    },
    {
      id: "website-qr",
      name: "Website + Digital QR Menu",
      price: "₹9,999–₹14,999",
      short: "A business website plus a matching digital QR menu for cafés, restaurants and shops.",
      features: ["Business website with up to 5 pages/sections", "Digital menu for up to 30 items", "QR code file and matching brand styling", "WhatsApp/contact button and location/map link", "Mobile-responsive layout and basic on-page SEO", "Two rounds of reasonable revisions", "Deployment to an agreed hosting option"],
      exclusions: ["Paid domain, hosting, premium assets or third-party fees", "Food photography, menu writing or extra items beyond the included limit", "Live order dashboard, inventory/POS connection or automatic payment verification", "Extra pages, major redesigns or unlimited revisions"],
      note: "A quote is confirmed after reviewing the content and menu."
    },
    {
      id: "website-ordering",
      name: "Website + QR Menu + WhatsApp Ordering",
      price: "₹14,999–₹19,999",
      short: "A complete small-business website with a digital menu and WhatsApp-based order requests.",
      features: ["Business website with up to 5 pages/sections", "Digital menu for up to 30 items and QR code", "Simple order selection/summary sent to the business by WhatsApp", "Customer name/table number fields where useful", "Business-supplied UPI QR displayed if requested", "Mobile-responsive layout, contact links and basic SEO", "Two rounds of reasonable revisions and launch testing"],
      exclusions: ["Live order database/dashboard or automated order-status tracking", "Payment gateway integration and automatic payment verification", "Paid domain/hosting and third-party fees", "POS/inventory/delivery integrations, extra pages or unlimited revisions"],
      note: "For live order management or automated payments, request a separate custom quote for the Live Ordering + Payment System."
    }
  ],
  maintenance: [
    {
      name: "Essential Website Care",
      monthly: "₹499/month",
      yearly: "₹4,999/year",
      features: ["Up to 2 small update requests per month", "Text, contact, link or price changes in existing sections", "Up to 10 menu item/price edits per month when a menu is included", "Monthly check of key website and contact links", "Routine help by WhatsApp/email"],
      exclusions: ["New pages, features, redesigns or new integrations", "New photos, logo/content creation or social media posting", "Paid domain/hosting or third-party service fees", "Backend, payment gateway or major technical repairs"]
    },
    {
      name: "Business Website & Menu Care",
      monthly: "₹999/month",
      yearly: "₹9,999/year",
      features: ["Up to 4 small update requests per month", "Up to 25 menu item/price edits per month when a menu is included", "Small text/photo swaps using client-supplied files", "Monthly check of website, WhatsApp links and enquiry route", "Minor layout fixes and routine troubleshooting", "Target response within 2 business days"],
      exclusions: ["New pages, new business features or full redesigns", "Social media content calendar, posting or paid ads", "Paid domain/hosting, gateway charges or platform subscriptions", "Custom backend development, third-party outages or major repairs"]
    },
    {
      name: "Priority Digital Care",
      monthly: "₹1,999/month",
      yearly: "₹19,999/year",
      features: ["Up to 8 small update requests per month", "Up to 40 menu item/price edits per month when a menu is included", "Monthly checks of key links and existing order/contact flow", "Minor content/layout fixes using supplied content", "Priority response target within 1 business day", "Monthly summary of completed changes"],
      exclusions: ["New features, new integrations or major redesigns", "Payment gateway fees, paid hosting/domain or other third-party charges", "Social media posting/advertising or content production", "Custom backend work, provider outages or major rebuilds; quoted separately"]
    }
  ],
  benefits: ["Professional Design", "Mobile-Friendly Website", "NFC Tap Cards", "QR Code", "Digital Menu", "Google Review Link", "Instagram & Facebook Links", "WhatsApp Direct Chat", "WhatsApp-Based Ordering", "Payment Options", "Live Owner Dashboard (custom quote where needed)", "Hosting Setup", "Custom Branding", "Defined Menu Updates", "Technical Support"],
  steps: [
    { title: "Contact Us", text: "Client contacts us through WhatsApp, phone or email." },
    { title: "Share Your Requirements", text: "Client shares their menu, logo, business information, photos and required features." },
    { title: "We Build It", text: "We design and develop the agreed website, menu or ordering flow." },
    { title: "Review & Changes", text: "Client checks the work and requests changes within the included revision allowance." },
    { title: "Launch", text: "Website is published and the QR code/link is provided." }
  ],
  portfolio: [
    { name: "Cafe Website Concept", type: "Cafe Website", description: "Modern homepage, menu, location and contact flow.", icon: "☕" },
    { name: "Restaurant QR Menu", type: "Digital QR Menu", description: "Mobile-first menu with clear categories and pricing.", icon: "▦" },
    { name: "Table Ordering Concept", type: "Online Ordering", description: "Concept showing a possible order flow; live order storage requires a backend.", icon: "🛎" },
    { name: "Local Shop Website", type: "Small Business Website", description: "Services, products, WhatsApp and location-focused design.", icon: "⌂" }
  ],
  faq: [
    { q: "What does the NFC website card do?", a: "We program one NFC card/tag to open a business’s existing live website when tapped on a compatible phone. Physical card and printing costs are separate unless quoted." },
    { q: "Does the NFC Google Review card open the website?", a: "The separate Google Review NFC card opens the business’s Google review link directly. An all-in-one NFC card can open a website that contains reviews, Instagram, Facebook, WhatsApp, menu and other links." },
    { q: "What is included in the digital QR menu price?", a: "The starting package includes one branded menu page for up to 30 items, using details and photos supplied by the client, a QR code file and one round of corrections. Extra items and later updates may cost extra." },
    { q: "Can customers order from the menu?", a: "The entry ordering package sends an order request to the business using WhatsApp. A live database, automatic order statuses and an owner dashboard require a separate custom build." },
    { q: "Can you add online payments?", a: "We can display the business’s own UPI QR or quote for a supported payment gateway integration. Automatic payment confirmation requires a compatible provider and technical integration; fees are separate." },
    { q: "Do you set up Instagram, Facebook and WhatsApp?", a: "Yes. We offer profile setup assistance, contact links and WhatsApp click-to-chat setup. Ongoing social media posting, paid ads, verification and account recovery are excluded unless separately quoted." },
    { q: "What do maintenance plans include?", a: "Each plan has a monthly limit for small update requests and menu edits, plus the checks listed in the plan. New features, major redesigns and third-party fees are quoted separately." },
    { q: "Are domain and hosting included?", a: "Paid domain names, premium hosting and third-party subscriptions are separate unless a written quote explicitly includes them. An available free hosting option may be used when suitable." },
    { q: "Can Google guarantee more reviews or better ranking?", a: "No. We can help set up a profile or review link, but Google controls verification and search placement. Reviews should always be honest and voluntary." },
    { q: "Can you customize a package?", a: "Yes. We confirm the scope, included revisions, timeline and third-party costs before starting a custom project." }
  ]
};
