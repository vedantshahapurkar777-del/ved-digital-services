VED DIGITAL SERVICES — LOW-JANK CINEMATIC SELECTOR + SUPABASE PORTFOLIO
======================================================================

FILES
-----
index.html, styles.css, config.js, script.js, ved-digital-services-logo.png — existing site and logo.
supabase-config.js, supabase-client.js — browser-safe Supabase configuration/client.
admin-login.html, dashboard.html, admin.css, admin.js — owner login and portfolio/logo management.
SUPABASE-SETUP.txt — configuration, GitHub publishing and smoke-test instructions.

EXISTING DESIGN / FEATURES
--------------------------
This package retains the existing service chooser, existing services and rates, contact details, FAQ, NFC
logo add-on pricing, mobile styling and performance changes. Portfolio updates now load from Supabase when a
valid public client key is configured; if not configured or unavailable, the existing local example cards remain.

IMPORTANT BEFORE DEPLOYING
-------------------------
Open supabase-config.js and replace PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE with your project's Publishable
key (or legacy public anon key). Never use the service_role/secret key in browser code.

Read SUPABASE-SETUP.txt before uploading. Existing database tables and policies are not recreated by this ZIP.
Keep all required files in the same repository root as index.html. Upload/replace only the listed files and keep
existing assets and unrelated files.
