import moment from "moment";


class Auth  {
     check = false;
     user;
     token;

    constructor(user,token){
        if (!user || !token){
            return;
        }
        this.check = true;
        this.user = user;
        this.token = token;
    }

    getUser(){
        if (!this.check) return;
        return this.user;
    }

    getToken(){
        if (!this.check) return;
        return this.token;
    }

    tokenExpiresIn(){
        if (!this.check) return;
        const now = moment(new Date()).unix();
        return this.token !== this.token.exp - now ;
    }
}

export default Auth;