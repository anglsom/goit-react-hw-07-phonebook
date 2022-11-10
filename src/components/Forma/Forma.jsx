import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './Forma.module.css';
import { useGetContactsQuery } from 'redux/contactsApi';
import { useAddContactMutation } from 'redux/contactsApi';
import { Report } from 'notiflix';
import Notiflix from 'notiflix';

export default function Forma() {
const [name, setName] = useState('');
const [phone, setPhone] = useState('');

const { data } = useGetContactsQuery();
const [addContact] = useAddContactMutation();

const inputNameId = nanoid();
const inputNumberId = nanoid();

const handleNameChange = event => setName(event.target.value);
const handleNumberChange = event => setPhone(event.target.value);

const handleAddContact = async values => {
    try {
    await addContact(values);
    Notiflix.Notify.success('Contact added');
    } catch (error) {
    Notiflix.Notify.failure('Oops, something goes wrong');
    }
};

const handleSubmit = event => {
    event.preventDefault();

    data.some(contact => contact.name === name)
        ? Report.warning(
        `${name} is already in contacts`,
        'Please enter another name'
    )
        : handleAddContact({ name, phone });

    reset();
    };

const reset = () => {
    setName('');
    setPhone('');
    };
    
return (
<form className={css.contactForm} onSubmit={handleSubmit}>
<label htmlFor={inputNameId}>Name</label>
<input
    className={css.contactFormInput}
    id={inputNameId}
    value={name}
    type="text"
    name="name"
    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    required
    onChange={handleNameChange}
/>

<label htmlFor={inputNumberId}>Number</label>
<input
    className={css.contactFormInput}
    id={inputNumberId}
    value={phone}
    type="tel"
    name="number"
    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
    required
    onChange={handleNumberChange}
/>
<button className={css.contactFormButton} type="submit">
    Add Contact
</button>
</form>
);
}