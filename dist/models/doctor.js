"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const DoctorSchema = new mongoose_1.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwd: { type: String, required: true }
});
DoctorSchema.pre('save', function (next) {
    const doctor = this;
    if (!doctor.isModified('passwd'))
        return next();
    doctor.passwd = bcrypt.hashSync(doctor.passwd, saltRounds);
    next();
});
DoctorSchema.methods.verifyPasswd = function (passwd) {
    return bcrypt.compareSync(passwd, this.passwd);
};
DoctorSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwd;
    }
});
exports.default = mongoose_1.model('Doctor', DoctorSchema);
//# sourceMappingURL=doctor.js.map