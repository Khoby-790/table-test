module.exports = {
  purge: [],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['odd', 'disabled', 'even', 'hover', 'focus', 'active', 'group-hover', 'group-focus'],
    },
  },
  plugins: [],
}
