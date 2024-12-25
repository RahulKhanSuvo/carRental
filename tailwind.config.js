/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "bounce-slight": "bounce-slight 0.6s ease-in-out",
      },
      keyframes: {
        "bounce-slight": {
          "0%": { transform: "translateY(0)" },
          "30%": { transform: "translateY(-10px)" },
          "50%": { transform: "translateY(0)" },
          "70%": { transform: "translateY(-5px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
