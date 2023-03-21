import { DefaultIcon, TwitterIcon } from 'assets/avatars'

const getIconByText = (inputValue: string) => {
  const icon = inputValue.includes('twitter') ? TwitterIcon : DefaultIcon
  return icon
}

export default getIconByText
