import { NotFoundError } from 'routing-controllers'
import { truncateAllCollections } from '~/lib/mongo'
import { connectDatabase, disconnectDatabase } from 'test/helpers/server'

import { findOne } from '~/api/shortner/service'

describe('[Integração] - Encurtador de url', () => {
  beforeAll(connectDatabase)
  afterAll(disconnectDatabase)

  beforeEach(async () => {
    /**
     * Truncate collections.
     */
    await truncateAllCollections()
  })

  test('Deve retornar um erro quando não encontrar uma URL', async () => {
    /**
     * Expect result.
     */
    await expect(
      findOne({
        hash: '123456'
      })
    ).rejects.toThrow(NotFoundError)
  })
})
