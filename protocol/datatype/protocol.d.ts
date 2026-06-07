export type JSONPrimitiveFields = string | number
export type JSONObjectKey = string
export type JSONSeriaraizable = JSONPrimitiveFields | JSONSeriaraizable[] | { [k in JSONObjectKey]: JSONSeriaraizable }
