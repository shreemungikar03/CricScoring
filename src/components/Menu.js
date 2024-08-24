import React from 'react';

function Menu(props) {

  return (
    <form>
    <label for='menu'>
        <input id='menu' type='checkbox'/>
        <div className='toggle'>
            <span className='top_line common'></span>
            <span className='middle_line common'></span>
            <span className='bottom_line common'></span>
        </div>
        <div className='slide'>
            <h1 className='menu--heading'>MENU</h1>
            <ul>
                <li onClick={props.setting}>Settings</li>
                <li onClick={props.home}>Home</li>
            </ul>
        </div>
    </label>
    </form>
  );
}

export default Menu;
