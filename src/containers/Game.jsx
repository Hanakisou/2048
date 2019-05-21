import React from 'react';
import { connect } from 'react-redux';
import {
  move_up,
  move_bottom,
  move_left,
  move_right,
} from '../redux/action/action';
import Canvas from '../components/Canvas';

const mapStateToProps = (state) => {
  return {
    data: state.matrix.toJS()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    moveUp: () => {dispatch(move_up())},
    moveBottom: () => {dispatch(move_bottom())},
    moveLeft: () => {dispatch(move_left())},
    moveRight: () => {dispatch(move_right())}
  }
}

const game = connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);

export default game;