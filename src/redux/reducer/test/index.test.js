import { Matrix } from '../index';
// import { START_GAME } from '../../action/action';
const expect = require('chai').expect;

function add(a,b){
  return a+b
}

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });
});