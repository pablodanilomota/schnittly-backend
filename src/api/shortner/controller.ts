import { Response } from 'express'
import {
  Res,
  Get,
  Body,
  Post,
  Params,
  OnUndefined,
  JsonController
} from 'routing-controllers'

import { findOne, save } from './service'
import { ShortnerRequest } from './requests/shortner-request'

@JsonController('/short')
export class ShortnerController {
  @Post('/')
  @OnUndefined(204)
  save(@Body() shortnerRequest: ShortnerRequest) {
    /**
     * Save url.
     */
    return save(shortnerRequest)
  }

  @Get('/:hash')
  @OnUndefined(204)
  async getUrl(@Params() filter: { hash: string }, @Res() response: Response) {
    try {
      /**
       * Get url.
       */
      const foundUrl = await findOne(filter)

      /**
       * Protocol verification.
       */
      const protocolVerificarion = foundUrl.includes('http')

      /**
       * Redirect.
       */
      const url = protocolVerificarion ? foundUrl : `http://${foundUrl}`

      response.redirect(url)

      return response
    } catch ({ message }) {
      return response.status(500).json('Url not found')
    }
  }
}
