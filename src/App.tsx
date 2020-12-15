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
    "que"
    "ans"
    "his";
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
  overflow-y: scroll;
  height: 500px;
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
const SkillColor = styled.div < { opacity: number }> `
  margin: 0 4px;
  background-color: rgba(0, 255, 0, ${(props) => props.opacity});
`


const App = () => {
  const [question, setQuestion] = useState<string>('')
  const [id, setId] = useState<number>(0)
  const [skills, setSkills] = useState<number[]>(new Array(96).fill(0))
  const [results, setResults] = useState<{ answer_result: number, lo_id: string }[]>(
    Array(51).fill(
      { answer_result: 0, lo_id: '4' }
    )
  )
  useEffect(() => {
    fetch('http://0.0.0.0:5000/question?id=' + id)
      .then(res => res.json())
      .then(res => { setQuestion(res.q) })
  }, [id])
  const handleResult0 = () => {
    results.shift()
    results.push({ lo_id: '4', answer_result: 0 })
    setResults(results)
    fetch('http://0.0.0.0:5000/understandAnalysis', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ history: results }) // body data type must match "Content-Type" header
    }).then((res) => {
      res.json().then(v => {
        console.log(v.result)
        const newSkills = v.result.map((ls: any) => {
          return ls.skill_pred
        })
        setSkills(newSkills)
      })
    })
  }
  const handleResult1 = () => {
    results.shift()
    results.push({ lo_id: '4', answer_result: 1 })
    setResults(results)
  }
  return (
    <Main>
      <Frame>
        <Question>
          <div dangerouslySetInnerHTML={{ __html: question }} />
        </Question>
        <Answer>
        <Button onClick={handleResult0}>Wrong</Button>
        <Button onClick={handleResult1}>Correct</Button>
        </Answer>
        <History>
          <h3>All skills</h3>
          {skills.map((s, i) => (
            <SkillColor opacity={s}>
              {skillDic[i].name}
              {':'}
              {s}
            </SkillColor>
          ))}
        </History>
      </Frame>
      <Navigation>
        <Button onClick={() => { setId(id - 1) }}>Prev</Button>
        <Button onClick={() => { setId(id + 1) }}>Next</Button>
      </Navigation>
    </Main>
  );
}


