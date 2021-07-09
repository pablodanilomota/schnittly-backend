import {
  Get,
  Body,
  Post,
  Params,
  OnUndefined,
  JsonController,
  Res
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
  async getUrl(@Params() filter: { hash: string }, @Res() response: any) {
    try {
      /**
       * Get url.
       */
      const foundUrl = await findOne(filter)

      response.setHeader('Content-Type', 'json/application')
      return await response.redirect(foundUrl)
    } catch (error) {
      console.log(error)
    }
  }
}
