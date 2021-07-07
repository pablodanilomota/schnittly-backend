import { Url } from '~/models/url'
import { logger } from '~/common/logger'
import { objectToJSON } from '~/common/object'
import { ShortnerRequest } from './requests/shortner-request'

const createHash = require('hash-generator')

/**
 * Save url.
 */
export const save = async (shortnerRequest: ShortnerRequest) => {
  /**
   * Log.
   */
  logger.info(`url to save: ${objectToJSON(shortnerRequest)}`)

  /**
   * Generate hash.
   */
  const hash = createHash(8)

  /**
   * Url to save.
   */
  const urlToSave = {
    ...shortnerRequest,
    hash
  }

  /**
   * Logs.
   */
  logger.info(`payload to save: ${objectToJSON(urlToSave)}`)
  logger.info('saving')

  /**
   * Create.
   */
  const savedUrl = await Url.create(urlToSave)

  /**
   * Log.
   */
  logger.info(`saved url: ${objectToJSON(savedUrl)}`)

  return savedUrl.hash
}
