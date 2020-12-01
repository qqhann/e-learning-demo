import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components'


const Main = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Frame = styled.div`
  width: 800px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #dfdfdf;
  border-radius: 8px;

  display: grid;
  grid-template-areas:
    "que que"
    "ans res"
    "his pred";
  gap: 8px;
`
const common = css`
  background-color: white;
  padding: 10px 16px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`
const Question = styled.div`
  ${common}
  grid-area: que;
`
const Answer = styled.div`
  ${common}
  grid-area: ans;
`
const Result = styled.div`
  ${common}
  grid-area: res;
`
const History = styled.div`
  ${common}
  grid-area: his;
`
const Prediction = styled.div`
  ${common}
  grid-area: pred;
`

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
`
const Button = styled.button`
  border: none;
  background-color: #4b75ff;
  border-radius: 4px;
  color: white;
  margin: 4px;
  padding: 8px;
  cursor: pointer;
`


const App = () => {
  const [question, setQuestion] = useState<string>('')
  const [id, setId] = useState<number>(0)
  useEffect(() => {
    fetch('http://0.0.0.0:5000/question?id=' + id)
      .then(res => res.json())
      .then(res => { setQuestion(res.q) })
  }, [id])
  return (
    <Main>
      <Frame>
        <Question>
          <div dangerouslySetInnerHTML={{ __html: question }} />
        </Question>
        <Answer>1. Fine. 2. Bad</Answer>
        <Result>True</Result>
        <History>ooxxoxo</History>
        <Prediction>0.74</Prediction>
      </Frame>
      <Navigation>
        <Button onClick={() => { setId(id - 1) }}>Prev</Button>
        <Button onClick={() => { setId(id + 1) }}>Next</Button>
      </Navigation>
    </Main>
  );
}

export default App;
