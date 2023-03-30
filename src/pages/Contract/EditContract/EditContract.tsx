import styled from 'styled-components'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'

import Widget from '../ContractComponents/Widget'

import { DUMMY_DATA } from '../contractConstants'
import ContractMethod from '../ContractComponents/ContractMethod'
import WidgetItem from '../ContractComponents/Widget/WidgetItem'

const EditContract = () => {
  return (
    <StyledRoot>
      <StyledTopSection>
        <StyledBalanceWrapper>
          <StyledHeading type={Heading.types.h1} value='Balance:' customColor={'#FFF'} />
          <Heading value='192eth' type={Heading.types.h1} size='medium' customColor={'#7AF94B'} />
        </StyledBalanceWrapper>
        <Button size={Button.sizes.MEDIUM}>Withdraw</Button>
      </StyledTopSection>
      <StyledDefinitionWrapper>
        <div>
          <Heading type={Heading.types.h1} value='Definitions' size='medium' customColor={'#FFF'} />
          <Typography
            value='These are the methods that ruled Weapons 23’ contract. Those with the inputs are still editable. '
            type={Typography.types.P}
            size={Typography.sizes.lg}
            customColor={'rgba(255, 255, 255, 0.6)'}
          />
        </div>
        <StyledWidgetsWrapper>
          <Widget
            title='Default'
            items={
              <>
                <WidgetItem itemTitle={'Chain'} itemValue={'2'} />
                <WidgetItem itemTitle={'Collection size'} itemValue={'123K'} />
                <WidgetItem itemTitle={'Chain'} itemValue={'2'} />
                <WidgetItem itemTitle={'Collection size'} itemValue={'123K'} />
              </>
            }
          />
          <Widget
            title='Custom'
            items={
              <>
                <WidgetItem itemTitle={'Max Per Transaction'} itemValue={'2'} />
                <WidgetItem itemTitle={'Max Per Player'} itemValue={'3'} />
                <WidgetItem itemTitle={'Max Per Transaction'} itemValue={'2'} />
                <WidgetItem itemTitle={'Max Per Player'} itemValue={'3'} />
              </>
            }
          />
          <Widget
            title='Royalties'
            titleValue='5%'
            items={
              <>
                <WidgetItem
                  itemTitle={'David'}
                  itemValue={'45%'}
                  itemSubtitle={'0x0002B...'}
                  image={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ9jjshW88ULMxoRtXeswOlMxh6_K3N9fUqw&usqp=CAU'
                  }
                />
                <WidgetItem
                  itemTitle={'Monica'}
                  itemValue={'45%'}
                  itemSubtitle={'0x0002B...'}
                  image={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ9jjshW88ULMxoRtXeswOlMxh6_K3N9fUqw&usqp=CAU'
                  }
                />
              </>
            }
          />
        </StyledWidgetsWrapper>
        <StyledFormsWrapper>
          {DUMMY_DATA.map((item: any, index: number) => {
            if (item.type === 'function') {
              return <ContractMethod item={item} key={index} />
            }
          })}
        </StyledFormsWrapper>
      </StyledDefinitionWrapper>
    </StyledRoot>
  )
}

export default EditContract

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 30px;
  margin-bottom: 50px;

  gap: 36px;
`
const StyledDefinitionWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 28px;
`
const StyledWidgetsWrapper = styled.div`
  display: flex;
  gap: 24px;
`

const StyledFormsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  width: 80%;
`
const StyledTopSection = styled.div`
  width: 80%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StyledHeading = styled(Heading)`
  font-size: 36px;
`
const StyledBalanceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
