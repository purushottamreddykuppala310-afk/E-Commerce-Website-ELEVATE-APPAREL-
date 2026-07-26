/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          primary: "var(--primary-color, #4f46e5)",
          hover: "var(--primary-hover, #4338ca)",
          header: "var(--header-bg, #0f172a)",
          footer: "var(--footer-bg, #0f172a)",
          card: "var(--card-bg, #ffffff)",
          accent: "var(--accent-color, #f59e0b)"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
