'use client'

import * as React from 'react'

import { Result } from '..'
import { PaginationNav, ResolversList } from '../tables'

import styles from './Resolvers.module.css'

const Resolvers = ({
  resolvers,
  error,
  renderAddress,
  renderLink,
  limit,
  offset,
  setOffset,
  view,
  setView,
}: any) => {
  return (
    <div className={styles.box}>
      {view && setView && (
        <div className={styles.boxOptions}>
          <button
            className={view === 'table' ? styles.active : undefined}
            onClick={() => setView('table')}
          >
            {'table view'}
          </button>
          <button
            className={view === 'list' ? styles.active : undefined}
            onClick={() => setView('list')}
          >
            {'list view'}
          </button>
        </div>
      )}
      {!resolvers && !error && <div>{'loading...'}</div>}
      {resolvers && resolvers.length === 0 && <div>{'no resolvers found'}</div>}
      {resolvers && resolvers.length > 0 && (
        <>
          <ResolversList
            resolvers={resolvers}
            renderAddress={renderAddress}
            renderLink={renderLink}
          />
          {limit && (
            <PaginationNav
              length={resolvers ? resolvers.length : 0}
              limit={limit}
              offset={offset}
              setOffset={setOffset}
            />
          )}
        </>
      )}
      <Result error={error} />
    </div>
  )
}

export default Resolvers
