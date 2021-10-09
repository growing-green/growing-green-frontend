import * as PIXI from 'pixi.js';
import { isMouseXOver, isMouseYOver } from '../../../utils/isMouseOver';
const TextureCache = PIXI.utils.TextureCache;

const ropeLength = 8000 / 5;

let points = [];
let count = 0;

for (let i = 0; i < 5; i++) {
  points.push(new PIXI.Point(i * ropeLength, 0));
}

export default class Plant extends PIXI.SimpleRope {
  constructor(app, x = 0, y = 0, potHeight) {
    const texture = TextureCache['youngStageOfPlant'];
    super(texture, points);

    this.app = app;
    this.width = 185;
    this.height = 160;
    this.x = x - this.width / 2;
    this.y = y;
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
