// Represents a Parent or a Teacher account
class User{
    constructor({firstname,lastname,email,password, is_teacher}){
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.password = password
        this.is_teacher = is_teacher
    }
}

module.exports = User
