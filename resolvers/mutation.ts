import { GraphQLError } from "graphql";
import{ ContactoModel, ContactoModelType} from "../db/contacto.ts";

import mongoose from "mongoose";

export const Mutation = {

  addContact: async(
    _: unknown,
    args: {nombre : string, telefono : string}
  ):Promise<ContactoModelType> => {
    const contacto = {
        nombre : args.nombre,
        telefono : args.telefono,
    };
    const newContacto = await ContactoModel.create(contacto);
    return newContacto;
  },

  deleteContact: async(
    _: unknown,
    args: {id : string}
  ):Promise<ContactoModelType> => {
    const contacto = await ContactoModel.findByIdAndDelete(args.id);
    if(!contacto){
        throw new GraphQLError(`No contact found with id ${args.id}`,{
            extensions: {code : "NOT_FOUND"},
        });
    }
    return contacto;
  },

  updateContact: async(
    _: unknown,
    args: {id:string, nombre : string, telefono : string}
  ):Promise<ContactoModelType> => {
    const contacto = await ContactoModel.findById(args.id);
    if(!contacto){
        throw new GraphQLError(`No contact found with id ${args.id}`,{
            extensions: {code : "NOT_FOUND"},
        });
    }
    contacto.nombre = args.nombre;
    contacto.telefono = args.telefono;
    
    const updateContact = await contacto.save();
    return updateContact;
  },
  
};