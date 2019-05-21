import Immutable, { List, merge } from 'immutable';
import {
  START_GAME,
  MOVE_UP,
  MOVE_BOTTOM,
  MOVE_LEFT,
  MOVE_RIGHT,
  PLACE_RANDOM
} from '../action/action_type';

const initialState = Immutable.fromJS({
  grids: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
  over: false,
  win: false,
  score: 0,
  bestScore: 0,
  overMsg: '游戏结束',
  start: false,
});

class Mat{
  constructor(state){
    this.grids = state.get('grids').toJS();
    this.over = state.get('over');
    this.win = state.get('win');
    this.score = state.get('score');
    this.bestScore = state.get('bestScore');
    this.overMsg = state.get('overMsg');
  }
  // init(){
  //   let grids = [];
  //   for(let x=0;x<4;x++){
  //     let arr = grids[x] = [];
  //     for(let y=0;y<4;y++){
  //       arr.push(null)
  //     }
  //   }
  //   return grids;
  // }
  tile(position, value){
    let tile = {
      x: position.x,
      y: position.y,
      value: value || 2,
      previousPosition: null,
      mergedFrom: null
    }
    return tile;
  }
  // 随机填充一个格子
  addRandom(){
    if(this.gridsAvailable()){
      const val = Math.random() > .9 ? 4 : 2;
      const grid = this.randomAvailablegrid();
      const tile = this.tile(grid, val);
      this.insertTile(tile);
      return this.grids;
    }
  }
  // 插入一个单元格
  insertTile(tile){
    this.grids[tile.x][tile.y] = tile;
  }
  // 删除一个单元格
  removeTile(tile){
    this.grids[tile.x][tile.y] = 0;
  }
  // 随机获取一个可填充的格子
  randomAvailablegrid(){
    const grids = this.availablegrids();
    if (grids.length) {
      return grids[Math.floor(Math.random() * grids.length)];
    }
  }
  // 获取可填充格子的坐标
  availablegrids(){
    let grids = [];
    for(let x=0;x<4;x++){
      for(let y=0;y<4;y++){
        if(!this.grids[x][y]){
          grids.push({x,y})
        }
      }
    }
    return grids;
  }
  // 是否存在空单元格
  gridsAvailable(){
    return !!this.availablegrids().length;
  }
  // 空单元格，格子还未填充数字
  emptGrid(grid){
    return !this.gridContent(grid);
  }
  getVector(direction){
    const map = {
      0: { // 上
        x: -1,
        y: 0
      },
      1: { // 右
        x: 0,
        y: 1
      },
      2: { // 下
        x: 1,
        y: 0
      },
      3: { // 左
        x: 0,
        y: -1
      }
    }
    return  map[direction];
  }
  buildTraversals(vector){
    const traversals = {
      x: [],
      y: []
    }
    for(let i=0;i<4;i++){
      traversals.x.push(i);
      traversals.y.push(i);
    }
    if (vector.x === 1) { // 向右
      traversals.x = traversals.x.reverse();
    }

    if (vector.y === 1) { // 向下
      traversals.y = traversals.y.reverse();
    }
    return traversals;
  }
  findFarthestTail(grid, vector){
    let previous;
    do {
      previous = grid;
      grid = {
        x: grid.x + vector.x,
        y: grid.y + vector.y
      }
    }while(this.withinBounds(grid) && this.emptGrid(grid));

    return {
      farthest: previous,
      next: grid
    }
  }
  updatePosition(tile, grid){
    return Object.assign({},tile, grid);
  }
  moveTile(tile, grid){
    const position = this.updatePosition(tile, grid);
    this.grids[tile.x][tile.y] = 0;
    this.grids[grid.x][grid.y] = position;
  }
  move(direction){
    const vector = this.getVector(direction);
    const traversal = this.buildTraversals(vector);

    let grid;
    let tile;
    let target;
    let moved = false;
    this.prepareTiles();

    traversal.x.forEach(x => {
      traversal.y.forEach(y => {
        grid = {x,y}
        tile = this.gridContent(grid);
        if(tile){
          const positions = this.findFarthestTail(grid, vector);
          const next = this.gridContent(positions.next);
          if(next && next.value === tile.value && !next.mergedFro){
            const merged = this.tile(positions.next, tile.value * 2);
            target = merged;
            merged.mergedFrom = [tile, next];
            this.insertTile(merged);
            this.removeTile(tile);

            this.score += merged.value;
          }else{
            target = positions.farthest;
            this.moveTile(tile, positions.farthest);
          }

          // 是否从当前位置移到当前位置
          if (!this.positionsEqual(grid, target)) {
            moved = true;
          }
        }
      })
    })
    if (moved) {
      this.addRandom();
      if(!this.movesAvailable()){
        this.over = true
      }
    }
    return this.actuate();
  }
  movesAvailable(){
    return this.gridsAvailable() || this.tileMatchesAvailable()
  }
  tileMatchesAvailable(){
    let tile;
    for(let x=0;x<4;x++){
      for(let y=0;y<4;y++){
        tile = this.gridContent({x,y});
        if(tile){
          for(let i=0;i<4;i++){
            const vector = this.getVector(i);
            const grid = {
              x: x + vector.x,
              y: y + vector.y
            }
            const other = this.gridContent(grid);
            if (other && other.value === tile.value) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  positionsEqual(first, second){
    return first.x === second.x && first.y === second.y;
  }
  //保存上一次位置
  prepareTiles(){
    let tile;
    for(let x=0;x<4;x++){
      for(let y=0;y<4;y++){
        tile = this.grids[x][y];
        if(tile){
          tile.previousPosition = {x,y}
        }
      }
    }
  }
  // 获取单元格内容
  gridContent(grid){
    if(this.withinBounds(grid)){
      return this.grids[grid.x][grid.y] || 0
    }else{
      return 0
    }
  }
  withinBounds(grid){
    return grid.x >=0 && grid.x < 4 && grid.y >=0 && grid.y < 4
  }
  actuate(){
    return Immutable.fromJS({
      grids: this.grids,
      over: this.over,
      won: this.won,
      score: this.score
    })
  }
}

export const matrix = ( state=initialState, action) => {
  const mat = new Mat(state);
  switch(action.type){
    case START_GAME:
      const grids = List(mat.addRandom());
      return state.set('grids', grids).set('start', true);
    case MOVE_UP:
      // const upGrids = List(mat.move(0));
      const upData = mat.move(0);
      // return state.set('grids', upGrids);
      return merge(state, upData);
    case MOVE_BOTTOM:
      // const bottomGrids = List(mat.move(2));
      const bottomData = mat.move(2);
      // return state.set('grids', bottomGrids);
      return merge(state, bottomData);
    case MOVE_LEFT:
      // const leftGrids = List(mat.move(3));
      const leftData = mat.move(3);
      // return state.set('grids', leftGrids);
      return merge(state, leftData)
    case MOVE_RIGHT:
      // const rightGrids = List(mat.move(1));
      const rightData = mat.move(1);
      // return state.set('grids', rightGrids);
      return merge(state, rightData);
    default:
      return state;
  }
}
