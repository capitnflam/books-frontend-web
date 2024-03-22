const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-react-aria-components'),
    nextui(),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
