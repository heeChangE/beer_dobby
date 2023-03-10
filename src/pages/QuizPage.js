import React, { useState } from "react";
import styled from "styled-components";
import { IoBeerSharp } from "react-icons/io5";
import contents from "./contents/questions";
import ButtonComponent from "../compontents/ButtonComponent";
import ProgressBar from "../compontents/progressBar";
import Parser from "html-react-parser";
import { Link, NavLink } from "react-router-dom";

const Wrapper = styled.div`
  display: ${(props) => (props.welcome === true ? "flex" : "none")};
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
  font-size: 2.9rem;
  text-align: center;
  color: #ffc72c;
  margin-top: 1.9rem;
  margin-bottom: 8.4rem;
`;

const Footer = styled.div`
  font-family: "Reko";
  font-size: 1.4rem;
  font-weight: 200;
  text-align: center;
  margin-top: 5.5rem;
  color: #a7a7a7;
`;

const Msg = styled.div`
  font-family: "Jalnan";
  font-size: 2.0rem;
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

/** QuizPage Function */
const QuizPage = ({ welcome }) => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [process, setProcess] = useState(false);
  const [linkTo, setLinkTo] = useState("");
  const linkResult = "/result/";
  const [typeFirst, setTypeFirst] = useState(0);
  const [typeSecond, setTypeSecond] = useState(0);
  const [typeThird, setTypeThird] = useState(0);
  const [finalType, setFinalType] = useState(0);

  /**
   * questionNumber??? 10??? ?????????, 16?????? ?????? ????????? ????????????
   * progressBar??? ?????? ???????????? ?????? ?????????.
   * 10?????? ???????????? ?????? ???????????? ?????? ?????? ???????????? ???????????? ??????.
   *
   * 16?????? ???????????? ????????? ??????.
   */

  const onConditionChange = (key) => {
    let record =
      contents[questionNumber].weight *
      contents[questionNumber].answers[key].score;

    if (questionNumber === 0 || questionNumber === 1) {
      setTypeFirst(typeFirst + record);
    } else if (questionNumber === 2 || questionNumber === 3) {
      setTypeSecond(typeSecond + record);
    } else if (questionNumber >= 4) {
      setTypeThird(typeThird + record);

      if (questionNumber === 5) {
        let result = 0;

        if (typeFirst >= 5) {
          result = result + 4;
        }
        if (typeSecond >= 5) {
          result = result + 2;
        }
        if (typeThird + record >= 5) {
          result = result + 1;
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
        }, 2500);
      }
    }
    setQuestionNumber(questionNumber + 1);
  };

  const onClickResultBtn = () => {
    setProcess(false);
    setQuestionNumber(7);
  };
  if (questionNumber === 6) {
    return (
      <>
        <Wrapper welcome={loading}>
          <Title>
            Beer Dobby
            <IoBeerSharp />
          </Title>
          <Msg>????????? ?????? ????????? ?????? ?????????! .. </Msg>
          <Footer>????????? ??? ????????????! ?????????!</Footer>
        </Wrapper>
        <Wrapper welcome={process}>
          <Container>
            <Text>????????? ??????!</Text>
            <Link to={linkTo} style={{ textDecoration: "none" }}>
              <ButtonComponent
                type={"result"}
                text="?????? ????????????????"
                onclick={onClickResultBtn}
              ></ButtonComponent>
            </Link>
          </Container>
        </Wrapper>
      </>
    );
  }else if (finalType === 7) {
    return(
        <div>
            <NavLink to={linkTo}></NavLink>
        </div>
    )
  }
   else if (questionNumber < 6 && finalType !== 7) {
    return (
      <>
        <Wrapper welcome={welcome}>
          <ProgressBar completed={(questionNumber + 1) * 16.7} />

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
