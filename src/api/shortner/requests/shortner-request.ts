import { IsString, IsUrl } from 'class-validator'

/**
 * Request to short the url.
 */
export class ShortnerRequest {
  @IsUrl()
  @IsString()
  url: string
}
