import React from 'react';
import { useEffect, useState } from 'react';
import { Service } from './Service';
import NavBar from './componets/navBar';
import Table from './componets/table';

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
      setMessageValidateName('The name is too long');
    }
  }

  return (
      <>
        <div className="container">
          <h1>Tenants</h1>
          <NavBar onAllTenants={handleAllTenants} onPaymentLate={handlePaymentLate} onLeaseEndsLessAMonth={handleLeaseEndsLessAMonth}/>
          <Table copyTenants={copyTenants}/>
        </div>
        
        <div className="container">
          <button className="btn btn-secondary" disabled={disabledBtnAddTenant}>Add Tenant</button>
        </div>
        
        <div className="container">
          <form>
            <div className="form-group">
              <label>Name</label>
              <input className="form-control" onChange={ (e) => validateTenantName(e)}/>
              <p>{messageValidateName}</p>
            </div>
            <div className="form-group">
              <label>Payment Status</label>
              <select className="form-control">
                <option>CURRENT</option>
                <option>LATE</option>
              </select>
            </div>
            <div className="form-group">
              <label>Lease End Date</label>
              <input className="form-control"/>
            </div>
            <button className="btn btn-primary">Save</button>
            <button className="btn">Cancel</button>
          </form>
        </div>
      </>
  );
}

export default App;
