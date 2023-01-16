import { useState } from "react";
import PropTypes from 'prop-types';
import { Form, LabelField, InputField, ButtonAdding } from "./ContactForm.styled";

const ContactFormByHooks = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.currentTarget;

        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                return;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(name, number, reset);
    }

    const reset = () => {
        setName('');
        setNumber('');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <LabelField>
                Name
                <InputField
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />
            </LabelField>

            <LabelField>
                Number
                <InputField
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    autoComplete="off"
                    value={number}
                    onChange={handleInputChange}
                />
            </LabelField>

            <ButtonAdding type="submit">Add contact</ButtonAdding>
        </Form>
    )
}

ContactFormByHooks.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default ContactFormByHooks;