import * as PIXI from 'pixi.js';

let app;

export default class Guage extends PIXI.Sprite {
  constructor(name, texture, anchor, x, y, width, height) {
    super(texture);
    this.anchor.set(anchor);
    this.name = name;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
}
