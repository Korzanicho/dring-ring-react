import PropTypes from 'prop-types';
import '@/components/layout/AppLayout/AppLayout.scss';
import TheHeader from '@/components/layout/TheHeader/TheHeader';

const AppLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <TheHeader />
      <main className="app-layout__main">
        {children}
      </main>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppLayout; 