import TextFieldFormik from 'components/TextFieldFormik'
import { useForm, SubmitHandler } from 'react-hook-form'
import TextField from '@l3-lib/ui-core/dist/TextField'
import styled from 'styled-components'
import { StyledCenterFormContainer, StyledFormContainer } from 'styles/globalStyle.css'
import Heading from '@l3-lib/ui-core/dist/Heading'

type commandInputs = {
  command_first: string
  command_second: string
}

export const CheatCode = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<commandInputs>()

  return (
    <StyledCenterFormContainer>
      <Heading
        value={'Cheat Code'}
        type={Heading.types.h1}
        customColor='rgba(255, 255, 255, 0.4)'
        style={{ fontSize: 52, lineHeight: 'normal' }}
      />
      <StyledFormContainer>
        <StyledMainContainer>
          <StyledInputContainer>
            <TextField
              placeholder='?'
              size={TextField.sizes.LARGE}
              {...register('command_first', { required: true })}
              className='cheat_code__input'
            />
          </StyledInputContainer>
          <Heading
            value={'+'}
            type={Heading.types.h1}
            customColor='#ffffff'
            style={{ fontSize: 52, lineHeight: 'normal' }}
          />
          <StyledInputContainer>
            <TextField
              placeholder='?'
              size={TextField.sizes.LARGE}
              {...register('command_second', { required: true })}
              className='cheat_code__input'
            />
          </StyledInputContainer>
          {/* <TextField  label='Project name' size={'Large'} title={'large'} /> */}
        </StyledMainContainer>
      </StyledFormContainer>
    </StyledCenterFormContainer>
  )
}

export default CheatCode

const StyledInputContainer = styled.div`
  width: 118px;
  height: 122px;
`

const StyledMainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .cheat_code__input {
    padding: 8px 15px !important;
    height: 122px !important;
    font-size: 52px !important;
    text-align: center;
  }
`
