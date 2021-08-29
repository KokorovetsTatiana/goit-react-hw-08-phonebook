import AddContactForm from 'Components/AddContactForm/AddContactForm';
import ContactList from 'Components/ContactList/ContactList';
import FindForm from 'Components/FindForm/FindForm';
import css from './Phonebook.module.css';

const Phonebook = () => {
  return (
    <div className={css.container}>
      <AddContactForm />
      <FindForm />
      <ContactList />
    </div>
  );
};

export default Phonebook;