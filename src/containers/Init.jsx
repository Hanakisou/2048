import React from 'react';
import { connect } from 'react-redux';
import { start_game } from '../redux/action/action';
import StartBtn from '../components/StartBtn';

const mapStateToProps = (state) => {
  return {
    data: state.matrix.toJS()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initClick: () => {dispatch(start_game())}
  }
}

const init = connect(
  mapStateToProps,
  mapDispatchToProps
)(StartBtn);

export default init;