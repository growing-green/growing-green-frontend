import * as PIXI from 'pixi.js';

import Plant from './Plant';
import Pot from './Pot';

export default class PlantContainer {
  constructor(app, plantInfo = { species: 'treePlant', size: 2 }) {
    this.app = app;

    this.container = new PIXI.Container();
    this.pot = null;
    this.plant = null;
    this.plantInfo = plantInfo;

    this.createSpriteAndRope();
    this.render();
  }

  createSpriteAndRope() {
    this.pot = new Pot(this.app.screen.width / 2, 380);
    this.plant = new Plant(this.app, this.pot.height, this.plantInfo);
  }

  render() {
    this.container.addChild(this.plant, this.pot);
  }
}
