import { ComponentProps } from 'react'
import styled from 'styled-components'
import { MetamaskState } from '../hooks'
import { ReactComponent as FlaskFox } from '../assets/flask_fox.svg'
import { clearTokenFromStorage, shouldDisplayReconnectButton } from '../utils'
import { showAccount } from 'utils/eoa'

const Link = styled.a`
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSizes.small};
  border-radius: ${(props) => props.theme.radii.button};
  border: 1px solid ${(props) => props.theme.colors.background.inverse};
  background-color: ${(props) => props.theme.colors.background.inverse};
  color: ${(props) => props.theme.colors.text.inverse};
  text-decoration: none;
  font-weight: bold;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.colors.background.inverse};
    color: ${(props) => props.theme.colors.text.default};
  }

  ${({ theme }) => theme.mediaQueries.small} {
    width: 100%;
    box-sizing: border-box;
  }
`

const Button = styled.button`
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  ${({ theme }) => theme.mediaQueries.small} {
    width: 100%;
  }
`

const ButtonText = styled.span`
  margin-left: 1rem;
`

const ConnectedContainer = styled.div`
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSizes.small};
  border-radius: ${(props) => props.theme.radii.button};
  border: 1px solid ${(props) => props.theme.colors.background.inverse};
  background-color: ${(props) => props.theme.colors.background.inverse};
  color: ${(props) => props.theme.colors.text.inverse};
  font-weight: bold;
  padding: 1.2rem;
`

const ConnectedIndicator = styled.div`
  content: ' ';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: green;
`

export const InstallFlaskButton = () => (
  <Link href="https://metamask.io/flask/" target="_blank">
    <FlaskFox />
    <ButtonText>Install MetaMask Flask</ButtonText>
  </Link>
)

export const WalletConnectButton = (props: ComponentProps<typeof Button>) => {
  return (
    <Button {...props}>
      <FlaskFox />
      <ButtonText>Wallet Connect</ButtonText>
    </Button>
  )
}

export const InstallSnapButton = (props: ComponentProps<typeof Button>) => {
  return <Button {...props}>Install Snap</Button>
}

export const ReInstallSnapButton = (props: ComponentProps<typeof Button>) => {
  return (
    <div>
      {/* <Button {...props}>ReInstall Snap</Button>
      <br></br> */}
      <ConnectedContainer>
        <ConnectedIndicator />
        <ButtonText>Snap Installed</ButtonText>
      </ConnectedContainer>
    </div>
  )
}

export const SendHelloButton = (props: ComponentProps<typeof Button>) => {
  return <Button {...props}>Send</Button>
}

export const LoginButton = (props: ComponentProps<typeof Button>) => {
  return <Button {...props}>Login</Button>
}

export const SendLogoutButton = (props: ComponentProps<typeof Button>) => { 
  return <Button {...props}>Logout</Button>
}

export const LoginButtons = ({
  state,
  onClick,
  disabled,
}: {
  state: MetamaskState
    onClick(): unknown
  disabled: boolean
}) => {
  if (state.token.accessToken === undefined || state.token.accessToken === null) {
    return <LoginButton onClick={onClick} disabled={disabled} />
  }

  return (
    <ConnectedContainer>
      <ConnectedIndicator />
      <ButtonText>Account Logined</ButtonText>
    </ConnectedContainer>
  )
}

export const HeaderButtons = ({
  state,
  onConnectClick,
}: {
  state: MetamaskState
  onConnectClick(): unknown
}) => {
  if (state.account.currentAccount === undefined || state.account.currentAccount === '') {
    return <WalletConnectButton onClick={onConnectClick} />
  }
  let address =
    state.account.currentAccount.slice(0, 4) + '...' + state.account.currentAccount.slice(-4)
  return (
    <ConnectedContainer>
      <ConnectedIndicator />
      <ButtonText>Wallet Connect {address}</ButtonText>
    </ConnectedContainer>
  )
}
