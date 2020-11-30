import { model, Schema, Document } from 'mongoose';

const bcrypt = require('bcrypt');
const saltRounds = 10;

export interface IDoctor extends Document {
    firstname?: string;
    lastname?: string;
    email?: string;
    passwd?: string;

    verifyPasswd?(passwd: string): boolean;
}

const DoctorSchema: Schema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    passwd: {type: String, required: true}
});

DoctorSchema.pre('save', function (next) {
    const doctor: IDoctor = this;
    if (!doctor.isModified('passwd')) return next();

    doctor.passwd = bcrypt.hashSync(doctor.passwd, saltRounds);
    next();
});

DoctorSchema.methods.verifyPasswd = function (passwd: string): boolean {
    return bcrypt.compareSync(passwd, this.passwd);
};

DoctorSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwd
    }
})

export default model<IDoctor>('Doctor', DoctorSchema);