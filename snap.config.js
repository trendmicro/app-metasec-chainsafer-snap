const through = require('through2')
const envify = require('envify/custom')
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
        .transform(
            envify({
                ENV: process.env.ENV,
                APP_PLATFORM: process.env.APP_PLATFORM,
                API_PGW_BASE: process.env.API_PGW_BASE,
                API_PGW_BASE_LAYER: process.env.API_PGW_BASE_LAYER,
                API_PGW_VAESION: process.env.API_PGW_VAESION,
                API_PGW_PATH_POST_TRANSACTION_RISKS:
                    process.env.API_PGW_PATH_POST_TRANSACTION_RISKS,
                API_PGW_PATH_POST_TRANSACTION_RISK_SUMMARY:
                    process.env.API_PGW_PATH_POST_TRANSACTION_RISK_SUMMARY,
                API_PGW_PATH_POST_TRANSACTION_SIMULATION:
                    process.env.API_PGW_PATH_POST_TRANSACTION_SIMULATION,
                API_PGW_PATH_GET_SNAP_LATEST_VERSION: process.env.API_PGW_PATH_GET_SNAP_LATEST_VERSION 
            })
        )
  },
}
