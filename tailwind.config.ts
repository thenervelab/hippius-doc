import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "desktop-nav": "996px",
      },
      boxShadow: {
        "root-nav": "0px 12px 36px 0px rgba(0, 0, 0, 0.14)",
        tooltip: "0px 12px 36px 0px rgba(0, 0, 0, 0.14)",
      },
      backgroundImage: {
        "white-cloud-gradient":
          "radial-gradient(21.34% 21.34% at 50% 50%, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)",
      },
      fontFamily: {
        sans: "var(--font-geist-sans)",
        digital: "DigitalFonts",
      },
      colors: {
        success: {
          100: "rgb(var(--success-100) / <alpha-value>)",
          90: "rgb(var(--success-90) / <alpha-value>)",
          80: "rgb(var(--success-80) / <alpha-value>)",
          70: "rgb(var(--success-70) / <alpha-value>)",
          60: "rgb(var(--success-60) / <alpha-value>)",
          50: "rgb(var(--success-50) / <alpha-value>)",
          40: "rgb(var(--success-40) / <alpha-value>)",
          30: "rgb(var(--success-30) / <alpha-value>)",
          20: "rgb(var(--success-20) / <alpha-value>)",
          10: "rgb(var(--success-10) / <alpha-value>)",
        },
        primary: {
          100: "rgb(var(--primary-100) / <alpha-value>)",
          90: "rgb(var(--primary-90) / <alpha-value>)",
          80: "rgb(var(--primary-80) / <alpha-value>)",
          70: "rgb(var(--primary-70) / <alpha-value>)",
          60: "rgb(var(--primary-60) / <alpha-value>)",
          50: "rgb(var(--primary-50) / <alpha-value>)",
          40: "rgb(var(--primary-40) / <alpha-value>)",
          30: "rgb(var(--primary-30) / <alpha-value>)",
          20: "rgb(var(--primary-20) / <alpha-value>)",
          10: "rgb(var(--primary-10) / <alpha-value>)",
        },
        grey: {
          100: "rgb(var(--grey-100) / <alpha-value>)",
          90: "rgb(var(--grey-90) / <alpha-value>)",
          80: "rgb(var(--grey-80) / <alpha-value>)",
          70: "rgb(var(--grey-70) / <alpha-value>)",
          60: "rgb(var(--grey-60) / <alpha-value>)",
          50: "rgb(var(--grey-50) / <alpha-value>)",
          40: "rgb(var(--grey-40) / <alpha-value>)",
          30: "rgb(var(--grey-30) / <alpha-value>)",
          20: "rgb(var(--grey-20) / <alpha-value>)",
          10: "rgb(var(--grey-10) / <alpha-value>)",
        },
      },
      zIndex: {
        1: "1",
      },
      keyframes: {
        ["fade-in"]: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        ["fade-out"]: {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
          },
        },
        ["fade-in-from-b"]: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0px)",
          },
        },
        ["fade-out-to-b"]: {
          "0%": {
            opacity: "1",
            transform: "translateY(0px)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
        },
        ["scale-down-75%"]: {
          "0%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "100%": {
            opacity: "0",
            transform: "scale(0.75)",
          },
        },
        ["scale-in-75%"]: {
          "0%": {
            opacity: "0",
            transform: "scale(0.75)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
      backgroundSize: {
        full: "100% 100%",
      },
      animation: {
        ["fade-out-0.3"]: "fade-out 0.3s ease-in-out forwards",
        ["fade-in-0.3"]: "fade-in 0.3s ease-in-out forwards",
        ["fade-in-0.5"]: "fade-in 0.5s ease-in-out forwards",
        ["fade-in-from-b-0.5"]: "fade-in-from-b 0.5s ease-in-out forwards",
        ["fade-in-from-b-0.3"]: "fade-in-from-b 0.3s ease-in-out forwards",
        ["fade-out-to-b-0.3"]: "fade-out-to-b 0.3s ease-in-out forwards",
        ["scale-down-75%-0.3"]: "scale-down-75% 0.3s ease-in-out forwards",
        ["scale-in-75%-0.3"]: "scale-in-75% 0.3s ease-in-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
