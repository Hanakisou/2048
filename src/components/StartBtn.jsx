import React from 'react';

const Init = ({data, initClick}) => {
  return !data.start ? (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '620px'}}>
      <button style={{backgroundColor: 'rgb(224, 151, 43)'}} onClick={() => initClick()}>start</button>
    </div>
  ) : null
}

export default Init;