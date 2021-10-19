import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchPlantInfo } from '../redux/modules/search';
import { createNewPlant } from '../redux/modules/plants';
import styled from 'styled-components';

import PlantGrowthCanvas from '../components/PlantGrowthCanvas';
import PlantInfo from '../components/PlantInfo';
import ErrorBox from '../components/ErrorBox';
import Loading from '../components/Loading';
import Modal from '../components/Modal';

import cloverPlant from '../assets/images/plants/clover_plant.png';
import defaultPlant from '../assets/images/plants/default_plant.png';
import treePlant from '../assets/images/plants/tree_plant.png';
import chair from '../assets/images/furniture/chair.png';
import backButton from '../assets/images/arrows/back_arrow.png';

export default function CreatePlant() {
  const { plantNumber } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { plantInfo, isLoading, error } = useSelector((state) => state.search);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({
    nickname: '',
    type: 'defaultPlant',
    growthStage: '1',
  });

  useEffect(() => {
    dispatch(searchPlantInfo(plantNumber));
  }, [dispatch, plantNumber]);

  if (error) {
    return <ErrorBox message={error} />;
  }

  if (isLoading === true) {
    return <Loading size="60px" text="식물 정보를 불러오고 있습니다..." />;
  }

  function submitData(e) {
    e.preventDefault();

    if (selectedData.nickname.length === 0) {
      return alert('식물의 이름을 입력해주세요.');
    }

    dispatch(
      createNewPlant({
        history,
        name: selectedData.nickname,
        species: plantInfo.name,
        type: selectedData.type,
        isSunPlant: plantInfo.isSunPlant,
        watering: plantInfo.watering,
        growthStage: selectedData.growthStage,
      }),
    );
  }

  return (
    <Container>
      {plantInfo && (
        <>
          <Aside>
            <PlantInfo plant={plantInfo} />
            <ImageWrapper>
              {selectedData.type === 'cloverPlant' && (
                <img className="plant" src={cloverPlant} alt="clover plant" />
              )}
              {selectedData.type === 'defaultPlant' && (
                <img className="plant" src={defaultPlant} alt="default plant" />
              )}
              {selectedData.type === 'treePlant' && (
                <img className="plant" src={treePlant} alt="tree plant" />
              )}
              <img className="chair" src={chair} alt="chair" />
            </ImageWrapper>
          </Aside>
          <PlantFrom onSubmit={submitData}>
            <div>
              <input
                id="nickname"
                className="nickname"
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
            <label htmlFor="type">식물의 형태를 선택해주세요</label>
            <select
              id="type"
              className="type"
              onChange={(e) =>
                setSelectedData({
                  ...selectedData,
                  type: e.currentTarget.value,
                })
              }
            >
              <option value="defaultPlant">default</option>
              <option value="treePlant">tree</option>
              <option value="cloverPlant">clover</option>
            </select>
            <button type="button" onClick={() => setIsModalOpen(true)}>
              성장 미리보기
            </button>
            <label htmlFor="type">식물의 성장 단계를 선택해주세요</label>
            <select
              id="type"
              className="type"
              onChange={(e) =>
                setSelectedData({
                  ...selectedData,
                  growthStage: e.currentTarget.value,
                })
              }
            >
              <option value="1">1단계</option>
              <option value="2">2단계</option>
              <option value="3">3단계</option>
            </select>
            <button type="submit">추가하기</button>
          </PlantFrom>
          {isModalOpen && (
            <Modal closeModal={() => setIsModalOpen(false)}>
              <PlantGrowthCanvas
                plantType={selectedData.type}
                onGrowthEnd={() => setIsModalOpen(false)}
              />
            </Modal>
          )}
        </>
      )}
      <BackButton onClick={() => history.push('/create')} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Aside = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin-right: 2rem;
`;

const PlantFrom = styled.form`
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 600px;
  height: 400px;
  margin: 1rem auto;
  padding: 2rem;
  border-radius: 0.5rem;
  min-height: 50px;
  box-shadow: 0px 10px 20px 3px rgba(162, 162, 162, 0.4);
  background: ${({ theme }) => theme.baseTheme.colors.ivory};
  text-align: left;

  .nickname {
    width: 100%;
    height: 50px;
    font-size: 1.3em;
    font-family: 'GowunBatang-Regular';
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  bottom: -10px;
  left: 10px;
  display: inline-block;
  align-items: center;
  flex-direction: column;
  padding-bottom: 10px;
  width: 200px;
  height: 310px;

  .chair {
    position: absolute;
    margin-bottom: 10px;
    width: 140px;
    bottom: 10px;
    right: 80px;
    z-index: -1;
  }

  .plant {
    position: absolute;
    width: 100px;
    top: 40px;
    right: 100px;
  }
`;

const BackButton = styled.button`
  position: absolute;
  width: 76px;
  height: 52px;
  left: 2.5rem;
  border: none;
  bottom: 1rem;
  background: url(${backButton}) no-repeat;
  background-size: cover;
`;
