# Shubham & Samiksha Wedding Invite

A reusable, mobile-friendly React + Vite digital wedding invitation website with entry video, background music, animated petals, countdown timer, wedding details, venue section, ceremony timeline, RSVP form, and dynamic data configuration.

Live Site:

```text
https://shubham14p3.github.io/shubham-samiksha-wedding-invite-r/
```

Repository:

```text
https://github.com/shubham14p3/shubham-samiksha-wedding-invite-r
```

---

## Project Overview

This project is a modern digital wedding invitation built using React and Vite.

The invite is designed to be reusable. Most wedding details such as bride/groom names, family details, venue, dates, ceremony list, footer names, RSVP events, videos, and music are controlled from a single configuration file:

```text
src/weddingData.js
```

This means a new wedding invite can be created by editing data only, without changing the main React components.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React | UI components and dynamic rendering |
| Vite | Fast development server and production build |
| JavaScript | App logic and data configuration |
| CSS | Styling, animations, responsiveness |
| HTML5 Video | Entry video, background video, ceremony videos |
| HTML5 Audio | Background music |
| Canvas API | Floating petals animation |
| GitHub Pages | Static hosting |
| GitHub Actions | Automated deployment |

---

## Main Features

### 1. Entry Invite Screen

The invite starts with a full-screen entry video.

Features:

- Tap/click to begin
- Plays entry video
- Starts background audio
- Shows `Enter Invite` button as fallback
- Automatically opens invite after video/fallback timeout

Related assets:

```text
public/assets/entry-video.mp4
public/assets/bg-music.mp3
```

---

### 2. Shri Ganesh / Hero Section

The hero section displays:

- Ganesh image
- Mantra or auspicious invocation
- Welcome message
- Groom details
- Bride details
- Parents and grandparents
- Optional residence details

Configured in:

```text
src/weddingData.js
```

Example:

```js
hero: {
  mantra: [
    'Auspicious is Lord Vishnu',
    'Auspicious is the lotus-eyed one',
    'Auspicious is the one whose flag bears Garuda',
  ],
  groom: {
    name: 'Shubham Raj',
    parents: 'Son of Mr. Sanjay Kumar & Mrs. Chandrakala Devi',
  },
  bride: {
    name: 'Samiksha Soni',
    parents: 'Daughter of Mr. Navlesh Chandra Verma & Mrs. Kanchan Verma',
  },
}
```

---

### 3. Countdown Section

Shows countdown to the wedding date and time.

Features:

- Days
- Hours
- Minutes
- Seconds
- Completed message after wedding date

Configured in:

```js
countdown: {
  label: 'Wedding Muhurat',
  displayDate: 'Tuesday · 07 July 2026',
  targetDate: '2026-07-07T19:30:00+05:30',
  completedText: 'Just Married ❤️',
}
```

---

### 4. Memories / Sacred Message Section

This section can be used for:

- Couple video
- Wedding message
- Sacred quote
- Family note
- Invite message

Configured in:

```js
memories: {
  label: 'Sacred Message',
  headingLine1: 'Two Hearts',
  headingLine2: 'One Journey',
  quote: 'Marriage is the sacred union where two hearts become one.',
}
```

Asset:

```text
public/assets/memories.mp4
```

---

### 5. Venue Section

Displays:

- Venue name
- Venue image
- Address
- Optional Google Map embed
- Optional directions button

Configured in:

```js
venue: {
  label: 'Wedding Venue',
  headingLine1: 'Join Us At',
  headingLine2: 'Son Mandap',
  name: 'Son Mandap',
  addressLines: ['Sidhgora Campus', 'Jamshedpur'],
  mapEmbedUrl: '',
  directionsUrl: '',
}
```

If `mapEmbedUrl` or `directionsUrl` is empty, that part will not render.

---

### 6. Ceremony Details Section

Displays all wedding ceremonies dynamically.

Example ceremonies:

```js
ceremonies: [
  {
    roman: 'I',
    subtitle: 'Matkor, Haldi & Tilak',
    title: '05 July 2026 (Sunday)',
    description: '4:00 PM onwards',
    video: `${A}136.mp4`,
  },
  {
    roman: 'II',
    subtitle: 'Mehendi & Sangeet',
    title: '06 July 2026 (Monday)',
    description: '4:00 PM onwards',
    video: `${A}137.mp4`,
  },
  {
    roman: 'III',
    subtitle: 'Wedding & Reception Dinner',
    title: '07 July 2026 (Tuesday)',
    description: '7:30 PM onwards',
    video: `${A}138.mp4`,
  },
]
```

