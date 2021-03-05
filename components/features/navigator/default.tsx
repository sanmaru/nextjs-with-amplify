import React, { ReactNode, Fragment } from 'react';

import Amplify from 'aws-amplify';
import awsconfig from '../../../src/aws-exports';
import { HambugMenu }  from '../hambug';


import { AmplifySignOut } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

type Props = {
  children?: ReactNode,
  title?: string, 
  userName?: string,
  profile?: any,
}


function DefaultNavigator({ children, userName, profile }: Props) {

  const authStyle = {
    maxWidth: '200px',
    minWidth: '50px',
    float: 'right',

  } as React.CSSProperties;

  const hambugStyle = {
    maxWidth: '150px',
    height: '50px',
    float: 'left',
    left: 1000,
    
  } as React.CSSProperties;

  const menuStyle = {
    maxWidth: '100%',
    height: '50px',
    backgroundColor: '#8f8f8f',
  } as React.CSSProperties;

  const buttonName:string = userName + ' | 나가기';
  
  return (
    <Fragment>
      <div style={menuStyle} >
        <div style={hambugStyle}><HambugMenu userGroup={profile.signInUserSession.accessToken.payload['cognito:groups']}/></div>
        <div style={authStyle} ><AmplifySignOut buttonText={buttonName} /></div>
      </div>
      <div>
        {children}
      </div>
    </Fragment>
  )
}

export default DefaultNavigator;