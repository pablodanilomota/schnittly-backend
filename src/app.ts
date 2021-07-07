import 'reflect-metadata'
import express, { Express } from 'express'
import {
  useExpressServer,
  RoutingControllersOptions
} from 'routing-controllers'

import controllers from './api/controllers'
import { CustomErrorHandler } from '~/middlewares/custom-error-handler'
import { createMongoConnection } from '~/lib/mongo'

/**
 * Server configuration.
 */
const expressConfig: RoutingControllersOptions = {
  cors: '*',
  controllers,
  middlewares: [CustomErrorHandler]
}

/**
 * Create server.
 */
export const server = async (): Promise<Express> => {
  const app = express()

  useExpressServer(app, expressConfig)

  /**
   * Connect in mongo db.
   */
  await createMongoConnection()

  return app
}
