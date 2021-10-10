import * as PIXI from 'pixi.js';
import { isMouseXOver, isMouseYOver } from '../../../utils/isMouseOver';
import { plantTypes, plantPositions } from '../../pixiConstants';

const TextureCache = PIXI.utils.TextureCache;
const ropeLength = 8000 / 5;
let points = [];
let count = 0;

for (let i = 0; i < 5; i++) {
  points.push(new PIXI.Point(i * ropeLength, 0));
}

export default class Plant extends PIXI.SimpleRope {
  constructor(app, potHeight, plant) {
    const { species, size } = plant;
    const type = plantTypes[species];
    const texture = TextureCache[`${type}${size}.png`];
    super(texture, points);
    this.app = app;

    this.width = plantPositions[species][size].width;
    this.height = plantPositions[species][size].height;
    this.x =
      (this.app.screen.width - this.width) / 2 +
      plantPositions[species][size].x;
    this.y = plantPositions[species][size].y;
    this.potHeight = potHeight;

    this.isMouseOver = false;

    this.interactive = true;
    this.on('pointermove', this.onMouseOver);

    this.app.ticker.add(this.defaultLoop);
  }

  onMouseOver(e) {
    if (e.data === undefined) return;
    const position = e.data.global;

    const isMouseOver =
      isMouseXOver(position.x, this.x, this.x + this.width) &&
      isMouseYOver(
        position.y,
        this.y - this.height / 2,
        this.y + this.height / 2,
      );

    if (isMouseOver) {
      if (this.isMouseOver === true) return;

      this.app.ticker.remove(this.defaultLoop);
      this.app.ticker.add(this.bigLoop);
      this.isMouseOver = true;
    } else {
      if (this.isMouseOver === false) return;

      this.app.ticker.remove(this.bigLoop);
      this.app.ticker.add(this.defaultLoop);
      this.isMouseOver = false;
    }
  }

  defaultLoop() {
    count += 0.08;

    for (let i = 0; i < points.length; i++) {
      points[i].y = Math.cos(i * 3 + count);
    }
  }

  bigLoop() {
    count += 0.2;

    for (let i = 0; i < points.length; i++) {
      points[i].y = Math.cos(i * 30 + count);
    }
  }
}
