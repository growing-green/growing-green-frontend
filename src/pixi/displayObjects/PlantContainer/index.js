import * as PIXI from 'pixi.js';

import Plant from './Plant';
import Pot from './Pot';

export default class PlantContainer {
  constructor(app, type, growthStage) {
    this.app = app;

    this.container = new PIXI.Container();
    this.pot = null;
    this.plant = null;
    this.type = type;
    this.growthStage = growthStage;

    this.createSpriteAndRope();
    this.render();
  }

  createSpriteAndRope() {
    this.pot = new Pot(this.app.screen.width / 2, 380);
    this.plant = new Plant(
      this.app,
      this.pot.height,
      this.type,
      this.growthStage,
    );
  }

  render() {
    this.container.addChild(this.plant, this.pot);
  }
}
