/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      body : {
        overflowY : 'hidden',
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}

