<p align="center">
  <img src="public/web-app-manifest-512x512.png" alt="MindLoop logo" width="140" style="border-radius: 50%" />
</p>

# MindLoop

> Capture sparks of insight before they fade.

MindLoop is a **mobile-first PWA** built for one job: **let you jot a thought in under five seconds, even when you’re in a tunnel with no signal**. Nothing more, nothing less—yet.

---

## Why does it exist?

- **Ideas evaporate fast**. A friction-free form you can summon with one tap is the antidote.  
- **You’re already drowning in tools**. MindLoop stays tiny and focused instead of becoming another bloated notes app.  
- **Offline matters**. The core flow works without internet; sync happens when you’re back online.  

---

## How do I use it?

1. **Add to Home Screen** (you’ll get the “Install” prompt on first visit).  
2. Create an account
3. Type your thought, hit **Save**.  
4. That’s it. Entries sync to your account once you’re online again.  

*(More features—AI summary, review dashboards, PKM integrations—are on the roadmap and will live on the landing page soon.)*

---

## Tech Stack

- **Next.js**
- **Radix UI** and **Tailwind CSS** for the minimalist B/W theme
- **Supabase** (PostgreSQL, Auth)
- **Docker** & `docker-compose` for local/full-stack runs

---

## Local Dev

```bash
git clone https://github.com/leqtrungit/mindloop.git
cd mindloop
cp .env.example .env.local          # add your Supabase keys
npm install
npm run dev                         # http://localhost:3000
```

<p align="center"><em>Built with <a href="https://cursor.com">Cursor</a> · Reviewed &amp; curated by <a href="https://lequoctrung.id.vn">Trung</a></em></p> 