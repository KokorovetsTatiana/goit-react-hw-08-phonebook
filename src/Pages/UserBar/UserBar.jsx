import { NavLink } from 'react-router-dom';
import css from './UserBar.module.css';
import { useCurrentQuery, useLogoutMutation } from 'redux/authServise';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, isLogin } from 'redux/actions';
import { toast } from 'react-hot-toast';
import { isLoginUser } from 'redux/selectors';

export const UserBar = () => {
  const [logoutUser] = useLogoutMutation();
  const dispatch = useDispatch();
  const isLoggetIn = useSelector(isLoginUser);
  const { data } = useCurrentQuery();

  function postLogout() {
    dispatch(setToken(''));
    dispatch(isLogin(false));
  }

  function logoutHandler() {
    logoutUser()
      .then(postLogout)
      .catch(e => toast.error('something went wrong'));
  }

  return (
    <>
      <div className={css.bar}>
        
        <NavLink to="/" className={css.link}>
          Home
        </NavLink>
        {isLoggetIn && (
          <NavLink to="/contacts" className={css.link}>
            Contacts
          </NavLink>
        )}
        {isLoggetIn && (
          <>
            <p className={css.userName}>{data?.name}</p>
            <button
              type="button"
              onClick={logoutHandler}
              className={css.button}
            >
              Logout
            </button>
          </>
        )}

          {!isLoggetIn && (
          <>
            <NavLink to="/signup" className={css.link}>
              Signup
            </NavLink>
            <NavLink to="/login" className={css.link}>
              Login
            </NavLink>
          </>
        )}
      </div>
    </>
  );
};