/**
 * Created by Xiaowu on 2020/12/5.
 */
import get from 'lodash/get'

const byPrefix = {
  fas: 'solid',
  far: 'regular',
  fal: 'light',
  fad: 'duotone',
  fab: 'brands'
}

const byStyle = {
  solid: 'fas',
  regular: 'far',
  light: 'fal',
  duotone: 'fad',
  brands: 'fab'
}

export function styleToPrefix (style) {
  return get(byStyle, style, null)
}

export function prefixToStyle (prefix) {
  return get(byPrefix, prefix, null)
}
