import { useState, useEffect } from "react";
// import ContactForm from "../ContactForm/ContactForm";
import ContactFormByHooks from "../ContactForm/ContactFormByHooks";
import ContactList from "../ContactList/ContactList";
import Filter from "../Filter/Filter";
import { nanoid } from "nanoid";
import { Application, ApplicationTitle, ListTitle } from "./App.styled";

const AppByHooks = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? []
  });
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

  // LocalStorage Zone
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts])
  
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



// class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   }

//   isContactNameInList = contactName => {
//     return this.state.contacts.find(contact => contact.name === contactName);
//   }

//   addContact = ({ name, number }, reset) => {
//     if (this.isContactNameInList(name)) {
//       alert(`${name} is already in contacts.`);
//       return;
//     }

//     const newContact = {
//       id: nanoid(),
//       name,
//       number,
//     }
    
//     this.setState(({ contacts }) => ({
//       contacts: [newContact, ...contacts]
//     }))

//     reset()
//   }

//   deleteContact = (userId) => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(({ id }) => id !== userId)
//     })
//     )
//   }

//   changeFilter = (event) => {
//     this.setState({filter: event.currentTarget.value})
//   }

//   getFilteredContacts = () => {
//     const { contacts, filter } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
//   }

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   render() {
//     const filteredContacts = this.getFilteredContacts();

//     return (
//       <Application>
//         <ApplicationTitle>Phonebook</ApplicationTitle>
//         <ContactForm
//           onSubmit={this.addContact}
//         />

//         <ListTitle>Contacts</ListTitle>
//         <Filter
//           value={this.state.filter}
//           onChange={this.changeFilter}
//         />
//         <ContactList
//           contacts={filteredContacts}
//           onDelete={this.deleteContact}
//         />
//       </Application>
//     )
//   }
// };



export default AppByHooks;