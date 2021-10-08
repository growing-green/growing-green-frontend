import * as PIXI from 'pixi.js';
const TextureCache = PIXI.utils.TextureCache;

export default class Blind extends PIXI.Sprite {
  constructor(x = 0, y = 0, isBlindUp) {
    const texture = TextureCache['blindHead'];
    super(texture);

    this.anchor.set(0.5);
    this.width = 470;
    this.height = 55;
    this.x = x;
    this.y = y;

    this.isUp = isBlindUp;
  }
}
