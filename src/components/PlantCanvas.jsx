import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as PIXI from 'pixi.js';
import styled from 'styled-components';

import { updatePlant, deletePlant } from '../redux/modules/plants';
import TextButton from '../components/TextButton';

import PlantContainer from '../pixi/displayObjects/PlantContainer';
import Background from '../pixi/displayObjects/Background';
import WateringContainer from '../pixi/displayObjects/WateringContainer';
import GuageContainer from '../pixi/displayObjects/GuageContainer';

import { isWaterGuageOver } from '../utils/isWaterGuageOver';
import { isPlantAlive } from '../utils/isPlantAlive';

window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
  window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });

export default function PlantCanvas({ plantInfo }) {
  const { isDone } = useSelector((state) => state.images);
  const dispatch = useDispatch();
  const history = useHistory();
  const canvas = useRef(null);
  const plant = useRef(plantInfo);

  let app;
  let watering;
  let guage;
  let background;
  let currentWaterGuage;
  let defaultWaterGuage;
  let currentPenaltyPoint;
  let plantBox;

  useEffect(() => {
    if (!isDone) return;

    setup(canvas.current, plant.current);

    return () => {
      app.ticker.remove(loop);
      app.destroy();
    };
  }, []);

  function setup(canvas, plant) {
    app = new PIXI.Application({
      backgroundAlpha: 0,
      width: 1200,
      height: 700,
      resolution: window.devicePixelRatio,
      autoDensity: true,
      antialias: true,
    });

    canvas.appendChild(app.view);

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
      isDead,
    } = plant;

    currentWaterGuage = waterGuage.currentGuage;
    defaultWaterGuage = waterGuage.defaultGuage;
    currentPenaltyPoint = penaltyPoints;

    background = new Background(
      app,
      name,
      species,
      isBlindUp,
      _id,
      currentPenaltyPoint,
    );
    app.stage.addChild(background.container);

    plantBox = new PlantContainer(app, type, growthStage, isDead);
    app.stage.addChild(plantBox.container);

    watering = new WateringContainer(app, isDead);
    app.stage.addChild(watering.container);

    guage = new GuageContainer(app, sunGuage, waterGuage);
    app.stage.addChild(guage.container);

    app.ticker.add(loop);
  }

  function loop() {
    const totalGuageWidth = 400;
    const wateringPeriod = plant.current.waterGuage.defaultGuage;
    const eachGuageWidth = totalGuageWidth / wateringPeriod;

    if (watering.wateringCan.isWatering === true) {
      guage.waterGuage.width += eachGuageWidth;
      watering.wateringCan.isWatering = false;

      increaseWaterGuage(plant.current);
    }
  }

  function increaseWaterGuage(plant) {
    const isOver = isWaterGuageOver(currentWaterGuage, defaultWaterGuage);

    dispatch(
      updatePlant({
        plantId: plant._id,
        data: {
          state: 'water',
          isIncrease: true,
        },
      }),
    );

    if (isOver === true) {
      currentWaterGuage += 1;
    } else {
      const isAlive = isPlantAlive(currentWaterGuage);

      if (isAlive === true) {
        currentPenaltyPoint += 1;
        background.pointText.text = `${10 - currentPenaltyPoint}`;
        alert(
          `-1점 감점되었습니다. (현재 패널티 점수 ${
            10 - currentPenaltyPoint
          }점)`,
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

        dispatch(
          updatePlant({
            plantId: plant._id,
            data: {
              state: 'dead',
            },
          }),
        );

        window.location.reload();
      }
    }
  }

  function onDeleteButtonClick() {
    dispatch(deletePlant(plantInfo._id));
    history.push('/');
    window.location.reload();
  }

  return (
    <Wrapper>
      {plantInfo?.isDead === true && (
        <ButtonWrapper>
          <TextButton
            onClick={onDeleteButtonClick}
            variant="rounded"
            size="short"
            color="translucentRed"
            label="식물 삭제하기"
          />
        </ButtonWrapper>
      )}
      <div ref={canvas} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  background-attachment: fixed;
  width: 1200px;
  height: 700px;
  border-radius: 1.5rem;
  padding-top: 40px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(100px, -130px);
`;
