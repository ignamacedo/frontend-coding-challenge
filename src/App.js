import React from 'react';
import { useEffect, useState } from 'react';
import { Service } from './Service';
import NavBar from './componets/navBar';
import Table from './componets/table';
import AddTenant from './componets/addTenant';

function App() {

  const [tenants,setTenants] = useState([]);
  const [copyTenants,setCopyTenants] = useState([]);
  const [disabledBtnAddTenant,setDisabledBtnAddTenant] = useState(false);
  const [messageValidateName,setMessageValidateName] = useState('');

  useEffect(()=>{
    Service.getTenants().then((param) => {
      setTenants(param);
      setCopyTenants(param);
    }).catch((error) => {
      console.log("Error: "+error);
    })
  },[]);

  function handleAllTenants(){
    setCopyTenants([...tenants]);
  }

  function handlePaymentLate(){
    let tnts = [...tenants];
    let paymentLate = tnts.filter(x => x.paymentStatus === 'LATE');

    setCopyTenants([...paymentLate]);
  }

  function handleLeaseEndsLessAMonth(){
    let tnts = [...tenants];
    let today = new Date();
    let leaseEnds = tnts.filter(x => new Date(x.leaseEndDate) >= today);
   
    leaseEnds = leaseEnds.filter( 
      x => ((new Date(x.leaseEndDate).getTime() - today.getTime())/(1000*60*60*24)) <= 30
      );
    
    setCopyTenants([...leaseEnds]);
  }

  function validateTenantName(e){
    if(e.target.value.length <= 25){
      setDisabledBtnAddTenant(false);
      setMessageValidateName('');
    }else{
      setDisabledBtnAddTenant(true);
      setMessageValidateName('The name entered is too long');
    }
  }

  function sortByName(){
    let tnts = [...tenants];
    let sorted = tnts.sort((a, b) =>{
      var nameA = a.name;
      var nameB = b.name;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    setCopyTenants([...sorted]);
  }

  function sortByPaymentStatus(){
    let tnts = [...tenants];
    let sorted = tnts.sort((a, b) =>{
      var nameA = a.paymentStatus;
      var nameB = b.paymentStatus;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    setCopyTenants([...sorted]);
  }

  function sortByLeaseEnDate(){
    let tnts = [...tenants];
    let sorted = tnts.sort((a, b) =>{
      var dateA = a.leaseEndDate;
      var dateB = b.leaseEndDate;
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      return 0;
    });

    setCopyTenants([...sorted]);
  }

  return (
      <>
        <div className="container">
          <h1>Tenants</h1>
          <NavBar onAllTenants={handleAllTenants} onPaymentLate={handlePaymentLate} onLeaseEndsLessAMonth={handleLeaseEndsLessAMonth}/>
          <Table copyTenants={copyTenants} onByName={sortByName} onPaymentStatus={sortByPaymentStatus} onByLeaseEnDate={sortByLeaseEnDate}/>
        </div>
        
        <AddTenant onValidateName={validateTenantName} disabledBtnAddTenant={disabledBtnAddTenant} messageValidateName={messageValidateName} />
        
        
      </>
  );
}

export default App;
