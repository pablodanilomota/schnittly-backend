import { Get, OnUndefined, JsonController } from 'routing-controllers'

import { logger } from '~/common/logger'

@JsonController('/health-check')
export class HealthCheckController {
  @Get('/')
  @OnUndefined(204)
  healthCheck() {
    logger.info('Server is running.')
    return 'Server is running.'
  }
}
