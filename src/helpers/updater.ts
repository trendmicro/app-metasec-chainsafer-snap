import type { TNestedKeyUpdater, TUpdater } from '../helpers/types/updater.type'

import Logger from '../controllers/logger'

const logger = new Logger('[helper.updater]')
const nestedKeyUpdater: TNestedKeyUpdater = (context, nestedKey, value) => {
  let currentNest = context
  const keys = nestedKey.split('.')

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      currentNest[key] = value
    } else {
      // prevention for some default layer is null
      if (currentNest[key] === null || currentNest[key] === undefined) {
        currentNest[key] = {}
      }
      currentNest = currentNest[key]
    }
  })
}

export const updater: TUpdater = (context, keys, values) => {
  const deRefContext = JSON.parse(JSON.stringify(context))
  if (keys.length === values.length) {
    keys.forEach((nestedKey, index) => {
      nestedKeyUpdater(deRefContext, nestedKey, values[index])
    })
  } else {
    logger.error('unequal length with keys and values')
  }
  return deRefContext
}
