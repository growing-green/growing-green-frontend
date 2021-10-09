import * as PIXI from 'pixi.js';

import { plantTypes } from '../../pixiConstants';
import { AdvancedBloomFilter } from 'pixi-filters';

const TextureCache = PIXI.utils.TextureCache;
let count = 0;

export default class PlantGrowth {
  constructor(app, type = 'defaultPlant') {
    this.app = app;
    this.type = 'defaultPlant';

    this.container = new PIXI.Container();
    this.type = plantTypes[type];
    this.plant = null;

    this.createSprite();
    this.app.ticker.add(this.filterEffect, this);
    this.isGrowing = true;

    this.render();
  }

  createSprite() {
    const textures = [];

    for (let i = 1; i < 4; i++) {
      textures.push(TextureCache[`${this.type}${i}.png`]);
    }

    this.plant = new PIXI.AnimatedSprite(textures);

    this.plant.anchor.set(0.5, 1);
    this.plant.position.set(800, 600);
    this.plant.scale.set(1, 1);
    this.plant.animationSpeed = 0.01;
    this.plant.play();

    this.filter = new AdvancedBloomFilter(0.5, 0.5, 0.6, 0, 10);
    this.plant.filters = [this.filter];
  }

  filterEffect() {
    count += 0.12;

    if (this.isGrowing === true) {
      const amount = Math.sin(count) * 0.03 + 1.05;
      this.filter.bloomScale = 0.1;
      this.filter.brightness = amount;
      this.plant.width = this.plant.width * 1.0014;
      this.plant.height = this.plant.height * 1.0014;
    }

    setTimeout(() => {
      this.plant.width = 277;
      this.plant.height = 286;
      this.filter.bloomScale = 0.0;
      this.filter.brightness = 1.09;
      this.plant.stop();
      this.isGrowing = false;
      this.app.ticker.remove(this.filterEffect, this);
    }, 4800);
  }

  render() {
    this.container.addChild(this.plant);
  }
}
