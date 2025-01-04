import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        light: {
          primary: '#382bf0',
          secondary: '#2ecc71',
          accent: '#f1c40f',
          // Add more colors as needed
        },
        // Dark mode colors
        // dark: {
        //   primary: '#121212',
        //   secondary: '#282828',
        //   accent: '#f39c12',
        //   // Add more colors as needed
        // },
      },
      textColor:{
        light:{
          primary:'#382bf0'
        }
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  }

};
export default config;
