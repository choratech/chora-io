'use client'

// import { Metadata } from 'next'

import Policies from '@components/policies/Policies'

import styles from './page.module.css'

// export const metadata: Metadata = {
//   title: 'policies',
// }

const PoliciesPage = () => {
  return (
    <div className={styles.page}>
      <div>
        <h1>{'group policies'}</h1>
        <Policies />
      </div>
    </div>
  )
}

export default PoliciesPage
