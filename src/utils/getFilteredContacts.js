export const getFilteredContacts = (contacts, string) => {
  return contacts
    ? contacts.filter(el =>
        el.name.toLowerCase().includes(string.toLowerCase()),
      )
    : [];
};
