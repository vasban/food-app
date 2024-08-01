import{ChangeEvent, FormEvent, FormEventHandler, useEffect, useState} from "react";
import{useRouter,useParams} from "next/navigation";
import{RecipeData,RecipeProps} from "@/types";

// interface RecipeProps{
//     initialData: RecipeData;
// }

const EditRecipeForm : React.FC<RecipeProps> = ({initialData})=>{

    console.log("Initial Data:",initialData.title);

    const [recipeData,setRecipeData] = useState<RecipeData>({
        id: initialData.id,
        title: '',
        description: '',
        ingredients: ''
    });
    
    useEffect(()=>{
        
        if(initialData){
            setRecipeData(initialData);
            
        }
    },[initialData]);

   


    const handleChange = (event:ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = event.target ;
        console.log(name,value)
        setRecipeData((prevData)=>({
            ...prevData,
            [name]:value,
        }));
    };
    
    

    const handleSubmit = async (e:FormEvent) =>{
        e.preventDefault();
        console.log("recipeData.id :",recipeData.id);
        console.log("initialData.id :",initialData.id);

        

        console.log("Use Params id:",recipeData.id);

        try{

            console.log(JSON.stringify({recipeData}));
            const res = await fetch(`http://127.0.0.1:8000/PUT/recipes/${recipeData.id}`,{
                method: "PUT",
                headers:{
                    "Content-type":"application/json",
                },
                body: JSON.stringify(recipeData),
            });

            if(!res.ok){
                throw new Error("Failed to updatte topic");
            }

            // router.refresh();
            // router.push('/');
        }catch(error){
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            
            <div>
            <label htmlFor="title">Title:</label>
            <input
            id="title"
            name="title"
            value={recipeData.title}
            onChange={handleChange}
            className="border border-slate-500 px-8 py-2" type="text" placeholder="Recipe Title"/>
            </div>
            
            <div>
            <label htmlFor="description">Description:</label>
            <input
            id="description"
            name="Description"
            value={recipeData.description}
            onChange={handleChange}
            className="border border-slate-500 px-8 py-2" type="text" placeholder="Recipe Description"/>
            </div>
            
            <div>
            <label htmlFor="ingredients">Ingredients:</label>
            <input
            id="ingredients"
            name="ingredients" 
            value={recipeData.ingredients}
            onChange={handleChange}
            className="border border-slate-500 px-8 py-2" type="text" placeholder="Recipe Ingredients"/>
            </div>
            <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit">Update recipe</button>
        </form>
    );
}
 export default EditRecipeForm;