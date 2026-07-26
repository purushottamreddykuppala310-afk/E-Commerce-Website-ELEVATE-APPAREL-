# ELEVATE APPAREL - Production-Ready Online Clothing E-Commerce Website

**ELEVATE APPAREL** is a feature-rich, high-performance, mobile-first e-commerce web application inspired by leading global fashion brands (AJIO, Zara, Myntra, and Nike). Built with Next.js 14, React, Tailwind CSS, Prisma ORM, and Razorpay integration.

---

## 🌟 Key Features

### 🛍️ Storefront & Customer Experience
- **Modern Responsive Design**: Mobile-first layout with smooth micro-animations, slide-over cart drawer, and sticky navigation.
- **Category-wise Product Browsing**: Men, Women, Kids, Shirts, T-Shirts, Jeans, Shoes, Accessories.
- **Product Detail Page (PDP)**:
  - Multi-image thumbnail gallery & image hover zoom.
  - Interactive color swatches & size selection.
  - Interactive **Size Guide Modal**.
  - **Live Inventory Counter** ("Only 3 left in stock!" or red "Out of Stock" disabled button).
  - Specifications, Key Highlights, Delivery PIN code estimator, and 7-day return policy.
- **Shopping Cart & Coupons**: Slide-over cart & dedicated Cart page with promo code validator (`WELCOME10` for 10% off, `ELEVATE20` for 20% off) and free delivery progress bar.
- **Razorpay Payment Gateway**: Seamless payment modal supporting UPI (GPay/PhonePe), Credit/Debit cards, NetBanking, and Cash on Delivery (COD).
- **Automated Order Tracking & Invoices**: Order confirmation timeline and instant **Printable & Downloadable Tax Invoice PDF**.
- **Wishlist & Customer Portal**: Save favorite apparel, manage addresses, and view order history.

### ⚙️ Admin Executive Portal (`/admin`)
- **Secure Admin Authentication**: Unique Admin ID (`ADMIN-9901`) and master password protection.
- **Executive Dashboard**: KPI Cards (Total Sales ₹, Total Orders, Active Customers, Low Stock Alert Count), Recharts Sales line chart, Category Pie Chart, and Recent Orders.
- **Product Management**: Add, edit, delete products, multi-image URLs, stock quantity editor, price updates, and out-of-stock toggle.
- **Order Management**: Search, status filter, status update dropdown (`PENDING` -> `PROCESSING` -> `SHIPPED` -> `DELIVERED` -> `CANCELLED`), Tax Invoice trigger, and **Excel/CSV Data Export**.
- **Customer Directory**: View registered users, Google OAuth login indicators, and lifetime spend.
- **One-Click Live Theme Manager**: Change website primary color, buttons, header background, footer background, and cards instantly across the application without modifying code!

---

## 🚀 Setup & Running Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Migration (Prisma)
To initialize or view the normalized database schema:
```bash
npx prisma generate
npx prisma db push
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Credentials

- **Customer Login**:
  - Email: `john@example.com`
  - Password: `password123`
  - Or click **"Sign In with Google"** / **"Customer Demo"** button on `/auth/login`

- **Admin Portal Access**:
  - URL: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
  - Admin ID: `ADMIN-9901`
  - Password: `admin123`
  - Or click **"Admin Portal Demo"** button on `/auth/login`

---

## 📁 Project Structure

```
DBMS/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── prisma/
│   └── schema.prisma          # Normalized MySQL/SQLite schema
├── public/
│   └── manifest.json          # PWA support manifest
└── src/
    ├── app/
    │   ├── page.tsx           # Storefront Home Page
    │   ├── products/          # Catalog & Detail Pages
    │   ├── cart/              # Cart Page
    │   ├── checkout/          # Checkout & Razorpay Trigger
    │   ├── order-success/     # Order Confirmation & Invoice
    │   ├── account/           # Customer Portal & Orders History
    │   ├── wishlist/          # Saved Wishlist
    │   ├── static/            # About, Contact, FAQ, Policies
    │   └── admin/             # Dashboard, Products, Orders, Customers, Theme Manager
    ├── components/
    │   ├── layout/            # Navbar & Footer
    │   ├── product/           # ProductCard & Gallery
    │   ├── cart/              # CartDrawer & Coupons
    │   └── ui/                # RazorpayModal, SizeGuideModal, InvoiceModal
    ├── context/               # AuthContext, CartContext, ThemeContext
    ├── lib/
    │   ├── store.ts           # Unified state & stock auto-reduction engine
    │   ├── types.ts           # TypeScript interfaces
    │   └── initialData.ts     # Pre-populated apparel dataset
```
