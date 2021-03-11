import React, {Fragment, useEffect, useRef, useState} from 'react';
import {API_URL} from "../common/configuration";
import {loadingIndicator} from "../common/loader/loading-indicator";
import {appNotification} from "../common/notification/app-notification";
import {useHistory} from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {handleErrors, handleReactiveError} from "../common/helpers";
import {ajax} from "rxjs/ajax";
import {catchError, filter, map, tap} from "rxjs/operators";
import {fromEvent,combineLatest} from "rxjs";


export default function ChooseService(){


    const [items,setItems] =useState([]);

    let history=useHistory();

    const buttonContainer =useRef(null);


    useEffect(()=>{

        loadingIndicator.show();

        const url= API_URL + 'services';


        const items$= ajax.getJSON(url).pipe(
            tap(value => loadingIndicator.hide()),
            map(setItems),
            catchError(err => handleReactiveError("Unable to retrieve Spa Services  - " + err))
        )


        const buttonClickEvents$ = fromEvent(buttonContainer.current,"click").pipe(
            filter(evt=>evt.target.hasAttribute("data-url")),
            map(evt=>evt.target.getAttribute("data-url")),
            tap(dataUrl => history.push(dataUrl))

        )
        const subscription = combineLatest([items$,buttonClickEvents$]).subscribe()

        return ()=>subscription.unsubscribe();

    },[])


    return (
        <Fragment>


            <div className="row">
                <div className="col-12 pl-0">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#" active>Home</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div>
            <div ref={buttonContainer} className="choose-salon row  text-center">

                {items.map((item, index)=>{
                    return(
                        <div key={index} className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">{item.name}</h4>
                            </div>
                            <div className="card-body">
                                <h1 className="card-title pricing-card-title">${item.price} </h1>
                                <ul className="list-unstyled mt-3 mb-4">
                                    <li>{item.description}</li>
                                    <li>{item.timeInMinutes} Minutes</li>
                                </ul>
                                <button type="button"  data-url={"/chooseslot/"+item.id+"/"+ item.name} className="btn btn-lg btn-block btn-outline-primary">Book Now</button>
                            </div>
                        </div>
                    );


                })}

            </div>
        </Fragment>
    );
}

