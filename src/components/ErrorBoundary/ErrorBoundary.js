import { Component } from 'react';
import PropTypes from 'prop-types';
import './ErrorBoundary.scss';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console (in production, you'd send to error reporting service)
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__content">
            <h2 className="error-boundary__title">
              Oops! Coś poszło nie tak
            </h2>
            <p className="error-boundary__message">
              Wystąpił nieoczekiwany błąd. Spróbuj odświeżyć aplikację lub wróć do poprzedniej strony.
            </p>
            
            <div className="error-boundary__actions">
              <button 
                onClick={() => window.location.reload()} 
                className="error-boundary__button error-boundary__button--primary"
              >
                Odśwież stronę
              </button>
              <button 
                onClick={this.handleReset} 
                className="error-boundary__button error-boundary__button--secondary"
              >
                Spróbuj ponownie
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="error-boundary__details">
                <summary>Szczegóły błędu (tylko w trybie deweloperskim)</summary>
                <div className="error-boundary__error-info">
                  <h4>Błąd:</h4>
                  <pre>{this.state.error && this.state.error.toString()}</pre>
                  
                  <h4>Stack trace:</h4>
                  <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary; 