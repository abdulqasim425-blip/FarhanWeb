# Web Developer Website (React + Vite)

A responsive single-page site for a freelance web developer: hero, services, portfolio (with filters), process, pricing, testimonials, and a contact form.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build into dist/
npm run preview   # preview the build
```

## Make it yours

Almost everything is in **`src/data.js`**: your name, email, social links, services, projects, process steps, pricing, and testimonials. Colors live at the top of `src/styles.css` (`:root` variables).

## Contact form

The form validates input and sends messages to your inbox using the official [`@formspree/react`](https://www.npmjs.com/package/@formspree/react) package (Formspree has a free plan):

1. Create a free Formspree account and click **New Form**. Sign up with the email where you want to receive enquiries (messages are delivered to the email you register with).
2. Copy the form ID: the last part of the form URL (`https://formspree.io/f/abcdwxyz` -> `abcdwxyz`).
3. Copy `.env.example` to `.env` and paste the ID as `VITE_FORMSPREE_ID`.
4. Restart `npm run dev` (or run `npm run build` again). Send a test message, and confirm Formspree's verification email the first time.

When deploying (Netlify, Vercel, etc.), add `VITE_FORMSPREE_ID` as an environment variable in the host's settings, because `.env` is not uploaded.

Until the ID is set, the form falls back to opening the visitor's email app (`mailto:`).

## Deploy

Upload the `dist/` folder to Netlify, Vercel, Cloudflare Pages, or GitHub Pages.
