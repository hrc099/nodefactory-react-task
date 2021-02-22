import { configureStore } from '@reduxjs/toolkit'

import tokenReducer from '../components/tokens-index/tokensSlice'

export default configureStore({
  reducer: {
    token: tokenReducer
  }
})