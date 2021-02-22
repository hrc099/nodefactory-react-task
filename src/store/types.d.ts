import RootState from './index'

export interface IToken {
  id: string
  key: number
  symbol: string
  name: string
  platforms: {
    [key: string]: string
  }
  isEthereumToken: boolean
}

export type RootState = {
  token: TokenState
}

export type TokenState = {
  tokens: IToken[],
  tokensCount: number,
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null | undefined
  showOnlyEthereumTokens: boolean
}