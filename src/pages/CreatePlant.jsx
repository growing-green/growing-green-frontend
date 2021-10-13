import React, { useState, useParams, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import PlantGrowthCanvas from '../components/PlantGrowthCanvas';
import { searchPlantInfo } from '../redux/modules/search';

export default function CreatePlant() {
  const { plantNumber } = useParams();
  const dispatch = useDispatch();
  const { plantInfo, isLoading } = useSelector((state) => state.search);
  const [selectedData, setSelectedData] = useState({
    nickname: '',
    type: '',
    growthStage: '',
  });
  const [isGrowthButtonClick, setIsGrowthButtonClick] = useState(false);

  useEffect(() => {
    dispatch(searchPlantInfo(plantNumber));
  });

  return (
    <Container>
      {isLoading === true ? (
        <p>식물정보를 불러오고 있습니다.</p>
      ) : (
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
            <PlantGrowthCanvas
              plantType={selectedData.type}
              growthStart={isGrowthButtonClick}
              onGrowthEnd={() => setIsGrowthButtonClick(false)}
            />
          </PlantInfo>
          <PlantFrom>
            <div>
              <label htmlFor="nickname">닉네임</label>
              <input
                id="nickname"
                type="text"
                placeholder="식물의 닉네임을 입력해주세요"
                value={selectedData.nickname}
                onChange={(e) =>
                  setSelectedData({
                    ...selectedData,
                    type: e.currentTarget.value,
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
            <div>
              <label htmlFor="growthStage">
                식물의 성장단계를 선택해주세요
              </label>
              <select
                id="growthStage"
                onChange={(e) =>
                  setSelectedData({
                    ...selectedData,
                    growthStage: e.currentTarget.value,
                  })
                }
              >
                <option value="1">1단계(seed stage)</option>
                <option value="2">2단계(young stage)</option>
                <option value="3">3단계(adult stage)</option>
              </select>
            </div>
            <button type="button" onClick={() => setIsGrowthButtonClick(true)}>
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
  z-index: 10;
`;
