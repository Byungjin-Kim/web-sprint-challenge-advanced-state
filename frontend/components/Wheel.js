import React from 'react';
import { connect } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';


export function Wheel(props) {
  const { wheel, moveCounterClockwise, moveClockwise } = props;

  return (
    <div id="wrapper">
      <div id="wheel">
        {
          [0, 1, 2, 3, 4, 5].map(idx => (
            <div key={idx} className={idx === wheel ? `cog active` : 'cog'} style={{ "--i": idx }}>{idx === wheel ? 'B' : null}</div>
          ))
        }
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={() => moveCounterClockwise()}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={() => moveClockwise()}>Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return ({
    wheel: state.wheel
  });
}

export default connect(mapStateToProps, { moveClockwise, moveCounterClockwise })(Wheel);
