# Grace Speech & Hearing - Landing Page & Funnel Rebuild

This repository contains the premium, high-conversion Google Ads landing page and lead-capture sales funnel built for **Grace Speech & Hearing / Grace Hearing Aids** located in Mandaveli, Chennai. 

It is structured with a fast React + Vite + Tailwind CSS frontend, real-time Firebase leads syncing, and an authenticated staff admin dashboard for lead management.

---

## 🚀 Key Features

* **High-Intent Re-branding:** Custom-crafted layouts optimized for buying-intent search terms (e.g. *hearing aid price Chennai*, *rechargeable hearing aid Chennai*, *invisible hearing aid Mandaveli*).
* **Location Priority Tags:** Preferred Chennai areas are tagged `new_chennai_lead`, clearly outside locations are tagged `outside_chennai_lead`, and unclear locations are tagged `needs_location_verification`. Every valid enquiry is saved and shown.
* **Session Tracking:** Auto-captures GCLID (Google Ads click ID), UTM codes (`utm_source`, `utm_medium`, `utm_campaign`, etc.), device characteristics, and timestamps.
* **Leads Dashboard:** Staff dashboard to search, status-filter (New Lead, Contacted, Booked, Converted, etc.), write notes, quick-call or text patients, and export leads to CSV.
* **SEO & Compliance Ready:** Clean headings, structured FAQs, real location maps, privacy policies, and medical policy disclosures to secure top Google Ads quality scores.

---

## 🛠️ Tech Stack

* **Frontend:** React 18 + Vite
* **Styling:** Tailwind CSS v4 + PostCSS
* **Routing:** React Router DOM
* **Database & Auth:** Firebase Realtime Database
* **Icons:** Lucide React

---

## 💻 Local Setup & Installation

Follow these steps to run the project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd grace-speech-&-hearing-aid-care-chennai
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory by copying the `.env.example` structure:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Firebase credentials and desired admin staff login credentials (refer to the Firebase section below).

4. **Launch Local Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

5. **Build for Production Bundle:**
   Verify compilation and bundle output:
   ```bash
   npm run build
   ```
   The static outputs will compile inside the `/dist` folder, ready for direct deployment.

---

## 🔥 Firebase Setup Instructions

We use **Firebase Realtime Database** for instant syncing in the admin panel.

1. Go to the [Firebase Console](https://console.firebase.google.com/) and click **Add Project**.
2. Set up **Realtime Database** inside your project:
   * Select a database server location (Asia-South1 is recommended for Chennai target speeds).
   * Choose **Start in Locked Mode**.
3. Go to **Project Settings** (gear icon) -> **General**, scroll down to **Your apps**, and click the Web icon (`</>`) to register a web app.
4. Copy the `firebaseConfig` keys and paste them into your local `.env.local` file.
5. In **Authentication** -> **Sign-in method**, enable **Email/Password**. In **Users**, create `prasanthwork03@gmail.com` with the chosen admin password. The login screen maps the public username `admin` to this Firebase account. Do not add a public sign-up screen or put the password in the site environment.
6. In **Realtime Database** -> **Rules**, paste the complete contents of `firebase.rules.json` and publish it. These rules allow anonymous visitors to create a validated lead, but only Firebase-authenticated staff can read, update, or delete leads.

---

## 🌐 Netlify Deployment Instructions

The project is Netlify-ready out of the box with custom rewrite routes defined in `netlify.toml`.

1. Sign in to [Netlify](https://www.netlify.com/) and click **Add new site** -> **Import an existing project**.
2. Link your GitHub repository.
3. Verify Build Settings (automatically populated from `netlify.toml`):
   * **Build Command:** `npm run build`
   * **Publish Directory:** `dist`
4. Configure Environment Variables in Netlify:
   * Navigate to **Site Settings** -> **Environment variables** -> **Add a variable**.
   * Add `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_DATABASE_URL`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, and `VITE_FIREBASE_APP_ID`.
   * Add `VITE_ADMIN_USERNAME=admin` and `VITE_ADMIN_EMAIL` matching the Firebase Authentication staff account. Optionally add `VITE_WHATSAPP_NUMBER` and `VITE_PRIMARY_PHONE`.
   * Set the variables for the **Production** deploy context (and Deploy Previews if you test there). Netlify injects Vite variables at build time, so redeploy after every environment-variable change.
   * Never add an admin password as a `VITE_` variable because every `VITE_` value is readable in the compiled browser JavaScript.
5. Trigger a fresh production deploy. A deploy built before the Firebase variables were added will still contain missing values.

### Production smoke test

1. Open the deployed page in a desktop browser and the admin panel in a separate signed-in window.
2. Submit Chennai, unclear, and clearly outside-Chennai test leads. Confirm all three appear without refreshing.
3. Repeat from a phone on mobile data and in a private/incognito tab. Success should only appear after Firebase accepts the write.
4. In the admin panel, verify **All Leads** is selected, then update a status and delete a disposable test lead.
5. In Firebase Realtime Database, confirm every record is under the same `/leads/{leadId}` path.

---

## 🎯 Google Ads Optimization & Conversion Tracking

### 1. Location Quality Controls
To reduce out-of-location (unqualified) leads and optimize budgets:
* **Radius/Location Targeting:** In your Google Ads campaign settings, target **Chennai / Mandaveli** specifically.
* **Target Presence Setting (CRITICAL):**
  * Under Campaign Settings -> Locations -> Location Options, select:
    * **Target:** **Presence: People in or regularly in your targeted locations**
  * **DO NOT** select "Presence or interest" (which is the default). Choosing "Presence or interest" will trigger your ads for people searching for Chennai hearing aids from other cities or states, inflating unqualified leads.

### 2. Conversion Pixel Configuration
To track form submissions as conversions in Google Ads:
1. In Google Ads, go to **Tools and Settings** -> **Conversions** -> **New Conversion Action** (Website).
2. Enter your landing page URL, click Scan, and create a manual conversion action for **Submit lead form**.
3. Choose **Use Google Tag Manager** or **Install the tag yourself**.
4. Place GTM or gtag scripts in `index.html` placeholders.
5. In `src/pages/ThankYou.jsx`, uncomment the `gtag('event', 'conversion', ...)` block and update it with your Google Ads Conversion ID and Conversion Label. This will send a conversion signal every time a user is redirected to `/thank-you` upon successful form submission.
