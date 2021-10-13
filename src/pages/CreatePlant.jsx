import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import PlantGrowthCanvas from '../components/PlantGrowthCanvas';
import { searchPlantInfo } from '../redux/modules/search';
import Modal from '../components/Modal';

import cloverPlant from '../assets/images/plants/clover_plant.png';
import defaultPlant from '../assets/images/plants/default_plant.png';
import treePlant from '../assets/images/plants/tree_plant.png';
import chair from '../assets/images/furniture/chair.png';

export default function CreatePlant() {
  const { plantNumber } = useParams();
  const dispatch = useDispatch();
  const { plantInfo, isLoading } = useSelector((state) => state.search);
  const [selectedData, setSelectedData] = useState({
    nickname: '',
    type: 'default',
    growthStage: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(searchPlantInfo(plantNumber));
  }, []);

  if (isLoading === true) {
    return <p>식물정보를 불러오고 있습니다.</p>;
  }

  return (
    <Container>
      {plantInfo && (
        <>
          <PlantInfo>
            <InfoBox>
              <h3>식물 정보</h3>
              <p>이름: {plantInfo.name}</p>
              <p>학명: {plantInfo.scientificName}</p>
              <p>과: {plantInfo.species}</p>
              <p>물주기: {plantInfo.watering}일</p>
              <p>광도: {plantInfo.isSun === true ? '양지 식물' : '음지식물'}</p>
            </InfoBox>
            <ChairImage src={chair} />
            <PlantImageWrapper>
              {selectedData.type === 'clover' && (
                <img src={cloverPlant} alt="clover plant" />
              )}
              {selectedData.type === 'default' && (
                <img src={defaultPlant} alt="default plant" />
              )}
              {selectedData.type === 'tree' && (
                <img src={treePlant} alt="alt plant" />
              )}
            </PlantImageWrapper>
            {isModalOpen && (
              <Modal closeModal={() => setIsModalOpen(false)}>
                <PlantGrowthCanvas
                  plantType={selectedData.type}
                  onGrowthEnd={() => setIsModalOpen(false)}
                />
              </Modal>
            )}
          </PlantInfo>
          <PlantFrom>
            <div>
              <input
                id="nickname"
                type="text"
                placeholder="식물의 닉네임을 입력해주세요"
                value={selectedData.nickname}
                onChange={(e) =>
                  setSelectedData({
                    ...selectedData,
                    nickname: e.currentTarget.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="type">식물의 형태를 선택해주세요</label>
              <select
                id="type"
                onChange={(e) =>
                  setSelectedData({
                    ...selectedData,
                    type: e.currentTarget.value,
                  })
                }
              >
                <option value="default">default</option>
                <option value="tree">tree</option>
                <option value="clover">clover</option>
              </select>
            </div>
            <button type="button" onClick={() => setIsModalOpen(true)}>
              성장 미리보기
            </button>
            <button type="submit">추가하기</button>
          </PlantFrom>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const PlantInfo = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin-left: 5rem;
`;

const InfoBox = styled.div`
  width: 240px;
  text-align: left;
`;

const PlantFrom = styled.form`
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 400px;
  margin: 1rem auto;
  padding: 2rem;
  border-radius: 0.5rem;
  min-height: 50px;
  box-shadow: 0px 10px 20px 3px rgba(162, 162, 162, 0.4);
  background: ${({ theme }) => theme.baseTheme.colors.ivory};
  text-align: left;
`;

const PlantImageWrapper = styled.div`
  img {
    width: 100px;
  }
`;

const ChairImage = styled.img`
  position: absolute;
  bottom: -10px;
  right: 3rem;
  width: 140px;
  z-index: -1;
`;
