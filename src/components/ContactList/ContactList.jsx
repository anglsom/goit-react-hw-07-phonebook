import React, { useMemo } from 'react';
import css from './ContactList.module.css';
import Item from 'components/Item';
import { useSelector } from 'react-redux';
import { useGetContactsQuery } from 'redux/contactsApi';
import { getFilter } from 'redux/filterSlice';

export default function ContactList() {
const filter = useSelector(getFilter);

const { data, error, isLoading } = useGetContactsQuery();

const filteredContacts = useMemo(() => {
return (
    data?.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
    ) ?? []
);
}, [filter, data]);

return (
<ul className={css.contactList}>
    {error && <p>Oops, something goes wrong, please reload this page</p>}
    {isLoading ? (
<p>Loading...</p>
    ) : (
    filteredContacts.map(({ id, name, phone }) => (
<li key={id} className={css.contactListItem}>
<Item name={name} number={phone} id={id} />
</li>
 ))
        )}
          {filteredContacts.length === 0 && (
<p>There are no contact with this name</p>
      )}
</ul>
  );
}
       