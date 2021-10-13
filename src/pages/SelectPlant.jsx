import React, { useState, useHistory } from 'react';
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';

import { searchPlantNames } from '../redux/modules/search';
import ErrorBox from '../components/ErrorBox';

export default function SelectPlant({ theme }) {
  const [inputText, setInputText] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const { plants, isLoading, error } = useSelector((state) => state.search);

  if (error) {
    <ErrorBox message={error} />;
  }

  function onSearchButtonClick() {
    if (inputText.length === 0) {
      return alert('검색어를 입력해주세요');
    }

    dispatch(searchPlantNames(inputText));
  }

  function onSelectPlant(e) {
    const selectedName = e.currentTarget.children[0].innerText;

    for (let i = 0; i < plants.length; i++) {
      if (selectedName === plants[i].name) {
        history.push(`new/${plants[i].number}`);
      }
    }
  }

  function renderPlantList() {
    return (
      <>
        {plants.map((plant) => {
          return (
            <Result className="result" onClick={onSelectPlant} key={plant.name}>
              <h3>{plant.name}</h3>
              <p>추가하기</p>
            </Result>
          );
        })}
      </>
    );
  }

  function renderLoadResultMessage() {
    return <p className="info-message">불러오는 중입니다..</p>;
  }

  function renderPleaseEnterMessage() {
    return <p className="info-message">검색어를 입력해주세요</p>;
  }

  return (
    <Wrapper theme={theme}>
      <h1>Create new plant</h1>
      <InputBox>
        <BiSearch size="35" color="gray" />
        <input
          value={inputText}
          onChange={(e) => setInputText(e.currentTarget.value)}
          placeholder="키우고싶은 식물을 찾아보세요"
        />
        <button onClick={onSearchButtonClick}>검색</button>
      </InputBox>
      <ResultContainer>
        {isLoading === true
          ? renderLoadResultMessage()
          : plants.length === 0
          ? renderPleaseEnterMessage()
          : renderPlantList()}
      </ResultContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 1200px;
  height: 700px;
  border: red;

  h1 {
    margin: 3rem;
    font-size: 2.5em;
    color: #223f28;
  }
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    width: 500px;
    height: 60px;
    border: none;
    border-bottom: 1px solid gray;
    background: none;
    font-size: 1.5em;
  }
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 530px;
  margin: 1rem auto;
  padding: 2rem;
  border-radius: 0.5rem;
  min-height: 50px;
  box-shadow: 0px 10px 20px 3px rgba(162, 162, 162, 0.4);
  background: ${({ theme }) => theme.baseTheme.colors.ivory};
  text-align: left;
`;

const Result = styled.button`
  display: inline-flex;
  justify-content: space-between;

  .h3 {
    diplay: block;
  }
`;
