import React, { useState } from "react";
import styled from "styled-components";
import { IoBeerSharp } from "react-icons/io5";
import contents from "./contents/questions";
import ButtonComponent from "../compontents/ButtonComponent";
import ProgressBar from "../compontents/progressBar";
import Parser from "html-react-parser";
import { Link, Navigate } from "react-router-dom";

const Wrapper = styled.div`
  display: ${props => props.welcome === true ? "flex" : "none"};
  width: 100%;
  height: 100vh;
  background-color: #f6f6f6;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background-color: #fff;
  margin-bottom: 3rem;
  text-align: center;
  align-items: center;
  border-radius: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 1px 1.5px rgba(0, 0, 0, 0.02);
  transition: all 0.3s cubic-bezier(0.15, 0.4, 0.15, 0.5);
  padding: 2.5rem;
`;
const Title = styled.div`
  font-family: "Jalnan";
  font-size: 2.5rem;
  text-align: center;
  color: #ffc72c;
  margin-top: 1.9rem;
  margin-bottom: 8.4rem;
`;

const Footer = styled.div`
  font-family: 'Jalnan';
  font-size: 1.4rem;
  font-weight: 400;
  text-align: center;
  margin-top: 8.9rem;
  color: #a7a7a7;
`;

const Msg = styled.div`
  font-family: "Jalnan";
  font-size: 1.4rem;
  font-weight: 400;
  text-align: center;
  color: #a7a7a7;
`;

const Text = styled.div`
  font-family: "Jalnan";
  font-size: 1.9rem;
  font-weight: light;
  margin: 0.5rem;
  text-align: center;
  margin-top: 3.9rem;
  margin-bottom: 7rem;
  line-height: 30px;
`;

/** QuizPage component */
const QuizPage = ({welcome}) => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [process, setProcess] = useState(false);
  const [linkTo, setLinkTo] = useState("");
  const linkResult = "/result/";
  const [typeFirst, setTypeFirst] = useState(0);
  const [typeSecond, setTypeSecond] = useState(0);
  const [typeThird, setTypeThird] = useState(0);
  const [typeFourth, setTypeFourth] = useState(0);
  const [finalType, setFinalType] = useState(0);
  const [turn, setTurn] = useState(0);

  /**
   * questionNumber가 10번 전까지, 16번이 아닐 경우를 조건으로
   * progressBar와 질문 내용들을 피는 페이지.
   * 10번과 같아지면 완료 메시지와 함께 결과 페이지로 이동하는 버튼.
   *
   * 16번과 같아지면 중간에 멈춤.
   */

  const onConditionChange = (key) => {
    let record =
      contents[questionNumber].weight *
      contents[questionNumber].answers[key].score;

    if (questionNumber === 3 && key === 2) {
      setLoading(true);
      let num = 16;
      setFinalType(num);
      setLinkTo(linkResult + num);
      setTimeout(function () {
        setLoading(false);
      }, 3000);
    } else if (questionNumber === 0 || questionNumber === 1) {
      setTypeFirst(typeFirst + record);
    } else if (
      questionNumber === 2 ||
      questionNumber === 3 ||
      questionNumber === 4
    ) {
      setTypeSecond(typeSecond + record);
    } else if (
      questionNumber === 5 ||
      questionNumber === 6 ||
      questionNumber === 7
    ) {
      setTypeThird(typeThird + record);
    } else if (questionNumber >= 8) {
      setTypeFourth(typeFourth + record);

      if (questionNumber === 9) {
        let result = 0;

        if (typeFirst >= 5) {
          result = record + 8;
        }
        if (typeSecond >= 5) {
          result = record + 4;
        }
        if (typeThird >= 5) {
          result = record + 2;
        }
        if (typeFourth + record >= 5) {
          result = record + 1;
        } else {
          result = result + 0;
        }
        let num = result;
        setFinalType(num);
        setLinkTo(linkResult + num);

        setLoading(true);
        setTimeout(function () {
          setLoading(false);
          setProcess(true);
        }, 2000);
      }
    }
    setQuestionNumber(questionNumber + 1);
    setTurn(turn + 1);
  };

  const onClickResultBtn = () => {
    setProcess(false);
    setQuestionNumber(16);
  };
  if (questionNumber === 10) {
    return (
      <>
        <Wrapper welcome={loading}>
          <Title>
            Beer Dobby
            <IoBeerSharp />
          </Title>
          <Msg>당신의 맥주 취향을 찾고 있어요!</Msg>
          <Footer>made by heeChang</Footer>
        </Wrapper>
        <Wrapper welcome={process}>
          <Container>
            <Text>테스트 완료!</Text>
            <Link to={linkTo} style={{ textDecoration: "none" }}>
              <ButtonComponent
                type={"result"}
                text="결과 확인하기👍"
                onclick={onClickResultBtn}
              ></ButtonComponent>
            </Link>
          </Container>
        </Wrapper>
      </>
    );
  } else if (finalType === 16) {
    return (
      <div>
        <Navigate to={linkTo}></Navigate>
      </div>
    );
  } else if (questionNumber < 10 && finalType !== 16) {
    return (
      <>
        <Wrapper welcome={welcome}>
          <ProgressBar completed={(questionNumber + 1) * 24} rotation={turn} />

          <Container>
            <Text>{Parser(contents[questionNumber].question)}</Text>
            {contents[questionNumber].answers.map((answer, i) => (
              <ButtonComponent
                key={"answer - " + i}
                idx={i}
                text={Parser(answer.text)}
                onclick={onConditionChange}
              />
            ))}
          </Container>
        </Wrapper>
      </>
    );
  }
};

export default QuizPage;
