import PropTypes from 'prop-types';
import './LoadingGuard.scss';

const LoadingGuard = ({ message = 'Ładowanie...' }) => {
  return (
    <div className="loading-guard">
      <div className="loading-guard__spinner"></div>
      <p className="loading-guard__text">{message}</p>
    </div>
  );
};

LoadingGuard.propTypes = {
  message: PropTypes.string
};

export default LoadingGuard; 