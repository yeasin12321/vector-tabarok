# Vector — শুক্রবারের তাবাররুক ডিরেক্টরি

Vector একটি mobile-first, community-driven ওয়েব অ্যাপ। ব্যবহারকারীরা মসজিদ ও জুম্মার তাবাররুকের তথ্য দেখতে, খুঁজতে এবং জমা দিতে পারেন। তথ্য ব্যবহারকারীদের দেওয়া; গুরুত্বপূর্ণ তথ্যের জন্য যাওয়ার আগে স্থানীয়ভাবে নিশ্চিত হয়ে নিন।

## Features

- মসজিদের নাম, খাবার, বিভাগ, জেলা ও এলাকা দিয়ে অনুসন্ধান ও ফিল্টার।
- লোকেশন picker-এ বিভাগ → জেলা → এলাকা নির্বাচন। বর্তমান তালিকায় বাংলাদেশের সব জেলা অন্তর্ভুক্ত নয়।
- Browser GPS অনুমতি দিলে OpenStreetMap Nominatim দিয়ে জেলা শনাক্ত করে জেলা-স্তরে ফিল্টার। GPS দিয়ে নিকটতম মসজিদ বা দূরত্ব গণনা করা হয় না।
- আনুমানিক map pins; এগুলো প্রকৃত মানচিত্র, GPS-ভিত্তিক অবস্থান বা navigation নয়।
- Google Apps Script endpoint-এর মাধ্যমে Google Sheets-এ data load/submit। POST `no-cors` mode-এ হয়, তাই browser-এ submission response-টি যাচাই করা যায় না।
- পরবর্তী শুক্রবার স্থানীয় সময় দুপুর ১২:৩০-এর countdown; শুক্রবারে banner লুকানো থাকে।
- Preference সংরক্ষণসহ dark/light theme।
- PWA manifest এবং service worker-সহ app-shell caching।
- অনুমতি দিলে নতুন এলাকার update-এর জন্য foreground browser notification; app খোলা থাকা প্রয়োজন। Server-side push subscription/backend বর্তমানে নেই।

## Tech Stack

- HTML5, CSS এবং vanilla JavaScript
- Tailwind CSS CDN
- Font Awesome 6 এবং Google Fonts (Hind Siliguri, Inter)
- Google Apps Script / Google Sheets endpoint
- PWA Web App Manifest, Service Worker, Cache API

## Project Structure

```text
vector.html          Main app: feed, map view, form, filters and app logic
about.html           About page and creator profile
terms.html           Usage terms and privacy notes
tutorial.html        App usage guide
manifest.json        PWA configuration
sw.js                App-shell caching and push-event handling
icons/vector.svg     App icon
.gitignore           Files excluded from Git
README.md            Project documentation
```

## Run Locally

The app uses a service worker, which requires a secure context: HTTPS or `localhost`. Opening `vector.html` directly as a `file://` URL will not enable PWA installation or service-worker caching.

For example, with the VS Code Live Server extension, serve the project root and open:

```text
http://127.0.0.1:5500/vector.html
```

No local package installation or build step is required. The app also uses external CDN/font services and remote Google Apps Script and Nominatim endpoints, so those online features require network access.

## Creator

**ইয়াছিন কবির (Yeasin Kabir)**  
সাতক্ষীরা, বাংলাদেশ
