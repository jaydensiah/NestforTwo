/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'didot': ['Didot', 'serif'],
        'playfair-bold': ['PlayfairDisplay-Bold', 'serif'],
        'source-sans': ['SourceSansPro-Regular', 'sans-serif'],
        'nunito-regular': ['NunitoSans-Regular', 'sans-serif'],
        'nunito-light': ['NunitoSans-Light', 'sans-serif']
      },
      colors: {
        'rose-gold': {
          50: '#FAF9F7',   // off-white background
          100: '#F8E1E7',  // light blush
          200: '#F0C4CE',  // lighter rose gold
          300: '#E8A7B6',  // light rose gold
          400: '#DF8A9D',  // medium rose gold
          500: '#D66D85',  // medium rose gold
          600: '#B76E79',  // PRIMARY BRAND COLOR (main buttons, accents)
          700: '#9A5B68',  // darker rose gold (hover states)
          800: '#7D4857',  // dark rose gold
          900: '#603546'   // darkest rose gold
        },
        wellness: {
          cream: '#FAF9F7',    // main background color
          blush: '#F8E1E7',    // light backgrounds, hover states
          rose: '#B76E79',     // PRIMARY - buttons, links, accents
          text: '#81775a',     // soft body text color
          gold: '#81775a',     // gold accent (same as text)
          dark: '#636260'      // dark contrast - headings, navigation
        },
        gray: {
          150: '#F3F4F6',      // custom darker light grey
          200: '#E5E7EB'       // darker grey for selected states
        },
        custom: {
          announcementBar: '#f4ede7',
          footerBg: '#f4ede7',
          navUnderline: '#3d3c3a',
          border: '#d1d5db',
          dropdownHover: '#f9fafb'
        }
      },
      maxWidth: {
        '8xl': '88rem',
      }
    },
  },
  plugins: [],
}
