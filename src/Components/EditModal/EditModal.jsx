import { AiOutlineClose } from 'react-icons/ai';
import { FormItems } from 'Components/FormItems/FormItems';
import { SubmitButton } from 'Components/SubmitButton/SubmitButton';
import css from './EditModal.module.css';
import { contactSchema } from 'utils/validationSchema';
import { hasName } from 'utils/hasName';
import PropTypes from 'prop-types';
import { modalFormOptions } from 'utils/formikOptions';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { isOpen } from 'redux/actions';
import {
  usePacthContactMutation,
  useGetContactQuery,
} from 'redux/contactApiService';
import { createPortal } from 'react-dom';

export const EditModal = ({ data }) => {
  const { data: contacts } = useGetContactQuery();
  const [editContact] = usePacthContactMutation();
  const dispatch = useDispatch();
  const { name, number, id } = data; //data from list item, where click on 'edit' button

  function closeButtonHandler() {
    dispatch(isOpen());
    toast.success('Updated');
  }

  const onSubmitHandler = (event, actions) => {
    if (hasName(event.name, contacts)) {
      toast.error('This contact already exists');
    } else {
      editContact({ event, id })
        .then(closeButtonHandler)
        .catch(e => toast.error('Contact has not been updated'));
    }
  };

  return createPortal(
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button
          type="button"
          onClick={closeButtonHandler}
          className={css.cross}
        >
          <AiOutlineClose size="16" />
        </button>
        <FormItems
          schema={contactSchema}
          onSubmit={onSubmitHandler}
          initValues={{ name, number }}
          inputTags={modalFormOptions}
        >
          <SubmitButton label={'edit'} width={'45px'} />
        </FormItems>
      </div>
    </div>,
    document.getElementById('root-modal'),
  );
};

EditModal.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};