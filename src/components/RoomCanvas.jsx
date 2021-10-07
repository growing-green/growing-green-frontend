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
  let wateringGuageRec;
  let sunGuageRec;
  let wateringGuageContainer;
  let wateringGuageRecDefault;
  let sunGuageRecLineDefault;
  let switchCount = 0;
  let isBlindDown = false;

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
    windowSprite.width = 680;
    windowSprite.height = 530;
    windowSprite.x = app.screen.width / 2;
    windowSprite.y = windowSprite.height / 2;

    landscape = new Sprite(TextureCache['dayTimeLandscape']);
    landscape.anchor.set(0.5);
    landscape.width = 600;
    landscape.height = 410;
    landscape.x = app.screen.width / 2;
    landscape.y = windowSprite.height / 2 + 10;

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

    plantContainer.anchor = 0.5;
    plantContainer.width = 200;
    plantContainer.height = 275;
    plantContainer.addChild(plant, pot);
    plantContainer.x = app.screen.width / 2 - 30;
    plantContainer.y = 320;

    blindHead = new Sprite(TextureCache['blindHead']);
    blindHead.anchor.set(0.5);
    blindHead.x = app.screen.width / 2;
    blindHead.y = 50;
    blindHead.width = 470;
    blindHead.height = 55;

    pullSwitch = new Sprite(TextureCache['pullSwitch']);
    pullSwitch.anchor.set(0);
    pullSwitch.x = blindHead.x + blindHead.width / 2 - 10;
    pullSwitch.y = 50;
    pullSwitch.width = 13;
    pullSwitch.height = 230;
    pullSwitch.interactive = true;
    pullSwitch.buttonMode = true;

    pullSwitch.on('pointerup', doPullSwitchPointerUp);
    pullSwitch.on('pointerdown', doPullSwitchPointerDown);
    pullSwitch.on('pointerout', doPullSwitchPointerLeave);

    wateringCan = new Sprite(TextureCache['wateringCan']);
    wateringCan.anchor.set(0);
    wateringCan.width = 150;
    wateringCan.height = 110;
    wateringCan.x = app.screen.width / 2 + windowSprite.width / 2 + 10;
    wateringCan.y = windowSprite.height - wateringCan.width;
    wateringCanX = wateringCan.x;
    wateringCanY = wateringCan.y;

    wateringCan.interactive = true;
    wateringCan.buttonMode = true;
    wateringCan.on('pointerup', doWateringCanPointerUp);
    wateringCan.on('pointerdown', doWateringCanPointerDown);
    wateringCan.on('pointermove', doWateringCanPointerMove);

    nail = new Sprite(TextureCache['nail']);
    nail.anchor.set(0);
    nail.width = 13;
    nail.height = 13;
    nail.x = app.screen.width / 2 + windowSprite.width / 2 + 46;
    nail.y = windowSprite.height - wateringCan.width + 7;

    wateringGuageContainer = new Container();

    wateringGuageRecDefault = new PIXI.Graphics();
    wateringGuageRecDefault.lineStyle(3, 0xffffff);
    wateringGuageRecDefault.drawRoundedRect(
      app.screen.width / 2 - 410,
      windowSprite.height + 20,
      400,
      50,
      25,
    );

    wateringGuageRec = new PIXI.Graphics();
    wateringGuageRec.beginFill(0x99cee0);
    wateringGuageRec.drawRoundedRect(
      app.screen.width / 2 - 410,
      windowSprite.height + 20,
      400,
      50,
      25,
    );

    sunGuageRecLineDefault = new PIXI.Graphics();
    sunGuageRecLineDefault.lineStyle(3, 0xffffff);
    sunGuageRecLineDefault.drawRoundedRect(
      app.screen.width / 2 + 10,
      windowSprite.height + 20,
      400,
      50,
      25,
    );

    sunGuageRec = new PIXI.Graphics();
    sunGuageRec.beginFill(0xe0ca8c);
    sunGuageRec.drawRoundedRect(
      app.screen.width / 2 + 10,
      windowSprite.height + 20,
      400,
      50,
      25,
    );

    app.stage.addChild(
      landscape,
      windowSprite,
      blindHead,

      plantContainer,
      pullSwitch,
      wateringCan,
      nail,
      wateringGuageRecDefault,
      wateringGuageRec,
      sunGuageRecLineDefault,
      sunGuageRec,
    );

    app.ticker.add(objectMovingLoop);

    window.onresize = () => {
      app.resize(window.innerWidth, window.innerHeight);
    };
  }

  function doPullSwitchPointerLeave() {
    pullSwitch.width = 13;
    pullSwitch.height = 230;
  }

  function doPullSwitchPointerUp() {
    pullSwitch.width = 13;
    pullSwitch.height = 230;
  }

  function doPullSwitchPointerDown() {
    if (isBlindDown) {
      blindHead.texture = TextureCache['blindHead'];
      blindHead.height = 55;
      blindHead.y = 50;
      isBlindDown = false;
    } else {
      blindHead.texture = TextureCache['blind'];
      blindHead.height = 480;
      blindHead.y = 250;
      isBlindDown = true;
    }
    pullSwitch.width = 14;
    pullSwitch.height = 234;
  }

  function objectMovingLoop() {
    count += 0.05;

    for (let i = 0; i < points.length; i++) {
      points[i].y = Math.cos(i * 0.5 + count);
    }
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

      app.ticker.remove(objectMovingLoop);
      app.ticker.add(bigMove);
      mouseOverPlant = true;
    } else {
      if (mouseOverPlant === false) return;

      app.ticker.remove(bigMove);
      app.ticker.add(objectMovingLoop);
      mouseOverPlant = false;
    }

    if (mouseOverPlant === true) {
      app.ticker.remove(objectMovingLoop);
      app.ticker.add(bigMove);
    }
  }

  function watering() {
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
        app.ticker.add(increaseWateringGuage);
      }, 3000);
    }
  }

  function increaseWateringGuage() {
    const defaultGuage = 5;
    const defaultGuageWidth = 400;
    const oneGuageWidth = defaultGuageWidth / defaultGuage;

    wateringGuageRec.width = wateringGuageRec.width - oneGuageWidth;
    wateringGuageRec.x = wateringGuageRec.x + 52.5;
    app.ticker.remove(increaseWateringGuage);
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
