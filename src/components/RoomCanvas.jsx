import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import styled from 'styled-components';

import GrowingPlant from '../pixi/containers/GrowingPlant';
import Background from '../pixi/containers/Background';
import Watering from '../pixi/containers/Watering';

window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
  window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });

export default function RooomCanvas() {
  const canvas = useRef(null);

  const Container = PIXI.Container;
  const Sprite = PIXI.Sprite;

  let app;
  let wateringGuageRec;
  let sunGuageRec;
  let wateringGuageContainer;
  let sunGuageRecLineDefault;
  let watering;

  function setup() {
    app = new PIXI.Application({
      backgroundAlpha: 0,
      width: 1200,
      height: 700,
      resolution: window.devicePixelRatio,
      autoDensity: true,
      antialias: true,
    });

    canvas.current.appendChild(app.view);
    app.start();

    const background = new Background(app, true); // isBlindUp
    app.stage.addChild(background.container);

    const growingPlant = new GrowingPlant(app);
    app.stage.addChild(growingPlant.container);

    watering = new Watering(app);
    app.stage.addChild(watering.container);

    wateringGuageContainer = new Container();

    const wateringGuageGraphic = new PIXI.Graphics()
      .beginFill(0x99cee0)
      .drawRoundedRect(0, 0, 400, 400, 25);

    const texture = app.renderer.generateTexture(wateringGuageGraphic);

    wateringGuageRec = new Sprite(texture);
    wateringGuageRec.anchor.set(0.5);
    wateringGuageRec.x = app.screen.width / 2;
    wateringGuageRec.y = background.window.height + 20;

    wateringGuageContainer.addChild(wateringGuageRec);

    const mask = new PIXI.Graphics()
      .beginFill(0xffffff)
      .drawRoundedRect(
        app.screen.width / 2 + 10,
        background.window.height + 20,
        500,
        400,
        25,
      ).endFill;

    sunGuageRecLineDefault = new PIXI.Graphics();
    sunGuageRecLineDefault.lineStyle(3, 0x111111);
    sunGuageRecLineDefault.drawRoundedRect(
      app.screen.width / 2 + 10,
      background.window.height + 20,
      400,
      50,
      25,
    );

    sunGuageRec = new PIXI.Graphics();
    sunGuageRec.beginFill(0xe0ca8c);
    sunGuageRec.drawRoundedRect(
      app.screen.width / 2 + 10,
      background.window.height + 20,
      400,
      50,
      25,
    );

    app.ticker.add(increaseWateringGuage);
  }

  function increaseWateringGuage() {
    if (watering.wateringCan.isWatering === true) {
      console.log('true');
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setup();
    }, 1000);
    return () => {
      // app.stop();
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
  background-attachment: fixed;
  width: 1200px;
  height: 700px;
  border-radius: 1.5rem;
  padding-top: 20px;
`;
