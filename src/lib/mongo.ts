import { connect, connection, ConnectionOptions, disconnect } from 'mongoose'

import { logger } from '~/common/logger'
import { MONGO_URL } from '~/config/env'

/**
 * Create a unique mongo connection.
 */
export const createMongoConnection = async () => {
  try {
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      socketTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      useUnifiedTopology: true,
      keepAlive: true,

      /* eslint-disable */
      native_parser: true,
      readPreference: 'primaryPreferred'
    }

    await connect(MONGO_URL, options)

    /**
     * Log.
     */
    logger.info(`Connected - Mongo`)
  } catch ({ message }) {
    logger.error(`Unable to connect - Mongo`, message)
  }
}

/**
 * Close connection if exists.
 */
export const closeMongoConnection = disconnect

/**
 * Truncate database.
 */
export const truncateAllCollections = async () => {
  /**
   * Get all collections.
   */
  const collections = await connection.db.listCollections().toArray()

  /**
   * Drop one collection.
   */
  const drop = ({ name }: { name: string }) => connection.dropCollection(name)

  /**
   * Drop all collections.
   */
  return Promise.all(collections.map(drop))
}
