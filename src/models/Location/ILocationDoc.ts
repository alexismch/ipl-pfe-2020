import {Document} from "mongoose";
import ILocation from "@models/Location/ILocation";

export default interface ILocationDoc extends Document, ILocation {
}