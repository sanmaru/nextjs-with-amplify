import React, { ReactNode, Fragment } from 'react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

import DefaultAuthenticator from '../authenticator';
import DefaultNavigator from '../navigator'

type Props = {
  children?: ReactNode,
  title?: string
}

const DefaultBody: React.FunctionComponent = ({ children }: Props) => {
  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<object | undefined>();

  React.useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);
  return authState === AuthState.SignedIn && user ?
    (
      <Fragment>
        <DefaultNavigator>
          {children}
        </DefaultNavigator>
      </Fragment>
    ) :
    (
      <Fragment>
        <DefaultAuthenticator/>
      </Fragment>
    )
}

export default DefaultBody;