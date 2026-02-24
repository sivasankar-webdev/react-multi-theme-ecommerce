# 🛒 Multi-Theme E-Commerce Platform

<div align="center">

  <!-- Tech stack badges -->
  ![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=20232A)
  ![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white&labelColor=1a1a2e)
  ![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white&labelColor=0f172a)
  ![React Router](https://img.shields.io/badge/React_Router-7.x-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)

  <br/>

  <!-- Status badges -->
  ![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)
  ![Themes](https://img.shields.io/badge/Themes-3-blueviolet?style=flat-square)
  ![Responsive](https://img.shields.io/badge/Responsive-Mobile--First-orange?style=flat-square)

</div>

---

<div align="center">
   <p>Theme 1</p>
  <img
    width="1900"
    alt="EkoMart Homepage Preview"
    src="https://github.com/user-attachments/assets/65feeff3-fac5-4d8a-a2d2-45b56adece2d"
  />
</div>

<br/>

  <div align="center">
     <p>Theme 2</p>
      <img
        width="1900"
        alt="Market Pro Homepage Preview"
        src="https://github.com/user-attachments/assets/a79ed5b7-265e-49a2-bfd4-c2c03e73cea9"
      />
    </div>

<br/>

  <div align="center">
   <p>Theme 3</p>
    <img
      width="1900"
      alt="Electro Homepage Preview"
      src="https://github.com/user-attachments/assets/fc49d8cf-fa7f-4f4f-b6c3-1b5083ec4b5d"
    />
  </div>

---

## 📖 About

**Multi-Theme E-Commerce** is a fully responsive, multi-theme e-commerce web application built with **React + Vite**. It features **three independent storefront themes** — each with its own design language, color palette, and component set — all running from a single codebase. Theme switching is handled entirely through the **URL route prefix**, requiring zero code changes.

---

## 🌐 Live Theme URLs

Each theme is accessible via its own route prefix. All pages within a theme automatically inherit the correct prefix.

| Theme | URL | Color | Description |
|-------|-----|-------|-------------|
| **Theme 1** | `http://localhost:5173/` | 🟢 Green `#629d23` | Classic grocery storefront |
| **Theme 2** | `http://localhost:5173/theme2/` | 🔵 Teal `#1a6b7a` | Modern organic marketplace |
| **Theme 3** | `http://localhost:5173/theme3/` | 🟣 Yellow `#fed700` | Premium e-commerce layout |

### Theme Page Routes

Once you're on a theme, all inner pages follow the same prefix pattern:

```
# Theme 1 (default)
http://localhost:5173/                   → Home
http://localhost:5173/shop               → Shop
http://localhost:5173/cart               → Cart
http://localhost:5173/wishlist           → Wishlist
http://localhost:5173/blog               → Blog
http://localhost:5173/vendor             → Vendor List
http://localhost:5173/contact            → Contact

# Theme 2
http://localhost:5173/theme2/            → Home
http://localhost:5173/theme2/shop        → Shop
http://localhost:5173/theme2/cart        → Cart
http://localhost:5173/theme2/blog        → Blog
http://localhost:5173/theme2/vendor      → Vendor List

# Theme 3
http://localhost:5173/theme3/            → Home
http://localhost:5173/theme3/shop        → Shop
... (same pattern)
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** `v18.0.0` or higher → [Download](https://nodejs.org/)
- **npm** `v9+` or **yarn** `v1.22+`
- **Git** → [Download](https://git-scm.com/)

Check your versions:

```bash
node --version    # v18.x.x or higher
npm --version     # 9.x.x or higher
git --version     # git version 2.x.x
```

---

### 📥 Clone the Repository

```bash
# Clone via HTTPS
git clone https://github.com/YOUR_USERNAME/ekomart.git

# Or clone via SSH
git clone git@github.com:YOUR_USERNAME/ekomart.git

# Navigate into the project folder
cd project_name
```

---

### 📦 Install Dependencies

```bash
# Using npm (recommended)
npm install

# Or using yarn
yarn install
```

---

### ▶️ Run the Development Server

```bash
# Using npm
npm run dev

# Or using yarn
yarn dev
```

The app will start at:

```
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

Open your browser and visit `http://localhost:5173/` to see **Theme 1**. Navigate to `http://localhost:5173/theme2/` for **Theme 2**, and `http://localhost:5173/theme3/` for **Theme 3**.

---

### 🏗️ Build for Production

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 📁 Project Structure

```
ekomart/
│
├── public/                         # Static assets (favicon, images)
│
├── src/
│   ├── hooks/
│   │   └── useThemeLink.js         # ← Hook that generates theme-prefixed URLs
│   │                               #   (e.g. /theme2/shop, /theme3/cart)
│   │
│   ├── routes/
│   │   ├── AppRouter.jsx           # Root router — splits theme routes
│   │   └── ThemeRoutes.jsx         # Shared route structure for all themes
│   │
│   ├── themes/
│   │   ├── theme1/                 # Theme 1 — Green (#629d23), Barlow font
│   │   │   ├── pages/
│   │   │   └── components/  
│   │   │   └── Layout/   
│   │   │   └── styles/   
│   │   │     
│   │   │── theme2/                 # Theme 2 — Teal (#1a6b7a), Inter font     
│   │   │   ├── pages/  
│   │   │   └── components/    
│   │   │   └── Layout/   
│   │   │   └── styles/   
│   │   │   
│   │   └── theme3/                 # Theme 3 — Teal (#1a6b7a), Open Sans font   
│   │       ├── pages/     
│   │       └── components/      
│   │       └── Layout/     
│   │       └── styles/    
│   │          
│   ├── shared/                     # Shared utilities / components across themes       
│   |       └── components/   
│   |  
│   ├── App.jsx                   
│   └── main.jsx      
│         
├── index.html         
├── vite.config.js         
├── package.json         
└── README.md         
         
```

## 🎨 Themes Overview

### Theme 1 — Classic Green
> Route prefix: `/` (default)

- **Primary color:** `#629d23` (Olive Green)
- **Font:** Barlow (Google Fonts)
- **Style:** Traditional grocery / supermarket aesthetic
- Full page set including wishlist, contact, blog

### Theme 2 — Modern Teal
> Route prefix: `/theme2/`

- **Primary color:** `#1a6b7a` (Deep Teal), **Accent:** `#3b5bdb` (Blue)
- **Font:** Inter (Google Fonts)
- **Style:** Modern organic marketplace with curved vendor cards and rich animations
- Includes advanced shop with color/brand/price/rating filters, list & grid view toggle

### Theme 3 — Premium
> Route prefix: `/theme3/`

- **Primary color:** `#fed700` (Deep Teal), **Accent:** `#ffff` (Blue)
- **Font:** Inter (Google Fonts)
- Premium layout design

---

## 🛠️ Tech Stack & Libraries

### Core

| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://react.dev/) | 19.x | UI component library |
| [Vite](https://vitejs.dev/) | 7.x | Build tool & dev server |
| [React Router DOM](https://reactrouter.com/) | 7.x | Client-side routing (no reload) |

---

## 📜 Available Scripts

```bash
npm run dev       # Start development server (hot reload)
npm run build     # Production build → /dist folder
npm run preview   # Preview production build locally
npm run lint      # Run ESLint across the project
```

---

<div align="center">
  <p>Built with ❤️ using React + Vite + Tailwind CSS</p>
  <p>
    <a href="http://localhost:5173/">Theme 1</a> •
    <a href="http://localhost:5173/theme2/">Theme 2</a> •
    <a href="http://localhost:5173/theme3/">Theme 3</a>
  </p>
</div>
