import { Route, Redirect } from 'react-router';
import { isLoginUser } from 'redux/selectors';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export const Private = ({ children, ...props }) => {
  const isLogin = useSelector(s => s.isLoggetIn);
  return <Route {...props}>{isLogin ? children : <Redirect to="/" />}</Route>;
};

export const Public = ({ children, restricted = false, ...props }) => {
  const isLogin = useSelector(isLoginUser);
  const isRedirect = restricted && isLogin;

  return (
    <Route {...props}>
      {isRedirect ? <Redirect to="/contacts" /> : children}
    </Route>
  );
};

Private.propTypes = {
  children: PropTypes.element.isRequired,
  props: PropTypes.objectOf(PropTypes.object),
};

Public.propTypes = {
  children: PropTypes.element.isRequired,
  props: PropTypes.objectOf(PropTypes.object),
  restricted: PropTypes.bool,
};