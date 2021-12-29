

class PermissionsException extends Error{
    constructor(error, message){
        super();
        this.error = error;
        this.name = 'PermissionsException';
        this.message = message;
    }
}
  module.exports = PermissionsException