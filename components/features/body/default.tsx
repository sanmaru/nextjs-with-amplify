import React, { ReactNode, Fragment } from 'react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import jwt_decode from "jwt-decode";
import { Auth } from 'aws-amplify';

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
      setUser(authData);
    });
    
  }, []);

  function isLogin(authState:any, AuthState: any, user:any){
    if(user){
      let arr = Object.entries(user.pool.storage);
      arr.forEach( (element) => {
        if(element[0].indexOf('accessToken') > -1) {
          let obj = JSON.parse(JSON.stringify( jwt_decode(new String(element[1]).toString()) ));
          if(obj.iat > obj.auth_time + (1*60*6)) {
            console.log(false);
            Auth.signOut({global:true});
          }
        }
      });

    }

    return authState === AuthState.SignedIn && user;
  }
  function getUserName( obj:any ){
    try{
      console.log(obj.attributes.email);
      return obj.attributes.email?.substring(0, obj.attributes.email?.indexOf('@'));
    }catch(e){
      return e.message();
    }
  }

  return isLogin(authState, AuthState, user) ?
    (
      <Fragment>
        <DefaultNavigator userName={getUserName(user)} profile={user} >
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