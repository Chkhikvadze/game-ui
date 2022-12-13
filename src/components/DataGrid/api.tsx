import { IServerSideDatasource } from 'ag-grid-community'

const createServerSideDatasource: (server: any) => IServerSideDatasource = (server: any) => {
  return {
    getRows: (params) => {
      console.log('[Datasource] - rows requested by grid: ', params.request)
      // get data for request from our fake server
      var response = server.getData(params.request)
      // simulating real server call with a 500ms delay
      setTimeout(function () {
        if (response.success) {
          // supply rows for requested block to grid
          params.success({ rowData: response.rows })
        } else {
          params.fail()
        }
      }, 500)
    },
  }
}

function createFakeServer(allData: any[]) {
  return {
    getData: (request: any) => {
      // take a copy of the data to return to the client
      var requestedRows = allData.slice()
      return {
        success: true,
        rows: requestedRows,
      }
    },
  }
}

export default createServerSideDatasource
