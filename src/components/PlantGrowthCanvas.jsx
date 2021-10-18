import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import * as PIXI from 'pixi.js';
import { imagePath } from '../constants/pixi';

import PlantGrowth from '../pixi/displayObjects/PlantGrowth';
import background from '../assets/images/background/day.png';

const loader = PIXI.Loader.shared;

export default function PlantGrowthCanvas({ plantType, onGrowthEnd, theme }) {
  const canvas = useRef(null);
  const growthPlant = useRef();
  const app = useRef();

  function loadImage() {
    return new Promise((resolve) => {
      loader.reset();
      PIXI.utils.clearTextureCache();
      imagePath.forEach(({ alias, path }) => {
        loader.add(alias, path);
      });

      loader.load();

      loader.onComplete.add(() => {
        resolve();
      });
    });
  }

  useEffect(() => {
    (async () => {
      await loadImage();

      app.current = new PIXI.Application({
        backgroundAlpha: 0,
        width: 500,
        height: 500,
        resolution: window.devicePixelRatio,
        autoDensity: true,
        antialias: true,
      });

      canvas.current.appendChild(app.current.view);

      growthPlant.current = new PlantGrowth(app.current, plantType);
      app.current.stage.addChild(growthPlant.current.container);

      growthPlant.current.plant.play();

      app.current.start();
    })();

    return () => {
      canvas.current = null;
    };
  }, []);

  return (
    <Wrapper theme={theme}>
      <div ref={canvas}></div>
      <CloseButton onClick={() => onGrowthEnd()}>닫기</CloseButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;

  background: url(${background});
  background-size: cover;
  width: 600px;
  height: 500px;
  padding: 2rem;
  border-radius: 25px;
  border: ;
`;

const CloseButton = styled.div`
  position: absolute;
  width: 70px;
  height: 20px;
  top: 1rem;
  right: 1rem;
  background: black;
  color: white;
  padding: 1rem;
  cursor: pointer;
`;
