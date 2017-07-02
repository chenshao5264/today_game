function User(id) {
    this._userId   = id;
    this._nickname = "";
    this._sex      = 1;
    this._gems     = 0;
    this._victory  = 0;
    this._defeat   = 0;
}

User.prototype.getUserId = function() {
    return this._userId;
}
User.prototype.setUserId = function(value) {
    this._userId = value;
}
