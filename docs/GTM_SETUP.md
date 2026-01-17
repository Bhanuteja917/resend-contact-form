# Google Tag Manager Setup Guide

This guide will walk you through setting up Google Tag Manager (GTM) with Google Analytics 4 (GA4) and CookieYes consent management.

## Table of Contents
1. [Create GTM Account and Container](#1-create-gtm-account-and-container)
2. [Create Google Analytics 4 Property](#2-create-google-analytics-4-property)
3. [Configure GTM Tags](#3-configure-gtm-tags)
4. [Set Up Consent Mode Triggers](#4-set-up-consent-mode-triggers)
5. [Configure CookieYes Categories](#5-configure-cookieyes-categories)
6. [Testing](#6-testing)

---

## 1. Create GTM Account and Container

### Step 1.1: Create Account
1. Go to https://tagmanager.google.com/
2. Sign in with your Google account
3. Click **"Create Account"**
4. Fill in the details:
   - **Account Name**: Your company/website name (e.g., "My Company")
   - **Country**: Select your country
   - Check "Share data anonymously with Google"

### Step 1.2: Create Container
1. **Container Name**: Your website URL (e.g., "mywebsite.com")
2. **Target Platform**: Select **"Web"**
3. Click **"Create"**
4. Accept the Terms of Service

### Step 1.3: Get Your GTM Container ID
1. After creation, you'll see a popup with installation code
2. **Copy your GTM Container ID** (format: `GTM-XXXXXX`)
3. You can find this later in **Admin > Container Settings**

---

## 2. Create Google Analytics 4 Property

### Step 2.1: Create GA4 Property
1. Go to https://analytics.google.com/
2. Click **"Admin"** (gear icon in bottom left)
3. Click **"Create Property"**
4. Fill in the details:
   - **Property Name**: Your website name
   - **Reporting Time Zone**: Your timezone
   - **Currency**: Your currency
5. Click **"Next"**

### Step 2.2: Configure Property Settings
1. Select your business category
2. Select business size
3. Click **"Create"** and accept the terms

### Step 2.3: Set Up Data Stream
1. Click **"Web"** as your platform
2. Enter your **Website URL** (e.g., `https://mywebsite.com`)
3. Enter **Stream Name** (e.g., "Website")
4. Click **"Create Stream"**

### Step 2.4: Get Your Measurement ID
1. After creating the stream, you'll see the **Measurement ID** (format: `G-XXXXXXXXXX`)
2. **Copy this ID** - you'll need it for GTM configuration

---

## 3. Configure GTM Tags

Now let's configure GTM to work with GA4 and consent mode.

### Step 3.1: Create GA4 Configuration Tag

1. In GTM, click **"Tags"** in the left menu
2. Click **"New"**
3. Name it: `GA4 - Configuration`
4. Click the Tag Configuration box
5. Select **"Google Analytics: GA4 Configuration"**
6. Enter your **Measurement ID** (`G-XXXXXXXXXX`)
7. Under **"Configuration Settings"**, expand **"Fields to Set"**
8. Click **"Add Row"** and add:
   - Field Name: `anonymize_ip`
   - Value: `true`

### Step 3.2: Configure Consent Settings
1. Scroll down to **"Consent Settings"**
2. Set the following:
   - **Ad Storage**: `Not Set` (will be controlled by CookieYes)
   - **Analytics Storage**: `Not Set` (will be controlled by CookieYes)
   - **Ad User Data**: `Not Set`
   - **Ad Personalization**: `Not Set`
3. Check **"Wait for update to consent state"**
   - Set timeout to `2000` milliseconds

### Step 3.3: Set Up Trigger
1. Click the **Triggering** box
2. Select **"Consent Initialization - All Pages"** trigger
   - If it doesn't exist, create it:
     - Click the "+" icon
     - Choose **"Consent Initialization"**
     - Name it: `Consent Initialization - All Pages`
     - This trigger fires before other tags to set consent
3. Click **"Save"**

### Step 3.4: Create GA4 Event Tag (Optional)
1. Click **"New"** tag
2. Name it: `GA4 - Page View`
3. Tag Type: **"Google Analytics: GA4 Event"**
4. **Configuration Tag**: Select `GA4 - Configuration`
5. **Event Name**: `page_view`
6. Trigger: **"All Pages"**
7. **Advanced Settings > Consent Settings**:
   - Require consent for **Analytics Storage**
   - Require consent for **Ad Storage**
8. Click **"Save"**

---

## 4. Set Up Consent Mode Triggers

### Step 4.1: Create Consent Update Trigger
1. Click **"Triggers"** in the left menu
2. Click **"New"**
3. Name it: `Consent Update`
4. Click the trigger configuration box
5. Select **"Custom Event"**
6. Event name: `consent_update`
7. Check **"Use regex matching"**: No
8. Click **"Save"**

### Step 4.2: Verify Consent Initialization Trigger
1. Check if **"Consent Initialization - All Pages"** trigger exists
2. If not, create it:
   - Click **"New"**
   - Name: `Consent Initialization - All Pages`
   - Trigger Type: **"Consent Initialization"**
   - This trigger fires before the page loads
   - Click **"Save"**

---

## 5. Configure CookieYes Categories

Make sure your CookieYes banner has the following categories enabled:

### Required Categories:
1. **Necessary** (always enabled)
   - Maps to: `security_storage` (always granted)

2. **Analytics**
   - Maps to: `analytics_storage`
   - Used for: Google Analytics, tracking

3. **Functional**
   - Maps to: `functionality_storage`, `personalization_storage`
   - Used for: User preferences, personalization

4. **Advertisement** (optional)
   - Maps to: `ad_storage`, `ad_user_data`, `ad_personalization`
   - Used for: Advertising, remarketing

### CookieYes Configuration:
1. Log in to https://www.cookieyes.com/
2. Go to your banner settings
3. Navigate to **"Cookie Categories"**
4. Ensure the categories match the above
5. Under **"Advanced Settings"**, enable:
   - **Google Consent Mode v2**
   - This allows CookieYes to communicate with GTM

---

## 6. Testing

### Step 6.1: Publish GTM Container
1. In GTM, click **"Submit"** in the top right
2. Add a **Version Name**: `Initial Setup - GA4 with Consent Mode`
3. Add a **Version Description**: `Added GA4 configuration with CookieYes consent management`
4. Click **"Publish"**

### Step 6.2: Test the Integration

#### A. Update Your .env.local File
```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXX
NEXT_PUBLIC_COOKIEYES_ID=your_cookieyes_id
```

#### B. Start Your Development Server
```bash
npm run dev
```

#### C. Test Consent Flow
1. Open http://localhost:3000 in your browser
2. Open **Chrome DevTools** (F12)
3. Go to the **Console** tab
4. Check for GTM loading: `dataLayer` should exist
5. You should see the CookieYes banner appear

#### D. Test Before Consent
1. Before accepting cookies, type in console:
   ```javascript
   dataLayer
   ```
2. You should see consent set to `denied` for analytics

#### E. Test After Consent
1. Accept cookies in the CookieYes banner
2. Type in console:
   ```javascript
   dataLayer
   ```
3. Look for `consent_update` event
4. Analytics storage should now be `granted`

#### F. Verify GA4 Tracking
1. Go to **Google Analytics**
2. Navigate to **Reports > Realtime**
3. You should see your session appear (after accepting cookies)

### Step 6.3: Debug with GTM Preview Mode
1. In GTM, click **"Preview"** in top right
2. Enter your website URL: `http://localhost:3000`
3. Click **"Connect"**
4. A new tab will open with debug information
5. Check:
   - ✅ Consent initialization fires first
   - ✅ Default consent is `denied`
   - ✅ After accepting cookies, `consent_update` fires
   - ✅ GA4 tags fire only after consent

---

## Common Issues and Solutions

### Issue 1: GTM Not Loading
- **Check**: GTM ID is correct in `.env.local`
- **Check**: `.env.local` file exists and is not in `.gitignore`
- **Solution**: Restart development server after changing `.env.local`

### Issue 2: Consent Not Updating
- **Check**: CookieYes ID is correct
- **Check**: CookieYes has Google Consent Mode v2 enabled
- **Solution**: Clear browser cookies and test again

### Issue 3: GA4 Not Tracking
- **Check**: Measurement ID is correct in GTM
- **Check**: Consent was granted for Analytics
- **Check**: GTM container is published
- **Solution**: Use GTM Preview mode to debug

### Issue 4: Cookies Still Loading Without Consent
- **Check**: GA4 tag has consent requirements set
- **Check**: Tags have proper triggers (not "All Pages" for tracking tags)
- **Solution**: Add consent requirements to all analytics tags

---

## Production Checklist

Before deploying to production:

- [ ] GTM container is published
- [ ] GA4 Measurement ID is correct
- [ ] CookieYes banner is configured with proper categories
- [ ] Google Consent Mode v2 is enabled in CookieYes
- [ ] All environment variables are set in production
- [ ] Consent flow tested in production domain
- [ ] Privacy policy updated with cookie information
- [ ] GDPR compliance verified

---

## Additional Resources

- [Google Tag Manager Documentation](https://developers.google.com/tag-manager)
- [Google Consent Mode v2](https://developers.google.com/tag-platform/security/guides/consent)
- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [CookieYes Documentation](https://www.cookieyes.com/documentation/)

---

## Support

If you need help:
1. Check the console for errors
2. Use GTM Preview mode for debugging
3. Verify all IDs are correct
4. Check CookieYes dashboard for consent logs
