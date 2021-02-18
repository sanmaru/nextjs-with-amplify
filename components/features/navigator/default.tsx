import React, { ReactNode, Fragment } from 'react';

import Amplify from 'aws-amplify';
import awsconfig from '../../../src/aws-exports';


import { AmplifySignOut } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

type Props = {
  children?: ReactNode,
  title?: string, 
  userName?: string
}


function DefaultNavigator({ children, userName }: Props) {

  const authStyle = {
    maxWidth: '200px',
    minWidth: '50px',
    float: 'right',

  } as React.CSSProperties;;

  const menuStyle = {
    backgroundColor: 'red',
    height: '50px',

  } as React.CSSProperties;

  const buttonName:string = userName + ' | 나가기';
  // const buttonName: string = '나가기';
  
  return (
    <Fragment>
      <div style={menuStyle} >
        <div style={authStyle} ><AmplifySignOut buttonText={buttonName} /></div>
      </div>
      <div>
        {children}
      </div>
    </Fragment>
  )
}

export default DefaultNavigator;