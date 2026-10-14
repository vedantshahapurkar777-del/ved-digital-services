VED DIGITAL SERVICES — LOW-JANK CINEMATIC SELECTOR EDITION
=====================================================

FILES TO UPLOAD
---------------
index.html       Main website and script references
styles.css       Existing design plus lightweight selector styling
config.js        Business contact information, service prices and scope
script.js        Menus, forms, service selection and static ambient canvas
README.txt       These instructions

WHAT IS ADDED
-------------
- CSS-based service selector illustrations and one-time static ambient canvas.
- One-time GSAP entrance animation for the three-service selector; IntersectionObserver reveals for lower sections.
- Hover/click transitions remain; continuous decorative animation loops are disabled for smoother scrolling.
- Mobile-aware sizing and reduced-motion handling.
- No continuous Three.js/WebGL or particle RAF loops are started.
- Existing services, prices and contact details are preserved from the supplied ZIP.

EXTERNAL LIBRARIES
------------------
GSAP is loaded from a pinned jsDelivr CDN URL for the small service-selector entrance/selection transitions. Lower section reveals use native IntersectionObserver. The visual mockups are CSS-based, so the page does not need Three.js/WebGL.

HOW TO PUBLISH TO GITHUB PAGES
------------------------------
1. Download this ZIP and extract it.
2. Open the existing GitHub repository for Ved Digital Services.
3. Choose Add file -> Upload files.
4. Upload these five files to the SAME folder as the existing index.html:
   index.html, styles.css, config.js, script.js, README.txt
5. Confirm replacement of files with the same names. Do NOT delete unrelated assets or folders.
6. Commit the changes and wait for the latest Pages build/deployment workflow to show a green check.
7. Open the live website and hard-refresh (Ctrl+Shift+R).

IMPORTANT
---------
GitHub Pages publishes static website files. This static website does not itself add a secure backend, live order/loyalty database, private dashboard or automatic payment verification. Those features still need a backend/payment integration.

NEW: CINEMATIC THREE-OPTION SERVICE SELECTOR
--------------------------------
The homepage now begins with a cinematic, dark product-stage selector with three selectable service experiences. The first-screen artwork uses CSS-built mockups; GSAP animates the entrance and selected-service transition, with CSS/reduced-motion fallback:
1. Digital Menu
2. Business Website
3. NFC Tap Card

Selecting a service animates the other options away and transitions into a focused package view with configured prices, features, exclusions and care-plan information. Use the “All services” control to return to the selector. Actual rates are maintained in config.js.
The NFC chooser clearly distinguishes one-time programming from physical card,
printing/delivery costs and explains that the listed website/menu care plans
cover digital assets rather than the physical NFC card itself.

The page uses self-contained CSS product mockups for the three choices; no extra image files are required for the selector. The longer page uses one-time IntersectionObserver section reveals. GSAP loads from jsDelivr for the selector intro and click transitions; reduced-motion preference is respected.


PERFORMANCE OPTIMIZATIONS (CURRENT BUILD)
----------------------------------------
- The decorative full-screen canvas draws one static frame; it has no animation-frame loop.
- The secondary Three.js/WebGL scene is no longer auto-loaded, avoiding continuous GPU rendering.
- The three service chooser keeps its entry/selection transitions and product artwork, while decorative orbit/pulse/background loops are disabled.
- ScrollTrigger is not loaded, reducing a second animation library download; service reveals fall back to IntersectionObserver.
- Backdrop blur, animated shadow work, excess particles and permanent GPU layer promotion are reduced.
