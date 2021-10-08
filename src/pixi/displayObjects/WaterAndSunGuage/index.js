import * as PIXI from 'pixi.js';

import Guage from './Guage';

export default class WaterAndSunGuage {
  constructor(app) {
    this.app = app;

    this.container = new PIXI.Container();

    const Watering = app.stage.children[2];
    this.wateringCan = Watering.children[0];

    this.waterTexture = null;
    this.waterGuage = null;
    this.sunTexture = null;
    this.sunGuage = null;
    this.waterGuageLine = null;
    this.sunGuageLine = null;

    this.createTexture();
    this.createSprite();
    this.createLine();

    this.render();
  }
  createTexture() {
    this.waterTexture = this.app.renderer.generateTexture(
      new PIXI.Graphics().beginFill(0x99cee0).drawRect(0, 0, 1, 50),
    );

    this.sunTexture = this.app.renderer.generateTexture(
      new PIXI.Graphics().beginFill(0xe0ca8c).drawRect(0, 0, 1, 50),
    );
  }

  createSprite() {
    this.waterGuage = new Guage(
      this.waterTexture,
      this.app.screen.width / 2 - 400,
      550,
      0x99cee0,
    );

    this.sunGuage = new Guage(
      this.sunTexture,
      this.app.screen.width / 2 + 20,
      550,
      0xe0ca8c,
    );
  }

  createLine() {
    this.waterGuageLine = new PIXI.Graphics()
      .beginFill(0xffffff)
      .lineStyle(3, 0x99cee0)
      .drawRoundedRect(this.app.screen.width / 2 - 400, 550, 400, 50, 25)
      .endFill();

    this.sunGuageLine = new PIXI.Graphics()
      .beginFill(0xffffff)
      .lineStyle(3, 0xe0ca8c)
      .drawRoundedRect(this.app.screen.width / 2 + 20, 550, 400, 50, 25)
      .endFill();
  }

  render() {
    this.container.addChild(
      this.waterGuageLine,
      this.waterGuage,
      this.sunGuageLine,
      this.sunGuage,
    );
  }
}
