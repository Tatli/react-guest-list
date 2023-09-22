import { useEffect, useState } from 'react';
import styles from './index.css';

export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAttending, setIsAttending] = useState(false);
  const [newGuest, setNewGuest] = useState({});
  const [guestList, setGuestList] = useState([]);

  // useEffect(() => {
  //   console.log(`New guest: ${newGuest.firstName} ${newGuest.lastName}`);
  // }, [newGuest]);

  const addGuest = (e) => {
    // Check if pressed key was Enter?
    if (e.key === 'Enter') {
      // Confirm Enter key
      console.log(`${e.key} pressed. Creating new guest`);
      // set newGuest Objects values
      setNewGuest({ firstName, lastName, isAttending });
      // Log newGuests's firstName and lastName
      console.log(
        `New guest within addGuest(): firstName: ${newGuest.firstName}, lastName: ${newGuest.lastName}, isAttending; ${isAttending}`,
      );
      // add newGuest to guestList
      setGuestList([...guestList, newGuest]);

      // Log guestList
      console.log(guestList);
    }
  };

  console.log(firstName);
  console.log(lastName);
  console.log(isAttending);

  return (
    // Adding a guest using separate first name and last name fields
    // The first name input needs to have a related label containing `First name`
    <div className="m-5">
      <h1 className="mb-2.5 text-3xl font-bold underline">Guest List</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          First Name:
          <input
            className="box-border m-1 border-solid border-2 rounded-lg  border-teal-300 focus:outline-none focus:ring-0  focus:border-teal-500 focus:border-b-teal-600"
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
          />
        </label>

        <br />

        <label>
          Last Name:
          <input
            className="box-border m-1 border-solid border-2 rounded-lg  border-teal-300 focus:outline-none focus:ring-0  focus:border-teal-500 focus:border-b-teal-600"
            value={lastName}
            onChange={(e) => setLastName(e.currentTarget.value)}
            onKeyUp={addGuest}
          />
        </label>

        <br />

        <label>
          Is Attending:
          <input
            className="box-border m-1 checked:border-teal-500"
            type="checkbox"
            value={isAttending}
            onChange={(e) => setIsAttending(e.currentTarget.checked)}
          />
        </label>
        <button>Add Guest</button>
      </form>
    </div>
  );
}

// guestList.map((guest, index) =>
//         console.log(
//           `Guest #${index}: first name:${guest.firstName}, last name:${guest.lastName}`,
//         ),
//       );
