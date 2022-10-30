/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      minHeight: {
        "1/2": "50%",
      },
      spacing: {
        menu: "calc(100% + 0.5rem)",
        menu2: "calc(0% - 2.5rem)",
        "menu-transition": "calc(125%)",
      },
      colors: {
        'green-store': '#ACD9B2',
      },
      gridTemplateRows: {
        'details': 'repeat(1, minmax(100px, 600px))',
        'cms': 'auto 1fr'
      },
      gridTemplateColumns: {
        cms: '220px 1fr'
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
