import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getTokenList } from '../../api/tokens.api'

import { TokenState } from '../../store/types'

const initialState: TokenState = {
  tokens: [],
  tokensCount: 0,
  status: 'idle',
  error: null,
  showOnlyEthereumTokens: false
}

export const toggleShowOnlyEthereumTokens = createAction<boolean>('token/toggleShowOnlyEthereumTokens')

export const findTokensThunk = createAsyncThunk('token/findTokens', async () => {
  const tokens = await getTokenList()

  return tokens.map((token, index) => ({
    key: index,
    ...token,
    isEthereumToken: !!(token.platforms || {}).ethereum
  }))
})

export const slice = createSlice({
  name: 'token',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleShowOnlyEthereumTokens, (state, action) => {
      state.showOnlyEthereumTokens = action.payload
    })
    builder.addCase(findTokensThunk.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(findTokensThunk.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.tokens = action.payload
      state.tokensCount = action.payload.length
    })
    builder.addCase(findTokensThunk.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  }
})

export default slice.reducer