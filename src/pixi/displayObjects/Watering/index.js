import * as PIXI from 'pixi.js';

import WateringCan from './WateringCan';
import Nail from './Nail';

export default class Watering {
  constructor(app) {
    this.app = app;
    this.plantContainer = app.stage.children[1];

    this.container = new PIXI.Container();
    this.wateringCan = null;
    this.nail = null;

    this.createSprite();
    this.render();
  }

  createSprite() {
    this.wateringCan = new WateringCan(
      this.app,
      this.app.screen.width / 2 + 350,
      380,
      this.plantContainer,
    );
    this.nail = new Nail(this.app.screen.width / 2 + 386, 387);
  }

  render() {
    this.container.addChild(this.wateringCan, this.nail);
  }
}
