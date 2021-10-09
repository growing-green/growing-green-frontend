import * as PIXI from 'pixi.js';
import { isMouseXOver, isMouseYOver } from '../../../utils/isMouseOver';
import { ColorOverlayFilter } from 'pixi-filters';

const TextureCache = PIXI.utils.TextureCache;
const defaultValue = {
  width: null,
  height: null,
  x: null,
  y: null,
};
let wateringCount = 0;
let filter;

export default class WateringCan extends PIXI.Sprite {
  constructor(app, x = 0, y = 0, plantContainer) {
    const texture = TextureCache['wateringCan'];
    super(texture);

    this.app = app;

    this.anchor.set(0);
    this.width = 150;
    this.height = 110;
    this.x = x;
    this.y = y;
    this.plantContainer = plantContainer;
    this.plant = plantContainer.children[0];

    this.isMouseOver = false;
    this.isOnDrag = false;
    this.isFilterOn = false;
    this.isWatering = false;

    defaultValue.width = this.width;
    defaultValue.height = this.height;
    defaultValue.x = this.x;
    defaultValue.y = this.y;

    this.interactive = true;
    this.buttonMode = true;

    this.on('pointermove', this.sizeUpAndRotate);
    this.on('pointerup', this.wateringEffect);
    this.on('pointerdown', this.setDrag);
  }

  setDrag() {
    this.isOnDrag = true;
  }

  wateringEffect(e) {
    if (e.data === undefined) return;

    this.isMouseClick = false;

    const position = e.data.global;
    const isMouseOverPlant =
      isMouseXOver(position.x, this.plant.x, this.plant.x + this.plant.width) &&
      isMouseYOver(
        position.y,
        this.plant.y - this.plant.height / 2,
        this.plant.y + this.plant.height / 2,
      );

    if (isMouseOverPlant === true) {
      this.app.ticker.add(this.watering, this);
    }

    this.x = defaultValue.x;
    this.y = defaultValue.y;
    this.isOnDrag = false;
  }

  async watering() {
    if (this.isWatering === true) return;

    if (this.isFilterOn === false) {
      filter = new ColorOverlayFilter(0xa4dbff);
      this.plantContainer.filters = [filter];
      this.isFilterOn = true;

      await new Promise((resolve) =>
        setTimeout(() => {
          filter.uniformGroup.uniforms.alpha = 0;
          wateringCount = 0;

          this.isFilterOn = false;
          this.isWatering = true;
          this.app.ticker.add(this.increase, this);
          this.app.ticker.remove(this.watering, this);
          resolve();
        }, 3000),
      );
    } else {
      wateringCount += 0.1;
      const amount = (Math.cos(wateringCount) + 1) / 2;

      filter.uniformGroup.uniforms.alpha = 0.5 * amount;
    }
  }

  increase() {
    this.isWatering = false;
  }

  sizeUpAndRotate(e) {
    if (e.data === undefined) return;
    const position = e.data.global;
    const isMouseOverWateringCan =
      isMouseXOver(position.x, this.x, this.x + this.width) &&
      isMouseYOver(
        position.y,
        this.y - this.height / 2,
        this.y + this.height / 2,
      );

    if (this.isOnDrag === true) {
      this.x = position.x - this.width / 2;
      this.y = position.y - this.height / 2;
    } else {
      if (isMouseOverWateringCan) {
        if (this.isMouseOver === true) return;

        this.width = defaultValue.width + 10;
        this.height = defaultValue.height + 10;
        this.rotation = this.rotation - 0.1;
        this.isMouseOver = true;
      } else {
        if (this.isMouseOver === false) return;

        this.width = defaultValue.width;
        this.height = defaultValue.height;
        this.rotation = this.rotation + 0.1;
        this.isMouseOver = false;
      }
    }
  }
}
