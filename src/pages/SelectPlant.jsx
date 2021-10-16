import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import styled, { ThemeConsumer } from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';

import { searchPlantNames } from '../redux/modules/search';
import ErrorBox from '../components/ErrorBox';
import Loading from '../components/Loading';

export default function SelectPlant({ theme }) {
  const [inputText, setInputText] = useState('');
  const dispatch = useDispatch();
  const { plants, isLoading, error } = useSelector((state) => state.search);

  if (error) {
    <ErrorBox message={error} />;
  }

  function onSearchButtonClick(e) {
    e.preventDefault();

    if (e.keyCode === 13) {
      if (inputText.length === 0) {
        return alert('검색어를 입력해주세요');
      }

      dispatch(searchPlantNames(inputText));
    }
  }

  function renderPlantList() {
    return (
      <>
        {plants.map((plant, index) => {
          return (
            <Result
              to={`/create/${plants[index].number}`}
              className="result"
              key={plant.name}
            >
              <h3>{plant.name}</h3>
            </Result>
          );
        })}
      </>
    );
  }

  function renderLoadResultMessage() {
    return (
      <>
        <Loading size="50px" text="불러오는 중입니다.." />
      </>
    );
  }

  function renderPleaseEnterMessage() {
    return <p className="info-message">검색어를 입력해주세요</p>;
  }

  return (
    <Wrapper theme={theme}>
      <h1>Create new plant</h1>
      <InputBox>
        <div className="search-box">
          <BiSearch size="35" color="#393939" />
          <input
            className="search-input"
            value={inputText}
            onChange={(e) => setInputText(e.currentTarget.value)}
            placeholder="키우고싶은 식물을 찾아보세요"
            onKeyUp={onSearchButtonClick}
          />
        </div>
      </InputBox>
      <ResultContainer>
        {isLoading === true
          ? renderLoadResultMessage()
          : plants?.length === 0
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

  .search-box {
    border-bottom: 2px solid #777777;

    svg {
      margin-bottom: -10px;
    }

    .search-input {
      all: unset;
      text-align: left;
      font-family: 'GowunBatang-Regular';
      font-weight: 500;
      width: 500px;
      height: 60px;
      border: none;
      background: none;
      font-size: 1.4em;
      margin: 0 0 0 10px;

      &:focus {
        border: none;
      }
    }
  }
`;

const ResultContainer = styled.div`
  width: 530px;
  margin: 1rem auto;
  padding: 2rem;
  border-radius: 0.5rem;
  min-height: 50px;
  box-shadow: 0px 10px 20px 3px rgba(162, 162, 162, 0.4);
  background: ${({ theme }) => theme.baseTheme.colors.ivory};
  text-align: left;
  max-height: 350px;
  overflow: auto;
  text-overflow: ellipsis;
`;

const Result = styled(Link)`
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  text-decoration: none;
  color: ${({ theme }) => theme.baseTheme.colors.black};
  border-bottom: 1px solid #999999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.3rem;

  h3 {
    diplay: block;
  }

  &:hover {
    background-color: rgba(10, 10, 10, 0.07);
  }
`;
