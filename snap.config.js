const through = require('through2');
const envify = require('envify/custom');
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

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
          }
        )
      })
      .transform(envify({ API_KEY: process.env.API_KEY, ENV: process.env.ENV }))
  },
};