const skillDic = [
  { 'id': '4.0', 'name': 'Histogram as Table or Graph' },
  { 'id': '8.0', 'name': 'Scatter Plot' },
  { 'id': '11.0', 'name': 'Venn Diagram' },
  { 'id': '12.0', 'name': 'Mean' },
  { 'id': '13.0', 'name': 'Median' },
  { 'id': '15.0', 'name': 'Range' },
  { 'id': '16.0', 'name': 'Counting Methods' },
  { 'id': '17.0', 'name': 'Probability of Two Distinct Events' },
  { 'id': '18.0', 'name': 'Probability of a Single Event' },
  { 'id': '21.0', 'name': 'Interior Angles Figures with More than 3 Sides' },
  { 'id': '22.0', 'name': 'Interior Angles Triangle' },
  { 'id': '24.0', 'name': 'Congruence' },
  { 'id': '25.0', 'name': 'Complementary and Supplementary Angles' },
  { 'id': '26.0', 'name': 'Angles on Parallel Lines Cut by a Transversal' },
  { 'id': '27.0', 'name': 'Pythagorean Theorem' },
  { 'id': '32.0', 'name': 'Nets of 3D Figures' },
  { 'id': '34.0', 'name': 'Unit Conversion Within a System' },
  { 'id': '39.0', 'name': 'Area Circle' },
  { 'id': '40.0', 'name': 'Circumference ' },
  { 'id': '42.0', 'name': 'Perimeter of a Polygon' },
  { 'id': '46.0', 'name': 'Calculations with Similar Figures' },
  { 'id': '47.0', 'name': 'Conversion of Fraction Decimals Percents' },
  { 'id': '48.0', 'name': 'Equivalent Fractions' },
  { 'id': '49.0', 'name': 'Ordering Positive Decimals' },
  { 'id': '50.0', 'name': 'Ordering Fractions' },
  { 'id': '51.0', 'name': 'Ordering Integers' },
  { 'id': '54.0', 'name': 'Rounding' },
  { 'id': '58.0', 'name': 'Addition Whole Numbers' },
  { 'id': '61.0', 'name': 'Division Fractions' },
  { 'id': '63.0', 'name': 'Estimation' },
  { 'id': '65.0', 'name': 'Least Common Multiple' },
  { 'id': '67.0', 'name': 'Multiplication Fractions' },
  { 'id': '70.0', 'name': 'Percent Of' },
  { 'id': '75.0', 'name': 'Square Root' },
  { 'id': '76.0', 'name': 'Nan' },
  { 'id': '77.0', 'name': 'Finding Percents' },
  { 'id': '79.0', 'name': 'Proportion' },
  { 'id': '80.0', 'name': 'Scale Factor' },
  { 'id': '81.0', 'name': 'Unit Rate' },
  { 'id': '82.0', 'name': 'Scientific Notation' },
  { 'id': '83.0', 'name': 'Divisibility Rules' },
  { 'id': '84.0', 'name': 'Prime Number' },
  { 'id': '85.0', 'name': 'Absolute Value' },
  { 'id': '86.0', 'name': 'Exponents' },
  { 'id': '91.0', 'name': 'Nan' },
  { 'id': '92.0', 'name': 'Pattern Finding ' },
  { 'id': '94.0', 'name': 'Nan' },
  { 'id': '96.0', 'name': 'Nan' },
  { 'id': '101.0', 'name': 'Nan' },
  { 'id': '105.0', 'name': 'Nan' },
  { 'id': '110.0', 'name': 'D.4.8-understanding-concept-of-probabilities' },
  { 'id': '203.0', 'name': 'Percent Discount' },
  { 'id': '204.0', 'name': 'Percents' },
  { 'id': '217.0', 'name': 'Rate' },
  { 'id': '276.0', 'name': 'Multiplication and Division Positive Decimals' },
  { 'id': '277.0', 'name': 'Addition and Subtraction Integers' },
  { 'id': '278.0', 'name': 'Addition and Subtraction Positive Decimals' },
  { 'id': '279.0', 'name': 'Multiplication and Division Integers' },
  { 'id': '280.0', 'name': 'Addition and Subtraction Fractions' },
  { 'id': '290.0', 'name': 'Reflection' },
  { 'id': '292.0', 'name': 'Rotations' },
  { 'id': '293.0', 'name': 'Translations' },
  { 'id': '294.0', 'name': 'Area Irregular Figure' },
  { 'id': '295.0', 'name': 'Area Parallelogram' },
  { 'id': '296.0', 'name': 'Area Rectangle' },
  { 'id': '297.0', 'name': 'Area Trapezoid' },
  { 'id': '298.0', 'name': 'Area Triangle' },
  { 'id': '299.0', 'name': 'Surface Area Cylinder' },
  { 'id': '301.0', 'name': 'Surface Area Rectangular Prism' },
  { 'id': '303.0', 'name': 'Volume Cylinder' },
  { 'id': '307.0', 'name': 'Volume Rectangular Prism' },
  { 'id': '308.0', 'name': 'Volume Sphere' },
  { 'id': '309.0', 'name': 'Order of Operations +,-,/,* () positive reals' },
  { 'id': '310.0', 'name': 'Order of Operations All' },
  { 'id': '311.0', 'name': 'Equation Solving Two or Fewer Steps' },
  { 'id': '312.0', 'name': 'Equation Solving More Than Two Steps' },
  { 'id': '314.0', 'name': 'Angles - Obtuse, Acute, and Right' },
  { 'id': '317.0', 'name': 'Greatest Common Factor' },
  { 'id': '322.0', 'name': 'Write Linear Equation from Ordered Pairs' },
  { 'id': '323.0', 'name': 'Write Linear Equation from Situation' },
  { 'id': '324.0', 'name': 'Recognize Linear Pattern' },
  { 'id': '331.0', 'name': 'Finding Slope From Situation' },
  { 'id': '333.0', 'name': 'Finding Slope From Equation' },
  { 'id': '334.0', 'name': 'Finding Slope from Ordered Pairs' },
  { 'id': '340.0', 'name': 'Distributive Property' },
  { 'id': '343.0', 'name': 'Midpoint' },
  { 'id': '346.0', 'name': 'Polynomial Factors' },
  { 'id': '348.0', 'name': 'Recognize Quadratic Pattern' },
  { 'id': '350.0', 'name': 'Solving Systems of Linear Equations' },
  { 'id': '356.0', 'name': 'Quadratic Formula to Solve Quadratic Equation' },
  {
    'id': '362.0',
    'name': 'Parts of a Polyomial, Terms, Coefficient, Monomial, Exponent, Variable'
  },
  { 'id': '367.0', 'name': 'Nan' },
  { 'id': '368.0', 'name': 'Solving for a variable' },
  { 'id': '371.0', 'name': 'Simplifying Expressions positive exponents' },
  { 'id': '378.0', 'name': 'Solving Systems of Linear Equations by Graphing' },
  { 'id': 'nan', 'name': 'nan' }
]



export default App;
