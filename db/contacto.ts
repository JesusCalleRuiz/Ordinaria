import mongoose from "mongoose";
import { Contacto } from "../types.ts";

const Schema = mongoose.Schema;

const ContactoSchema = new Schema({
    nombre : {type: String, required: true},
    telefono : {type: String, required: true,unique: true},
});

export type ContactoModelType = mongoose.Document & Omit<Contacto,"id">;

export const ContactoModel = mongoose.model<ContactoModelType>("Contacto",ContactoSchema);