import { useEffect, useState } from 'react';
import GuestListForm from './GuestListForm';
import GuestListTable from './GuestListTable';

export default function App() {
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAttending, setIsAttending] = useState(false);

  const baseUrl = 'http://localhost:4000/';

  // Initial API fetch
  useEffect(() => {
    async function initialFetchAllGuests() {
      const response = await fetch(`${baseUrl}guests`);
      const fetchedGuests = await response.json();
      setGuestList([fetchedGuests[0]]);
    }
    initialFetchAllGuests().catch((error) => console.error(error));
  }, []); // Trigger only on first render

  // Get All Guests - API Call
  async function getAllGuests() {
    const response = await fetch(`${baseUrl}guests`);
    const fetchedGuests = await response.json();
    console.log(`Fetching all guests from API:`);
    guestList.map((guest, index) => {
      console.log(
        `guest#${index}: ${guest.firstName}, ${guest.lastName}, ${guest.attending}`,
      );
    });

    setGuestList([fetchedGuests[0]]);
    // guestList.map((guest, index) => {
    //   setGuestList([...guestList, guest[index]]);
    // });
  }

  // Create a guest - API Call
  async function createGuest() {
    const response = await fetch(`${baseUrl}/guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        attending: { isAttending },
        firstName: { firstName },
        lastName: { lastName },
      }),
    });
    const createdGuest = await response.json();
    setGuestList([...guestList, createdGuest]);
    console.log(guestList);
    // Reset form
    setFirstName('');
    setLastName('');
    setIsAttending(false);
  }

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
    // Remove Guest and hold the updated guest list after removing the guest
    const newList = guestList.filter((_, i) => i !== guestId);
    // Update Guest List
    setGuestList(newList);
  };

  const addGuest = (e) => {
    // Check if pressed key was Enter?
    if (e.key === 'Enter' || e.button === 0) {
      // Confirm Enter key
      console.log(`${e.key} pressed. Creating new guest`);
      // set newGuest Object values
      const newGuest = {
        firstName: firstName,
        lastName: lastName,
        isAttending: isAttending,
      };
      // Log newGuests's firstName, lastName, isAttending status
      console.log(
        `New guest within addGuest(): firstName: ${newGuest.firstName}, lastName: ${newGuest.lastName}, isAttending; ${isAttending}`,
      );
      // Add newGuest to guestList
      setGuestList([...guestList, newGuest]);
      // Log guestList
      console.log(guestList);
      // Reset form
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
        getAllGuests={getAllGuests}
        createGuest={createGuest}
      />
      <GuestListTable guestList={guestList} removeGuest={removeGuest} />
    </>
  );
}
