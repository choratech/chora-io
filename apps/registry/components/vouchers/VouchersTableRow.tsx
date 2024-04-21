import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './VouchersTableRow.module.css'

const VouchersTableRow = ({ voucher }: any) => {
  const { chainInfo, network, wallet } = useContext(WalletContext)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, error] = useMetadata(chainInfo, voucher.metadata)

  // TODO: handle error
  if (error) {
    console.error(error)
  }

  return (
    <tr>
      <td>{voucher.id}</td>
      <td>
        {metadata && metadata['name']
          ? metadata['name'].substring(0, 25) +
            (metadata['name'].length > 25 ? '...' : '')
          : 'NA'}
      </td>
      <td>
        {metadata && metadata['description']
          ? metadata['description'].substring(0, 50) +
            (metadata['description'].length > 50 ? '...' : '')
          : 'NA'}
      </td>
      <td>
        {voucher.issuer.substring(0, 13) +
          '...' +
          voucher.issuer.substring(38, 44)}
        {wallet && voucher.issuer === wallet.bech32Address && (
          <span className={styles.activeAccount}>{'(active account)'}</span>
        )}
      </td>
      <td style={{ minWidth: '120px' }}>
        <Link href={`/${network}/vouchers/${voucher.id}`}>
          {'view voucher'}
        </Link>
      </td>
    </tr>
  )
}

export default VouchersTableRow
