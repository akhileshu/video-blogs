# **video-blogs** 🧑‍💻📚 | Video + Structured Learning

A platform that **combines videos with structured content** for seamless learning. Perfect for software engineers and content creators who want **structured learning paths** with integrated notes and discussions.

---

## 🚀 **Current Features (MVP Progress)**

✅ **Authentication** (NextAuth.js)  
✅ **Post Creation & Editing** (Markdown Editor)  
✅ **Bookmark Posts** for easy access  
✅ **CRUD Operations for Posts**  
❌ **Video Integration (Coming Soon)**

---

## 🎯 **Core Idea**

Software engineers often struggle with fragmented learning—videos lack structured notes, and blogs don’t always match video content. This platform **bridges the gap** by allowing:

- **Creators** to upload videos & structured notes side by side
- **Learners** to watch, read, and engage in a single place

---

## 📌 **Key Features (Planned Scope)**

### **For Creators**

✔ Upload videos (YouTube link or self-hosted)  
✔ Add structured notes/blogs linked to videos  
✔ Markdown or WYSIWYG editor for notes  
✔ AI-powered note generation (future feature)

### **For Learners**

✔ Watch video + read structured content side by side  
✔ Bookmark sections for quick access  
✔ Search topics easily (e.g., "React Hooks")  
✔ Light/Dark mode for a better reading experience

### **Community Features**

✔ Comments/Q&A under each post  
✔ Like/save content for later reference  
✔ Track learning progress (future feature)

---

## 🛠 **Tech Stack**

| Area                 | Tech Used                   |
| -------------------- | --------------------------- |
| **Frontend**         | Next.js, Tailwind CSS       |
| **Backend**          | Node.js, Prisma             |
| **Database**         | PostgreSQL                  |
| **Auth**             | NextAuth.js                 |
| **Storage (Videos)** | YouTube API / Cloud Storage |
| **Editor**           | MDX / @uiw/react-md-editor  |

---

## 📌 **How It Works (User Flow)**

1️⃣ **Creators publish structured posts** (Markdown editor + future video support)  
2️⃣ **Users browse posts** → Read & bookmark their favorites  
3️⃣ **Users interact** (comment, like, save for later)  
4️⃣ **Future Features**: Video integration, AI-generated summaries

---

## 🚧 **Development Progress**

- ✅ **Auth system with NextAuth.js**
- ✅ **Post CRUD with Markdown support**
- ✅ **Bookmarking system for saved posts**
- ⏳ **Next Up**: Video integration & improved UI

---

## 📢 **Contributing**

Want to help? Open a PR or suggest a feature! 🚀

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
