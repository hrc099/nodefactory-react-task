import { Radio, RadioChangeEvent, Spin, Alert, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../store/types'
import { EthereumTokensPercentage } from '../ethereum-tokens-percentage/EthereumTokensPercentage'
import { TokensList } from '../tokens-list/TokensList'
import { findTokensThunk, toggleShowOnlyEthereumTokens } from './tokensSlice'
import './TokensIndex.css'

export const TokensIndex: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const tokens = useSelector((state: RootState) => state.token.tokens)
  const tokenStatus = useSelector((state: RootState) => state.token.status)
  const showOnlyEthereumTokens = useSelector((state: RootState) => state.token.showOnlyEthereumTokens)
  const ethereumTokens = useSelector((state: RootState) => state.token.tokens.filter((token) => token.isEthereumToken))

  const onToggleShowOnlyEthereumTokens = (event: RadioChangeEvent): void => {
    dispatch(toggleShowOnlyEthereumTokens(event.target.value))
  }

  const onTryReloadingTokensList = (): void => {
    dispatch(findTokensThunk())
  }

  let content: JSX.Element = (<></>)

  if (tokenStatus === 'loading') {
    content = (
      <div className="loader">
        <Spin tip='Loading'></Spin>
      </div>
    )
  } else if (tokenStatus === 'failed') {
    content = (
      <div className="failed-container">
        <Alert
          message='Error on getting tokens list'
          type='error'>
        </Alert>
        <Button
          type='primary'
          onClick={() => onTryReloadingTokensList()}>
          Try again
        </Button>
      </div>
    )
  } else if (tokenStatus === 'succeeded') {
    const tokensToDisplay = showOnlyEthereumTokens ? ethereumTokens : tokens
    content = (
      <div className="tokens-index">
        <div className="ethereum-toggle">
          <Radio.Group onChange={onToggleShowOnlyEthereumTokens} value={showOnlyEthereumTokens}>
            <Radio value={true}>Show only Ethereum tokens</Radio>
            <Radio value={false}>Show all tokens</Radio>
          </Radio.Group>
        </div>
        {!showOnlyEthereumTokens &&
          <div className="ethereum-percentage">
            <EthereumTokensPercentage percentage={(ethereumTokens.length / tokens.length * 100).toFixed(2)}/>
          </div>
        }
        <div className="tokens-list">
          <TokensList tokens={tokensToDisplay}/>
        </div>
      </div>
    )
  }

  return content
}