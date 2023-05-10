import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { useContractsService } from 'services'

import ContractCards from './ContractCards'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'
import Add from '@l3-lib/ui-core/dist/icons/Add'

import { StyleHeaderGroup, StyledInnerWrapper } from 'styles/globalStyle.css'
import styled from 'styled-components'
import { useModal } from 'hooks'

import ToastBanner from 'components/ToastBanner/ToastBanner'

const Contracts = () => {
  const { openModal } = useModal()

  const [, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { gameId } = useParams()

  const { data } = useContractsService({ page: 1, limit: 100, game_id: gameId })
  const [activeTab, setActiveTab] = useState(0)

  const liveItems = data?.items.filter(item => item.status === 'Deployed')
  const draftItems = data?.items.filter(item => item.status === 'Draft')

  const openCreateContractModal = () =>
    openModal({ name: 'create-contract-modal', data: { gameId } })

  const live = (
    <ContractCards
      heading='Live'
      paragraph='Game which are successfully deployed'
      contracts={liveItems}
      onClick={contractId => navigate(`/game/${gameId}/contracts/${contractId}`)}
    />
  )

  const drafts = (
    <ContractCards
      heading='Draft'
      paragraph='Game which are saved as draft'
      contracts={draftItems}
      onClick={contractId => {
        setSearchParams({
          contractId,
        })
        openCreateContractModal()
      }}
    />
  )

  const dropDownData = {
    header_title: 'Missing values',
    data: [
      { value: 'Missing name', info: 'row 5' },
      { value: 'Missing media', info: 'row 10' },
      { value: 'Missing collection', info: 'row 15' },
    ],
  }

  return (
    <>
      <StyleHeaderGroup>
        <TabList>
          <Tab onClick={() => setActiveTab(0)}>All</Tab>
          <Tab onClick={() => setActiveTab(1)}>Active</Tab>
          <Tab onClick={() => setActiveTab(2)}>Draft</Tab>
        </TabList>

        <Button size={Button.sizes.MEDIUM} leftIcon={Add} onClick={openCreateContractModal}>
          <Typography value={'Create'} type={Typography.types.LABEL} size={Typography.sizes.md} />
        </Button>
      </StyleHeaderGroup>
      <StyledInnerWrapper>
        <StyledActionsSectionEdit>
          <ToastBanner
            type='negative'
            menuType='dropDown'
            title='Conflicts'
            dropDownData={dropDownData}
          />
          <ToastBanner
            menuType='dropDown'
            type='warning'
            title='Missing elements'
            dropDownData={dropDownData}
          />
          <ToastBanner
            type='normal'
            title='Metadata Update'
            menuType='insideContent'
            description='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
            buttonOption={{
              button_title: 'Update',
              button_func: () => console.log('update items'),
            }}
          />
        </StyledActionsSectionEdit>
        <TabsContext activeTabId={activeTab} className='tab_pannels_container'>
          <TabPanels>
            <TabPanel>
              <StyledDivider>
                <div>{live}</div>
                <div>{drafts}</div>
              </StyledDivider>
            </TabPanel>

            <TabPanel>{live}</TabPanel>
            <TabPanel>{drafts}</TabPanel>
          </TabPanels>
        </TabsContext>
      </StyledInnerWrapper>
    </>
  )
}

export default Contracts

const StyledDivider = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledActionsSectionEdit = styled.div`
  margin-bottom: 18px;
  display: flex;
  justify-content: space-between;
  gap: 40px;
`
