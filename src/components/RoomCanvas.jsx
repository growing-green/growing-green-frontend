import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import styled from 'styled-components';
import { ColorOverlayFilter } from 'pixi-filters';

export default function RooomCanvas() {
  const canvas = useRef(null);

  const TextureCache = PIXI.utils.TextureCache;
  const Sprite = PIXI.Sprite;
  const SimpleRope = PIXI.SimpleRope;
  const Container = PIXI.Container;

  let app;
  let plant;
  let pot;
  let windowSprite;
  let landscape;
  let mouseOverPlant;
  let pullSwitch;
  let blindHead;
  let wateringCan;
  let nail;
  let plantContainer;
  let mouseOverWateringCan = false;
  let wateringCanX;
  let wateringCanY;
  let wateringStart;
  let bloomFilter;
  let count = 0;
  let wateringcount = 0;

  const ropeLength = 4000 / 15;

  let points = [];

  for (let i = 0; i < 4; i++) {
    points.push(new PIXI.Point(i * ropeLength, 0));
  }

  function setup() {
    app = new PIXI.Application({
      backgroundAlpha: 0.3,
      width: window.innerWidth - 120,
      height: window.innerHeight - 80,
      antialias: true,
    });
    canvas.current.appendChild(app.view);
    app.start();

    windowSprite = new Sprite(TextureCache['openWindow']);
    windowSprite.anchor.set(0.5);
    windowSprite.width = 670;
    windowSprite.height = 530;
    windowSprite.x = app.view.width / 2 + 30;
    windowSprite.y = windowSprite.height / 2;

    const windowFrameWidth = windowSprite.x;

    landscape = new Sprite(TextureCache['dayTimeLandscape']);
    landscape.anchor.set(0.5);
    landscape.width = windowFrameWidth * 0.8;
    landscape.height = windowSprite.height * 0.8;
    landscape.x = app.view.width / 2 + 30;
    landscape.y = windowSprite.y;

    plantContainer = new Container();

    plant = new SimpleRope(TextureCache['youngStageOfPlant'], points);
    plant.width = 185;
    plant.height = 160;
    plant.x = -44;
    plant.interactive = true;
    plant.on('pointermove', defaultMove);

    pot = new Sprite(TextureCache['plantPot']);
    pot.anchor.set(0);
    pot.width = 95;
    pot.height = 115;
    pot.y = 60;

    plantContainer.width = 200;
    plantContainer.height = 275;
    plantContainer.addChild(plant, pot);
    plantContainer.anchor = 0;
    plantContainer.x = app.screen.width / 2 - 30;
    plantContainer.y = app.screen.height / 2;

    blindHead = new Sprite(TextureCache['blindHead']);
    blindHead.anchor.set(0.5);
    blindHead.x = app.screen.width / 2 + 15;
    blindHead.y = 50;
    blindHead.width = windowFrameWidth * 0.75;
    blindHead.height = 55;

    pullSwitch = new Sprite(TextureCache['pullSwitch']);
    pullSwitch.anchor.set(0);
    pullSwitch.x = blindHead.x + blindHead.width / 2 - 10;
    pullSwitch.y = 50;
    pullSwitch.width = 13;
    pullSwitch.height = 230;
    pullSwitch.interactive = true;
    pullSwitch.buttonMode = true;

    wateringCan = new Sprite(TextureCache['wateringCan']);
    wateringCan.anchor.set(0);
    wateringCan.x = 1000;
    wateringCan.y = 401;
    wateringCanX = wateringCan.x;
    wateringCanY = wateringCan.y;
    wateringCan.width = 130;
    wateringCan.height = 100;
    wateringCan.interactive = true;
    wateringCan.buttonMode = true;
    wateringCan.on('pointerup', doWateringCanPointerUp);
    wateringCan.on('pointerdown', doWateringCanPointerDown);
    wateringCan.on('pointermove', doWateringCanPointerMove);

    nail = new Sprite(TextureCache['nail']);
    nail.anchor.set(0);
    nail.x = 1030;
    nail.y = 410;
    nail.width = 13;
    nail.height = 13;

    app.stage.addChild(
      landscape,
      windowSprite,
      plantContainer,
      blindHead,
      pullSwitch,
      wateringCan,
      nail,
    );

    app.ticker.add(plantMovingLoop);

    window.onresize = () => {
      app.resize(window.innerWidth, window.innerHeight);
    };
  }

  function doWateringCanPointerMove(e) {
    if (mouseOverWateringCan === false) return;

    let position = e.data.global;
    wateringCan.x = position.x - wateringCan.width / 2;
    wateringCan.y = position.y - wateringCan.height / 2;
  }

  function doWateringCanPointerUp(e) {
    let position = e.data.global;
    const plantStartX = plantContainer.x;
    const plantEndX = plantContainer.x + plant.width;
    const plantStartY = plantContainer.y - pot.height;
    const plantEndY = plantStartY + plant.height;

    if (
      position.x > plantStartX &&
      position.x < plantEndX &&
      position.y > plantStartY &&
      position.y < plantEndY
    ) {
      app.ticker.add(watering);
    }

    mouseOverWateringCan = false;
    wateringCan.x = wateringCanX;
    wateringCan.y = wateringCanY;
  }

  function doWateringCanPointerDown() {
    mouseOverWateringCan = true;
  }

  function defaultMove(e) {
    let position = e.data.global;
    const plantStartX = plantContainer.x;
    const plantEndX = plantContainer.x + plant.width;
    const plantStartY = plantContainer.y - pot.height;
    const plantEndY = plantStartY + plant.height;

    if (
      position.x > plantStartX &&
      position.x < plantEndX &&
      position.y > plantStartY &&
      position.y < plantEndY
    ) {
      if (mouseOverPlant === true) return;

      app.ticker.remove(plantMovingLoop);
      app.ticker.add(bigMove);
      mouseOverPlant = true;
    } else {
      if (mouseOverPlant === false) return;

      app.ticker.remove(bigMove);
      app.ticker.add(plantMovingLoop);
      mouseOverPlant = false;
    }

    if (mouseOverPlant === true) {
      app.ticker.remove(plantMovingLoop);
      app.ticker.add(bigMove);
    }
  }

  function plantMovingLoop(delta) {
    count += 0.05;

    for (let i = 0; i < points.length; i++) {
      points[i].y = Math.cos(i * 0.5 + count);
    }
  }

  function watering(d) {
    if (wateringStart === true) {
      wateringcount += 0.1;
      const bloomXAmount = (Math.cos(wateringcount) + 1) / 2;

      bloomFilter.uniformGroup.uniforms.alpha = 0.7 * bloomXAmount;
    } else {
      bloomFilter = new ColorOverlayFilter(0xa4dbff);
      plantContainer.filters = [bloomFilter];
      wateringStart = true;

      setTimeout(() => {
        bloomFilter.enabled = false;
        bloomFilter.uniformGroup.uniforms.alpha = 0;
        app.ticker.remove(watering);
        wateringcount = 0;
        wateringStart = false;
      }, 3000);
    }
  }

  function growing() {
    // const bloomFilter = new BloomFilter(9, 2, 2);
    // plant.filters = [bloomFilter];
    // console.log(bloomFilter);
    // const bloomXAmount = Math.cos(count);
    // const bloomYamount = Math.sin(count);
    // bloomFilter.blurYFilter.strength = 4 * bloomYamount;
    // bloomFilter.blurXFilter.strength = 4 * bloomYamount;
    // setTimeout(() => {
    //   bloomFilter.enabled = false;
    //   app.ticker.remove(watering);
    // }, 2000);
  }

  function bigMove() {
    count += 0.1;

    for (let i = 0; i < points.length; i++) {
      points[i].y = Math.cos(i * 2 + count);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setup();
    }, 1000);
    return () => {
      app.stop();
      // canvas.current = null;
    };
  }, []);

  return (
    <Wrapper>
      <div ref={canvas} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-height: inherit;
  justify-content: center;
`;
