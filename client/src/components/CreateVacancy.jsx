import {useParams, useNavigate } from "react-router-dom";
import { gql, useQuery, useMutation} from "@apollo/client"
import {Form, Input, Label} from "reactstrap"
import { useState, useEffect } from "react";
import getUser from "../useUser"

function Vacancy({vacancy, companyId})
{
    const navigate = useNavigate();
    const postReq = gql`query
    {
        posts{
        id
        name
        description
      }  
    }`;

    const mutationReq = gql`mutation postvacancy($input:VacancyMutationInput!)
    {
        vacancy(input:$input)
        {
            id
            description
            creatingDate
        }
    }`;
    const [postVacancyMutation, res] = useMutation(mutationReq);
    
    const {loading, error, data} = useQuery(postReq);
    if(loading) return (<p>loading</p>);
    if(error) return (<p>{error.message}</p>);
    async function onNew(e)
    {
        e.preventDefault();
        console.log(e)
        let data = {
            "post":e.target[0].value,
            "salary":Number(e.target[1].value),
            "description":e.target[2].value,
            "company": String(companyId)
        };

        await postVacancyMutation({variables:{input:data}});
        if(res)
            navigate("/myvacancies")
        else
            alert("Не удалость создать");
    }

    async function onEdit(e)
    {
        e.preventDefault();
        let data = {
            "salary":Number(e.target[0].value),
            "description":e.target[1].value,
            "company": String(companyId),
            "id":Number(vacancy.id),
            "post": String(vacancy.post.id)
        };

        await postVacancyMutation({variables:{input:data}});
        if(res)
            navigate("/myvacancies")
        else
            alert("Не удалость создать");
    }

    if(vacancy === undefined || vacancy === null)
    {
        return(
        <Form onSubmit={onNew} className="w-50 m-auto mt-5">
            <Label>Должность</Label>
            <Input placeholder="Должность" id="place" name="place" type='select'>
                {data.posts.map(it => {
                    return (<option key={it.id} value={it.id}>{it.name}</option>);
                })}
            
            </Input>
            <Label>Зарплата</Label>
            <Input placeholder="Зарплата" id="salary" name="salary" type='number'/>
            <Label>Описание</Label>
            <Input placeholder="Описание" id='description' name="description" type="textarea"/>
            <Input type="submit" className="mt-3"></Input>
        </Form>
        );
    }
    return ( 
    <Form onSubmit={onEdit} className="w-50 m-auto mt-5">
        <Label>Зарплата</Label>
        <Input placeholder="Зарплата" id="salary" name="salary" type='number'></Input>
        <Label>Описание</Label>
        <Input placeholder="Описание" id='description' name="description" type="textarea"></Input>
        <Input type="submit" className="mt-3"></Input>
    </Form>
    );
}

function EditVacancy({id, companyId})
{
    const req = gql`query
    {
      vacancy(id:${id})
      {
        id
        creatingDate
        salary
        description
        post 
        {
            id
        }
      }
    }`;

   const {loading, error, data} = useQuery(req);
   if(loading) return (<p>loading</p>);
   if (error) return (<p>{error.message}</p>);

   return (<Vacancy vacancy={data.vacancy} companyId={companyId}></Vacancy>);

}

export default function CreateVacancy()
{
    const {id} =useParams();
    console.log(id)
    const [user,setUser] = useState(null);
    useEffect(()=>{
        getUser().then(res => setUser(res));
    }, []);

    if (user == null || user.type !== "recruter") return (<p>Вы не авторизированны</p>);

    if (id == null) 
        return (<Vacancy companyId={user.company} />);

    return (<EditVacancy id={id} companyId={user.company}/>);
}