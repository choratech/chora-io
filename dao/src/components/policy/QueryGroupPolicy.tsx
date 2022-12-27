import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "../../context/WalletContext"

import InputAddress from "../InputAddress"
import Result from "../Result"
import SelectNetwork from "../SelectNetwork"

import * as styles from "./QueryGroupPolicy.module.css"

const queryGroupPolicy = "/cosmos/group/v1/group_policy_info"

const QueryPolicy = () => {

  // @ts-ignore
  const { chainInfo } = useContext(WalletContext)

  // form input
  const [address, setAddress] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryGroupPolicy + "/" + address)
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          setError(data.message)
        } else {
          setSuccess(JSON.stringify(data, null, "  "))
        }
      })
      .catch(err => {
        setError(err.message)
      })
  }

  return (
    <>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <InputAddress
            id="policy-address"
            label="policy address"
            long={true}
            address={address}
            setAddress={setAddress}
          />
          <SelectNetwork withLabel={true} />
          <button type="submit">
            {"search"}
          </button>
        </form>
      </div>
      <Result
        error={error}
        success={success}
      />
    </>
  )
}

export default QueryPolicy
