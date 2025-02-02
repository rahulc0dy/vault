---
title: Building a Markdown Blog in Next.js
date: '2025-02-02T15:10:12.985Z'
slug: building-a-markdown-blog-in-nextjs
---
# 🚀 Building a Markdown Blog in Next.js  

Creating a blog using **Markdown** in **Next.js 15** is a great way to manage content without a database. In this post, we’ll explore how we built a **Markdown-powered blog** with features like:  

- ✅ **Markdown Parsing** using `react-markdown`  
- ✅ **Front Matter Support** for metadata  
- ✅ **Syntax Highlighting** for code blocks  
- ✅ **Dark Mode Styling**  
- ✅ **Admin-Only Blog Creation**  

---

## 📌 1. Storing Blogs as Markdown  

Each blog post is stored as a `.md` file inside the `/blogs` directory. Each file contains **front matter metadata** (title, date, slug) at the top, followed by the Markdown content.  

**Example Markdown file:**

```md
---
title: "My First Blog Post"
date: "2025-02-02"
slug: "my-first-blog-post"
---

# Welcome to My Blog

This is a blog post written in Markdown. 🎉
