import { GraphQLError, responsePathAsArray } from "graphql";
import {ContactoModel, ContactoModelType} from "../db/contacto.ts";

export const Query = {
    getContact: async(_: unknown, args:{id: string}) : Promise<ContactoModelType> =>{
        const contacto = await ContactoModel.findById(args.id);
        if(!contacto){
            throw new GraphQLError(`No contact found with id ${args.id}`,{
                extensions: {code : "NOT_FOUND"},
            });
        }
        return contacto;
        
        const response = await fetch(`https://api.api-ninjas.com/v1/validatephone?number=${contacto.telefono}`);
        if(response.status!==200){
            throw new Error("Invalid telefono");
        }
        const data = await response.json();
        
        const response2 = await fetch(`https://api.api-ninjas.com/v1/worldtime?city=${contacto.pais}`);

        const data2 = await response.json();
        /*
        {
            nombre : contacto.nombre,
            telefono : contacto.telefono,
            pais : data.country,
            hora : data2.hour,
        }*/
    
    },

    getContacts : async():Promise<ContactoModelType[]> => {
        const contactos = await ContactoModel.find().exec();
        return contactos;
    }

};