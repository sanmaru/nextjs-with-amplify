import React, { Fragment, useEffect, useState } from 'react'
import menuList from '../../../config/menu.json'
import Link from 'next/link'

type Props = {
  showMenu?: boolean,
  userGroup?: Array<string>,
}

export default function hambugObject({ showMenu = false, userGroup = [] }: Props) {

  let li = new Array();
  
  let liTag2 = React.createElement('li', {key:2}, '메뉴2');
  let liTag1 = React.createElement('li', {key:1}, '메뉴1');
  li.push(liTag1);
  li.push(liTag2);
  let ulTag = React.createElement('ul', {}, li );

  let classDiv = showMenu ? 
                  ( React.createElement('div', {className:'menuList menuList-tooggle'},ulTag) )
                  : (React.createElement('div', {className:'menuList'}) );

  console.log(classDiv);

  return (
    <Fragment>
      {classDiv}
    </Fragment >
  )
}
