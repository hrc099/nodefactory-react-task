import { CoingeckoApiToken } from "./types"

const COINGECKO_API_BASE_URL = 'https://api.coingecko.com/api'

export async function getTokenList ():Promise<CoingeckoApiToken[]>  {
  const url = COINGECKO_API_BASE_URL + '/v3/coins/list?include_platform=true'

  return fetch(url)
    .then((res) => res.json() as Promise<CoingeckoApiToken[]>)
}