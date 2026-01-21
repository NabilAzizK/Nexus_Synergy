/* Simple site JS: nav toggle and form handling (progressive enhancement)
   Replace the form action or the data-endpoint attribute with your Formspree endpoint.
*/
document.addEventListener('DOMContentLoaded', function () {
  // Nav toggle
  var btn = document.getElementById('navToggle');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    function toggleNav() {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    }
    btn.addEventListener('click', toggleNav);
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  }

  // Contact form progressive enhancement
  var form = document.getElementById('contactForm');
  if (!form) return;

  var statusWrap = document.createElement('div');
  statusWrap.className = 'form-status-wrap';
  form.appendChild(statusWrap);

  function setStatus(message, type) {
    statusWrap.innerHTML = '';
    var el = document.createElement('div');
    el.className = type === 'success' ? 'form-success' : 'form-error';
    el.textContent = message;
    statusWrap.appendChild(el);
  }

  form.addEventListener('submit', function (ev) {
    // let normal form POST if JS disabled or user submits without AJAX preference
    ev.preventDefault();

    var endpoint = form.getAttribute('action') || form.dataset.endpoint;
    if (!endpoint) {
      setStatus('Submission endpoint not configured. See docs/FORM_INSTRUCTIONS.md', 'error');
      return;
    }

    var formData = new FormData(form);
    // simple validation
    var email = formData.get('email') || '';
    var name = formData.get('name') || '';
    var message = formData.get('message') || '';
    if (!email || !message) {
      setStatus('Please provide your email and a short message.', 'error');
      return;
    }

    // disable submit
    var submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-busy', 'true');
    }

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: formData
    }).then(function (res) {
      if (res.ok) return res.json().catch(function(){ return {}; });
      return res.json().then(function (data) {
        var err = (data && data.error) ? data.error : 'Submission failed. Please try again later.';
        throw new Error(err);
      }).catch(function(){ throw new Error('Submission failed. Please try again later.'); });
    }).then(function (data) {
      form.reset();
      setStatus('Thanks — your message has been sent. We will respond as soon as we can.', 'success');
    }).catch(function (err) {
      console.error('Form submission error:', err);
      setStatus('Sorry — we were unable to submit your message. Please try again later.', 'error');
    }).finally(function () {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-busy');
      }
    });
  });
});