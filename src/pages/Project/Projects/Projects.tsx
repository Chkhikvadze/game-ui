import React, { useState } from 'react'
import styled from 'styled-components'
import { useProjects } from './useProjects'
import CreateProjectModal from 'modals/CreateProjectModal'
import { CustomTable } from 'oldComponents/atoms/CustomTable'
import columnConfig from './columnConfig'
import { StyledTypography } from 'pages/ApiKeys/ApiKeysStyle'

import Button from '@l3-lib/ui-core/dist/Button'
import ProjectCard from './ProjectCard'

import { useCollectionsService } from 'services/useCollectionService'

const Projects = () => {
  const { openCreateProjectModal, data, handleDeleteProject } = useProjects()
  const config = columnConfig({ handleDelete: handleDeleteProject })
  // console.log(data)

  // let projectId = ''
  const [projectId, setProjectId] = useState('')

  const cardClickHandler = (id: string) => {
    setProjectId(id)
    // console.log(id)
  }

  const { data: collectionData, refetch: refetchCollection } = useCollectionsService({
    project_id: projectId,
    page: 1,
    limit: 100,
    search_text: '',
  })

  const playerImages: any = [
    'https://www.reuters.com/resizer/NRuMc4-qhlqkYuAlIBGuwHdOrTc=/505x631/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/43YAWLITTZJLZIQTCP2JSS4KSM.jpg',
    'https://images.barrons.com/im-394091?width=1280&size=1',
    'https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31',
    'https://www.businessinsider.in/photo/87162740/most-expensive-bored-ape-nft-sells-for-2-7-million.jpg?imgsize=36280',
  ]
  const collectionImages = collectionData?.items?.map((item: any) => item.featured_image)

  return (
    <>
      <>
        <Button size={Button.sizes.Small} onClick={openCreateProjectModal}>
          Create game
        </Button>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '50px' }}>
          {data?.items?.map((item: any) => (
            <ProjectCard
              key={item.id}
              onButtonClick={async () => {
                await cardClickHandler(item.id)
                await refetchCollection()
              }}
              title={item.name}
              description={item.description}
              category={item.category}
              logo={item.logo_image}
              defaultLogo={
                'https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png'
              }
              image={item.background_image}
              defaultImage='https://i.guim.co.uk/img/media/01512e0bd1d78a9a85026844386c02c544c01084/38_0_1200_720/master/1200.jpg?width=1200&quality=85&auto=format&fit=max&s=cef05f7f90efd180648f5aa5ce0d3690'
              created={item.created_on}
              collection={{ image: collectionImages, length: collectionData?.items?.length }}
              players={{ image: playerImages, length: 5000 }}
            />
          ))}
        </div>
        <CustomTable
          templateColumns='1fr repeat(1, 1fr)  repeat(1,1fr)'
          size='14px'
          displayHeader
          columnsConfig={config}
          data={data?.items || []}
          alignItems='end'
          rowDifferentColors
        />
      </>
      <CreateProjectModal />
    </>
  )
}

export default Projects

// const StyledContainer = styled.div`
//   display: grid;
//   align-items: center;
//   justify-items: center;
//   height: 100%;
// `

export const StyledButton = styled.button`
  border: 1px solid #19b3ff;
  padding: 12px;
  display: inline-block;
  border-radius: 4px;
  margin-top: 20px;
  background-color: white;

  &:hover {
    background-color: #19b3ff;

    ${StyledTypography} {
      color: #fff;
    }
  }
`
