export interface CoingeckoApiToken {
  id: string
  symbol: string
  name: string
  platforms: {
    [key: string]: string
  }
}