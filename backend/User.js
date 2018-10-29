// Represents a Parent or a Teacher account
class User{
    constructor({firstname,lastname,email,password, isteacher}){
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.password = password
        this.isteacher = isteacher
    }
}

module.exports = User
