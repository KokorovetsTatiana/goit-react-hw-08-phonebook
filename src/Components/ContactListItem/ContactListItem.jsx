import css from './ContactListItem.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { GoTrashcan } from 'react-icons/go';
import Loader from 'react-loader-spinner';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { useDeleteContactMutation } from 'redux/contactApiService';

export const ContactListItem = ({ contact, editButtonHandler }) => {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  const hangleContactDelete = id => () => {
    return deleteContact(id)
      .then(
        toast.success('Deleted', {
          icon: GoTrashcan({ color: 'rgb(245, 210, 13)', size: '20' }),
        }),
      )
      .catch(error =>
        toast.error(`Error ${error.status}, message ${error.data}`),
      );
  };

  return (
    <li className={css.listItem}>
      <span>{contact.name}</span>
      <span>{contact.number}</span>
      <button
        className={isLoading ? css.buttonFetching : css.button}
        type="button"
        onClick={hangleContactDelete(contact.id)}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader type="TailSpin" color="#fff" height={12} width={12} />
        ) : (
          <>
            delete <GoTrashcan size="16" />
          </>
        )}
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.isRequired,
  }),
  editButtonHandler: PropTypes.func.isRequired,
};