import React from 'react';

export default function Tenant({item, index}){
    return(
        <>
            <tr>
                <th>{item.id}</th>
                <td>{item.name}</td>
                <td>{item.paymentStatus}</td>
                <td>{item.leaseEndDate}</td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
        </>
     );
}