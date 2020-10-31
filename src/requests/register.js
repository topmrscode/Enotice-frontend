import {API_BASE_URL} from "./base"

export const register = async(email, password) => {
    let response = await fetch(API_BASE_URL + 'users', {
        method: "POST",
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json'      
        },
        body: JSON.stringify({email, password, username: "uname", firstname: "fname", lastname: "lname"})
    });
    let parsedResponse = await response.json();
    
    return parsedResponse;
}
