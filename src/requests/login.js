import {API_BASE_URL} from "./base";

export const login = async(email, password) => {
    let response = await fetch(API_BASE_URL + 'sessions', {
        method: "POST",
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json'      
        },
        body: JSON.stringify({email, password})
    });
    
    let parsedResponse = await response.json();
    
    return parsedResponse;
}