import {API_BASE_URL} from "./base"

export const register = async(email, password, name) => {
    console.log(API_BASE_URL)
    let response = await fetch(API_BASE_URL + 'organizations', {
        method: "POST",
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json'      
        },
        body: JSON.stringify({email, password, name})
    });
    return await response.json();
}
