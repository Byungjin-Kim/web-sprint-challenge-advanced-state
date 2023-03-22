// ❗ You don't need to add extra action creators to achieve MVP
import axios from 'axios';

import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM
} from './action-types'


export function moveClockwise() {
  return ({ type: MOVE_CLOCKWISE });
}

export function moveCounterClockwise() {
  return ({ type: MOVE_COUNTERCLOCKWISE });
}

export function selectAnswer(answer) {
  const payload = answer;
  return ({ type: SET_SELECTED_ANSWER, payload });
}

export function setMessage(message) {
  const payload = message;
  return ({ type: SET_INFO_MESSAGE, payload });
}

export function setQuiz(question) {
  const payload = question;
  return ({ type: SET_QUIZ_INTO_STATE, payload });
}

export function inputChange({ id, value }) {
  const payload = { id, value };
  return ({ type: INPUT_CHANGE, payload });
}

export function resetForm() {
  return ({ type: RESET_FORM });
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(setQuiz(null));
    axios.get('http://localhost:9000/api/quiz/next')
      .then((res) => {
        dispatch(setQuiz(res.data));
      })
      .catch(err => console.error(err));

    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer({ quiz_id, answer_id }) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer', { quiz_id, answer_id })
      .then(res => {
        dispatch(setQuiz(null));
        dispatch(selectAnswer(null));
        dispatch(fetchQuiz());
        dispatch(setMessage(res.data.message));
      });
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz({ question_text, true_answer_text, false_answer_text }) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new',
      { question_text, true_answer_text, false_answer_text }
    )
      .then(res => {
        dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`))
        dispatch(resetForm())
      })
      .catch(err => {
        dispatch(setMessage(err.message))
      })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}

// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
