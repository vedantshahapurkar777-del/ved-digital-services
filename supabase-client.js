/* Creates one shared Supabase client for the public site and admin pages. */
(() => {
  const config = window.VED_SUPABASE_CONFIG;
  const key = config && typeof config.publishableKey === 'string' ? config.publishableKey.trim() : '';
  function looksLikePublicKey(value) {
    // Preferred current format.
    if (/^sb_publishable_[A-Za-z0-9_-]+$/.test(value)) return true;
    // Legacy anon JWTs are also public keys. Reject JWTs that declare a service_role claim.
    const parts = value.split('.');
    if (parts.length !== 3) return false;
    try {
      const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const decoded = JSON.parse(atob(payload.padEnd(Math.ceil(payload.length / 4) * 4, '=')));
      return decoded.role === 'anon';
    } catch (_) { return false; }
  }
  const ready = window.supabase && typeof window.supabase.createClient === 'function'
    && config && /^https:\/\//i.test(config.url || '')
    && key && !key.includes('PASTE_YOUR_SUPABASE') && looksLikePublicKey(key);
  if (!ready) {
    window.vedSupabaseClient = null;
    return;
  }
  window.vedSupabaseClient = window.supabase.createClient(config.url, key, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
})();
