import mongoose, {
  Schema,
  Document,
  SchemaOptions,
  SchemaDefinition
} from 'mongoose'

/**
 * Definitions.
 */
const definitions: SchemaDefinition = {
  hash: String,
  url: String
}

/**
 * Options.
 */
const options: SchemaOptions = {
  timestamps: true
}

/**
 * Document.
 */
export interface UrlDocument extends Document {
  hash: string
  url: string
}

/**
 * Schema.
 */
export const UrlSchema = new Schema(definitions, options)

/**
 * Model.
 */
export const Url = mongoose.model<UrlDocument>('Url', UrlSchema)
