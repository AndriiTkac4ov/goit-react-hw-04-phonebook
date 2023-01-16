import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import ContactFormByHooks from "../ContactForm/ContactFormByHooks";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";
import { nanoid } from "nanoid";
import { Application, ApplicationTitle, ListTitle } from "./App.styled";

const AppByHooks = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const isContactNameInList = contactName => {
    return contacts.find(contact => contact.name === contactName);
  }

  const addContact = ( name, number, reset) => {
    if (isContactNameInList(name)) {
      alert(`${name} is already in contacts.`);
      return;
    };

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prev => (
      [newContact, ...prev]
    ));

    reset();
  }

  const deleteContact = userId => {
    setContacts(prevState => prevState.filter(({ id }) => id !== userId));
  }

// Filter Zone
  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  }

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  }

  const filteredContacts = getFilteredContacts();

  return (
    <Application>
      <ApplicationTitle>Phonebook</ApplicationTitle>
      <ContactFormByHooks
        onSubmit={addContact}
      />

      <ListTitle>Contacts</ListTitle>
      <Filter
        value={filter}
        onChange={changeFilter}
      />
      <ContactList
        contacts={filteredContacts}
        onDelete={deleteContact}
      />
    </Application>
  )
}

export default AppByHooks;