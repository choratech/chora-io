import { MsgAddAllowedBridgeChain as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputString } from '..'

const MsgAddAllowedBridgeChain = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [authority, setAuthority] = useState<string>('')
  const [chainName, setChainName] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'regen.ecocredit.v1.MsgAddAllowedBridgeChain',
      authority: wallet ? wallet.bech32Address : authority,
      chainName: chainName,
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/regen.ecocredit.v1.MsgAddAllowedBridgeChain',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [authority, chainName, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-add-allowed-bridge-chain-authority"
          label="authority"
          long={true}
          network={network}
          address={authority}
          setAddress={setAuthority}
        />
      )}
      <InputString
        id="msg-add-allowed-bridge-chain-chain-name"
        label="chain name"
        placeholder="polygon"
        string={chainName}
        setString={setChainName}
      />
    </>
  )
}

export default MsgAddAllowedBridgeChain
