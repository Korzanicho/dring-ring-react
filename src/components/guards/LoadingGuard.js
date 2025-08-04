import './LoadingGuard.scss';

const LoadingGuard = () => {
  return (
    <div className="loading-guard">
      <div className="loading-guard__spinner"></div>
      <p className="loading-guard__text">Ładowanie...</p>
    </div>
  );
};

export default LoadingGuard; 