import * as PIXI from 'pixi.js';
import Blind from './Blind';
import PullSwitch from './PullSwitch';
import Window from './Window';
import Landscape from './LandScape';

const TextureCache = PIXI.utils.TextureCache;

export default class Background {
  constructor(app, isBlindUp = false) {
    this.app = app;

    this.initailBlindUp = isBlindUp;
    this.isBlindUp = isBlindUp;

    this.container = new PIXI.Container();
    this.blind = null;
    this.animationBlind = null;
    this.pullSwitch = null;
    this.window = null;
    this.landscape = null;

    this.createSprite();

    this.app.windowWidth = this.window.width;
    this.render();
    this.app.ticker.add(this.handleBlind, this);
  }

  handleBlind() {
    if (this.pullSwitch.isMouseClick === true) {
      if (this.isBlindUp === true) {
        this.animationBlind.animationSpeed = 0.45;
        this.animationBlind.play();
        this.isBlindUp = false;
      } else {
        this.animationBlind.animationSpeed = -Math.abs(
          this.animationBlind.animationSpeed,
        );
        this.animationBlind.play();
        this.isBlindUp = true;
      }

      this.pullSwitch.isMouseClick = false;
    }
  }

  createSprite() {
    let textures = [];

    if (this.initailBlindUp === true) {
      for (let i = 1; i < 7; i++) {
        textures.push(TextureCache[`blind${i}.png`]);
      }
    } else {
      for (let i = 6; i > 0; i--) {
        textures.push(TextureCache[`blind${i}.png`]);
      }
    }

    this.animationBlind = new PIXI.AnimatedSprite(textures);
    this.animationBlind.anchor.set(0.5, 0);
    this.animationBlind.position.set(this.app.screen.width / 2, 30);
    this.animationBlind.animationSpeed = 0.45;
    this.animationBlind.width = 490;

    this.animationBlind.loop = false;

    this.blind = new Blind(this.app.screen.width / 2, 50, this.isBlindUp);
    this.pullSwitch = new PullSwitch(this.blind.x + this.blind.width / 2, 50);
    this.window = new Window(this.app.screen.width / 2, 265);
    this.landscape = new Landscape(
      this.app.screen.width / 2,
      this.window.height / 2 + 10,
    );
  }

  render() {
    this.container.addChild(
      this.landscape,
      this.window,
      this.animationBlind,
      this.pullSwitch,
    );
  }
}
