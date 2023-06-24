import { configureStore } from '@reduxjs/toolkit'
import tableReducer from '../table/tableSlicer'

export default configureStore({
  reducer: {
    table: tableReducer
  },
})