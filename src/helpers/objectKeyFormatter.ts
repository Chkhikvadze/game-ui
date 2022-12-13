const objectKeyFormatter = (str: string) => {
  const formatted = str.trim().replace(' ', '_').toLowerCase()
  return formatted
}

export default objectKeyFormatter
