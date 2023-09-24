import React from 'react';

export default function GuestList(props) {
  return (
    <div className="m-5">
      <h2 className="mb-2.5 text-3xl font-bold underline decoration-blue-500 ">
        Persons
      </h2>
      <table className="table-auto border-spacing-0.5 shadow-lg bg-white border-collapsing">
        <thead>
          <tr>
            <th className="bg-blue-100 border text-left px-4 py-1">ID</th>
            <th className="bg-blue-100 border text-left px-4 py-1">
              First Name
            </th>
            <th className="bg-blue-100 border text-left px-4 py-1">
              Last Name
            </th>
            <th className="bg-blue-100 border text-left px-4 py-1">
              Attending
            </th>
            <th className="bg-blue-100 border text-left px-4 py-1">
              Remove Guest
            </th>
          </tr>
        </thead>
        <tbody>
          {props.guestList.map((guest, id) => (
            <tr
              className="hover:bg-gray-100 focus:bg-gray-200"
              key={`guest-${guest[id]}`}
            >
              <td className="border bg-gray-50 px-4 py-1">{guest.id}</td>
              <td className="border px-4 py-1">{guest.firstName}</td>
              <td className="border px-4 py-1">{guest.lastName}</td>
              <td className="border px-4 py-1">
                {guest.isAttending ? 'Yes' : 'No'}
              </td>
              <td className="border px-4 py-1">
                <button
                  className="box-border mt-1 ml-2 bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-700 hover-border-blue-500 rounded ring-1"
                  aria-label="remove"
                  onClick={() => props.removeGuest(guest.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
          {/* {props.handleTableContent} */}
        </tbody>
      </table>
    </div>
  );
}
