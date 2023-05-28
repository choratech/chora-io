import * as React from "react"
import { useContext } from "react"

import { WalletContext } from "chora"

import Header from "chora/components/Header"

const HeaderWrapper = ({ darkTheme, toggleTheme }) => {

  const context = useContext(WalletContext)

  return (
    <Header
      context={context}
      darkTheme={darkTheme}
      toggleTheme={toggleTheme}
    />
  )
}

export default HeaderWrapper
