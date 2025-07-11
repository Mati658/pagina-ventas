// src/context/DatabaseContext.jsx
import { createClient } from '@supabase/supabase-js';
import { createContext, ReactNode, useContext } from 'react';

// =================================================PROD==============================================
// const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);
// ==================================================DEV==============================================
import { environment } from '../../env/environment.prod'; const supabase = createClient(environment.VITE_SUPABASE_URL, environment.VITE_SUPABASE_KEY);

type Props = {
    children:ReactNode,
}

interface DatabaseContextType {
    getUno : (tabla:string, select:string, id:number) => Promise<false | any[]>;
    getTabla : (tabla:string, columna:string) => Promise<false | any[]>;

    altaDB : (tabla:string, datos : any) => Promise<boolean | any[]>;
    bajaDB : (tabla:string, id : number) => Promise<boolean>;
    update : (tabla:string, datos : any, id:number) => Promise<false | any[]>
}

const DatabaseContext = createContext<DatabaseContextType | null>(null);

export const DatabaseProvider = ({ children }: Props) => {

    const getUno = async (tabla:string, select:string, id:number)=>{
        // console.log(id)
        const data = (await supabase
        .from(tabla)
        .select(select)
        .eq('id', id)).data

        if (data) {
            return data;
        }
        
        // console.log(data);

        return false;
    }
  
    const getTabla = async (tabla:string, columna:string = '*') => {

        const { data, error } = await supabase
        .from(tabla)
        .select(columna)

        if (data) {
            return data;
        }
        
        console.error(error);

        return false;

    } 
    
    const altaDB = async(tabla:string, datos : any) =>{
        // console.log(datos)
        let {data, error} = (await supabase
        .from(tabla)
        .insert([datos])
        .select())

        if (data)  
          return data;
    
        console.error(error);

        return false;

    }


    const bajaDB = async(tabla:string, id : number) =>{
        let {data} = (await supabase
        .from(tabla)
        .delete()
        .eq("id", id))

        if (data != null)  
            return true;

        return false;
    }

    const update = async(tabla:string, datos:any, id:number)=>{
        // console.log(datos)
        let data = (await supabase
        .from(tabla)
        .update([datos])
        .eq('id', id)
        .select()).data
    
        // console.log(data)
    
        if (data)  
          return data;
    
        return false;
    }

    return (
        <DatabaseContext.Provider
        value={{
            getUno,
            getTabla,
            altaDB,
            bajaDB,
            update
        }}
        >
        {children}
        </DatabaseContext.Provider>
    );
};

export const useDatabase = () => {
    const context = useContext(DatabaseContext);
    if (!context) throw new Error("Error context useAuth");
    return context;
};