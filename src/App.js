import { useState } from 'react';
import GuestListForm from './GuestListForm';
import GuestListTable from './GuestListTable';

export default function App() {
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAttending, setIsAttending] = useState(false);

  // Input Field and Check Box event handlers
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleIsAttendingChange = (e) => {
    setIsAttending(e.target.checked);
  };

  // Remove Guest Button function
  const removeGuest = (guestId) => {
    // Remove Guest
    const newList = guestList.filter();
    // Update Guest List
    setGuestList(newList);
  };

  const addGuest = (e) => {
    // Check if pressed key was Enter?
    if (e.key === 'Enter') {
      // Confirm Enter key
      console.log(`${e.key} pressed. Creating new guest`);
      // set newGuest Objects values
      const newGuest = {
        firstName: firstName,
        lastName: lastName,
        isAttending: isAttending,
      };
      // Log newGuests's firstName and lastName
      console.log(
        `New guest within addGuest(): firstName: ${newGuest.firstName}, lastName: ${newGuest.lastName}, isAttending; ${isAttending}`,
      );
      setGuestList([...guestList, newGuest]);
      // Log guestList
      console.log(guestList);
      // Clear form
      setFirstName('');
      setLastName('');
      setIsAttending(false);
    }
  };

  return (
    <>
      <GuestListForm
        firstName={firstName}
        lastName={lastName}
        isAttending={isAttending}
        guestList={guestList}
        handleFirstNameChange={handleFirstNameChange}
        handleLastNameChange={handleLastNameChange}
        handleIsAttendingChange={handleIsAttendingChange}
        addGuest={addGuest}
      />
      <GuestListTable guestList={guestList} removeGuest={removeGuest} />
    </>
  );
}
