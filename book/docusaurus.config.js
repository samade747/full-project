/** Minimal Docusaurus config with proxy array fixed for devServer */
module.exports = {
  title: 'Calcu Book',
  url: 'http://localhost',
  baseUrl: '/',
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  presets: ['classic'],
  webpack: {
    configure: (webpackConfig, {env, paths}) => {
      return webpackConfig;
    }
  },
  devServer: {
    // proxy must be an array
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:8000',
        secure: false,
        changeOrigin: true,
      }
    ]
  }
};
