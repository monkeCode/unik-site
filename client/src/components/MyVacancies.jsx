
import {gql, useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import {Card, CardTitle, CloseButton, Tooltip, Button} from "reactstrap";
import getUser from "../useUser";
import { NavLink, useNavigate } from "react-router-dom";
import { VacanciesList } from "./Vacancies";

function Vacancy({resume: vacancy, deleteFunc})
{
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);
    const navigate = useNavigate();
    

        var resumes = (
        <div><h3>Направленные резюме</h3>
        <ul>{vacancy.resumes.map(it => {
            return (<li><NavLink to={"/resume/"+it.id}>
                <span>{it.employee.name} {it.employee.lastName} {it.employee.number} </span>
                <span>{it.salary} руб. </span>
                <span>{it.creatingDate.split("T")[0]} </span>
            </NavLink></li>)
        })} </ul></div>)

    return (
    <Card body className="m-3">
        <Tooltip target={"delete" + vacancy.id} isOpen={tooltipOpen} toggle={toggle}>
                Удалить
        </Tooltip>
        <CloseButton onClick={()=>{deleteFunc(vacancy.id)}} style={{
            position: "absolute",
            right:"0px"
            }} id={"delete" + vacancy.id}>
            </CloseButton>
        <CardTitle tag='h3'>
            <NavLink to={"/vacancies/" + vacancy.id}>
                {vacancy.post.name}
            </NavLink>
            </CardTitle>
            <p>Оклад: {vacancy.salary} руб</p>
            <p>Дата создания: {vacancy.creatingDate.split("T")[0]}</p>
        {vacancy.resumes.length > 0 && resumes}
        <Button onClick={() => navigate("/vacancies/"+vacancy.id+"/edit")}>Изменить</Button>
    </Card>)
}

function VacancyList({companyId})
{
    const getVacancies = gql`
    query
        {
            vacancies(companyId:${companyId})
            {
                id
                salary
                creatingDate
                post
                {
                    id
                    name
                }
                resumes
                {
                    id
                    salary
                    creatingDate
                    employee
                    {
                        name
                        lastName
                        number
                    }
                }
        }
    }`;

      const {loading, error, data, refetch } = useQuery(getVacancies);

      const [delRes, result] = useMutation( gql`
      mutation delete($id:Int!) {
        deleteVacancy(id:$id)
        {
          result
        }
      }`);

      async function  del(id)
      {
        let res = await delRes({ variables: { id: Number(id) } })
        if(res)
            await refetch()
        else console.log("Не удалость удалить")
      }

    if (loading) return (<p>Загрузка</p>);
    if (error) return (<p>Ошибка</p>);
    let vacancies = data.vacancies;
    return (
    <div className="w-75 m-auto">
        {vacancies.map(it => (<Vacancy resume={it} key={it.id} deleteFunc={del}/>))}
    </div>);
}

export default function MyVacancies()
{
    const [user,setUser] = useState(null);

    useEffect(()=>{
        getUser().then(res => setUser(res));
    }, [])
    if (user == null || user.type !== "recruter") return (<p>Вы не авторизированны</p>);

    return (<VacancyList companyId={user.company}/>);

}