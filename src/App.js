import React from 'react';
import { useEffect, useState } from 'react';
import { Service } from './Service';
import NavBar from './componets/navBar';
import Table from './componets/table';
import AddTenant from './componets/addTenant';

function App() {

  const [tenants,setTenants] = useState([]);
  const [copyTenants,setCopyTenants] = useState([]);
  const [disabledBtnAddTenant,setDisabledBtnAddTenant] = useState(true);
  const [messageValidateName,setMessageValidateName] = useState('');
  const [messageValidateLeaseEndDate,setMessageValidateLeaseEndDate] = useState('');

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

  function sortById(){
    let tnts = [...tenants];
    let sorted = tnts.sort((a, b) =>{
      var idA = a.id;
      var idB = b.id;
      if (idA < idB) {
        return -1;
      }
      if (idA > idB) {
        return 1;
      }
      return 0;
    });

    setCopyTenants([...sorted]);
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
      var statusA = a.paymentStatus;
      var statusB = b.paymentStatus;
      if (statusA < statusB) {
        return -1;
      }
      if (statusA > statusB) {
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

  function validateLeaseEndDate(e){
     if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(e.target.value)){
      if(e.target.value.length === 0){
        setDisabledBtnAddTenant(false);
        setMessageValidateLeaseEndDate('');
      }else{
        setDisabledBtnAddTenant(true);
        setMessageValidateLeaseEndDate('Enter the date in MM/DD/YYYY format');
      }
    }else{
      let date = e.target.value.split("/");
      let today = new Date();
      if((date[0] >= 1 && date[0] <= 31) && (date[1] >= 1 && date[1] <= 12) && (date[2] >= 1990 && date[0] <= 2050)){
        if(today.getTime() < new Date(e.target.value).getTime()){
          setDisabledBtnAddTenant(false);
          setMessageValidateLeaseEndDate('');
        }else{
          setDisabledBtnAddTenant(true);
          setMessageValidateLeaseEndDate('The date must be higher than today');
        }
      }else{
        setDisabledBtnAddTenant(true);
        setMessageValidateLeaseEndDate('Incorrect date');
      }
    }
  }

  return (
      <>
        <div className="container">
          <h1>Tenants</h1>
          <NavBar onAllTenants={handleAllTenants} onPaymentLate={handlePaymentLate} onLeaseEndsLessAMonth={handleLeaseEndsLessAMonth}/>
          <Table copyTenants={copyTenants} onById={sortById} onByName={sortByName} onPaymentStatus={sortByPaymentStatus} onByLeaseEnDate={sortByLeaseEnDate}/>
        </div>
        
        <AddTenant onValidateName={validateTenantName} onValidateLeaseEndDate={validateLeaseEndDate} disabledBtnAddTenant={disabledBtnAddTenant} messageValidateName={messageValidateName} messageValidateLeaseEndDate={messageValidateLeaseEndDate} />
        
        
      </>
  );
}

export default App;
