import { API } from 'constants/config'
import type {
  TMethodFactory,
  TCreateUrlBase,
  TPayload
} from 'controllers/types/http.type'
import Logger from 'controllers/logger'

const logger = new Logger('[controllers.http]')

export const methodFactory: TMethodFactory = (method) => {
  return (url, request, onResponseErrorCode) => {
    return async (isJSONResponse = true) => {
      const urlObj = new URL(url.path, url.endpoint)
      request.method = method;

      // or it will throw exception
      if (method === 'GET' || method === 'HEAD') {
        delete request.body
      }

      let response = null
      let responseBody = null
      let error = null

      try {
        response = await fetch(urlObj.href, request)
        logger.log(url.path, 'response', response)
        if (isJSONResponse) {
          responseBody = await response.json()
          logger.log(url.path, 'responseBody', responseBody)
        }

        if (response.status !== 200) {
          error = onResponseErrorCode?.(response, responseBody)
        }

        return [
          error,
          !error ? (isJSONResponse ? responseBody : response) : null,
        ];
      } catch (innerError) {
        logger.error(url.path, innerError)
        const responseError = {
          apiName: url.path,
          innerError: innerError as Error,
        };
        return [responseError, null]
      }
    };
  };
};

export const createUrlBase: TCreateUrlBase = (endpoint) => {
  const targetService = API[endpoint as keyof typeof API]

  if (!targetService) {
    logger.error('no any matched api end point')
    throw new Error('no any matched api end point')
  }

  return (pathKey, replacer = undefined, version = targetService.version) => {
    const path = targetService.path[pathKey as keyof typeof targetService.path]
    let combinedPath = ''

    if (!path) {
      logger.error('no any matched api path key')
      throw new Error('no any matched api path key')
    }

    if (targetService.basicLayer !== '') {
      combinedPath += `${targetService.basicLayer}`
    }

    if (version !== '') {
      combinedPath += `/${version}`
    }
    combinedPath += `/${path}`

    if (replacer) {
      combinedPath = replacer(combinedPath)
    }

    return {
      path: combinedPath,
      endpoint: targetService.base,
    };
  };
};

export const payload: TPayload = (body, headers, additions = {}) => {
  return {
    method: '',
    headers,
    body: JSON.stringify(body),
    ...additions,
  };
};

export const get = methodFactory('GET')
export const post = methodFactory('POST')
export const put = methodFactory('PUT')
export const patch = methodFactory('PATCH')
