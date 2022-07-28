export const isValidEmail = email => /\S+@\S+\.\S+/.test(email);
export const isValidUsername = usernmae => !!usernmae && /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g.test(usernmae);
export const isValidPassword = password => !!password && /^[A-Za-z]\w{7,14}$/.test(password);
// export const isValidPassword = password => password.length > 6 && /\d{1}/.test(password);