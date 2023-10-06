/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{index,vue,js,ts,jsx,tsx}'],
  // theme: {
  //   extend: {},
  // },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#151616',
          secondary: '#787873',
          accent: '#09d65d',
          neutral: '#2a323c',
          'base-100': 'rgba(0,0,0,.6)',
          info: '#3abff8',
          success: '#07f468',
          warning: '#fbbd23',
          error: '#f87272',
        },
      },
    ],
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('daisyui'),
  ],
}