Each ceremony supports:

- Subtitle
- Title
- Description
- Optional video

---

### 7. Barat Information

Optional section for Barat details.

Configured in:

```js
barat: {
  title: 'Barat Information',
  details:
    'The Barat will depart from our residence on 07 July 2026 at 5:00 PM towards Son Mandap, Sidhgora.',
}
```

---

### 8. RSVP Section

The RSVP form collects:

- Guest name
- Phone number
- Attendance confirmation
- Party size
- Events attending
- Emotional guess
- Wedding mood
- Message or wish
- Advice for married life

Configured in:

```js
rsvp: {
  apiUrl: 'https://your-backend-url.com/api/rsvp',
  label: 'Join the Celebration',
  headingLine1: 'Celebrate',
  headingLine2: 'With Us',
  intro: 'We humbly request your gracious presence.',
  eventOptions: [
    {
      label: '05 July - Haldi & Tilak',
      date: 'Sunday',
      value: '05 July',
    },
  ],
}
```

If no emotional guess or mood options are provided, the app uses default values.

---

### 9. Footer Section

The footer supports multiple dynamic layouts.

It can display:

- Couple name
- Hosts
- Compliments
- RSVP names
- Blessings from
- Invited by
- Special thanks
- End note
- Instagram link

Example:

```js
footer: {
  coupleName: 'Shubham & Samiksha',

  hostsTitle: 'Hosts',
  hosts: [
    'Mr. Sanjay Kumar',
    'Mr. Santosh Kumar',
    'Mr. Manoj Kumar',
    'Sanjana Shree',
  ],

  blessingsFrom: ['Mr. Parasnath Prasad'],

  invitedBy: ['Jitendra Soni', 'Rajesh Soni', 'Vicky Soni'],

  specialThanks:
    'With love from Sanjana Shree, Aman, Samridh, Rishu, Manas, Aniruddh, Muskan, Pihu, Ansh, Harsh, Rounak, Khilesh',

  endNote: '07 July 2026 · Son Mandap, Sidhgora, Jamshedpur',
}
```

---

## Project Folder Structure

Recommended structure:

```text
src/
├─ App.jsx
├─ main.jsx
├─ weddingData.js
├─ styles.css
├─ hooks/
│  ├─ useCountdown.js
│  ├─ useEventAutoExpand.js
│  ├─ usePetals.js
│  └─ useReveal.js
├─ components/
│  ├─ AudioButton.jsx
│  ├─ Countdown.jsx
│  ├─ EntryGate.jsx
│  ├─ Events.jsx
│  ├─ Footer.jsx
│  ├─ Hero.jsx
│  ├─ Memories.jsx
│  ├─ RSVP.jsx
│  ├─ RSVPModal.jsx
│  ├─ StarOrnament.jsx
│  └─ Venue.jsx
└─ utils/
   └─ safeArray.js
```

Static assets:

```text
public/
└─ assets/
   ├─ entry-video.mp4
   ├─ background.mp4
   ├─ bg-music.mp3
   ├─ memories.mp4
   ├─ 136.mp4
   ├─ 137.mp4
   └─ 138.mp4
```

---

## Important Asset Path Setup

For GitHub Pages, asset paths must use Vite base URL.

In `src/weddingData.js`, use:

```js
const A = `${import.meta.env.BASE_URL}assets/`;
```

Do not use:

```js
const A = '/assets/';
```

Because GitHub Pages hosts the project under a subpath:

```text
/shubham-samiksha-wedding-invite-r/
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/shubham14p3/shubham-samiksha-wedding-invite-r.git
cd shubham-samiksha-wedding-invite-r
```

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Open the local Vite URL shown in terminal.

---

## Build

Create production build:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

---

## GitHub Pages Deployment

### 1. Vite Config

Create or update:

```text
vite.config.js
```

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/shubham-samiksha-wedding-invite-r/',
});
```

---

### 2. GitHub Actions Workflow

Create:

```text
.github/workflows/deploy.yml
```

```yml
name: Deploy Vite React App to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: github-pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm install

      - name: Build Vite app
        run: npm run build

      - name: Upload dist folder
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

### 3. Enable GitHub Pages

Go to:

```text
Repository → Settings → Pages
```

Set:

```text
Source: GitHub Actions
```

Do not use:

```text
Deploy from branch → main → root
```

If GitHub Pages serves the raw source, you may see this error:

```text
/src/main.jsx net::ERR_ABORTED 404
```

