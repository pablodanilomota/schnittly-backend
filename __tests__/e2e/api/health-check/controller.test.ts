import { closeServer, startServer, request } from 'test/helpers/server'

describe('[E2E] - Status do servidor', () => {
  beforeAll(startServer)
  afterAll(closeServer)

  test('Deve estar rodando o servidor', async () => {
    const response = await request().get('/health-check')

    expect(response.status).toEqual(200)
  })
})
