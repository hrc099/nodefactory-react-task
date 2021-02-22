type EthereumTokensPercentageProps = {
  percentage: number | string
}

export const EthereumTokensPercentage: React.FunctionComponent<EthereumTokensPercentageProps> = (props) => {
  return (
    <div className="ethereum-tokens-percentage-props">
      Ethereum tokens percentage: {props.percentage}%
    </div>
  )
}