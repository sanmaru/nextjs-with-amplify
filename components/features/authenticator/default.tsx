
import React, { Fragment } from 'react';

import Amplify from 'aws-amplify';
import awsconfig from '../../../src/aws-exports';
Amplify.configure(awsconfig);

import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn } from '@aws-amplify/ui-react';

const DefaultAuthicator: React.FunctionComponent = () => {
  return (
    <Fragment>
      <AmplifyAuthenticator
        usernameAlias='email' >
        <AmplifySignUp
          headerText="회원가입"
          slot="sign-up"
          usernameAlias="email"
          submitButtonText="Sign-Up"
          formFields={[
            {
              type: "email",
              label: "이메일",
              placeholder: "이메일을 입력해 주세요",
              required: true,
            },
            {
              type: "password",
              label: "비밀번호",
              placeholder: "비밀번호를 입력해 주세요",
              required: true,
            }
          ]}
        />
        <AmplifySignIn
          headerText="로그인"
          slot="sign-in"
          usernameAlias="email"
          submitButtonText="Sign-In"
          //hideSignUp=false
          formFields={[
            {
              type: "email",
              label: "이메일",
              placeholder: "이메일을 입력해 주세요",
              required: true,
            },
            {
              type: "password",
              label: "비밀번호",
              placeholder: "비밀번호를 입력해 주세요",
              required: true,
            }
          ]}
        />
      </AmplifyAuthenticator>
    </Fragment>
  )
}

export default DefaultAuthicator;
