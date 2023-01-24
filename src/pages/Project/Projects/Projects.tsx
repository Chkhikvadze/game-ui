import React from "react"
import styled from "styled-components"
import { useProjects } from "./useProjects"
import CreateProjectModal from "modals/CreateProjectModal"
import { CustomTable } from "oldComponents/atoms/CustomTable"
import columnConfig from "./columnConfig"
import { StyledTypography } from "pages/ApiKeys/ApiKeysStyle"
// @ts-ignore
import Button from "@l3-lib/ui-core/dist/Button"


const Projects = () => {
  
  const {openCreateProjectModal, data, handleDeleteProject} = useProjects()
  const config = columnConfig({handleDelete:handleDeleteProject})
  
  return (
    <>
	  <>
        <Button onClick={openCreateProjectModal}>Create game</Button>
        <CustomTable
          templateColumns="1fr repeat(1, 1fr)  repeat(1,1fr)"
          size="14px"
          displayHeader
          columnsConfig={config}
          data={data?.items || []}
          alignItems="end"
          rowDifferentColors
        />
	  
	  </>
	  <CreateProjectModal/>
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