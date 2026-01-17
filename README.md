# Contact Form with Resend Integration

A simple Next.js contact form integrated with Resend for sending emails. Built with TypeScript and Tailwind CSS, featuring GDPR-compliant cookie consent management with CookieYes and Google Tag Manager integration.

## Features

- Clean and responsive contact form with name, email, and message fields
- Real-time form validation
- Loading states and success/error feedback
- Email sending via Resend API
- Beautiful Tailwind CSS styling
- GDPR-compliant cookie consent with CookieYes
- Google Tag Manager integration with Consent Mode v2
- Google Analytics 4 ready

## Prerequisites

- Node.js 18+ installed
- A Resend account and API key
- A CookieYes account and banner ID
- A Google Tag Manager account (optional but recommended)
- A Google Analytics 4 property (optional but recommended)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your credentials:
   ```env
   # Required
   RESEND_API_KEY=your_actual_resend_api_key

   # Required for cookie consent
   NEXT_PUBLIC_COOKIEYES_ID=your_cookieyes_banner_id

   # Optional but recommended
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXX
   ```

   **Where to get these:**
   - **RESEND_API_KEY**: Get from https://resend.com/api-keys
   - **NEXT_PUBLIC_COOKIEYES_ID**: Get from https://www.cookieyes.com/ (Dashboard > Website Details)
   - **NEXT_PUBLIC_GTM_ID**: Get from https://tagmanager.google.com/ (see GTM setup below)

### 3. Update Email Addresses

Open `app/api/send/route.ts` and update the email addresses:

- **Line 18 (`from`)**: Replace with your verified domain email
  - For testing, you can use `onboarding@resend.dev`
  - For production, use your verified domain (e.g., `contact@yourdomain.com`)

- **Line 19 (`to`)**: Replace with the email where you want to receive submissions
  - For testing, you can use `delivered@resend.dev`
  - For production, use your actual email address

```typescript
const data = await resend.emails.send({
  from: 'onboarding@resend.dev', // Change this
  to: 'delivered@resend.dev',     // Change this
  subject: `New Contact Form Submission from ${name}`,
  // ...
});
```

### 4. Set Up Google Tag Manager (Optional)

For detailed GTM setup instructions with GA4 and consent mode, see [docs/GTM_SETUP.md](docs/GTM_SETUP.md).

**Quick Setup:**
1. Create a GTM account at https://tagmanager.google.com/
2. Create a container for your website
3. Copy the Container ID (GTM-XXXXXX)
4. Add it to `.env.local` as `NEXT_PUBLIC_GTM_ID`
5. Follow the full guide in `docs/GTM_SETUP.md` to configure GA4 and consent mode

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the contact form.

## Testing

### Testing the Contact Form

1. Fill out all three fields (name, email, message)
2. Click "Send Message"
3. You should see a success message if the email was sent
4. Check the recipient email address for the message

### Testing Cookie Consent & GTM

1. Open your website in the browser
2. You should see the CookieYes cookie banner
3. Open Chrome DevTools (F12) and go to Console
4. Check that `dataLayer` exists
5. Before accepting cookies, consent should be `denied`
6. Accept cookies and verify `consent_update` event fires
7. Check that analytics consent is now `granted`

For detailed testing instructions, see [docs/GTM_SETUP.md](docs/GTM_SETUP.md).

## Project Structure

```
resend-contact-form/
├── app/
│   ├── api/
│   │   └── send/
│   │       └── route.ts          # API route for sending emails
│   ├── page.tsx                  # Main page with form
│   ├── layout.tsx                # Root layout with GTM & CookieYes
│   └── globals.css               # Global styles
├── components/
│   ├── ContactForm.tsx           # Contact form component
│   ├── GoogleTagManager.tsx      # GTM integration with consent mode
│   └── CookieYes.tsx             # CookieYes cookie consent banner
├── docs/
│   └── GTM_SETUP.md              # Detailed GTM setup guide
├── .env.local                    # Environment variables (not committed)
└── .env.example                  # Example environment variables
```

## Customization

### Styling

The form uses Tailwind CSS. You can customize colors and styles in:
- `app/page.tsx` - Page background and header
- `components/ContactForm.tsx` - Form styling

### Email Template

Customize the email template in `app/api/send/route.ts` by modifying the `html` parameter.

### Form Fields

Add or remove fields by updating:
1. The `FormData` interface in `components/ContactForm.tsx`
2. The form JSX in the same component
3. The validation and email template in `app/api/send/route.ts`

## Troubleshooting

### Contact Form Issues

#### "Missing required fields" error
- Make sure all form fields are filled out

#### "Failed to send email" error
- Check that your `RESEND_API_KEY` is set correctly in `.env.local`
- Verify your Resend API key is valid
- Make sure you've updated the `from` email to a verified domain

#### Email not received
- Check spam folder
- Verify the `to` email address in `app/api/send/route.ts`
- Check Resend dashboard for delivery status

### Cookie Consent & GTM Issues

#### CookieYes banner not showing
- Verify `NEXT_PUBLIC_COOKIEYES_ID` is set in `.env.local`
- Check that the ID is correct (from CookieYes dashboard)
- Restart the development server after changing `.env.local`
- Clear browser cache and cookies

#### GTM not loading
- Verify `NEXT_PUBLIC_GTM_ID` is set in `.env.local`
- Check that the Container ID is correct (format: GTM-XXXXXX)
- Ensure GTM container is published
- Check browser console for errors

#### Consent not updating
- Verify CookieYes has Google Consent Mode v2 enabled
- Check browser console for `consent_update` events
- Clear cookies and test again
- Use GTM Preview mode to debug (see `docs/GTM_SETUP.md`)

#### GA4 not tracking
- Ensure you've configured GA4 in GTM (see `docs/GTM_SETUP.md`)
- Verify you've accepted analytics cookies
- Check GTM Preview mode to see if tags are firing
- Allow a few minutes for data to appear in GA4 Realtime reports

## How It Works

### Cookie Consent Flow

1. **Page loads** → Consent Mode initializes with all consent `denied` (except necessary cookies)
2. **CookieYes banner appears** → User sees cookie consent options
3. **User accepts cookies** → CookieYes fires `consent_update` event
4. **GTM receives consent** → Updates consent state to `granted` for accepted categories
5. **Analytics tags fire** → GA4 and other tags start tracking (only after consent)

This ensures GDPR compliance by blocking all non-essential cookies until user consent.

## Learn More

### Documentation
- [Resend Documentation](https://resend.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Google Tag Manager](https://developers.google.com/tag-manager)
- [Google Consent Mode v2](https://developers.google.com/tag-platform/security/guides/consent)
- [CookieYes Documentation](https://www.cookieyes.com/documentation/)

### Guides
- [Complete GTM Setup Guide](docs/GTM_SETUP.md) - Step-by-step instructions for GTM, GA4, and consent mode

## License

MIT
