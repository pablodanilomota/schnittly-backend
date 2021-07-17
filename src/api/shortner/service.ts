import { FilterQuery } from 'mongoose'

import { logger } from '~/common/logger'
import { objectToJSON } from '~/common/object'
import { ShortnerRequest } from './requests/shortner-request'
import { Url, UrlDocument } from '~/models/url'

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

  return `sch-ly.herokuapp.com/short/${savedUrl.hash}`
}

/**
 * Find one url by filter.
 */
export const findOne = async (filter: FilterQuery<UrlDocument>) => {
  /**
   * Log.
   */
  logger.info(`Buscando url através do filtro: ${objectToJSON(filter)}`)

  /**
   * Find url.
   */
  const foundUrl = await Url.findOne(filter).lean<UrlDocument>()

  /**
   * Log.
   */
  logger.info(`Url encontrada: ${objectToJSON(foundUrl.url)}`)

  return foundUrl.url
}
