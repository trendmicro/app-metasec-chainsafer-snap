import { createContext, Dispatch, ReactNode, Reducer, useEffect, useReducer } from 'react'
import { Snap } from '../types'
import { isFlask, getSnap, getAccounts, getTokenFromStorage } from '../utils'

export type MetamaskState = {
  isFlask: boolean
  installedSnap?: Snap
  error?: Error
  account: {
    currentAccount?: string
    accounts?: string | undefined[]
  }
  token: {
    accessToken?: string
    refreshToken?: string
    username?: string
    expiresIn?: number
    loginedAccount?: string
  }
}

const initialState: MetamaskState = {
  isFlask: false,
  error: undefined,
  account: {
    currentAccount: undefined,
    accounts: undefined,
  },
  token: {
    accessToken: undefined,
    refreshToken: undefined,
    username: undefined,
    expiresIn: undefined,
    loginedAccount: undefined,
  },
}

type MetamaskDispatch = { type: MetamaskActions; payload: any }

export const MetaMaskContext = createContext<[MetamaskState, Dispatch<MetamaskDispatch>]>([
  initialState,
  () => {
    /* no op */
  },
])

export enum MetamaskActions {
  SetInstalled = 'SetInstalled',
  SetFlaskDetected = 'SetFlaskDetected',
  SetError = 'SetError',
  SetAccount = 'SetAccount',
  SetToken = 'SetToken',
}

const reducer: Reducer<MetamaskState, MetamaskDispatch> = (state, action) => {
  switch (action.type) {
    case MetamaskActions.SetInstalled:
      return {
        ...state,
        installedSnap: action.payload,
      }

    case MetamaskActions.SetFlaskDetected:
      return {
        ...state,
        isFlask: action.payload,
      }

    case MetamaskActions.SetError:
      return {
        ...state,
        error: action.payload,
      }

    case MetamaskActions.SetAccount:
      return {
        ...state,
        account: action.payload,
      }

    case MetamaskActions.SetToken:
      return {
        ...state,
        token: action.payload,
      }

    default:
      return state
  }
}

/**
 * MetaMask context provider to handle MetaMask and snap status.
 *
 * @param props - React Props.
 * @param props.children - React component to be wrapped by the Provider.
 * @returns JSX.
 */
export const MetaMaskProvider = ({ children }: { children: ReactNode }) => {
  if (typeof window === 'undefined') {
    return <>{children}</>
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    async function detectFlask() {
      const isFlaskDetected = await isFlask()

      dispatch({
        type: MetamaskActions.SetFlaskDetected,
        payload: isFlaskDetected,
      })
    }

    async function detectSnapInstalled() {
      const installedSnap = await getSnap()
      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      })
    }

    detectFlask()

    if (state.isFlask) {
      detectSnapInstalled()
    }
  }, [state.isFlask, window.ethereum])

  useEffect(() => {
    let timeoutId: number

    if (state.error) {
      timeoutId = window.setTimeout(() => {
        dispatch({
          type: MetamaskActions.SetError,
          payload: undefined,
        })
      }, 10000)
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [state.error])

  useEffect(() => {
    detectAccountConnected()
    window.ethereum.on('accountsChanged', function (accounts) {
      let currentAccount = accounts[0] ?? ''
      console.log('on accountsChanged', currentAccount)
      if (state.account.currentAccount !== currentAccount) {
        dispatch({
          type: MetamaskActions.SetAccount,
          payload: { accounts, currentAccount },
        })
      }
    })
  }, [state.account])

  useEffect(() => {
    detectLogined()
  }, [state.token])

  async function detectAccountConnected() {
    try {
      const [accounts, currentAccount] = await getAccounts()
      if (state.account.currentAccount !== currentAccount) {
        console.log('detectAccountConnected: update state', currentAccount)
        dispatch({
          type: MetamaskActions.SetAccount,
          payload: { accounts, currentAccount },
        })
      }
    } catch (e) {
      console.error(e)
      dispatch({ type: MetamaskActions.SetError, payload: e })
    }
  }

  async function detectLogined() {
    try {
      const token = await getTokenFromStorage()
      if (state.token.accessToken !== token.accessToken) {
        dispatch({
          type: MetamaskActions.SetToken,
          payload: token,
        })
      }
      console.log('token: ', state.token)
    } catch (e) {
      console.error(e)
      dispatch({ type: MetamaskActions.SetError, payload: e })
    }
  }

  return <MetaMaskContext.Provider value={[state, dispatch]}>{children}</MetaMaskContext.Provider>
}
