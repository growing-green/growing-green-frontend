import * as PIXI from 'pixi.js';
import Blind from '../displayObjects/Blind';
import PullSwitch from '../displayObjects/PullSwitch';
import Window from '../displayObjects/Window';
import Landscape from '../displayObjects/LandScape';

export default class Background {
  constructor(app, isBlindUp) {
    this.app = app;

    this.isBlindUp = isBlindUp;

    this.container = new PIXI.Container();
    this.blind = null;
    this.pullSwitch = null;
    this.window = null;
    this.landscape = null;

    this.createSprite();

    this.app.windowWidth = this.window.width;
    this.render();
  }

  createSprite() {
    this.blind = new Blind(this.app.screen.width / 2, 50, this.isBlindUp);
    this.pullSwitch = new PullSwitch(
      this.blind.x + this.blind.width / 2 - 10,
      50,
      false,
    );
    this.window = new Window(this.app.screen.width / 2, 265);
    this.landscape = new Landscape(
      this.app.screen.width / 2,
      this.window.height / 2 + 10,
    );
  }

  render() {
    this.container.addChild(
      this.landscape,
      this.blind,
      this.window,
      this.pullSwitch,
    );
  }
}
