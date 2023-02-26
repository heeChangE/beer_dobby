import React, { useState } from "react";
import styled from "styled-components";
import StartingButtonComponent from "../compontents/StartingButtonComponent";
import { IoBeerSharp } from "react-icons/io5";

const Wrapper = styled.div`
  display: ${(props) => (props.welcome === true ? "flex" : "none")};
  width: 100%;
  background-color: #fff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background-color: #fff;
  margin-top: 18.6rem;
  margin-bottom: 3rem;
  text-align: center;
`;

const Intro = styled.div`
  font-family: "Jalnan";
  font-size: 2.1rem;
  font-weight: 300;
  color: #a7a7a7;
`;

const Title = styled.div`
  font-family: "Jalnan";
  font-size: 3.5rem;
  font-weight: 400;
  padding-top: 70px;
  margin-bottom: 8.4rem;
  color: #232321;
`;

const Footer = styled.div`
  font-family: "Oswald";
  font-size: 1.5rem;
  font-weight: 200;
  text-align: center;
  margin-top: 8rem;
  color: #a7a7a7;
`;

const StartingPage = () => {
  const [welcome, setWelcome] = useState(true);
  const [quizTime, setQuizTime] = useState(false);

  const onClickStartBtn = () => {
    setWelcome(false);
  };

  return (
    <>
      <Wrapper welcome={welcome}>
        <Container>
          <Intro>
            여러분의 맥주 취향을 찾기 위해 <br /> 오늘도 야근하는 내 이름은
          </Intro>
          <Title>
            BEER DOBBY <IoBeerSharp />
          </Title>
          <StartingButtonComponent
            type={true}
            text={"시작하기"}
            onClickStartBtn={onClickStartBtn}
          />
          <Footer>made by heeChang</Footer>
        </Container>
      </Wrapper>
      {/*<QuizPage welcome={quizTime} /> */}
    </>
  );
};

export default StartingPage;
