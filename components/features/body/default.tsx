import React, { ReactNode, Fragment } from 'react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import jwt_decode from "jwt-decode";
import { Auth } from 'aws-amplify';

import DefaultAuthenticator from '../authenticator';
import DefaultNavigator from '../navigator';
import serverConfig from '../../../config/server.json';

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
        console.log(element);
        if(element[0].indexOf('accessToken') > -1) {
          let obj = JSON.parse(JSON.stringify( jwt_decode(new String(element[1]).toString()) ));

          /*  토큰을 갱신하였을 때 변하는 값과 로그인 하였을 때 불변하는 값 확인 */
          console.log('iat', obj.iat);
          console.log('auth_time', obj.auth_time);
          console.log('limit' , obj.auth_time + (1*60*serverConfig.automaticLogoutTime));
          console.log('result' , obj.iat > obj.auth_time + (1*60*serverConfig.automaticLogoutTime));
          console.log('timestamp', Math.floor(new Date().getTime()/1000));
          /*
          if(obj.iat > obj.auth_time + (1*60*6) || Math.floor(new Date().getTime()/1000) > obj.auth_time) {
            console.log(false);
            Auth.signOut({global:true});
          }
          */
          
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