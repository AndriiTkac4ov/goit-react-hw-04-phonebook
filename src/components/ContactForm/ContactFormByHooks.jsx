import { useState } from "react";
import PropTypes from 'prop-types';
import { Form, LabelField, InputField, ButtonAdding } from "./ContactForm.styled";

const ContactFormByHooks = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleInputName = (event) => {
        const { name, value } = event.currentTarget;  
        setName({ [name]: value });
    }

    const handleInputNumber = (event) => {
        const { name, value } = event.currentTarget;  
        setNumber({ [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // reset();
        // this.props.onSubmit(this.state, this.reset);
    }

    const reset = () => {
        setName(()=>
            '',
        );
        setNumber(()=>
            '',
        );
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
                    value={name.value}
                    onChange={handleInputName}
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
                    value={number.value}
                    onChange={handleInputNumber}
                />
            </LabelField>

            <ButtonAdding type="submit">Add contact</ButtonAdding>
        </Form>
    )
}

export default ContactFormByHooks;