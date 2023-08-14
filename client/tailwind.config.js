/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        white: '#fff', // Add this line to define a custom white background color
      },
    },
  },
  plugins: [],
}

