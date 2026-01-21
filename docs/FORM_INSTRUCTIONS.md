# Formspree / Static Form Integration Instructions

This file explains how to enable the static contact form included in `index`.

Recommended quick option: Formspree (no server required)

1. Create a Formspree account
   - Visit https://formspree.io and sign up.
   - Create a new form and note the form endpoint ID (format: `https://formspree.io/f/{your-form-id}`).

2. Update the form in `index`
   - Replace `{your-form-id}` in the `<form action="https://formspree.io/f/{your-form-id}">` and in the `data-endpoint` attribute with your actual Formspree form ID.
   - Example:
     - `action="https://formspree.io/f/mayvlrpa"`
     - `data-endpoint="https://formspree.io/f/mayvlrpa"`

3. Test submission
   - Deploy or run the site locally and submit a test message.
   - Formspree will validate and usually send an email notification to the address configured in your Formspree project settings.

4. Optional: AJAX / CORS notes
   - The provided `assets/script.js` uses fetch() to POST to the form endpoint and expects JSON responses.
   - Formspree supports CORS; if you see CORS errors, ensure your account settings allow submissions from your domain or simply rely on the native form POST (no JS) which will still work.

5. Email deliverability
   - To improve deliverability set up SPF/DKIM/DMARC records for your sending domain (this is for emails sent from your own mail server if you route via SMTP).
   - Formspree delivers via their infrastructure but you can configure reply-to headers.

6. Alternatives
   - Netlify Forms: if you host on Netlify, you can use Netlify Forms with no external service.
   - Formsubmit.co: similar quick option without an account (less control).

7. Spam & abuse
   - Consider enabling captcha / rate limits in the form provider settings if you receive spam.
   - Keep form fields minimal and avoid auto-redirects after submit for better UX.

If you want, I can:
- Replace the placeholder ID with a real endpoint if you provide the Formspree form ID.
- Swap to Netlify Forms or provide a serverless function (Vercel/Netlify) instead for more control.

---