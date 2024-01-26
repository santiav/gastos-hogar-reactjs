/** @type {import('tailwindcss').Config} */
export default {
   content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         animation: {
            fadeOut: 'fadeOut  0.5s ease-in-out 3s 1 forwards',
         },
         keyframes: {
            fadeOut: {
               '0%': {},
               '50%': { opacity: 1 },
               '100%': { opacity: 0, display: 'none' },
            }
         }
      },
      container: {
         center: true,
      },
   },
   plugins: [],
}