import { connect } from 'react-redux';
import { togglePlayStatus, play } from 'actions';
import PlayButton from 'components/play-button';

const mapStateToProps = state => ({
  isPlay: state.get('isPlay'),
});


function mapDispatchToProps(dispatch) {
  return {
    makeOnClick: (isPlay) => {
      if (isPlay) {
        dispatch(play());
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

