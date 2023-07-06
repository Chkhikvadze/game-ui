import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Add from '@l3-lib/ui-core/dist/icons/Add'
import Close from '@l3-lib/ui-core/dist/icons/Close'
import Icon from '@l3-lib/ui-core/dist/Icon'
import { useCollectionByIdService } from 'services/useCollectionService'
import ContractChain from 'components/ContractChains/ContractChain'
import useCollectionContract from './useCollectionContract'
import { useContext } from 'react'
import { ToastContext } from 'contexts'
import { useModal } from 'hooks'
import { useDeleteContractService } from 'services'
import { useTranslation } from 'react-i18next'

type ContractMiniCardProps = {
  name?: string
  collectionId?: any
  isEmpty?: boolean
  onClick?: () => void
  chain?: string
  contracts?: any
}

const ContractMiniCard = ({
  name,
  collectionId,
  isEmpty,
  onClick,
  chain,
  contracts,
}: ContractMiniCardProps) => {
  const { data: collection } = useCollectionByIdService({
    id: collectionId,
  })

  const { t } = useTranslation()
  const { toast, setToast } = useContext(ToastContext)
  const { openModal, closeModal } = useModal()
  const [deleteContractService] = useDeleteContractService()
  const { refetchContract } = useCollectionContract()

  const handleDeleteContract = async (index: number) => {
    const contractToDelete = contracts[index]
    if (!contractToDelete) return

    openModal({
      name: 'delete-confirmation-modal',
      data: {
        closeModal: () => closeModal('delete-confirmation-modal'),
        deleteItem: async () => {
          const res = await deleteContractService(contractToDelete.id)
          if (res.success) {
            setToast({
              message: t('contract successfully deleted'),
              type: 'positive',
            })
            closeModal('delete-confirmation-modal')
          } else {
            setToast({
              message: t('contract delete failed'),
              type: 'negative',
            })
          }
        },
        label: t('are you sure you want to delete this contract?'),
        title: t('delete-contract'),
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
    handleDeleteContract(0)
  }

  return (
    <StyledRoot onClick={onClick} bgImg={cardBg}>
      <StyledCloseButtonWrapper onClick={handleCloseButtonClick}>
        <Icon icon={Close} iconSize={23} />
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
  /* Note: backdrop-filter has minimal browser support */

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

  cursor: pointer;
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
  outline: none;
`
