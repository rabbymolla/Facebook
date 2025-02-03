/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    colors: {
      primary_bg: "var(--primary_bg)",
      main_bg: "var(--main_bg)",
      page_bg: "var(--page_bg)",
      rounded_bg: "var(--rounded_bg)",
      red_color: "var(--red_bg)",
      opcity_color: "var(--opacity_bg)",
      transparent: "transparent",
    },
    fontFamily: {
      GilroyBlack: ["Gilroy-Black"],
      GilroyBold: ["Gilroy-Bold"],
      GilroyRegular: ["Gilroy-Regular"],
      GilroyMedium: ["Gilroy-Medium"],
    },
    extend: {
      screens: {
        xs: "320px",

        sm: "576px",

        md: "768px",

        lg: "992px",

        xl: "1200px",

        "2xl": "1400px",

        "3xl": "1620px",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
