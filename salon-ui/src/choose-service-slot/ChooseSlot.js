import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";
import {loadingIndicator} from "../common/loader/loading-indicator";
import {appNotification} from "../common/notification/app-notification";
import {API_URL} from "../common/configuration";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {getFormattedTime, isDateGreaterThanToday, padAsTwoDigit, getTomorrow, handleErrors} from "../common/helpers";


class ChooseSlot extends Component {



    constructor(props) {
        super(props);

        this.state = {
            "serviceId": this.props.match.params.serviceId,
            "serviceName": this.props.match.params.serviceName,
            "slotDate": getTomorrow(),
            slots:[]
        };

    }

    componentDidMount() {

    }


    setDate(val){
        this.setState({
            "slotDate":val
        })
    }



    filterAndFormat(items){



        return items.
            filter(item=> isDateGreaterThanToday(item.slotFor) )
            .map(item=>{

                item.time= getFormattedTime(item.slotFor)
                return item
        })
    }
    //[{"id":13,"selectedService":null,"stylistName":"George Wagner","slotFor":"2020-05-04T10:00:00","status":"AVAILABLE","lockedAt":null,"confirmedAt":null},{"id":14,"selectedService":null,"stylistName":"George Wagner","slotFor":"2020-05-04T14:00:00","status":"AVAILABLE","lockedAt":null,"confirmedAt":null},{"id":15,"selectedService":null,"stylistName":"Clint Meyer","slotFor":"2020-05-04T11:00:00","status":"AVAILABLE","lockedAt":null,"confirmedAt":null},{"id":16,"selectedService":null,"stylistName":"Clint Meyer","slotFor":"2020-05-04T15:00:00","status":"AVAILABLE","lockedAt":null,"confirmedAt":null},{"id":17,"selectedService":null,"stylistName":"Chelsea Schultz","slotFor":"2020-05-04T12:00:00","status":"AVAILABLE","lockedAt":null,"confirmedAt":null},{"id":18,"selectedService":null,"stylistName":"Chelsea Schultz","slotFor":"2020-05-04T16:00:00","status":"AVAILABLE","lockedAt":null,"confirmedAt":null},{"id":19,"selectedService":null,"stylistName":"Linda Barton","slotFor":"2020-05-04T10:00:00","status":"AVAILABLE","lockedAt":null,"confirmedAt":null},{"id":20,"selectedService":null,"stylistName":"Linda Barton","slotFor":"2020-05-04T14:00:00","status":"AVAILABLE","lockedAt":null,"confirmedAt":null},{"id":21,"selectedService":null,"stylistName":"Nelson Hopkins","slotFor":"2020-05-04T11:00:00","status":"AVAILABLE","lockedAt":null,"confirmedAt":null},{"id":22,"selectedService":null,"stylistName":"Nelson Hopkins","slotFor":"2020-05-04T15:00:00","status":"AVAILABLE","lockedAt":null,"confirmedAt":null},{"id":23,"selectedService":null,"stylistName":"Sheldon Lawrence","slotFor":"2020-05-04T12:00:00","status":"AVAILABLE","lockedAt":null,"confirmedAt":null},{"id":24,"selectedService":null,"stylistName":"Sheldon Lawrence","slotFor":"2020-05-04T16:00:00","status":"AVAILABLE","lockedAt":null,"confirmedAt":null}]
    onReceiveData(items){


        loadingIndicator.hide();

        const slots = this.filterAndFormat(items)

        if(slots.length == 0){
            appNotification.showError("No Slots available" )
            return
        }

        this.setState({
            slots: slots
        });



    }

    onBookingSuccess(result){


        loadingIndicator.hide();
        appNotification.showSuccess("Slot Booked Successfully for " + JSON.stringify(result) )

        this.showSlotsOnDate()


    }
    onError(error){
        loadingIndicator.hide();
        appNotification.showError("Error  - " + error)
    }
    showSlotsOnDate(){

        loadingIndicator.show();


        const {serviceId,slotDate} = this.state

        const url= API_URL + 'slots/retrieveAvailableSlots/'+serviceId +'/'+ slotDate;

        fetch(url)
            .then( res=> handleErrors(res))
            .then(res => res.json())
            .then((results) => this.onReceiveData(results))
            .catch(errorObject=>this.onError(errorObject))



    }

    // show Loading

    //show error

    //
    render() {

        const {serviceId,slotDate,serviceName,slots} = this.state

        return (

            <div>
            <div className="row">
                <div className="col-12 pl-0">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/" >Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="#" active>Choose Slot</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>



           <div className="row">
               <div className="col-4"><strong>Choose a Date for {serviceName}</strong></div>
               <div className="col-5"> <input  className="form-control form-control-lg"
                                               type="date"
                                               value={slotDate}
                                               onChange={(evt)=>this.setDate(evt.target.value)} /> </div>
               <div className="col-3"> <button type="submit" className="btn btn-primary mb-2" onClick={(evt) => this.showSlotsOnDate()} >Show Slots</button></div>
           </div>

                {slots.length > 0 && <h4 className="pt-5">Available Slots on {slotDate} <br/> </h4>}

                <div className="grid-container row  text-center">



                    {slots.map((item, index)=>{
                        return(
                            <div key={index} className="card mb-4 shadow-sm">
                                <div className="card-header">
                                    <h4 className="my-0 font-weight-normal">{serviceName}</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">{item.stylistName} </h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>Slot Time {item.time}</li>
                                    </ul>
                                    <button type="button" onClick={(evt) => this.bookSlotFor(item)}  className="btn btn-lg btn-block btn-outline-primary">Book this Slot</button>
                                </div>
                            </div>
                        );


                    })}

                </div>



        </div> );
    }

    bookSlotFor(item) {

        const {serviceId,serviceName} = this.state
        const slotId=item.id

        loadingIndicator.show();


        const bookingRequest = {
            "salonServiceId": serviceId,
            "slotId": slotId
        };

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bookingRequest)
        };


        const url = API_URL + 'slots';


        fetch(url, requestOptions)
            .then( res=> handleErrors(res))
            .then(res => res.json())
            .then((results) => this.onBookingSuccess(results))
            .catch(errorObject=>this.onError(errorObject))



    }
}



export default withRouter(ChooseSlot);
