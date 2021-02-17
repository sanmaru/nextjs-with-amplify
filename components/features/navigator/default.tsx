import React, { ReactNode, Fragment } from 'react';

import Amplify from 'aws-amplify';
import awsconfig from '../../../src/aws-exports';

import { AmplifySignOut } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

type Props = {
  children?: ReactNode,
  title?: string
}

const DefaultNavigator: React.FunctionComponent = ({ children }: Props) => {
  const authStyle={
    maxWidth: '100px',
    minWidth: '50px',
    float: 'right',
    marginRight: '50px'
  }
  const menuStyle={
    backgroundColor: 'red',
    height: '200px'
  }
  return (
    <Fragment>
      <div style={menuStyle} >
        <div style={authStyle}><AmplifySignOut buttonText='나가기' /></div>
      </div>
      <div>
      {children}
      </div>
    </Fragment>
  )
}

export default DefaultNavigator;