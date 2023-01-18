import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraTestnet } from "chora/utils/chains"

import * as styles from "./Geonode.module.css"

const queryNode = "chora/geonode/v1/node"
const serverUrl = "https://server.chora.io"

const Geonode = ({ nodeId }) => {

  const { chainInfo } = useContext(WalletContext)

  // error and success
  const [error, setError] = useState<string>("")
  const [node, setNode] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)

  useEffect(() => {
    setNode(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch node if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {

      // async function workaround
      const fetchNodeAndMetadata = async () => {

        // node metadata
        let iri: string

        // fetch node from selected network
        await fetch(chainInfo.rest + "/" + queryNode + "/" + nodeId)
          .then(res => res.json())
          .then(res => {
            if (res.code) {
              setError(res.message)
            } else {
              setNode(res)
              iri = res["metadata"]
            }
          })

        // return on error (iri never set)
        if (typeof iri === "undefined") {
          return
        }

        // fetch node data from chora server
        await fetch(serverUrl + "/" + iri)
          .then(res => res.json())
          .then(res => {
            if (res.error) {
              setError(res.error)
              setMetadata(null)
            } else if (res.context !== "https://schema.chora.io/contexts/geonode.jsonld") {
              setError("unsupported metadata schema")
              setMetadata(null)
            } else {
              setError("")
              setMetadata(JSON.parse(res["jsonld"]))
            }
          })
          .catch(err => {
            setError(err.message)
          })
      }

      // call async function
      fetchNodeAndMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  return (
    <div className={styles.container}>
      {!node && !metadata && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {node && metadata && !error && (
        <div>
          <div className={styles.item}>
            <h3>
              {"name"}
            </h3>
            <p>
              {metadata["name"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"description"}
            </h3>
            <p>
              {metadata["description"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"curator"}
            </h3>
            <p>
              {node["curator"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"latitude"}
            </h3>
            <p>
              {metadata["geo"]["latitude"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"longitude"}
            </h3>
            <p>
              {metadata["geo"]["longitude"]}
            </p>
          </div>
        </div>
      )}
      {error && (
        <div>
          {error}
        </div>
      )}
    </div>
  )
}

export default Geonode
