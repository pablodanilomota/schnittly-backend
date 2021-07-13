import { truncateAllCollections } from '~/lib/mongo'
import { closeServer, startServer, request } from 'test/helpers/server'

describe('[E2E] - Encurtador de url', () => {
  beforeAll(startServer)
  afterAll(closeServer)

  beforeEach(async () => {
    /**
     * Truncate collections.
     */
    await truncateAllCollections()
  })

  test('Deve salvar uma url e retornar sucesso', async () => {
    /**
     * Create hash.
     */
    const response = await request()
      .post('/shortner/')
      .send({ url: 'http://google.com.br' })

    /**
     * Expected status.
     */
    expect(response.status).toEqual(200)

    /**
     * Expected response data.
     */
    expect(response.body).toEqual(expect.any(String))
  })

  test('Deve buscar uma url a partir de um hash', async () => {
    /**
     * Create hash.
     */
    const responsePost = await request()
      .post('/shortner/')
      .send({ url: 'http://google.com.br' })

    /**
     * Get shortned url.
     */
    const responseGet = await request().get(`/shortner/${responsePost.body}`)

    /**
     * Expected status.
     */
    expect(responseGet.status).toEqual(302)
  })

  test('Deve retornar um erro ao buscar uma url a partir de um hash que não existe', async () => {
    /**
     * Get shortned url.
     */
    const response = await request().get('/shortner/123456')

    /**
     * Expected status.
     */
    expect(response.status).toEqual(500)

    /**
     * Expected status.
     */
    expect(response.body).toEqual('Url not found')
  })
})
