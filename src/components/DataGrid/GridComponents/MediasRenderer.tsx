import Typography from '@l3-lib/ui-core/dist/Typography'
import styled from 'styled-components'

import Attach from '@l3-lib/ui-core/dist/icons/Attach'
import { useRef, useState } from 'react'

const MediasRenderer = (p: any) => {
  const [itemId, setItemId] = useState(null as any)
  const uploadRef = useRef(null as any)

  const onButtonClick = async (p: any) => {
    await setItemId(p.data.id)
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
          p.handleUpdateMedia(e, itemId)
        }}
      />
      {p.value?.length > 0 ? (
        <StyledImgWrapper>
          {p.value.slice(0, 3).map((value: any) => {
            return <StyledImg key={value.url} src={value.url} alt='' />
          })}
          <>
            <StyledImgCount onClick={() => onButtonClick(p)} transparent={p.value.length < 4}>
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
        <StyledUploadDiv onClick={() => onButtonClick(p)}>
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
`
const StyledUploadDiv = styled.div`
  width: 200px;
  height: 36px;

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
