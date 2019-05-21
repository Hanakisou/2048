import React, { Component } from 'react';

// const canvas = ({data, moveUp, moveBottom, moveLeft, moveRight}) => {
//   const handleClick = () => {
    
//   }
//   return data.start ? (
//     <div onKeyPress={() => handleClick()}>
//       {data.grids.map((v,i) => {
//         return <div style={{overflow: 'hidden'}} key={i}>
//           {v.map((each,index) => {
//             return <div style={{width: '22vw', height: '11vh',lineHeight: '11vh',textAlign: 'center', float: 'left', marginLeft: '5px', marginBottom: '5px', backgroundColor: 'rgba(238, 228, 218, 0.35)'}} key={index}>{each.value ? each.value : ''}</div>
//           })}
//         </div>
//       })}
//     </div>
//   ) : null
// }

class canvas extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount() {
    window.addEventListener('keydown', (e) => this.handleKeyDown(e))
  }
  handleKeyDown(e){
    const { moveUp, moveBottom, moveLeft, moveRight } = this.props;
    switch(e.keyCode){
      case 40:
        moveBottom();
        break;
      case 39:
        moveRight();
        break;
      case 38:
        moveUp();
        break;
      case 37:
        moveLeft();
        break;
    }
  }
  render(){
    const { data } = this.props;
    console.log('data:~~', data);
    return data.start ? (
      <div>
        {data.grids.map((v,i) => {
          return <div style={{overflow: 'hidden'}} key={i}>
            {v.map((each,index) => {
              return <div style={{width: '22vw', height: '11vh',lineHeight: '11vh',textAlign: 'center', float: 'left', marginLeft: '5px', marginBottom: '5px', backgroundColor: 'rgba(238, 228, 218, 0.35)'}} key={index}>{each.value ? each.value : ''}</div>
            })}
          </div>
        })}
      </div>
    ) : null
  }
}

export default canvas;