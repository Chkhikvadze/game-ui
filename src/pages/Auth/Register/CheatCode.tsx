import TextFieldFormik from 'components/TextFieldFormik'

export const CheatCode = () => {
  console.log('test')
  return (
    <div>
      <TextFieldFormik field_name='hot_key_one' placeholder='Command' size='large' />
      <TextFieldFormik field_name='hot_key_two' placeholder='R' size='large' />
    </div>
  )
}

export default CheatCode
