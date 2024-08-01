"use client";
import EditRecipeForm from"@/components/EditRecipeForm"
import {RecipeData} from"@/types";
import { init } from "next/dist/compiled/webpack/webpack";
import { useRouter } from "next/router";
import { stringify } from "querystring";
import { useEffect,useState } from "react";



const EditRecipe = ({params}:{params:{id:number}}) =>{
    
    
    
    const[initialData,setInitialData] = useState<RecipeData >();

    const fetchRecipe = async (id:number) =>{

        try{
            const res = await fetch(`http://127.0.0.1:8000/GET/recipes/${id}`);

            if(!res.ok){
                throw new Error("Error fetching the data");
            }

            const data: {recipes:RecipeData} = await res.json();
            console.log("Data :",data);
            setInitialData(data.recipes);
            console.log("InitialData after set:",initialData);
        }catch(error){
            console.log(error);
        }

    };


    useEffect(()=>{
       void fetchRecipe(params.id);
        
    },[params.id]);
    
    return(
        <div>
            {initialData && <EditRecipeForm initialData={initialData}  />}
        </div>
    );
};
export default EditRecipe;

    





