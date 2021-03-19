import React, { Fragment } from 'react'

import menuList from '../../../config/menu.json'
// import Link from 'next/link'

type Props = {
  showMenu?: boolean,
  userGroup?: Array<string>,
}

export default function hambugObject({ showMenu = false, userGroup = [] }: Props) {

  const createLiTag = (menuArray: any[], authorityGroup: any[] = [''], parentIdx:number = 0) => {

    return menuArray.map( (current, index) => {
      let liTag: any, aTag: any, addSubMenu: any;
      let showFlag: boolean = false;

      for (let i = 0; i < userGroup.length; i++) {
        for (let j = 0; j < current.authGroup.length; j++) {
          if (userGroup[i] === current.authGroup[j]) showFlag = true;
        }
      }

      if (showFlag) {
        aTag = React.createElement('a', { key: 'menuLink' + '-' + index, href: current.link }, current.title);
        liTag = React.createElement('li', { key: 'menu' + '-' + index }, aTag);
        
        if( current.submenu ){
          addSubMenu = createUlTag(current.submenu, authorityGroup, parentIdx);
          liTag = React.createElement('li', { key: 'menu' + index }, [aTag, addSubMenu]);
        }else{
          liTag = React.createElement('li', { key: 'menu' + index }, aTag);
        }
      }
      return liTag;
    });
  }
  
  const createUlTag = (menuArray: any[], authorityGroup: any[] = [''], idx:number = 0) => {
    return React.createElement('ul', { key:'menu' + idx + '-'}, createLiTag(menuArray, authorityGroup, idx++));
  }
  
  let ulTag = createUlTag(menuList, userGroup);

  let classDiv = showMenu ?
    (React.createElement('div', { className: 'menuList menuList-tooggle' }, ulTag))
    : (React.createElement('div', { className: 'menuList' }));

  return (
    <Fragment>
      <div className={'hambugDiv'}>
        {classDiv}
      </div>
    </Fragment >
  )
}
