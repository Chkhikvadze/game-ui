import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Add from '@l3-lib/ui-core/dist/icons/Add'
import Close from '@l3-lib/ui-core/dist/icons/Close'
import Icon from '@l3-lib/ui-core/dist/Icon'
import { useContext } from 'react'
import { ToastContext } from 'contexts'
import { useModal } from 'hooks'
import { useDeleteContractService, useCollectionByIdService } from 'services'
import { useTranslation } from 'react-i18next'
import ContractChain from 'components/ContractChains/ContractChain'

type ContractMiniCardProps = {
  name?: string
  collectionId?: any
  isEmpty?: boolean
  onClick?: () => void
  chain?: string
  contractId?: string
  refetch: () => void
}

const ContractMiniCard = ({
  name,
  collectionId,
  isEmpty,
  onClick,
  chain,
  contractId,
  refetch,
}: ContractMiniCardProps) => {
  const { data: collection } = useCollectionByIdService({
    id: collectionId,
  })

  const { t } = useTranslation()
  const { toast, setToast } = useContext(ToastContext)
  const { openModal, closeModal } = useModal()
  const { deleteContractService } = useDeleteContractService()

  const handleDeleteContract = async (contractId: string) => {
    if (!contractId) return

    openModal({
      name: 'delete-confirmation-modal',
      data: {
        closeModal: () => closeModal('delete-confirmation-modal'),
        deleteItem: async () => {
          try {
            await deleteContractService(contractId)
            refetch()
            setToast({
              type: 'positive',
              message: `Contract was successfully deleted`,
              open: true,
            })
            closeModal('delete-confirmation-modal')
          } catch (error) {
            setToast({
              type: 'negative',
              message: `Could not delete contract`,
              open: true,
            })
          }
        },
        label: 'Are you sure you want to delete this contract?',
        title: 'Delete Contract',
      },
    })
  }

  let cardBg = ''
  if (chain === 'Ethereum') {
    cardBg =
      'https://c4.wallpaperflare.com/wallpaper/909/214/342/ethereum-logo-minimalism-wallpaper-preview.jpg'
  } else if (chain === 'Polygon') {
    cardBg = 'https://www.securities.io/wp-content/uploads/2023/01/Polygon-Featured.jpg'
  }

  const handleCloseButtonClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation()

    if (contractId) {
      handleDeleteContract(contractId)
    }
  }

  return (
    <StyledRoot onClick={onClick} bgImg={cardBg}>
      <StyledCloseButtonWrapper onClick={handleCloseButtonClick}>
        <StyledIcon icon={Close} iconSize={23} />
      </StyledCloseButtonWrapper>

      {isEmpty ? (
        <StyledWrapper>
          <StyledButton onClick={onClick}>
            <Add />
          </StyledButton>
          <Typography
            value={'Create Contract'}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
            customColor={'#FFF'}
          />
        </StyledWrapper>
      ) : (
        <>
          {chain && <ContractChain chainName={chain} />}
          {!collectionId ? (
            <StyledWrapper>
              <StyledAddButton onClick={onClick}>
                <Add />
              </StyledAddButton>
              <Typography
                value='Link Collection'
                type={Typography.types.LABEL}
                size={Typography.sizes.xss}
                customColor={'#FFF'}
              />
            </StyledWrapper>
          ) : (
            <StyledWrapper>
              <StyledImg
                src={
                  collection?.main_media ||
                  'https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png'
                }
              />
              <StyledTextWrapper>
                <Typography
                  value={`Linked to`}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.xss}
                  customColor={'#FFF'}
                />

                <Typography
                  value={`${collection?.name}`}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.xss}
                  customColor={'#FFF'}
                  style={{ textDecoration: 'underline' }}
                />
              </StyledTextWrapper>
            </StyledWrapper>
          )}

          <Typography
            value={name}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
            customColor={'#FFF'}
          />
        </>
      )}
    </StyledRoot>
  )
}

export default ContractMiniCard

const StyledRoot = styled.div<{ bgImg: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 24px 16px 8px;
  gap: 8px;
  width: 260px;
  min-width: 260px;
  height: 158px;
  min-height: 158px;
  background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.4) 100%);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  background-image: ${p =>
    p.bgImg &&
    `linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%), url(${p.bgImg})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
`

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`

const StyledAddButton = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
`
const StyledButton = styled.div`
  margin-top: 30px;
  outline: none;
`
const StyledImg = styled.img`
  border-radius: 6px;
  width: 48px;
  height: 48px;
`
const StyledTextWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`

const StyledCloseButtonWrapper = styled.div`
  position: absolute;
  top: 14px;
  right: 12px;
  cursor: pointer;
`
const StyledIcon = styled(Icon)`
  outline: none;
`
