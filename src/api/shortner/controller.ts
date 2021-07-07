import { Body, Post, OnUndefined, JsonController } from 'routing-controllers'
import { logger } from '~/common/logger'

import { ShortnerRequest } from './requests/shortner-request'

@JsonController('/shortner')
export class ShortnerController {
  @Post('/short')
  @OnUndefined(204)
  async short(@Body() shortnerRequest: ShortnerRequest) {
    logger.info(`Cortando a url: ${shortnerRequest}`)
  }
}
