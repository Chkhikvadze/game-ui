import { useState } from 'react'
import EditableHeading from '@l3-lib/ui-core/dist/EditableHeading'
import { StyledEditableHeading } from '../CreateContractFormStyles'
import { ContractFormHook } from '../useContractForm'

type ContractEditableHeadingProps = {
  form: ContractFormHook
}

const ContractEditableHeading = ({ form }: ContractEditableHeadingProps) => {
  const [startEdit, setStartEdit] = useState(true)
  const name = form.watch('name')

  return (
    <StyledEditableHeading
      editing={startEdit}
      value={name}
      placeholder={`Enter your contract name`}
      onCancelEditing={close}
      type={EditableHeading.types.h1}
      onFinishEditing={(value: string) => {
        const currentName = form.getValues('name')
        const newName = value || 'Untitled'

        if (currentName !== newName) {
          form.setValue('name', newName)
        }

        setStartEdit(false)
      }}
    />
  )
}

export default ContractEditableHeading
