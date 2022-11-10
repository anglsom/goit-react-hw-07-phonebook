// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework template
//     </div>
//   );
// };

import Section from './Section';
import Forma from './Forma';
import ContactList from './ContactList';
import Filter from './Filter';


export default function App() {
  return (
    <Section>
      <h1>Phonebook</h1>
      <Forma />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </Section>
  );
}