import React, { Fragment } from 'react'

import menuList from '../../../config/menu.json'
// import Link from 'next/link'

type Props = {
  showMenu?: boolean,
  userAuthGroup?: Array<string>,
}

export default function hambugObject({ showMenu = false, userAuthGroup = [] }: Props) {
  
  /* 사용자 권한과 메뉴 권한을 비교하여 해당 메뉴를 보여줄 것인가 ? */
  const isVisiableMenuObject = (userAuthGroup:Array<string> = [], menuAuthGroup:Array<string> = []) => {
    let flag = false;
    userAuthGroup.map( (currentUserAuthGroup) => {
      menuAuthGroup.map( (currentMenuAuthGroup) => {
        if(currentUserAuthGroup === currentMenuAuthGroup) flag  =  true;
      });
    });
    return flag;
  }

  /* UL 태그 생성 */
  const createUlTag = (menuArray: any[], userAuthGroup: any[] = [''], idx:number = 0) => {
    return React.createElement('ul', { key:'menu' + idx + '-'}, createLiTag(menuArray, userAuthGroup, idx++));
  }

  /* LI 태그 생성 (메뉴목록) */
  const createLiTag = (menuArray: any[], userAuthGroup: any[] = [''], parentIdx:number = 0) => {
    return menuArray.map( (currentMenu, index) => {
      let liTag: any, aTag: any, addSubMenu: any;

      if (isVisiableMenuObject(userAuthGroup, currentMenu.menuAuthGroup)) {
        aTag = React.createElement('a', { key: 'menuLink' + '-' + index, href: currentMenu.link }, currentMenu.title);
        liTag = React.createElement('li', { key: 'menu' + '-' + index }, aTag);
        
        if( currentMenu.submenu ){
          addSubMenu = createUlTag(currentMenu.submenu, userAuthGroup, parentIdx);
          liTag = React.createElement('li', { key: 'menu' + index }, [aTag, addSubMenu]);
        }else{
          liTag = React.createElement('li', { key: 'menu' + index }, aTag);
        }
      }
      return liTag;
    });
  }

  /* 햄버거 메뉴 상태에 따라 style class 를 변경하여 메뉴를 보여줄것인지 안보여줄 것인지 결정 */
  let classDiv = showMenu ?
    /* 햄버거 메뉴를 보여줄 때 */
    (React.createElement('div', { className: 'menuList menuList-tooggle' }, createUlTag(menuList, userAuthGroup)))
    : 
    /* 햄버거 메뉴를 숨길 때 */
    (React.createElement('div', { className: 'menuList' }));

  return (
    <Fragment>
      <div className={'hambugDiv'}>
        {classDiv}
      </div>
    </Fragment >
  )
}
