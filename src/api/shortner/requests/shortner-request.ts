import { IsString } from 'class-validator'

/**
 * Request to short the url.
 */
export class ShortnerRequest {
  @IsString()
  url: string
}
