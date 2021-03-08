import React, { Fragment } from 'react'

import menuList from '../../../config/menu.json'
// import Link from 'next/link'

type Props = {
  showMenu?: boolean,
  userGroup?: Array<string>,
}

export default function hambugObject({ showMenu = false, userGroup = [] }: Props) {

  const createLiTag = (menuArray: any[], authorityGroup: any[] = ['']) => {
    console.log('menuSize', menuArray.length);
    console.log('authorityGroup', authorityGroup);

    return menuArray.map((current, index) => {
      let liTag: any, aTag: any;
      console.log('current', current.authGroup);
      console.log('userGroup', userGroup);
      let showFlag: boolean = false;
      for (let i = 0; i < userGroup.length; i++) {
        for (let j = 0; j < current.authGroup.length; j++) {
          if (userGroup[i] === current.authGroup[j]) showFlag = true;
        }
      }

      if (showFlag) {
        // console.log('userGroup', userGroup);
        // console.log('current', current.authGroup);
        aTag = React.createElement('a', { key: 'menuLink' + index, href: current.link }, current.title)
        liTag = React.createElement('li', { key: 'menu' + index }, aTag);
      }
      return liTag;
    });;
  }

  let ulTag = React.createElement('ul', {}, createLiTag(menuList, userGroup));

  let classDiv = showMenu ?
    (React.createElement('div', { className: 'hambugDiv menuList menuList-tooggle' }, ulTag))
    : (React.createElement('div', { className: 'hambugDiv menuList' }));

  console.log(classDiv);

  return (
    <Fragment>
      <div className={'hambugDiv'}>
        {classDiv}
      </div>
    </Fragment >
  )
}
