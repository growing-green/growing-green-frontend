import * as PIXI from 'pixi.js';
const TextureCache = PIXI.utils.TextureCache;

export default class Landscape extends PIXI.Sprite {
  constructor(x = 0, y = 0) {
    const texture = TextureCache['dayTimeLandscape'];
    super(texture);

    this.anchor.set(0.5);
    this.width = 600;
    this.height = 410;
    this.x = x;
    this.y = y;
  }
}
