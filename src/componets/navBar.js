import React from 'react';

export default function NavBar({onAllTenants, onPaymentLate, onLeaseEndsLessAMonth}){

  function clickAllTenants(){
    onAllTenants();
  }

  function clickPaymentlate(){
    onPaymentLate();
  }

  function clickLeaseEndsLessAMonth(){
    onLeaseEndsLessAMonth();
  }

    return(
        <>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" href="#" onClick={clickAllTenants}>All</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={clickPaymentlate}>Payment is late</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={clickLeaseEndsLessAMonth}>Lease ends in less than a month</a>
            </li>
          </ul>
        </>
     );
}