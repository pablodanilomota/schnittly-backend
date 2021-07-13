import { objectToJSON } from '~/common/object'

describe('[Unitário] Parse de objeto para JSON', () => {
  test('Deve receber um objeto e transformar em JSON', () => {
    const objectToParse = {
      teste: 'teste'
    }

    const parsedData = objectToJSON(objectToParse)

    expect('{"teste":"teste"}').toEqual(parsedData)
  })
})
