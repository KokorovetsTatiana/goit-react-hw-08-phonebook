import css from './AddContactForm.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { FormItems } from 'Components/FormItems/FormItems';
import { SubmitButton } from 'Components/SubmitButton/SubmitButton';
import { contactSchema } from 'utils/validationSchema';
import { hasName } from 'utils/hasName';
import { contactFormOptions } from 'utils/formikOptions';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import {
  useAddContactMutation,
  useGetContactQuery,
} from 'redux/contactApiService';
import { useCurrentQuery } from 'redux/authServise';

const AddContactForm = () => {
  const { data } = useGetContactQuery();
  const { refetch } = useCurrentQuery();
  const [addContact, { isLoading }] = useAddContactMutation();

  useEffect(() => {
    refetch(); //re-fetch user name of userBar component
  }, [data, refetch]);

  function onSubmit(event, actions) {
    if (hasName(event.name, data)) {
      toast.error('Contact already exists');
    } else {
      addContact({
        ...event,
      })
        .then(toast.success('Added'))
        .catch(error =>
          toast.error(
            `Error ${error.status}, message ${error.data}`,
          ),
        );
    }
    actions.resetForm();
  }

  return (
    <>
      <h1 className={css.header}>Phonebook</h1>
      <FormItems
        schema={contactSchema}
        onSubmit={onSubmit}
        initValues={{ name: '', number: '' }}
        inputTags={contactFormOptions}
      >
        <SubmitButton label={'add'} isLoading={isLoading} width={'45px'} />
      </FormItems>
    </>
  );
};

export default AddContactForm;