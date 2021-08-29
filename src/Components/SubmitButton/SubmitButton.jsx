import Loader from 'react-loader-spinner';
import css from './SubmitButton.module.css';
import PropTypes from 'prop-types';

export const SubmitButton = ({ isLoading, label, width = '70px' }) => {
  return (
    <button
      className={css.button}
      type="submit"
      disabled={isLoading}
      style={{
        width,
      }}
    >
      {isLoading ? (
        <Loader
          type="TailSpin"
          color="#fff"
          height={12}
          width={12}
          timeout={3000}
        />
      ) : (
        `${label}`
      )}
    </button>
  );
};

SubmitButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};