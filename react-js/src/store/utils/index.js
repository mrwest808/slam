import R from 'ramda'

export { default as createFetchAction } from './createFetchAction'

/**
 * Selector helper, selects `key` from props (2nd argument).
 */
export const fromProps = key => R.compose(R.prop(key), R.nthArg(1))
