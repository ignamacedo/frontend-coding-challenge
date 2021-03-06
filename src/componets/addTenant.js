import React from 'react';

export default function AddTenant({onValidateName, disabledBtnAddTenant, messageValidateName, onValidateLeaseEndDate, messageValidateLeaseEndDate}){

    function validateName(e){
        onValidateName(e);
    }

    function validateLeaseEndDate(e){
        onValidateLeaseEndDate(e);
    }

  return(
        <>
            <div className="container">
            <button className="btn btn-secondary" disabled={disabledBtnAddTenant}>Add Tenant</button>
            </div>

            <div className="container">
            <form>
                <div className="form-group">
                <label>Name</label>
                <input className="form-control" onChange={ (e) => validateName(e)}/>
                <p className="alert alert-waring" role="alert">{messageValidateName}</p>
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
                <input className="form-control" onChange={ (e) => validateLeaseEndDate(e)} placeholder="MM/DD/YYYY"/>
                <p className="alert alert-waring" role="alert">{messageValidateLeaseEndDate}</p>
                </div>
                <button className="btn btn-primary">Save</button>
                <button className="btn">Cancel</button>
            </form>
            </div>
        </>
     );
}