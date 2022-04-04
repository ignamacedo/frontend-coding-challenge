import React from 'react';
import Tenant from './tenant';

export default function Table({copyTenants}){

  return(
        <>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Payment Status</th>
                <th>Lease End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                (copyTenants.length === 0)? '...': 
                copyTenants.map( (item, i) => {
                  return <Tenant key={item.id} item={item} />
                })
              }
            </tbody>
          </table>
        </>
     );
}