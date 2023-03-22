import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  const { form, inputChange, postQuiz } = props;

  const onChange = evt => {
    const { value, id } = evt.target;
    inputChange({ id, value });
  }

  const onSubmit = evt => {
    evt.preventDefault();
    postQuiz(
      form.newQuestion,
      form.newTrueAnswer,
      form.newFalseAnswer
    )
  }

  const stringTrimCheck =
    form.newQuestion.trim("").length > 0 &&
    form.newTrueAnswer.trim("").length > 0 &&
    form.newFalseAnswer.trim("").length > 0

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={form.newQuestion} />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={form.newTrueAnswer} />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={form.newFalseAnswer} />
      <button disabled={!stringTrimCheck} id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
