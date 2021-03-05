import React, { ReactNode } from 'react';

type Props = {
  showMenu?: boolean,
  actionListener?: any,
}


export default function hambugButton({ showMenu = false, actionListener = () => { console.log('no action'); } }: Props) {
  
  return !showMenu ? (
    <div id="menuWrapper" onClick={actionListener}>
      <div id="menuLine-wrapper">
        <div className={'line line-top-b'}></div>
        <div className={'line line-mid-b'}></div>
        <div className={'line line-bot-b'}></div>
      </div>
    </div>
  ) : (
      <div id='menuWrapper' onClick={actionListener}>
        <div id="menuLine-wrapper">
          <div className={'line line-top'}></div>
          <div className={'line line-mid'}></div>
          <div className={'line line-bot'}></div>
        </div>
      </div>

    )

}
