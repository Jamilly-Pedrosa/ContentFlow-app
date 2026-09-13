/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],

  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
        // Base Colors
        black: "#1A1A1A",
        white: "#FFFFFF",
        background: "#F8F9FA",
        
        // Brand Colors
        primary: {
          50: "#F0EEFD",
          100: "#CFCAFA",
          200: "#B8B0F7",
          300: "#9886F4",
          400: "#8476F1",
          500: "#6554EE",
          600: "#5C4CD9",
          700: "#483CA9",
          800: "#382E83",
          900: "#2A2364",
        },

        secondary: {
          50: "#E6F2FD",
          100: "#B3D7F9",
          200: "#8EC4F6",
          300: "#5AA9F2",
          400: "#3A99EF",
          500: "#097FEB",
          600: "#0874D6",
          700: "#065AA7",
          800: "#054681",
          900: "#043563",
        },

        tertiary: {
          50: "#E6F9FA",
          100: "#B0EDF0",
          200: "#8AE5E9",
          300: "#55D9DF",
          400: "#34D1D9",
          500: "#01C6CF",
          600: "#01B4BC",
          700: "#018D93",
          800: "#016D72",
          900: "#005357",
        },

        // Neutral Colors
        gray: {
          50: "#FAFAFA",
          100: "#F0F0F0",
          200: "#E9E9E9",
          300: "#DFDFDF",
          400: "#D9D9D9",
          500: "#CFCFCF",
          600: "#BCBCBC",
          700: "#939393",
          800: "#727272",
          900: "#575757",
        },

        // Status Colors
        green: {
          50: "#F1FAF2",
          100: "#D5EFD8",
          200: "#C0E7C5",
          300: "#A3DBAB",
          400: "#91D59A",
          500: "#76CA81",
          600: "#6BB875",
          700: "#548F5C",
          800: "#416F47",
          900: "#325536",
        },

        blue: {
          50: "#EEF5FE",
          100: "#CBE0FD",
          200: "#B2D1FC",
          300: "#8EBDFB",
          400: "#79B0FA",
          500: "#579CF9",
          600: "#4F8EE3",
          700: "#3E6FB1",
          800: "#305689",
          900: "#254269",
        },

        orange: {
          50: "#FFFAEC",
          100: "#FFF0C5",
          200: "#FFE8A9",
          300: "#FEDD81",
          400: "#FED669",
          500: "#FECC43",
          600: "#E7BA3D",
          700: "#B49130",
          800: "#8C7025",
          900: "#6B561C",
        },

        red: {
          50: "#FFECEC",
          100: "#FFCC5C",
          200: "#FFA9A9",
          300: "#FE8181",
          400: "#FE6969",
          500: "#FE4343",
          600: "#E73D3D",
          700: "#B43030",
          800: "#8C2525",
          900: "#6B1C1C",
        },
      },

      fontFamily: {
        "poppins-regular": ["Poppins_400Regular"],
        "poppins-medium": ["Poppins_500Medium"],
        "poppins-semibold": ["Poppins_600SemiBold"],
        "poppins-bold": ["Poppins_700Bold"],
      },

      fontSize: {
        //heading
        "heading-1": ["32px", { lineHeight: "38px" }],
        "heading-2": ["28px", { lineHeight: "34px" }],
        "heading-3": ["24px", { lineHeight: "29px" }],
        
        //text
        "large-text": ["18px", { lineHeight: "22px" }],
        "body-text": ["16px", { lineHeight: "19px" }],
        "small-text": ["14px", { lineHeight: "17px" }],
        "legal-text": ["12px", { lineHeight: "14px" }],
      },
    },
  },

  plugins: [],
};