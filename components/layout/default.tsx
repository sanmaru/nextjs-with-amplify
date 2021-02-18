import React, { Fragment, ReactNode } from 'react';
import DefaultHead from '../features/head';
import DefaultBody from '../features/body';


type Props = {
  children?: ReactNode,
  title?: string
}

const Layout: React.FunctionComponent = ({ children, title = 'This is default Layout' }: Props) => {

  return (
    <Fragment>
      <DefaultHead title={title} />
      <DefaultBody >
        {children}
      </DefaultBody>
    </Fragment>
  )
    ;
}

export default Layout;