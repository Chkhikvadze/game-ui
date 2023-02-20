import _ from 'lodash'

const letterTransformer = (text: string, option?: 'capitalize' | 'uppercase') => {
  if (option === 'capitalize') {
    return _.capitalize(text)
  }
  if (option === 'uppercase') {
    return _.upperCase(text)
  }
  return text
}

const abbreviationHelper = (value: string) => {
  if (
    _.lowerCase(value) === 'hev' ||
    _.lowerCase(value) === 'suv' ||
    _.lowerCase(value) === 'ice' ||
    _.lowerCase(value) === 'fcev'
  ) {
    return letterTransformer(value, 'uppercase')
  }
  return letterTransformer(value, 'capitalize')
}

export { letterTransformer, abbreviationHelper }
