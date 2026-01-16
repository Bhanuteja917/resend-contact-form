# Contact Form with Resend Integration

A simple Next.js contact form integrated with Resend for sending emails. Built with TypeScript and Tailwind CSS.

## Features

- Clean and responsive contact form with name, email, and message fields
- Real-time form validation
- Loading states and success/error feedback
- Email sending via Resend API
- Beautiful Tailwind CSS styling

## Prerequisites

- Node.js 18+ installed
- A Resend account and API key

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Resend API Key

1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your Resend API key to `.env.local`:
   ```
   RESEND_API_KEY=your_actual_resend_api_key
   ```

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

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the contact form.

## Testing the Form

1. Fill out all three fields (name, email, message)
2. Click "Send Message"
3. You should see a success message if the email was sent
4. Check the recipient email address for the message

## Project Structure

```
resend-contact-form/
├── app/
│   ├── api/
│   │   └── send/
│   │       └── route.ts          # API route for sending emails
│   ├── page.tsx                  # Main page with form
│   └── layout.tsx                # Root layout
├── components/
│   └── ContactForm.tsx           # Contact form component
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

### "Missing required fields" error
- Make sure all form fields are filled out

### "Failed to send email" error
- Check that your `RESEND_API_KEY` is set correctly in `.env.local`
- Verify your Resend API key is valid
- Make sure you've updated the `from` email to a verified domain

### Email not received
- Check spam folder
- Verify the `to` email address in `app/api/send/route.ts`
- Check Resend dashboard for delivery status

## Learn More

- [Resend Documentation](https://resend.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

MIT
