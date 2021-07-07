import { Body, Post, OnUndefined, JsonController } from 'routing-controllers'

import { save } from './service'
import { ShortnerRequest } from './requests/shortner-request'

@JsonController('/shortner')
export class ShortnerController {
  @Post('/')
  @OnUndefined(204)
  async save(@Body() shortnerRequest: ShortnerRequest) {
    return save(shortnerRequest)
  }
}
