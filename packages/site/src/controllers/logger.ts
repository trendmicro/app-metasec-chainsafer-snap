import { ENABLE_CLIENT_CONSOLE } from 'constants/config'

export default class Logger {
  tag: any
  enable: boolean
  constructor(tag: any){
    this.tag = tag
    this.enable = ENABLE_CLIENT_CONSOLE
  }

  log = (...params: any[]) => {
    this.enable && console.log(this.tag, ...params)
  }

  error = (...params: String[]) => {
    if(this.enable) {
      const fixedWord = 'Oops, Σ( ° △ °|||)'
      const style = `
        color: #E71D36;
        background: #2E294E;
      `
      console.groupCollapsed('%c%s', style, `${this.tag} ${fixedWord}`)
      params.forEach((item) => {
        console.log(item)
      })
      console.groupEnd()
    }
  }
}

