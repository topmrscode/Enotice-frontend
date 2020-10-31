import {API_BASE_URL} from "./base";
import { getSession } from '../requests/utils';

export const fetchCurrentUser = async() => {
    let sessionID = getSession();

    let response = await fetch(API_BASE_URL + 'users/me', {
        method: "GET",
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'X-Authorization': sessionID
        }
    });
    
    let parsedResponse = await response.json();

    console.log(parsedResponse);
    return parsedResponse;
}