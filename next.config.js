const withCSS = require('@zeit/next-css')
module.exports = withCSS({
    env: {
        GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
        SECRET: process.env.SECRET
      },
  })
