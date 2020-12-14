module.exports = {
  future: {

  },
  purge: [],
  theme: {
    extend: {
      backgroundColor:{
        'black-t-50': 'rgba(0,0,0,0.5)',
        'gray-t-90': 'rgba(230, 230, 230, 0.9)',
        'gray-t-50': 'rgba(230, 230, 230, 0.5)',
        'gray-t-40': 'rgba(230, 230, 230, 0.4)',
        'gray-t-30': 'rgba(230, 230, 230, 0.3)',
        'red-t-50': 'rgba(249, 0, 0, 0.5)',
        'red-t-75': 'rgba(249, 0, 0, 0.75)',
      },
      inset: {
        '0': 0,
       auto: 'auto',
       '1/2': '50%',
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms'),
  ],
}
