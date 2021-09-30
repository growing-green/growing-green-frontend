import React from 'react';
import Button from '../components/Button';
import Loading from '../components/Loading';
import ErrorBox from '../components/ErrorBox';

export default function Landing() {
  return (
    <>
      <Button
        className="entry-button"
        bgColor="gray"
        hoverBgColor="pink"
        label="GoogleLogin"
      />
      <Loading />
      <ErrorBox message="에러메시지" />
    </>
  );
}
