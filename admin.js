(() => {
  const client = window.vedSupabaseClient;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const validUrl = value => {
    if (!value) return '';
    try { const url = new URL(String(value)); return ['http:', 'https:'].includes(url.protocol) ? url.href : ''; }
    catch (_) { return ''; }
  };
  const setMessage = (element, message, kind = '') => {
    if (!element) return;
    element.textContent = message || '';
    element.classList.toggle('error', kind === 'error');
    element.classList.toggle('success', kind === 'success');
  };
  const showNotice = (message, isError = false) => {
    const notice = $('#globalNotice');
    if (!notice) return;
    notice.textContent = message;
    notice.classList.toggle('error', isError);
    notice.hidden = !message;
  };
  const notConfiguredMessage = 'Supabase is not configured yet. Open supabase-config.js and enter your project Publishable key (never a service_role or secret key).';

  // Login page
  const loginForm = $('#loginForm');
  if (loginForm) {
    const message = $('#loginMessage');
    const loginButton = $('#loginButton');
    const displaySetupError = () => {
      setMessage(message, notConfiguredMessage, 'error');
      loginButton.disabled = true;
    };
    if (!client) displaySetupError();

    async function verifyAdmin(user) {
      const { data, error } = await client.from('user_roles').select('role').eq('user_id', user.id).maybeSingle();
      if (error) throw error;
      return data?.role === 'admin';
    }

    loginForm.addEventListener('submit', async event => {
      event.preventDefault();
      if (!client) return displaySetupError();
      loginButton.disabled = true;
      loginButton.textContent = 'Signing in…';
      setMessage(message, 'Checking your account…');
      try {
        const email = $('#email').value.trim();
        const password = $('#password').value;
        const { data, error } = await client.auth.signInWithPassword({ email, password });
        if (error) throw error;
        const admin = await verifyAdmin(data.user);
        if (!admin) {
          await client.auth.signOut();
          setMessage(message, 'This account does not have the admin role. Ask the project owner to verify user_roles.', 'error');
          return;
        }
        window.location.replace('dashboard.html');
      } catch (error) {
        setMessage(message, error?.message || 'Sign-in failed. Check your credentials and Supabase Auth settings.', 'error');
      } finally {
        loginButton.disabled = false;
        loginButton.innerHTML = 'Sign in to dashboard <span aria-hidden="true">↗</span>';
      }
    });

    if (client) {
      client.auth.getSession().then(async ({ data, error }) => {
        if (error || !data?.session?.user) return;
        try {
          if (await verifyAdmin(data.session.user)) window.location.replace('dashboard.html');
        } catch (_) { /* Keep the login form available so a permission error can be shown on submit. */ }
      });
    }
    return;
  }

  // Dashboard page: fail closed unless both a valid Auth session and the admin row are verified.
  const dashboardApp = $('#dashboardApp');
  if (!dashboardApp) return;
  const blockedCard = $('#blockedCard');
  const blockedMessage = $('#blockedMessage');
  let currentProjects = [];
  let currentLogoUrl = '';
  let dashboardReady = false;

  function blockDashboard(message) {
    dashboardApp.hidden = true;
    blockedCard.hidden = false;
    blockedMessage.textContent = message;
  }

  async function requireAdmin() {
    if (!client) {
      blockDashboard(notConfiguredMessage);
      return false;
    }
    let sessionResult;
    try { sessionResult = await client.auth.getSession(); }
    catch (_) { blockDashboard('Could not read the sign-in session. Return to login and try again.'); return false; }
    const user = sessionResult?.data?.session?.user;
    if (!user) { window.location.replace('admin-login.html'); return false; }
    $('#adminEmail').textContent = user.email || 'Signed in';
    try {
      const { data, error } = await client.from('user_roles').select('role').eq('user_id', user.id).maybeSingle();
      if (error) throw error;
      if (data?.role !== 'admin') {
        await client.auth.signOut();
        window.location.replace('admin-login.html?reason=not-admin');
        return false;
      }
      return true;
    } catch (error) {
      blockDashboard(`Admin role could not be verified (${error?.message || 'permission check failed'}). No management actions are enabled. Check the user_roles SELECT policy and try again.`);
      return false;
    }
  }

  function showPanel(name) {
    const allowed = ['overview', 'projects', 'branding'];
    if (!allowed.includes(name)) name = 'overview';
    $$('.side-tab').forEach(button => button.classList.toggle('active', button.dataset.tab === name));
    allowed.forEach(id => { const panel = $(`#${id}Panel`); if (panel) panel.hidden = id !== name; });
    if (name === 'projects') loadProjects();
    if (name === 'branding') loadLogoSetting();
  }

  async function loadProjects() {
    if (!dashboardReady) return;
    $('#projectList').innerHTML = '<div class="loading-row">Loading projects…</div>';
    const { data, error } = await client.from('portfolio_projects').select('*').order('display_order', { ascending: true }).order('created_at', { ascending: false });
    if (error) {
      currentProjects = [];
      $('#projectList').innerHTML = `<div class="empty-row">Could not load projects. ${escapeHtml(error.message)}</div>`;
      showNotice('Project list could not be loaded. Check the portfolio_projects Data API access and RLS policy.', true);
      return;
    }
    currentProjects = Array.isArray(data) ? data : [];
    updateStats();
    renderProjectList();
  }

  function updateStats() {
    $('#totalCount').textContent = currentProjects.length;
    $('#publishedCount').textContent = currentProjects.filter(project => project.is_published).length;
    $('#draftCount').textContent = currentProjects.filter(project => !project.is_published).length;
  }

  function renderProjectList() {
    const list = $('#projectList');
    if (!currentProjects.length) {
      list.innerHTML = '<div class="empty-row">No projects saved yet. Add a project or import the clearly labelled starter concepts.</div>';
      return;
    }
    list.innerHTML = currentProjects.map(project => {
      const image = validUrl(project.image_url);
      const status = project.is_published ? '<span class="status-pill">Published</span>' : '<span class="status-pill draft">Draft</span>';
      const thumb = image ? `<img src="${escapeHtml(image)}" alt="" loading="lazy" />` : '✦';
      return `<article class="project-row"><div class="project-thumb">${thumb}</div><div class="project-copy"><h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.description)}</p><div class="project-meta"><span>${escapeHtml(project.category || 'Project')}</span>${status}<span>Order ${Number(project.display_order || 0)}</span></div></div><div class="project-actions"><button class="button secondary" type="button" data-edit="${escapeHtml(project.id)}">Edit</button><button class="button secondary" type="button" data-toggle-publish="${escapeHtml(project.id)}">${project.is_published ? 'Hide' : 'Publish'}</button><button class="button danger" type="button" data-delete="${escapeHtml(project.id)}">Delete</button></div></article>`;
    }).join('');
  }

  function openProjectForm(project = null) {
    const form = $('#projectForm');
    form.hidden = false;
    $('#projectId').value = project?.id || '';
    $('#projectTitle').value = project?.title || '';
    $('#projectCategory').value = project?.category || 'Website';
    $('#projectDescription').value = project?.description || '';
    $('#projectDemoUrl').value = project?.demo_url || '';
    $('#projectImageUrl').value = project?.image_url || '';
    $('#projectImageFile').value = '';
    $('#projectOrder').value = Number.isFinite(Number(project?.display_order)) ? Number(project?.display_order || 0) : 0;
    $('#projectPublished').checked = project ? Boolean(project.is_published) : true;
    $('#projectFormTitle').textContent = project ? 'Edit project' : 'Add a project';
    $('#projectFormEyebrow').textContent = project ? 'UPDATE PORTFOLIO ITEM' : 'NEW PORTFOLIO ITEM';
    $('#saveProjectButton').textContent = project ? 'Save changes' : 'Save project';
    setMessage($('#projectMessage'), '');
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    $('#projectTitle').focus({ preventScroll: true });
  }

  function closeProjectForm() {
    $('#projectForm').hidden = true;
    $('#projectForm').reset();
    $('#projectId').value = '';
    $('#projectCategory').value = 'Website';
    $('#projectOrder').value = '0';
    $('#projectPublished').checked = true;
    setMessage($('#projectMessage'), '');
  }

  function validateImage(file) {
    if (!file) return;
    const allowed = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowed.includes(file.type)) throw new Error('Choose a PNG, JPEG or WebP image.');
    if (file.size > 5 * 1024 * 1024) throw new Error('Image is larger than 5 MB. Choose a smaller image.');
  }

  async function uploadImage(file, folder) {
    validateImage(file);
    const safeName = file.name.normalize('NFKD').replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '').slice(-80) || 'image';
    const unique = (window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);
    const path = `${folder}/${unique}-${safeName}`;
    const { error } = await client.storage.from('portfolio-assets').upload(path, file, { cacheControl: '3600', contentType: file.type, upsert: false });
    if (error) throw error;
    const { data } = client.storage.from('portfolio-assets').getPublicUrl(path);
    const publicUrl = validUrl(data?.publicUrl);
    if (!publicUrl) throw new Error('Upload completed, but Supabase did not return a valid public URL. Check the bucket setting.');
    return publicUrl;
  }

  $('#projectForm').addEventListener('submit', async event => {
    event.preventDefault();
    if (!dashboardReady) return;
    const button = $('#saveProjectButton');
    const message = $('#projectMessage');
    button.disabled = true;
    setMessage(message, 'Saving project…');
    try {
      const file = $('#projectImageFile').files[0];
      let imageUrl = $('#projectImageUrl').value.trim();
      if (file) {
        setMessage(message, 'Uploading preview image…');
        imageUrl = await uploadImage(file, 'projects');
        $('#projectImageUrl').value = imageUrl;
      }
      if (imageUrl && !validUrl(imageUrl)) throw new Error('Image URL must start with http:// or https://.');
      const demoInput = $('#projectDemoUrl').value.trim();
      if (demoInput && !validUrl(demoInput)) throw new Error('Demo URL must start with http:// or https://.');
      const projectId = $('#projectId').value;
      const payload = {
        title: $('#projectTitle').value.trim(),
        category: $('#projectCategory').value.trim(),
        description: $('#projectDescription').value.trim(),
        image_url: imageUrl || null,
        demo_url: demoInput || null,
        display_order: Math.max(0, Math.min(9999, Number.parseInt($('#projectOrder').value || '0', 10) || 0)),
        is_published: $('#projectPublished').checked,
        updated_at: new Date().toISOString()
      };
      const result = projectId
        ? await client.from('portfolio_projects').update(payload).eq('id', projectId)
        : await client.from('portfolio_projects').insert(payload);
      if (result.error) throw result.error;
      setMessage(message, 'Project saved.', 'success');
      closeProjectForm();
      showNotice('Project saved successfully. Published changes will appear on the public site after it refreshes.', false);
      await loadProjects();
    } catch (error) {
      setMessage(message, error?.message || 'Could not save this project.', 'error');
    } finally {
      button.disabled = false;
      if (!$('#projectId').value) button.textContent = 'Save project';
    }
  });

  async function changePublishState(id) {
    const project = currentProjects.find(item => String(item.id) === String(id));
    if (!project) return;
    showNotice('Updating publication status…');
    const { error } = await client.from('portfolio_projects').update({ is_published: !project.is_published, updated_at: new Date().toISOString() }).eq('id', project.id);
    if (error) { showNotice(`Could not update project: ${error.message}`, true); return; }
    showNotice(project.is_published ? 'Project hidden from the public portfolio.' : 'Project published on the public portfolio.');
    await loadProjects();
  }

  async function deleteProject(id) {
    const project = currentProjects.find(item => String(item.id) === String(id));
    if (!project || !window.confirm(`Delete “${project.title}” permanently? This cannot be undone.`)) return;
    const { error } = await client.from('portfolio_projects').delete().eq('id', project.id);
    if (error) { showNotice(`Could not delete project: ${error.message}`, true); return; }
    showNotice('Project deleted.');
    await loadProjects();
  }

  async function loadLogoSetting() {
    if (!dashboardReady) return;
    const message = $('#brandingMessage');
    const { data, error } = await client.from('site_settings').select('setting_value').eq('setting_key', 'brand_logo_url').maybeSingle();
    if (error) { setMessage(message, `Could not load logo setting: ${error.message}`, 'error'); return; }
    currentLogoUrl = validUrl(data?.setting_value || '');
    const preview = currentLogoUrl || 'ved-digital-services-logo.png';
    $('#logoPreview').src = preview;
    $('#dashLogo').src = preview;
  }

  $('#brandingForm').addEventListener('submit', async event => {
    event.preventDefault();
    if (!dashboardReady) return;
    const file = $('#brandLogoFile').files[0];
    const button = $('#saveLogoButton');
    const message = $('#brandingMessage');
    if (!file) { setMessage(message, 'Choose a logo image first.', 'error'); return; }
    button.disabled = true;
    setMessage(message, 'Uploading logo…');
    try {
      const url = await uploadImage(file, 'brand');
      const { error } = await client.from('site_settings').upsert({
        setting_key: 'brand_logo_url', setting_value: url, is_public: true, updated_at: new Date().toISOString()
      }, { onConflict: 'setting_key' });
      if (error) throw error;
      currentLogoUrl = url;
      $('#logoPreview').src = url;
      $('#dashLogo').src = url;
      $('#brandLogoFile').value = '';
      setMessage(message, 'Logo updated. Refresh the public website to see the new logo.', 'success');
      showNotice('Website logo updated successfully.');
    } catch (error) {
      setMessage(message, error?.message || 'Could not update the logo.', 'error');
    } finally { button.disabled = false; }
  });

  $('#resetLogoButton').addEventListener('click', async () => {
    if (!dashboardReady || !window.confirm('Restore the original logo file on the website?')) return;
    const button = $('#resetLogoButton');
    button.disabled = true;
    try {
      const { error } = await client.from('site_settings').delete().eq('setting_key', 'brand_logo_url');
      if (error) throw error;
      currentLogoUrl = '';
      $('#logoPreview').src = 'ved-digital-services-logo.png';
      $('#dashLogo').src = 'ved-digital-services-logo.png';
      $('#brandLogoFile').value = '';
      setMessage($('#brandingMessage'), 'Original logo restored for the public website.', 'success');
      showNotice('Original logo restored. Refresh the public site to see the change.');
    } catch (error) { setMessage($('#brandingMessage'), error?.message || 'Could not reset the logo.', 'error'); }
    finally { button.disabled = false; }
  });

  async function importSamples() {
    if (!dashboardReady) return;
    const source = Array.isArray(window.SITE_CONFIG?.portfolio) ? window.SITE_CONFIG.portfolio : [];
    if (!source.length) { showNotice('No starter concepts are available in config.js.', true); return; }
    const existingTitles = new Set(currentProjects.map(project => String(project.title || '').trim().toLowerCase()));
    const samples = source.filter(item => !existingTitles.has(`demo: ${String(item.name || '').trim().toLowerCase()}`)).map((item, index) => ({
      title: `Demo: ${item.name}`, category: item.type || 'Concept',
      description: `Demo concept only — ${item.description || 'an illustrative digital project.'}`,
      image_url: null, demo_url: null, is_published: true, display_order: currentProjects.length + index
    }));
    if (!samples.length) { showNotice('Starter concepts already exist. No duplicates were added.'); return; }
    if (!window.confirm(`Add and publish ${samples.length} clearly labelled concept projects? You can edit or hide them later.`)) return;
    const button = $('#importSamplesButton');
    button.disabled = true;
    try {
      const { error } = await client.from('portfolio_projects').insert(samples);
      if (error) throw error;
      showNotice(`${samples.length} concept projects added. You can edit or hide them in Portfolio projects.`);
      await loadProjects();
    } catch (error) { showNotice(`Could not add concepts: ${error?.message || 'unknown error'}`, true); }
    finally { button.disabled = false; }
  }

  $$('.side-tab').forEach(button => button.addEventListener('click', () => showPanel(button.dataset.tab)));
  $$('[data-tab]').filter(node => !node.classList.contains('side-tab')).forEach(button => button.addEventListener('click', () => showPanel(button.dataset.tab)));
  $$('[data-open-new-project]').forEach(button => button.addEventListener('click', () => { showPanel('projects'); openProjectForm(); }));
  $('#closeProjectForm').addEventListener('click', closeProjectForm);
  $('#cancelProjectButton').addEventListener('click', closeProjectForm);
  $('#projectList').addEventListener('click', async event => {
    const editButton = event.target.closest('[data-edit]');
    const publishButton = event.target.closest('[data-toggle-publish]');
    const deleteButton = event.target.closest('[data-delete]');
    if (editButton) {
      const project = currentProjects.find(item => String(item.id) === editButton.dataset.edit);
      if (project) openProjectForm(project);
    } else if (publishButton) {
      publishButton.disabled = true;
      try { await changePublishState(publishButton.dataset.togglePublish); }
      catch (error) { showNotice(error?.message || 'Could not update project.', true); }
      finally { publishButton.disabled = false; }
    } else if (deleteButton) {
      deleteButton.disabled = true;
      try { await deleteProject(deleteButton.dataset.delete); }
      catch (error) { showNotice(error?.message || 'Could not delete project.', true); }
      finally { deleteButton.disabled = false; }
    }
  });
  $('#importSamplesButton').addEventListener('click', importSamples);
  $('#signOutButton').addEventListener('click', async () => {
    if (client) await client.auth.signOut();
    window.location.replace('admin-login.html');
  });

  (async () => {
    const admin = await requireAdmin();
    if (!admin) return;
    dashboardReady = true;
    dashboardApp.hidden = false;
    blockedCard.hidden = true;
    await Promise.all([loadProjects(), loadLogoSetting()]);
  })();
})();
