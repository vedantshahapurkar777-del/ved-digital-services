VED DIGITAL SERVICES — THREE.JS + GSAP MOTION EDITION
=====================================================

FILES TO UPLOAD
---------------
index.html       Main website and script references
styles.css       Existing design plus motion/3D styling
config.js        Business contact information, service prices and scope
script.js        Menus, forms, GSAP scroll animations and ambient background
three-hero.js    Real Three.js WebGL 3D hero scene
README.txt       These instructions

WHAT IS ADDED
-------------
- Real Three.js scene with 3D rings, glowing objects, floating NFC cards and particle field.
- GSAP intro animation and ScrollTrigger-based reveal animations for page sections/cards.
- Interactive 3D tilt and pointer lighting for service/pricing cards.
- Mobile-aware sizing and reduced-motion handling.
- Existing services, prices and contact details are preserved from the supplied ZIP.

EXTERNAL LIBRARIES
------------------
Three.js and GSAP/ScrollTrigger are loaded from pinned jsDelivr CDN URLs. Visitors need an internet connection to load those libraries. If WebGL cannot start, the CSS-based hero mockup remains as a fallback. The existing custom CSS is retained; Tailwind was not added because it would duplicate the site's current styling system.

HOW TO PUBLISH TO GITHUB PAGES
------------------------------
1. Download this ZIP and extract it.
2. Open the existing GitHub repository for Ved Digital Services.
3. Choose Add file -> Upload files.
4. Upload these six files to the SAME folder as the existing index.html:
   index.html, styles.css, config.js, script.js, three-hero.js, README.txt
5. Confirm replacement of files with the same names. Do NOT delete unrelated assets or folders.
6. Commit the changes and wait for the latest Pages build/deployment workflow to show a green check.
7. Open the live website and hard-refresh (Ctrl+Shift+R).

IMPORTANT
---------
GitHub Pages publishes static website files. This animation update does not itself add a backend, live order database, private dashboard or automatic payment verification. Those features still need a backend/payment integration.
