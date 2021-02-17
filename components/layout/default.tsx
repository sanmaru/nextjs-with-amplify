import React, { Fragment, ReactNode } from 'react';
import Amplify from 'aws-amplify';
import awsconfig from '../../src/aws-exports';
import DefaultHead from '../features/head';
import DefaultBody from '../features/body';

Amplify.configure(awsconfig);

import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

type Props = {
  children?: ReactNode,
  title?: string
}

const Layout: React.FunctionComponent = ({ children, title = 'This is default Layout' }: Props) => {
  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<object | undefined>();

  React.useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);

  return (
    <Fragment>
      <DefaultHead title={title} />
      <DefaultBody>
        {children}
      </DefaultBody>
    </Fragment>
  )
    ;
}

export default Layout;