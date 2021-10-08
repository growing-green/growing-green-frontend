import * as PIXI from 'pixi.js';
import Blind from './Blind';
const TextureCache = PIXI.utils.TextureCache;

export default class PullSwitch extends PIXI.Sprite {
  constructor(x = 0, y = 0, isBlindUp = true) {
    const texture = TextureCache['pullSwitch'];
    super(texture);

    this.anchor.set(0);
    this.width = 13;
    this.height = 230;
    this.x = x;
    this.y = y;

    this.isMouseOver = false;
    this.isBlindUp = isBlindUp;

    this.interactive = true;
    this.buttonMode = true;

    this.on('pointerup', this.sizeUp);
    this.on('pointerdown', this.sizeDown);
    this.on('pointermove', this.addGlowFilter);

    this.blind = null;
  }

  sizeDown() {
    if (this.isBlindUp) {
      Blind.texture = TextureCache['blind'];
      Blind.height = 480;
      Blind.y = 250;
      Blind.isBlindUp = true;
    } else {
      Blind.texture = TextureCache['blindHead'];
      Blind.height = 55;
      Blind.y = 50;
      Blind.isBlindUp = false;
    }

    this.width = this.width * 1.06;
    this.height = this.height * 1.05;
  }

  sizeUp() {
    this.width = 13;
    this.height = 230;
  }

  addGlowFilter() {}
}