That means GitHub Pages is not serving the built `dist` folder.

---

## How to Create a New Wedding Invite

To reuse this project for another wedding:

1. Replace media files in:

```text
public/assets/
```

2. Edit:

```text
src/weddingData.js
```

3. Update:

```js
clientId
seo.title
hero.groom
hero.bride
countdown
venue
ceremonies
rsvp
footer
```

4. Update `vite.config.js` base if repo name changes:

```js
base: '/new-repo-name/',
```

5. Push to GitHub.

---

## Example `weddingData.js`

```js
const A = `${import.meta.env.BASE_URL}assets/`;

export const weddingData = {
  clientId: 'Shubham-Samiksha-wedding-2026',

  assets: {
    entryVideo: `${A}entry-video.mp4`,
    backgroundVideo: `${A}background.mp4`,
    bgMusic: `${A}bg-music.mp3`,
    memoriesVideo: `${A}memories.mp4`,
    ganeshImage: 'https://example.com/ganesh.png',
    venueImage: 'https://example.com/venue.webp',
  },

  seo: {
    title: 'Shubham Raj & Samiksha Soni — A Sacred Union',
  },

  hero: {
    mantra: [
      'Auspicious is Lord Vishnu',
      'Auspicious is the lotus-eyed one',
      'Auspicious is the one whose flag bears Garuda',
    ],
    blessing:
      'With deep faith and devotion, and by the blessings of the Almighty, we cordially invite you to grace this auspicious occasion.',
    groom: {
      name: 'Shubham Raj',
      parents: 'Son of Mr. Sanjay Kumar & Mrs. Chandrakala Devi',
      grandparents:
        '(Grandson of Mr. Parasnath Prasad & Mrs. Radhika Devi)',
      residence:
        'Subhash Chandra Path, Jyoti Nagar, Kharagajhar, Telco, Jamshedpur',
    },
    bride: {
      name: 'Samiksha Soni',
      parents: 'Daughter of Mr. Navlesh Chandra Verma & Mrs. Kanchan Verma',
      grandparents:
        '(Granddaughter of Late Mr. Jageshwar Prasad Verma & Late Mrs. Lakhpati Devi)',
      residence: 'Padam Nagar, Milai-3, Chhattisgarh',
    },
  },

  countdown: {
    label: 'Wedding Muhurat',
    quote:
      'In Vikram Samvat 2083, Ashadha month Krishna Paksha, Tuesday — the sacred union will be solemnized.',
    displayDate: 'Tuesday · 07 July 2026',
    targetDate: '2026-07-07T19:30:00+05:30',
    completedText: 'Just Married ❤️',
  },

  venue: {
    label: 'Wedding Venue',
    headingLine1: 'Join Us At',
    headingLine2: 'Son Mandap',
    name: 'Son Mandap',
    addressLines: ['Sidhgora Campus', 'Jamshedpur'],
    mapEmbedUrl: '',
    directionsUrl: '',
  },

  ceremonies: [
    {
      roman: 'I',
      subtitle: 'Matkor, Haldi & Tilak',
      title: '05 July 2026 (Sunday)',
      description: '4:00 PM onwards',
      video: `${A}136.mp4`,
    },
  ],
};
```

---

## Troubleshooting

### Error: `/src/main.jsx 404`

GitHub Pages is serving raw source instead of build output.

Fix:

```text
Settings → Pages → Source → GitHub Actions
```

Then rerun workflow.

---

### Videos or audio not loading

Check:

```text
public/assets/
```

and make sure filenames match exactly.

Also check `weddingData.js`:

```js
const A = `${import.meta.env.BASE_URL}assets/`;
```

---

### Page is blank after entering invite

Check `styles.css` has:

```css
#main-content,
.main-content {
  display: none;
}

#main-content.visible,
.main-content.visible {
  display: block;
}
```

---

### GitHub Pages link loads but assets are broken

Check `vite.config.js`:

```js
base: '/shubham-samiksha-wedding-invite-r/',
```

If the repository name changes, update this value.

---

## Notes

This project is fully static except the RSVP API call.

The RSVP API URL can be changed in:

```text
src/weddingData.js
```

```js
rsvp: {
  apiUrl: 'https://your-backend-url.com/api/rsvp',
}
```

For a production wedding invite, recommended RSVP storage options:

- Google Sheets backend
- Supabase
- Firebase
- MongoDB Atlas
- Custom Express API
- Vercel serverless API

---

## License

This project is for personal wedding invitation use.

You may customize and reuse it for other wedding invites.
