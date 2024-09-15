/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        sad: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" }, // Sad bobbing effect
        },
      },
      animation: {
        sad: "sad 2s ease-in-out infinite", // Apply this animation
      },
    },
  },
  plugins: [],
};

