module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  devOptions: {
    // open: 'none',
  },
  plugins: [
    './plugin-svelte-hot',
    '@snowpack/plugin-dotenv',
  ],
}
