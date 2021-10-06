import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import styled from 'styled-components';

export default function WindowCanvas() {
  const canvas = useRef(null);

  const TextureCache = PIXI.utils.TextureCache;
  const Sprite = PIXI.Sprite;
  const Ticker = PIXI.Ticker.shared;
  const SimpleRope = PIXI.SimpleRope;

  let app;
  let plant;
  let pot;
  let windowImg;
  let landscape;
  let pointerIsOver;
  let pointerIsDown;
  let mouseOverPlant;
  let pullSwitch;
  let blindHead;
  let count = 0;
  let isWateringCanOnMouse;

  const ropeLength = 5000 / 15;

  let points = [];
  console.log(points);

  for (let i = 0; i < 5; i++) {
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

    windowImg = new Sprite(TextureCache['openWindow']);
    windowImg.anchor.set(0.5);

    windowImg.width = app.view.width * 0.6;
    windowImg.height = app.view.height * 0.75;

    windowImg.x = app.view.width / 2 + 30;
    windowImg.y = windowImg.height / 2;
    const windowFrameWidth = windowImg.x;

    landscape = new Sprite(TextureCache['dayTimeLandscape']);
    landscape.anchor.set(0.5);

    landscape.width = windowFrameWidth * 0.8;
    landscape.height = windowImg.height * 0.8;

    landscape.x = app.view.width / 2 + 30;
    landscape.y = windowImg.y;

    plant = new SimpleRope(TextureCache['YoungStageOfPlant'], points);

    plant.width = 185;
    plant.height = 160;
    plant.x = 520;
    plant.y = 250;

    plant.interactive = true;
    plant.buttonMode = true;

    pot = new Sprite(TextureCache['PlantPot']);
    pot.anchor.set(0);

    pot.width = 95;
    pot.height = 115;
    pot.x = 560;
    pot.y = 320;

    blindHead = new Sprite(TextureCache['blindHead']);
    blindHead.anchor.set(0.5);
    blindHead.x = app.view.width / 2 + 15;
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

    pullSwitch.on('pointermove', defaultMove);

    app.stage.addChild(landscape, windowImg, plant, pot, blindHead, pullSwitch);

    app.ticker.add(plantMovingLoop);

    window.onresize = () => {
      app.resize(window.innerWidth, window.innerHeight);
    };
  }

  function defaultMove(e) {
    let position = e.data.global;
    const plantStartX = plant.x;
    const plantEndX = plant.x + plant.width;

    if (position.x > plantStartX && position.x < plantEndX) {
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

  function plantMovingLoop() {
    count += 0.1;
    for (let i = 0; i < points.length; i++) {
      points[i].y = Math.cos(i * 0.3 + count);
    }
  }

  function bigMove() {
    count += 0.1;

    for (let i = 0; i < points.length; i++) {
      points[i].y = Math.cos(i * 0.5 + count);
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
