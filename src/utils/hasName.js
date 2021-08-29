export const hasName = (name, contacts) => {
  const contactNames = contacts.map(el => el.name);
  return contactNames.includes(name);
};
