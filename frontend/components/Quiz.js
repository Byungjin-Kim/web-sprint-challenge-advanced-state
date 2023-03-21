import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators';

export function Quiz(props) {
  const { quiz, fetchQuiz, selectedAnswer, selectAnswer, postAnswer } = props;

  useEffect(() => {
    if (!quiz) fetchQuiz()
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    postAnswer({
      quiz_id: quiz.quiz_id,
      answer_id: selectedAnswer.answer_id
    });
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              {
                quiz.answers.map((ans) => {
                  return (
                    <div className={selectedAnswer === ans ? "answer selected" : "answer"} key={ans.answer_id}>
                      {ans.text}
                      <button onClick={() => selectAnswer(ans)}>
                        {selectedAnswer === ans ? "SELECTED" : "Select"}
                      </button>
                    </div>
                  );
                })
              }
            </div>

            <button id="submitAnswerBtn" onClick={handleSubmit} disabled={!selectedAnswer}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  return ({
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer
  });
}

export default connect(mapStateToProps, { fetchQuiz, selectAnswer, postAnswer })(Quiz);