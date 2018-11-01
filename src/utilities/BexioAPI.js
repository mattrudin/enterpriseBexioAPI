import { generateState, resourceReducer, checkTimesheet } from './utilities';
import SetInterval from 'set-interval';

class BexioAPI {
    constructor({clientID, clientSecret, redirectURI, scopes}) {
        this.state = {
            clientID: clientID,
            clientSecret: clientSecret,
            redirectURI: redirectURI,
            scopes: scopes,
            state: '',
            accessToken: '',
            organisation: '',
        }
    }

    //old concept
    callback = () => {
        SetInterval.start(this.getAccess, 500,'callback');
    }

    login = () => {
        // no 'access-control-allow-origin' header is present on the requested resource.
        const baseUrl = 'https://office.bexio.com/oauth/authorize?';
        this.state.state = generateState();
        localStorage.setItem('state', this.state.state);
        const params = `client_id=${this.state.clientID}&redirect_uri=${this.state.redirectURI}&state=${this.state.state}&scope=${this.state.scopes}`;
        const url = `${baseUrl}${params}`;

        window.location = `${url}`;
    }

    getAccess = () => {
        const isCode = window.location.href.match(/code=([^&]*)/);
        if (isCode) {
            SetInterval.clear('callback');
            const stateReceived = window.location.href.match(/state=([^&]*)/)[1];
            const stateSent = localStorage.getItem('state');
            if(stateReceived === stateSent) {
                localStorage.clear();
                window.history.pushState('Access Token', null, '/');
                const code = isCode[1];
                this.getAccessToken(code);
                localStorage.setItem('Login', true); //for connection between the API and the actual app
            }
        }
    }
    //new concept
    /* async callback() {
        const code = await (window.location.href.match(/code=([^&]*)/)[1] !== null);
        const stateReceived = window.location.href.match(/state=([^&]*)/)[1];
        const { state } = this.state;
        if(stateReceived === state) {
            this.getAccessToken(code);
        }
    }

    async login() {
        // no 'access-control-allow-origin' header is present on the requested resource.
        const baseUrl = 'https://office.bexio.com/oauth/authorize?';
        this.state.state = await generateState();
        const params = `client_id=${this.state.clientID}&redirect_uri=${this.state.redirectURI}&state=${this.state.state}&scope=${this.state.scopes}`;
        const url = `${baseUrl}${params}`;

        window.location = `${url}`;
    } */


    getAccessToken = (code) => {
        const baseUrl = 'https://office.bexio.com/oauth/access_token?';
        const params = `client_id=${this.state.clientID}&redirect_uri=${this.state.redirectURI}&client_secret=${this.state.clientSecret}&code=${code}`;
        const url = `${baseUrl}${params}`;
        const reqHeader = new Headers({
            'Content-type': 'application/x-www-form-urlencoded',
        });
        const initObject = {
            method: 'POST', headers: reqHeader,
        };

        fetch(url, initObject)
            .then( response => {
                return response.json();
            })
            .then( receivedData => {
                this.state.accessToken = receivedData.access_token;
                this.state.organisation = receivedData.org;
                alert('AccessToken successfully received');
            })
            .catch(err => {
                alert("Error: Could not retrive data!", err);
            });
    }

    async getData(resource) {
        let data;
        if (typeof resource === 'string' && !data) {
            const { accessToken, organisation } = this.state;
            const baseUrl = 'https://office.bexio.com/api2.php/';
            const resourceText = resourceReducer(resource);
            const url = `${baseUrl}${organisation}/${resourceText}`;
            const reqHeader = new Headers({
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            });
            const initObject = {
                method: 'GET', headers: reqHeader,
            };

            try{
                data = await fetch(url, initObject).then(response => response.json());
            } catch (error) {
                alert('Error:', error)
            }
        } else {
            alert('Error: Please provide a string into this function.')
        }

        return data;
    }

    postData = (resource) => {
        if (typeof resource === 'string') {
            //POST data
        } else {
            alert('Error: Please provide a string into this function.')
        }
    }

    postTimetracking = (timesheet) => { //resource is hardcoded as "timesheet"; scope: monitoring_edit
        if (typeof timesheet === 'object' && checkTimesheet(timesheet)) {
            const { accessToken, organisation } = this.state;
            const baseUrl = 'https://office.bexio.com/api2.php/';
            const url = `${baseUrl}${organisation}/timesheet`;
            const reqHeader = new Headers({
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            });
            const data = JSON.stringify(timesheet);
            const initObject = {
                method: 'POST', body: data, headers: reqHeader
            };
            fetch(url, initObject)
                .then( response => {
                    return alert('Timesheets successfully uploaded!', response.json());
                })
                .catch(err => {
                    alert("Error: Could not send data!", err);
                });
        } else {
            alert('Error: Please provide an object into this function.');
        }
    }

    postItem = (item) => { //resource is hardcoded ad "item"; scope: article_edit
        if (typeof item === 'object') {
            const { accessToken, organisation } = this.state;
            const baseUrl = 'https://office.bexio.com/api2.php/';
            const url = `${baseUrl}${organisation}/article`;
            const reqHeader = new Headers({
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            });
            const data = JSON.stringify(item);
            const initObject = {
                method: 'POST', body: data, headers: reqHeader
            };
            fetch(url, initObject)
                .then( response => {
                    return alert('Item successfully uploaded!', response.json());
                })
                .catch(err => {
                    alert("Error: Could not send data!", err);
                });
        } else {
            alert('Error: Please provide an object into this function.');
        }
    }
}

export default BexioAPI;