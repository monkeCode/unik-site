
import {gql, useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import {Card, CardTitle, CloseButton, Tooltip, Button} from "reactstrap";
import getUser from "../useUser";
import { NavLink, useNavigate } from "react-router-dom";

function Resume({resume, deleteFunc})
{
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);
    const navigate = useNavigate();
    

        var vacancies = (
        <div><h3>Отправлено на вакансии</h3>
        <ul>{resume.vacancies.map(it => {
            return (<li><NavLink to={"/vacancies/"+it.id}>
                <span>{it.company.name} </span>
                <span>{it.salary} руб. </span>
                <span>{it.creatingDate.split("T")[0]} </span>
            </NavLink></li>)
        })} </ul></div>)

    return (
    <Card body className="m-3">
        <Tooltip target={"delete" + resume.id} isOpen={tooltipOpen} toggle={toggle}>
                Удалить
        </Tooltip>
        <CloseButton onClick={()=>{deleteFunc(resume.id)}} style={{
            position: "absolute",
            right:"0px"
            }} id={"delete" + resume.id}>
            </CloseButton>
        <CardTitle tag='h3'>{resume.post.name}</CardTitle>
            <p>Желаемый Оклад: {resume.salary} руб</p>
            <p>Дата создания: {resume.creatingDate.split("T")[0]}</p>
        {resume.vacancies.length > 0 && vacancies}
        <Button onClick={() => navigate("/resume/"+resume.id+"/edit")}>Изменить</Button>
    </Card>)
}

function ResumeList({userId})
{
    const getResumes = gql`
    query getResumes {
        resumes(empId:${userId})
        {
            id
            salary
            creatingDate
            post 
            {
                id
                name
            }
            vacancies: vacancySet {
                id
                salary
                creatingDate
                company
                {
                    id
                    name
                }
            }
        }
      }`;
      const {loading, error, data, refetch } = useQuery(getResumes);

      const [delRes, result] = useMutation( gql`mutation delete($id:Int!) {
        deleteResume(id:$id)
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
    let resumes = data.resumes;
    return (
    <div className="w-75 m-auto">
        {resumes.map(it => (<Resume resume={it} key={it.id} deleteFunc={del}/>))}
    </div>);
}

export default function MyResumes()
{
    const [user,setUser] = useState(null);
    useEffect(()=>{
        getUser().then(res => setUser(res));
    }, [])
    if (user == null || user.type !== "employee") return (<p>Вы не авторизированны</p>);

    return (<ResumeList userId={user.id}/>);

}