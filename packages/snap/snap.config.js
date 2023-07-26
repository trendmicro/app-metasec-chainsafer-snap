const through = require('through2');
const envify = require('envify/custom');
https: require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
console.log(`!!!!! node_env ${process.env.NODE_ENV} var ${process.env.API_KEY}!!!!!!`)    

module.exports = {
  cliOptions: {
    src: './src/index.ts',
    port: 8080,
  },
  bundlerCustomizer: (bundler) => {
    bundler
      .transform(function () {
        let data = ''
        return through(
          function (buffer, _encoding, callback) {
            data += buffer
            callback()
          },
          function (callback) {
            this.push("globalThis.Buffer = require('buffer/').Buffer;")
            this.push(data)
            callback()
          },
        )
      })
      .transform(envify({ API_KEY: process.env.API_KEY, NODE_ENV: process.env.NODE_ENV, ENV: process.env.ENV }))
  },
};
