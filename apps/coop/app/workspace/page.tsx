import { Metadata } from 'next'

import Workspace from '@components/workspace/Workspace'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const WorkspacePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'workspace'}</h1>
      <Workspace />
    </div>
  </div>
)

export default WorkspacePage
