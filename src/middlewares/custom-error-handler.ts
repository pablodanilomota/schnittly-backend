import { Request, Response, NextFunction } from 'express'
import {
  HttpError,
  Middleware,
  ExpressErrorMiddlewareInterface
} from 'routing-controllers'

import { logger } from '~/common/logger'

@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: HttpError, req: Request, __: Response, next: NextFunction) {
    const { headers, url, body } = req

    /**
     * Format.
     */
    const formattedError = JSON.stringify({
      ...error,
      headers,
      body,
      url
    })

    logger.error(formattedError)

    next()
  }
}
