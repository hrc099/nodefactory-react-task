import { Table } from 'antd'

import { tokensListColumns, TokensListProps } from './util'

export const TokensList: React.FunctionComponent<TokensListProps> = (props) => {
  return (
    <section className="tokens-list">
      <Table dataSource={props.tokens} columns={tokensListColumns}/>
    </section>
  )
}