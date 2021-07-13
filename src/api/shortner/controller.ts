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

@JsonController('/shortner')
export class ShortnerController {
  @Post('/')
  @OnUndefined(204)
  async save(@Body() shortnerRequest: ShortnerRequest) {
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

      response.redirect(302, foundUrl)

      return response
    } catch ({ message }) {
      return response.status(500).json('Url not found')
    }
  }
}
