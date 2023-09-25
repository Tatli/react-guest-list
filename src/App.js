import { useEffect, useState } from 'react';
import GuestListForm from './GuestListForm';
import GuestListTable from './GuestListTable';

export default function App() {
  const [guestId, setGuestId] = useState();
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  // const []

  const baseUrl = 'http://localhost:4000/';

  // # Input Field and Check Box event handlers
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  // # API - Fetch all Guests (used for initial and attendance update rendering)
  async function fetchAllGuests() {
    const response = await fetch(`${baseUrl}guests`);
    const fetchedGuests = await response.json();
    setGuestList(fetchedGuests); // Set fetched guests as the guest list
  }

  // # API - Initial fetch
  useEffect(() => {
    fetchAllGuests().catch((error) => console.error(error));
    setIsLoading(false);
  }, []); // []: Trigger only on first render

  // # API - Create Guest
  async function createGuest() {
    const response = await fetch(`${baseUrl}guests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    });
    // Newly created guest response from API
    const createdGuest = await response.json();
    // Add the newly created guest to guestList
    setGuestList([...guestList, createdGuest]);
    console.log(
      `createGuest(): id: ${createdGuest.id} firstName: ${createdGuest.firstName} lastName: ${createdGuest.lastName} isAttending: ${createdGuest.attending}`,
    );
    // Reset form
    setFirstName('');
    setLastName('');
    // setIsAttending(false);
  }

  // useEffect(() => {
  //   if (guestList.length > 0) {
  //     setIsLoading(false);
  //   }
  // }, [guestList]);

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

  // # API - Update Guest
  async function updateGuest(guestIdParameter, attendingState) {
    const response = await fetch(`${baseUrl}guests/${guestIdParameter}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: attendingState }),
    });
    if (response.ok) {
      const updatedGuest = await response.json();
      console.log(
        `updatedGuest.attending inside updateGuest(): ${updatedGuest.attending}`,
      );
      // Find Guest with guestIdParameter in guestList
      // .filter always creates a new array, just like map, hence we need to assign it to a variable
      const filteredGuest = guestList.filter((guest) => {
        // Pick every Guest, except updated one
        return guest.id !== updatedGuest.id;
      });
      setGuestList([...guestList], filteredGuest);
      // Set attending of updatedGuest to guest in guestList
      console.log('Updated guest');
      // I could possible re-do this by setting isAttending in here and triggering a re-render in a useEffect (what would be the difference though since I'm executing it here anyway)
      fetchAllGuests().catch((error) => console.error(error));
    } else {
      console.error(`Response was not okay`);
    }
  }

  // Early return is isLoadig is true
  if (isLoading) {
    console.log('Loading...');
    return 'Loading...';
  }

  return (
    <>
      <GuestListForm
        firstName={firstName}
        lastName={lastName}
        guestList={guestList}
        handleFirstNameChange={handleFirstNameChange}
        handleLastNameChange={handleLastNameChange}
        // addGuest={addGuest} // "Old" way to add a guest without API
        createGuest={createGuest}
      />
      <GuestListTable
        guestList={guestList}
        removeGuest={removeGuest}
        updateGuest={updateGuest}
      />
    </>
  );
}
