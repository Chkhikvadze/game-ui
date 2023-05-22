export const handleHideWarningsOrErrors = (storageName: string, id: string) => {
  {
    const retrievedHiddenValues: any = localStorage.getItem(`${storageName}`)

    const parsedValues = JSON.parse(retrievedHiddenValues)

    if (retrievedHiddenValues) {
      localStorage.setItem(`${storageName}`, JSON.stringify([...parsedValues, id]))
    } else {
      localStorage.setItem(`${storageName}`, JSON.stringify([id]))
    }
  }
}

export const handleShowWarningsOrErrors = (storageName: string, id: string) => {
  const retrievedHiddenValues: any = localStorage.getItem(`${storageName}`)

  const parsedValues = JSON.parse(retrievedHiddenValues)

  if (parsedValues?.includes(id)) {
    const filteredParsedValues = parsedValues?.filter((pickedId: any) => pickedId !== id)
    localStorage.setItem(`${storageName}`, JSON.stringify([...filteredParsedValues]))
  }
}
