import * as PIXI from 'pixi.js';
import { isDay } from '../../../utils/isDay';
const TextureCache = PIXI.utils.TextureCache;

export default class Landscape extends PIXI.Sprite {
  constructor(x = 0, y = 0) {
    const imageSource = isDay() ? 'dayTimeLandscape' : 'nightTimeLandscape';

    const texture = TextureCache[imageSource];
    super(texture);

    this.anchor.set(0.5);
    this.width = 600;
    this.height = 410;
    this.x = x;
    this.y = y;
  }
}
