import React, { useState } from 'react';
import HambugButton from './hambugButton';
import HambugObject from './menuObject'

type Props = {
  userGroup?: Array<string>,
}


export default function hambugMenu({ userGroup = [] }: Props) {
  const [showMenu, setShowMenu] = useState(false);
  // const menuArray:Array<any> = new Array(menuJson);

  const eventListenner = () => {
    setShowMenu(!showMenu);
  }

  return !showMenu ? (
    <div >
      <HambugButton showMenu={showMenu} actionListener={eventListenner} />
      <HambugObject showMenu={showMenu} userGroup={userGroup}/>
    </div>
  ) : (
      <div>
        <HambugButton showMenu={showMenu} actionListener={eventListenner} />
        <HambugObject showMenu={showMenu} userGroup={userGroup}/>
      </div>
    )

}
