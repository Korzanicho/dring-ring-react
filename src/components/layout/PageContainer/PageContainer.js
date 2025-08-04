import PropTypes from 'prop-types';
import './PageContainer.scss';

const PageContainer = ({ children, className = '' }) => {
  return (
    <div className={`page-container ${className}`.trim()}>
      {children}
    </div>
  );
};

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default PageContainer; 