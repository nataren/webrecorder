require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT,
  devApi: 'http://localhost:8089',
  prodApi: 'http://localhost:8080', //'https://webrecorder.io',
  appHost: 'http://localhost:3000',
  contentHost: 'http://localhost:8089',
  apiPath: '/api/v1',
  internalApiHost: process.env.INTERNAL_HOST,
  internalApiPort: process.env.INTERNAL_PORT,
  product: 'Webrecorder',
  defaultRecordingTitle: 'Recording Session',
  userRegex: new RegExp(/[A-Za-z0-9][\w-]{2,15}/),
  passwordRegex: new RegExp(/(?=.*[\d\W])(?=.*[a-z])(?=.*[A-Z]).{8,}/),
  app: {
    title: 'Webrecorder',
    description: '',
    head: {
      titleTemplate: 'Webrecorder | %s',
      meta: [
        { name: 'description', content: '' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'Webrecorder' },
        // { property: 'og:image', content: '' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'Webrecorder' },
        { property: 'og:description', content: '' }
        // { property: 'og:card', content: 'summary' },
        // { property: 'og:site', content: '' },
        // { property: 'og:creator', content: '' },
        // { property: 'og:image:width', content: '200' },
        // { property: 'og:image:height', content: '200' }
      ]
    }
  },

}, environment);
