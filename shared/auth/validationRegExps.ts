export const AuthValidationRegExps = {
    loginRegExps: {
        Length: /^.{3,20}$/,
        AllowedChars: /^[a-zA-Z0-9]{0,100}$/
    },
    passwordRegExps: {
        Length: /^.{6,20}$/,
        AllowedChars: /^[a-zA-Z0-9]{0,100}$/
    },
    emailRegExps: {
        AllowedChars: /^[a-zA-Z0-9.]+@(?:[a-zA-Z0-9]+.)+[A-Za-z]+$/
    }
}
