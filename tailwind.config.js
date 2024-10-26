import { Flowbite } from 'flowbite-react';

/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",flowbite.content(), "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: '#9b59b6',
        'primary-hover': '#8e44ad',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to bottom right, #9b59b6, white)',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}

