import { useEffect, useState } from 'react';
import GuestListForm from './GuestListForm';
import GuestListTable from './GuestListTable';

export default function App() {
  const [guestId, setGuestId] = useState();
  const [guestList, setGuestList] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const []

  const baseUrl = 'http://localhost:4000/';

  // # Input Field and Check Box event handlers
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

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

  async function initialFetchAllGuests() {
    const response = await fetch(`${baseUrl}guests`);
    const fetchedGuests = await response.json();
    setGuestList(fetchedGuests); // Set fetched guests as the guest list
  }

  // # API - Initial fetch
  useEffect(() => {
    // async function initialFetchAllGuests() {
    //   const response = await fetch(`${baseUrl}guests`);
    //   const fetchedGuests = await response.json();
    //   setGuestList(fetchedGuests); // Set fetched guests as the guest list
    // }
    initialFetchAllGuests().catch((error) => console.error(error));
  }, []); // []: Trigger only on first render

  // // # API - Get All Guests
  // async function getAllGuests() {
  //   const response = await fetch(`${baseUrl}guests`);
  //   const fetchedGuests = await response.json();
  //   setGuestList(fetchedGuests); // Set fetched guests as the guest list
  //   // handleTableContent(fetchedGuests);
  //   console.log(`Fetching all guests from API:`);
  //   guestList.map((guest, index) =>
  //     console.log(
  //       `guest#${index}: ${guest.firstName}, ${guest.lastName}, ${guest.attending}`,
  //     ),
  //   );
  // }

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
      // finde gast mit guestIdParameter in guestList
      // .filter erstellt immer ein neues Array, so wie map, daher const {variablenname davor}
      const filteredGuest = guestList.filter((guest) => {
        // nimm jeden Gast, außer den, den ich geupdated habe
        return guest.id !== updatedGuest.id;
      });
      setGuestList([...guestList], filteredGuest);
      // setze attending von updatedGuest zu guest in guestList
      console.log('Updated guest');
      initialFetchAllGuests().catch((error) => console.error(error));
    } else {
      console.error(`Response was not okay`);
    }
  }

  // // # Update Guest locally
  // const updateGuest = async (guestIdParameter) => {
  //   // Remove Guest with given guestId
  //   const updatedGuest = await updateGuestFromAPI(guestIdParameter);

  //   if (updatedGuest) {
  //     // If guest was deleted from API update local state

  //     // Update Guest List
  //     setGuestList(updatedList);
  //   } else {
  //     console.error('Failed to delete guest from API');
  //   }
  // };

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
