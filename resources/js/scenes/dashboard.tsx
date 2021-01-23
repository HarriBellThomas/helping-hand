import React from 'react';
import ReactDOM from "react-dom";
import axios from "axios";
import { IDashboardProps } from "../interfaces/dashboard.interfaces";
import { BrowserRouter } from 'react-router-dom';
import NewDashboard from '../components/dashboard/NewDashboard';
import Dashboard from '../components/dashboard/Dashboard';

if (document.getElementById('dashboard-root')) {
    const element = document.getElementById('dashboard-root')
    if (element) initialise(element);
}


function initialise(root: HTMLElement) {
    console.log("Initialising Dashboard...");

    axios.get(`/api/init.json`).then(res => {
        const status = res.status;
        if (status == 200) {
            const obj = res.data;
            if ("success" in obj && obj["success"]) {
                const payload: IDashboardProps = obj["payload"];
                console.log(payload);
                ReactDOM.render(
                    <BrowserRouter>
                        <Dashboard {...payload}/>
                    </BrowserRouter>,
                root);

                const loadingElement = document.getElementById('loading');
                if (loadingElement) {
                    loadingElement.remove();
                }
            } else {
                console.log(`Status: ${status}`);
                console.log(res.data);
            }
        } else {
            console.log(`Status: ${status}`);
            console.log(res.data);
        }
    });

    console.log("test");
}