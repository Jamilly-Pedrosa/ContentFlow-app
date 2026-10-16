type validation = {
  error: boolean;
  errorMessage: string;
}

export function emailValidation(email: string): validation {
    const emailUser: boolean = email.split('@')[0].length > 0;
    const emailDomain: boolean = email.split('@')[1]? email.split('@')[1].length > 0  : false;

    let emailTemp: validation = {
        error: false,
        errorMessage: ''
    }

    if(email.length === 0) {
        emailTemp.error = true;
        emailTemp.errorMessage = 'O campo de e-mail está vazio.';
        return emailTemp;
    }

    if(email.trim() === '') {
        emailTemp.error = true;
        emailTemp.errorMessage = 'O campo de e-mail não pode conter apenas espaços em branco.';
        return emailTemp;
    }

    if(!email.includes('@') || !email.includes('.') || !emailUser || !emailDomain) {
        emailTemp.error = true;
        emailTemp.errorMessage = 'O e-mail informado é inválido.';
        return emailTemp;
    }

    if(email.toUpperCase() == email) {
        emailTemp.error = true;
        emailTemp.errorMessage = 'O e-mail informado deve conter letras minúsculas.';
        return emailTemp;
    }

    //if() email existe no banco de dados

    return emailTemp;
}

export function passwordValidation(password: string): validation {
    let passwordTemp: validation = {
        error: false,
        errorMessage: ''
    }

    if(password.length === 0) {
        passwordTemp.error = true;
        passwordTemp.errorMessage = 'O campo de senha está vazio.';
        return passwordTemp;
    }

    if(password.trim() === '') {
        passwordTemp.error = true;
        passwordTemp.errorMessage = 'O campo de senha não pode conter apenas espaços em branco.';
        return passwordTemp;
    }

    if(password.length < 8) {
        passwordTemp.error = true;
        passwordTemp.errorMessage = 'A senha deve ter no mínimo 8 caracteres.';
        return passwordTemp;
    }

    if(password.includes(' ')) {
        passwordTemp.error = true;
        passwordTemp.errorMessage = 'A senha não pode conter espaços em branco.';
        return passwordTemp;
    }

    return passwordTemp;
}

export function confirmPasswordValidation(password: string, confirmPassword: string): validation {
    let confirmPasswordTemp: validation = {
        error: false,
        errorMessage: ''
    }

    if(confirmPassword.length === 0) {
        confirmPasswordTemp.error = true;
        confirmPasswordTemp.errorMessage = 'O campo de confirmar senha está vazio.';
        return confirmPasswordTemp;
    }

    if(confirmPassword.trim() === '') {
        confirmPasswordTemp.error = true;
        confirmPasswordTemp.errorMessage = 'O campo de confirmar senha não pode conter apenas espaços em branco.';
        return confirmPasswordTemp;
    }

    if(password !== confirmPassword) {
        confirmPasswordTemp.error = true;
        confirmPasswordTemp.errorMessage = 'As senhas não coincidem.';
        return confirmPasswordTemp;
    }

    return confirmPasswordTemp;
}


export function nameValidation(name: string): validation {
    let nameTemp: validation = {
        error: false,
        errorMessage: ''
    }

    if(name.length === 0) {
        nameTemp.error = true;
        nameTemp.errorMessage = 'O campo de nome está vazio.';
        return nameTemp;
    }

    if(name.trim() === '') {
        nameTemp.error = true;
        nameTemp.errorMessage = 'O campo de nome não pode conter apenas espaços em branco.';
        return nameTemp;
    }

    if(name.length <= 2) {
        nameTemp.error = true;
        nameTemp.errorMessage = 'O nome deve ter mais de 2 caracteres.';
        return nameTemp;
    }

    return nameTemp;
}


export function lastNameValidation(lastName: string): validation {
    let lastNameTemp: validation = {
        error: false,
        errorMessage: ''
    }

    if(lastName.length === 0) {
        lastNameTemp.error = true;
        lastNameTemp.errorMessage = 'O campo de sobrenome está vazio.';
        return lastNameTemp;
    }

    if(lastName.trim() === '') {
        lastNameTemp.error = true;
        lastNameTemp.errorMessage = 'O campo de sobrenome não pode conter apenas espaços em branco.';
        return lastNameTemp;
    }

    if(lastName.length <= 2) {
        lastNameTemp.error = true;
        lastNameTemp.errorMessage = 'O sobrenome deve mais de 2 caracteres.';
        return lastNameTemp;
    }

    return lastNameTemp;
}


//Feito para validar todos os campos antes de enviar para a rota desejada
export function validateUser(name: string, lastName: string, email: string, password: string, confirmPassword: string,  typeFunction: string): boolean {
    if(typeFunction === 'create') {
        if(emailValidation(email).error || passwordValidation(password).error || nameValidation(name).error || lastNameValidation(lastName).error) {
            return false;
        }
    } else if(typeFunction === 'login') {
        if(emailValidation(email).error || passwordValidation(password).error || confirmPasswordValidation(password, password).error) {
            return false;
        }
    }

    return true;
}