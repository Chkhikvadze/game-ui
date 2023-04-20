import Typography from '@l3-lib/ui-core/dist/Typography'
import Loader from '@l3-lib/ui-core/dist/Loader'
import styled from 'styled-components'

import Attach from '@l3-lib/ui-core/dist/icons/Attach'
import { useRef, useState } from 'react'

const MediasRenderer = (p: any) => {
  const [item, setItem] = useState<string | null>(null)
  const uploadRef = useRef<HTMLInputElement>(null)

  const onButtonClick = async () => {
    await setItem(p.data)
    uploadRef?.current?.click()
  }

  return (
    <>
      <input
        type='file'
        multiple
        ref={uploadRef}
        style={{ display: 'none' }}
        onChange={e => {
          p.handleUpdateMedia(e, item)
        }}
      />
      {p.isLoading && p.data === item ? (
        <StyledLoaderWrapper>
          <Loader size={Loader.sizes.XS} />
        </StyledLoaderWrapper>
      ) : p.value?.length > 0 ? (
        <StyledImgWrapper>
          {p.value.slice(0, 3).map((value: any) => {
            return <StyledImg key={value.url} src={value.url} alt='' />
          })}
          <>
            <StyledImgCount onClick={onButtonClick} transparent={p.value.length < 4}>
              <div className='countText'>
                {p.value.length > 3 && (
                  <Typography
                    value={`+${p.value.length - 3}`}
                    type={Typography.types.LABEL}
                    size={Typography.sizes.lg}
                    customColor={'rgba(255, 255, 255, 0.8)'}
                  />
                )}
              </div>
              <div className='attach'>
                <Attach />
              </div>
            </StyledImgCount>
          </>
        </StyledImgWrapper>
      ) : (
        <StyledUploadDiv onClick={onButtonClick}>
          <div className='attach'>
            <Attach />

            <Typography
              value={'Upload'}
              type={Typography.types.LABEL}
              size={Typography.sizes.lg}
              customColor={'rgba(255, 255, 255, 0.8)'}
            />
          </div>
        </StyledUploadDiv>
      )}
    </>
  )
}

export default MediasRenderer

const StyledImg = styled.img`
  width: 35px;
  height: 35px;
`
const StyledImgCount = styled.div<{ transparent: boolean }>`
  color: #fff;

  background: rgba(255, 255, 255, 0.2);
  background: ${p => (p.transparent ? 'transparent' : 'rgba(255, 255, 255, 0.2)')};
  border-radius: 2px;
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  .attach {
    display: none;
  }

  &:hover {
    /* background: rgba(255, 255, 255, 0.2); */
    .attach {
      display: block;
    }
    .countText {
      display: none;
    }
  }
`
const StyledImgWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;

  margin-top: 3px;
`
const StyledUploadDiv = styled.div`
  width: 200px;
  height: 36px;

  margin-top: 3px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  color: rgba(255, 255, 255, 0.8);

  cursor: pointer;

  .attach {
    display: none;
  }

  &:hover {
    .attach {
      display: flex;
    }
  }
`
const StyledLoaderWrapper = styled.div`
  margin-top: 8px;
  width: 100%;

  display: flex;
  justify-content: center;
`
