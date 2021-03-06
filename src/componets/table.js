import React from 'react';
import Tenant from './tenant';

export default function Table({copyTenants, onById, onByName, onPaymentStatus, onByLeaseEnDate}){

  function sortById(){
    onById();
  }

  function sortByName(){
    onByName();
  }

  function sortByPaymentStatus(){
    onPaymentStatus();
  }

  function sortByLeaseEnDate(){
    onByLeaseEnDate();
  }
  
  return(
        <>
          <table className="table">
            <thead>
              <tr>
                <th onClick={sortById}>#</th>
                <th onClick={sortByName}>Name</th>
                <th onClick={sortByPaymentStatus}>Payment Status</th>
                <th onClick={sortByLeaseEnDate}>Lease End Date</th>
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