import PropTypes from 'prop-types';
import css from './Item.module.css';
import { useDeleteContactMutation } from 'redux/contactsApi';

export default function Item({ name, number, id }) {
const [deleteContact, { isLoading }] = useDeleteContactMutation();
return (
<>
<span>
    - {name}: {number}
</span>
<button
    className={css.contactListItemButton}
    type="button"
    onClick={() => deleteContact(id)}
    disabled={isLoading}
>
    Delete
</button>
</>
);
}

Item.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};