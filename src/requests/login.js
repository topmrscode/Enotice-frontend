const login = async(email, password) => {
    let response = await fetch(API_BASE + 'login', {
        method: "POST",
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json'      
        },
        body: JSON.stringify({email, password})
    });
    return await response.json();
}