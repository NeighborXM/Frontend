import React from 'react';
import ReactDOMServer from 'react-dom/server';

let askForHelpForm = 
        <form id="askForHelpForm" method="POST" target="_blank" action="http://www.neighborxm.com/api/request">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
            <h2 style={{textAlign: "center"}}>Ask for help</h2>
            <div className="row">
                <div className="col-6">
                    <label htmlFor="firstName">First Name</label>
                    <input required type="text" className="form-control" id="firstName"/>
                </div>
               <div className="col-6">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" className="form-control" id="lastName"/>
                </div>
                <div className="col-12">
                    <label htmlFor="email">Email Address</label>
                    <input required type="text" className="form-control" id="email"/>
                </div>
                <div className="col-12">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input required type="text" className="form-control" id="phoneNumber"/>
                </div>
                <div className="col-12">
                    <label htmlFor="address">Address</label>
                    <input required type="text" className="form-control" id="address"/>
                </div>
                <div className="col-12">
                    <label htmlFor="requestType">Request Type</label><br/>
                    <span className="text-danger ml-auto">DISCLAIMER: For any emergency medical needs, please call 911.</span>
                    <select className="form-control" id="requestType">
                        <option value="Food Bank Assistance">Food Bank Assistance</option>
                        <option value="Emergency Assistance">Emergency Assistance</option>
                        <option value="Mental Health">Mental Health</option>
                        <option value="Pastoral Care">Pastoral Care</option>
                        <option value="Prayer">Prayer</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="col-12">
                    <label htmlFor="description">Request Description</label>
                    <textarea required className="form-control" id="description"></textarea>
                </div>
                <div className="col-12">
                    <button className="w-100 btn btn-primary" type="submit" form="askForHelpForm">Submit Request</button>
                </div>
            </div>
        </form>;
        
let medicalUpdateForm = 
    <form id="medicalUpdateForm" className="container" method="POST" target="_blank" action="http://www.neighborxm.com/api/medical-update">
        <h2 style={{textAlign: "center"}}>Medical Update</h2>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        <div className="row">
            <div className="col-12">
                <label htmlFor="description">Update Description</label>
                <textarea required className="form-control" id="description"></textarea>
            </div>
            <div className="col-12">
                <button className="w-100 btn btn-primary" type="submit" form="medicalUpdateForm">Submit</button>
            </div>
        </div>
    </form>;

let localAnnouncementForm = 
    <form id="localAnnouncementForm" className="container" method="POST" target="_blank" action="http://www.neighborxm.com/api/medical-update">
        <h2 style={{textAlign: "center"}}>Local Announcement</h2>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        <div className="row">
            <div className="col-12">
                <label htmlFor="description">Announcement Description</label>
                <textarea required className="form-control" id="description"></textarea>
            </div>
            <div className="col-12">
                <button className="w-100 btn btn-primary" type="submit" form="localAnnouncementForm">Submit</button>
            </div>
        </div>
    </form>;

let localEventForm = 
    <form id="localEventForm" className="container" method="POST" target="_blank" action="http://www.neighborxm.com/api/medical-update">
        <h2 style={{textAlign: "center"}}>Add Local Event</h2>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        <div className="row">
            <div className="col-12">
                <label htmlFor="description">Event Description</label>
                <textarea required className="form-control" id="description"></textarea>
            </div>
            <div className="col-12">
                <button className="w-100 btn btn-primary" type="submit" form="localEventForm">Submit Request</button>
            </div>
        </div>
    </form>;

export default {
    medicalUpdateForm: ReactDOMServer.renderToStaticMarkup(medicalUpdateForm),
    localAnnouncementForm: ReactDOMServer.renderToStaticMarkup(localAnnouncementForm),
    localEventForm: ReactDOMServer.renderToStaticMarkup(localEventForm),
    askForHelpForm: ReactDOMServer.renderToStaticMarkup(askForHelpForm),

}