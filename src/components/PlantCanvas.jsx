import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import styled from 'styled-components';

import PlantContainer from '../pixi/displayObjects/PlantContainer';
import Background from '../pixi/displayObjects/Background';
import WateringContainer from '../pixi/displayObjects/WateringContainer';
import GuageContainer from '../pixi/displayObjects/GuageContainer';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { imagePath } from '../pixi/pixiConstants';
import { isWaterGuageOver } from '../utils/isWaterGuageOver';
import { isPlantAlive } from '../utils/isPlantAlive';

import { updatePlant } from '../redux/modules/plants';
import { deletePlant } from '../redux/modules/plants';

const loader = PIXI.Loader.shared;

window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
  window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });

export default function PlantCanvas() {
  const { allPlants } = useSelector((state) => state.plants);
  const { plantId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const canvas = useRef(null);
  const [plant, setPlant] = useState(null);

  let app;
  let watering;
  let guage;
  let background;
  let currentWaterGuage;
  let defaultWaterGuage;
  let currentPenaltyPoint;

  useEffect(() => {
    setPlant(allPlants[plantId]);

    if (!plant) return;

    (async (plant) => {
      const myCanvas = canvas.current;
      if (!canvas.current) return;

      setup(myCanvas, plant);
    })(plant);

    return () => {
      app?.ticker.remove(loop);
      canvas.current = null;
      app?.destroy();
    };
  }, [plant, plantId]);

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

  async function setup(myCanvas, plantInfo) {
    if (!plantInfo) return;

    await loadImage();

    app = new PIXI.Application({
      backgroundAlpha: 0,
      width: 1200,
      height: 700,
      resolution: window.devicePixelRatio,
      autoDensity: true,
      antialias: true,
    });

    myCanvas.appendChild(app.view);

    const {
      _id,
      growthStage,
      isBlindUp,
      type,
      name,
      species,
      sunGuage,
      waterGuage,
      penaltyPoints,
    } = plantInfo;

    currentWaterGuage = waterGuage.currentGuage;
    defaultWaterGuage = waterGuage.defaultGuage;
    currentPenaltyPoint = penaltyPoints;

    background = new Background(app, name, species, isBlindUp, _id);
    app.stage.addChild(background.container);

    const plant = new PlantContainer(app, type, growthStage);
    app.stage.addChild(plant.container);

    watering = new WateringContainer(app);
    app.stage.addChild(watering.container);
    guage = new GuageContainer(app, sunGuage, waterGuage);
    app.stage.addChild(guage.container);

    app.ticker.add(loop);
  }

  function loop(e) {
    const totalGuageWidth = 400;
    const wateringPeriod = 5;
    const eachGuageWidth = totalGuageWidth / wateringPeriod;

    if (watering.wateringCan.isWatering === true) {
      guage.waterGuage.width += eachGuageWidth;
      watering.wateringCan.isWatering = false;

      increaseWaterGuage(plant);
    }
  }

  function increaseWaterGuage(plant) {
    const isOver = isWaterGuageOver(currentWaterGuage, defaultWaterGuage);

    if (isOver === true) {
      currentWaterGuage += 1;

      dispatch(
        updatePlant({
          plantId: plant._id,
          data: {
            state: 'water',
            isIncrease: true,
          },
        }),
      );
    } else {
      const isAlive = isPlantAlive(currentPenaltyPoint);

      if (isAlive === true) {
        currentPenaltyPoint += 1;

        alert(
          `-1점 감점되었습니다. (현재 패널티 점수 ${currentPenaltyPoint}점)`,
        );
        dispatch(
          updatePlant({
            plantId: plant._id,
            data: {
              state: 'penalty',
              isIncrease: true,
            },
          }),
        );
      } else {
        alert('식물이 죽었습니다.');

        dispatch(deletePlant({ history, plantId: plant._id }));
      }
    }
  }

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
