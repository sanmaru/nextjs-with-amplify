import React, { ReactNode, Fragment } from 'react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

import DefaultAuthenticator from '../authenticator';
import DefaultNavigator from '../navigator'

type Props = {
  children?: ReactNode,
  title?: string
}

function DefaultBody({ children }: Props) {
  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<object | undefined>();

  React.useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
    
  }, []);

  function getUserName( obj:any ){
    try{
      return obj.attributes.email?.substring(0, obj.attributes.email?.indexOf('@'));
    }catch(e){
      return e.message();
    }
  }

  return authState === AuthState.SignedIn && user ?
    (
      <Fragment>
        <DefaultNavigator userName={getUserName(user)}>
          {children}
        </DefaultNavigator>
      </Fragment>
    ) :
    (
      <Fragment>
        <DefaultAuthenticator />
      </Fragment>
    )
}

export default DefaultBody;