<div align="center">

# 🛒 বাজার দর | BazarDor

**প্রয়োজনীয় পণ্যের দাম এক নজরে**

A Bangla grocery price tracker that shows daily market prices, price changes, and market-wise comparisons in one place.

🔗 **Live Demo:** [bazar-dor on Vercel](https://ehadbhuiyan-bazar-borwweb-app-dsf7.vercel.app/)

</div>

---

## 📖 About the Project

**BazarDor (বাজার দর)** is a responsive web application where users can quickly check the daily prices of essential items such as rice, vegetables, fish, meat, eggs and oil. Prices are shown in Bengali digits along with a ▲/▼ change indicator, so users can instantly see which products became more expensive or cheaper today. Logged-in users can open a detailed page for each product to compare minimum, maximum and average prices across different markets.

---

## ✨ 5 Key Features

1. **📈 Live Price Ticker & Daily Price Movers**
   An infinite scrolling marquee below the navbar shows emoji, product name, price and ▲/▼ percentage. The home page highlights the **top 6 price risers** and **top 6 fallers**, followed by a responsive grid of all products.

2. **🔐 Secure Authentication with Better Auth**
   Email/password sign up and sign in, plus **Google** and **GitHub** social login. Success and error messages appear as toast notifications, and the navbar switches to profile / sign-out when logged in.

3. **🛡️ Protected Product Details Page**
   The `/product/[slug]` page requires login. It shows the product summary, category tags, unit, and **minimum / maximum / average price** along with market-wise prices. Unauthenticated users are redirected to sign in with a toast message.

4. **🗂️ Category Pages with Smart Sorting**
   Each category has its own page with a **sort dropdown** (Default, Price: Low to High, Price: High to Low). Sorting works on the **numeric value** of Bengali numerals, not as plain strings. Invalid categories show a friendly empty state.

5. **📱 Fully Responsive with Great UX**
   Works smoothly on mobile, tablet and desktop. Skeleton loaders appear while data loads, a custom **404 page** handles unknown routes (with a "হোম পেজে ফিরে যান" button), and dynamic routes work correctly after refresh on Vercel.

---

## 🧰 Technologies Used

| Category | Technology |
| --- | --- |
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| UI Library | [React](https://react.dev/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| UI Components | [daisyUI](https://daisyui.com/), [HeroUI](https://www.heroui.com/) |
| Authentication | [Better Auth](https://www.better-auth.com/) (Email/Password, Google, GitHub) |
| Database | [MongoDB](https://www.mongodb.com/) |
| Notifications | [react-hot-toast](https://react-hot-toast.com/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Jehadbhuiyan/bazar-borwweb-ap
cd your-repo-name

# 2. Install dependencies
npm install

# 3. Add environment variables (see below)

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 🔑 Environment Variables

Create a `.env.local` file in the root folder:

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_random_secret
MONGO_DB_URL=your_mongodb_connection_string

BETTER_AUTH_GOOGLE_CLIENT_ID=your_google_client_id
BETTER_AUTH_GOOGLE_CLIENT_SECRET=your_google_client_secret

BETTER_AUTH_GITHUB_CLIENT_ID=your_github_client_id
BETTER_AUTH_GITHUB_CLIENT_SECRET=your_github_client_secret
```

---

## 📁 Pages

| Route | Description | Access |
| --- | --- | --- |
| `/` | Home with hero, ticker, risers, fallers and all products | Public |
| `/category/[slug]` | Category products with sorting | Public |
| `/product/[slug]` | Product details with market-wise prices | 🔒 Login required |
| `/signin` | Sign in page | Public |
| `/signup` | Sign up page | Public |

---

## 👤 Author

**Jehad Bhuiyan**
GitHub: [@jehadbhuiyan](https://github.com/jehadbhuiyan)

---

<div align="center">

*সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।*

</div>