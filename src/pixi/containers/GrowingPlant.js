import * as PIXI from 'pixi.js';

import Plant from '../displayObjects/Plant';
import Pot from '../displayObjects/Pot';

export default class GrowingPlant {
  constructor(app) {
    this.app = app;

    this.container = new PIXI.Container();
    this.pot = null;
    this.plant = null;

    this.createSpriteAndRope();
    this.render();
  }

  createSpriteAndRope() {
    this.pot = new Pot(this.app.screen.width / 2, 380);
    this.plant = new Plant(
      this.app,
      this.app.screen.width / 2,
      320,
      this.pot.height,
    );
  }

  render() {
    this.container.addChild(this.plant, this.pot);
  }
}
