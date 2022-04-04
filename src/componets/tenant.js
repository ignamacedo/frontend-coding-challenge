import React from 'react';

export default function Tenant({item}){
    return(
        <>
            <tr>
                <th>{item.id}</th>
                <td>{item.name}</td>
                <td>{item.paymentStatus}</td>
                <td>{new Date(item.leaseEndDate).toLocaleDateString('en-US')}</td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
        </>
     );
}