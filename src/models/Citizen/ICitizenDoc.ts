import {Document} from "mongoose";
import ICitizen from "@models/Citizen/ICitizen";

export default interface ICitizenDoc extends Document, ICitizen {
}