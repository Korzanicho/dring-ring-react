import './PageContainer.scss';

const PageContainer = ({ children, className = '' }) => {
  return (
    <div className={`page-container ${className}`.trim()}>
      {children}
    </div>
  );
};

export default PageContainer; 