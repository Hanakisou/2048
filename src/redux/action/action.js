import {
  START_GAME,
  MOVE_UP,
  MOVE_BOTTOM,
  MOVE_LEFT,
  MOVE_RIGHT,
  PLACE_RANDOM
} from './action_type';

const start_game = () => {
  return {
    type: START_GAME
  }
}

const move_up = () => {
  return {
    type: MOVE_UP
  }
}

const move_bottom = () => {
  return {
    type: MOVE_BOTTOM
  }
}

const move_left = () => {
  return {
    type: MOVE_LEFT
  }
}

const move_right = () => {
  return {
    type: MOVE_RIGHT
  }
}

export {
  start_game,
  move_up,
  move_bottom,
  move_left,
  move_right,
}