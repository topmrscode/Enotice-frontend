export const setSession = (session) => {
    let sess_id = session.id;

    localStorage.setItem("sess_tok", sess_id);
}

export const getSession = (session) => {
    let sess_id = localStorage.getItem("sess_tok");

    return sess_id;
}

export const removeSession = () => {
    localStorage.removeItem("sess_tok");
}

export const hasSession = () => {
    let sess_id = localStorage.getItem("sess_tok");

    return sess_id != null;
}