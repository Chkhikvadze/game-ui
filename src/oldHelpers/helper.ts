import _, { words, size } from 'lodash'

const renaweblesValues = [
  {
    value: 'power_purchase_agreement',
    label: 'Power purchase agreement',
  },
  { value: 'green_energy', label: 'Green energy' },
  { value: 'on_site_renewables', label: 'On site renewables' },
  {
    value: 'on_site_renewables_with_batteries',
    label: 'On site renewables with batteries',
  },
]

export const wordsCount = (value: string) => size(words(value))

export const getAscOrder = (array: Array<any>, option?: string) =>
  _.orderBy(array, [option ? option : 'value'], ['asc'])

export const getReneWableLabel = (value: any) => {
  const label = renaweblesValues.filter(item => item.value === value).map(item => item.label)
  return label[0]
}

const formatString = (value: string) => value?.toLowerCase().replace(' ', '_')

export const sortBySkipOption = (data: Array<any>, skipValue: string) => {
  const skipValueData = data.filter(
    item => formatString(item.label) === formatString(skipValue) && item,
  )
  const otherData = data.filter(item => item.value !== '' && item)
  const sortedData = _.sortBy(otherData, 'label', ['asc'])

  const newData = [...skipValueData, ...sortedData]

  return newData
}
