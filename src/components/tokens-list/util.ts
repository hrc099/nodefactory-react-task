import { IToken } from "../../store/types"

export type TokensListProps = {
  tokens: IToken[]
}

type tokenListColumn = {
  title: string,
  dataIndex: string,
  key: string,
  render?: any
}

export const tokensListColumns: tokenListColumn[] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Symbol',
    dataIndex: 'symbol',
    key: 'symbol'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Is Ethereum token',
    dataIndex: 'isEthereumToken',
    key: 'isEthereumToken',
    render: (isEthereumToken: boolean) => isEthereumToken ? 'yes' : 'no'
  }
]