import { Server } from 'http'
import supertestRequest from 'supertest'

import { PORT } from '~/config/env'
import { server as httpServer } from '~/app'
import {
  closeMongoConnection,
  createMongoConnection,
  truncateAllCollections
} from '~/lib/mongo'

/**
 * Server.
 */
let server: Server

/**
 * Run in all test suite.
 */
export const startServer = async (): Promise<void> => {
  /**
   * Start server.
   */
  const app = await httpServer()
  server = app.listen(PORT)

  /**
   * Truncate all tables.
   */
  await truncateAllCollections()
}

/**
 * Run in all test suite.
 */
export const closeServer = async (): Promise<void> => {
  /**
   * Close mongo connection.
   */
  await closeMongoConnection()

  /**
   * Close server.
   */
  return new Promise(resolve => server.close(() => resolve()))
}

/**
 * Send request to test api.
 */
export const request = () => supertestRequest(server)

/**
 * Connect database.
 */
export const connectDatabase = async (): Promise<void> => {
  await createMongoConnection()
}

/**
 * Disconnect database.
 */
export const disconnectDatabase = async (): Promise<void> => {
  await closeMongoConnection()
}
