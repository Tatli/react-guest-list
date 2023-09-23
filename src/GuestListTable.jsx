import React from 'react';

export default function GuestList(props) {
  return (
    <div className="m-5">
      <h2 className="mb-2.5 text-3xl font-bold underline decoration-blue-500 ">
        Guests
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
          {props.guestList.map((guest, index) => (
            <tr
              className="hover:bg-gray-100 focus:bg-gray-200"
              key={`guest-${guest[index]}`}
            >
              <td className="border bg-gray-50 px-4 py-1">{index}</td>
              <td className="border px-4 py-1">{guest.firstName}</td>
              <td className="border px-4 py-1">{guest.lastName}</td>
              <td className="border px-4 py-1">
                {guest.isAttending ? 'Yes' : 'No'}
              </td>
              <td className="border px-4 py-1">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-1 rounded-full font-bold content-center"
                  aria-label="remove"
                  onClick={() => props.removeGuest(index)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
