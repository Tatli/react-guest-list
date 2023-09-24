import { useEffect, useState } from 'react';
import GuestListForm from './GuestListForm';
import GuestListTable from './GuestListTable';

export default function App() {
  const [guestId, setGuestId] = useState();
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAttending, setIsAttending] = useState(false);

  const baseUrl = 'http://localhost:4000/';

  async function deleteGuestFromAPI(guestIdParameter) {
    const response = await fetch(`${baseUrl}guests/${guestIdParameter}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      console.log('Deleted guest');
      return true;
    } else {
      console.error(`Response was not okay`);
      return false;
    }
  }

  // # Remove Guest
  const removeGuest = async (guestIdParameter) => {
    // Remove Guest with given guestId
    const deletedGuest = await deleteGuestFromAPI(guestIdParameter);

    if (deletedGuest) {
      // If guest was deleted from API update local state
      const updatedList = guestList.filter(
        (guest) => guest.id !== guestIdParameter,
      );
      // Update Guest List
      setGuestList(updatedList);
    } else {
      console.error('Failed to delete guest from API');
    }
  };

  // # API - Initial fetch
  useEffect(() => {
    async function initialFetchAllGuests() {
      const response = await fetch(`${baseUrl}guests`);
      const fetchedGuests = await response.json();
      setGuestList(fetchedGuests); // Set fetched guests as the guest list
    }
    initialFetchAllGuests().catch((error) => console.error(error));
  }, []); // []: Trigger only on first render

  // # API - Get All Guests
  async function getAllGuests() {
    const response = await fetch(`${baseUrl}guests`);
    const fetchedGuests = await response.json();
    setGuestList(fetchedGuests); // Set fetched guests as the guest list
    // handleTableContent(fetchedGuests);
    console.log(`Fetching all guests from API:`);
    guestList.map((guest, index) =>
      console.log(
        `guest#${index}: ${guest.firstName}, ${guest.lastName}, ${guest.attending}`,
      ),
    );
  }

  // # API - Create Guest
  async function createGuest() {
    const response = await fetch(`${baseUrl}guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: guestId,
        attending: isAttending,
        firstName: firstName,
        lastName: lastName,
      }),
    });
    const createdGuest = await response.json();
    setGuestList([...guestList, createdGuest]);
    console.log(createdGuest);
    console.log(guestList);
    // Reset form
    setFirstName('');
    setLastName('');
    setIsAttending(false);
  }

  /*
  // # Add Guest without API
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
*/

  // # Input Field and Check Box event handlers
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleIsAttendingChange = (e) => {
    setIsAttending(e.target.checked);
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
        // addGuest={addGuest} // "Old" way to add a guest without API
        getAllGuests={getAllGuests}
        createGuest={createGuest}
      />
      <GuestListTable guestList={guestList} removeGuest={removeGuest} />
    </>
  );
}
