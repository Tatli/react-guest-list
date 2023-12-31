import './index.css';

export default function GuestListForm(props) {
  // const [newGuest, setNewGuest] = useState({});

  // useEffect(() => {
  //   // add newGuest to guestList
  //   setGuestList([...guestList, newGuest]);
  // }, [guestList, newGuest]);

  console.log(`${props.firstName} ${props.lastName}`);

  return (
    // Adding a guest using separate first name and last name fields
    // The first name input needs to have a related label containing `First name`
    <div className="m-5">
      <h1 className="mb-2.5 text-3xl font-bold underline decoration-blue-500">
        Death Note
      </h1>
      <div data-test-id="guest">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="">
            <label>
              First Name
              <input
                label="First Name"
                className="box-border m-1 border-solid border-2 rounded-lg  border-blue-300 focus:outline-none focus:ring-0  focus:border-blue-500 focus:border-b-blue-700"
                value={props.firstName}
                onChange={props.handleFirstNameChange}
              />
            </label>

            <br />

            <label>
              Last Name
              <input
                label="Last Name"
                className="box-border m-1 border-solid border-2 rounded-lg  border-blue-300 focus:outline-none focus:ring-0  focus:border-blue-500 focus:border-b-blue-700"
                value={props.lastName}
                onChange={props.handleLastNameChange}
                onKeyDown={props.addGuest}
              />
            </label>

            <br />

            <button
              className="box-border mt-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-700 hover-border-blue-500 rounded ring-1 focus:outline-blue-700"
              onClick={props.createGuest}
            >
              Create Guest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
