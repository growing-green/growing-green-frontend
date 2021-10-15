import * as PIXI from 'pixi.js';

import Guage from './Guage';

export default class GuageContainer {
  constructor(app, sunGuage, waterGuage) {
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

    this.defaultWaterGuage = waterGuage.defaultGuage;
    this.currentWaterGuage = waterGuage.currentGuage;
    this.eachWaterGuageWidth = 400 / this.defaultWaterGuage;

    this.defaultSunGuage = sunGuage.defaultGuage;
    this.currentSunGuage = sunGuage.currentGuage;
    this.eachSunGuageWidth = 400 / this.defaultSunGuage;

    this.createTexture();
    this.createSprite();
    this.createLine();

    this.render();
  }

  createTexture() {
    let waterGuageWidth;

    if (this.currentWaterGuage === 0) {
      waterGuageWidth = 1;
    } else {
      waterGuageWidth = this.eachWaterGuageWidth * this.currentWaterGuage;
    }

    this.waterTexture = this.app.renderer.generateTexture(
      new PIXI.Graphics()
        .beginFill(0x8bd6f8)
        .drawRect(0, 0, waterGuageWidth, 50),
    );

    const sunGuageWidth = this.eachSunGuageWidth * this.currentSunGuage;
    this.sunTexture = this.app.renderer.generateTexture(
      new PIXI.Graphics().beginFill(0xffc438).drawRect(0, 0, sunGuageWidth, 50),
    );
  }

  createSprite() {
    this.waterGuage = new Guage(
      this.waterTexture,
      this.app.screen.width / 2 - 400,
      550,
      0x8bd6f8,
    );

    this.sunGuage = new Guage(
      this.sunTexture,
      this.app.screen.width / 2 + 20,
      550,
      0xffc438,
    );
  }

  createLine() {
    this.waterGuageLine = new PIXI.Graphics()
      .beginFill(0xebf5fa)
      .lineStyle(3, 0x99cee0)
      .drawRoundedRect(this.app.screen.width / 2 - 400, 550, 400, 50, 25)
      .endFill();

    this.sunGuageLine = new PIXI.Graphics()
      .beginFill(0xfcf2da)
      .lineStyle(3, 0xffc438)
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
