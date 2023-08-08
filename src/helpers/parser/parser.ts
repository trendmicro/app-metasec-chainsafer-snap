import type { TParserMapping } from '../../helpers/parser/types/parser.type'
import Logger from '../../controllers/logger'

const logger = new Logger('[helpers.parser.parser]')

export const parserMapping: TParserMapping = (
  responseBody,
  key,
  defaultValue,
  customParserFunc = undefined,
) => {
  const nestedKeys = key.split('.')
  let parseTarget = responseBody

  nestedKeys.forEach((nestedKey) => {
    parseTarget = parseTarget?.[nestedKey]
  })

  if ((parseTarget === null || parseTarget === undefined) && defaultValue !== undefined) {
    logger.error(key, 'not found')
    return defaultValue
  }

  return customParserFunc?.(parseTarget) || parseTarget
}
