import React, { Fragment } from 'react';
import DefaultLayout from '../components/layout';
import Amplify from 'aws-amplify';
import awsconfig from '../src/aws-exports';

Amplify.configure(awsconfig);

const IndexPage = () => {
  return (
    <Fragment>
      <DefaultLayout >
        테스트
      </DefaultLayout>
    </Fragment>
  );
};

export default IndexPage;