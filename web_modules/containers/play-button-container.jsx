import { connect } from 'react-redux';
import { nextStep, togglePlayStatus } from 'actions';
import PlayButton from '../components/play-button';

const mapStateToProps = state => ({
  isPlay: state.get('isPlay'),
});

const STOP = Symbol('stop');

let runningLoop;

function makeStepLoop(dispatch) {
  return () => {
    setTimeout(() => {
      if (runningLoop() !== STOP) {
        dispatch(nextStep());
      }
    }, 500);
  };
}

function mapDispatchToProps(dispatch) {
  return {
    makeOnClick: (isPlay) => {
      if (isPlay) {
        runningLoop = makeStepLoop(dispatch);
        dispatch(nextStep());
        runningLoop();
      } else {
        runningLoop = () => STOP;
      }
      return () => dispatch(togglePlayStatus());
    },
  };
}

function mergeProps({ isPlay }, { makeOnClick }) {
  return { onClick: makeOnClick(isPlay), isPlay };
}


const PlayButtonContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(PlayButton);

export default PlayButtonContainer;

