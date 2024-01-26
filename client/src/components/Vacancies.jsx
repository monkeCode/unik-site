
import {gql, useQuery} from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import {Button, Card, CardBody, CardText, CardTitle, Container, Input, NavLink, Table} from 'reactstrap';
import {useEffect, useState } from "react";
import  axios  from 'axios';

export function VacanciesList({companyId})
{
    const [salary, setSalary] = useState("");
    const [prof, setProf] = useState("");
    const navigate = useNavigate()

    const get_vacancies = gql`
    query {
        vacancies
        {
          id
          salary
          creatingDate
              post{ 
            name
          }
          company{
            id
            name
          }
        }
      }
    `;
    const { loading, error, data } = useQuery(get_vacancies);

    if (loading)
      return (<p>Загрузка</p>)
    if (error) 
    {
        return (<p>Что-то пошло не так</p>)
    }
    let res = data.vacancies;
    if (companyId != null)
    {
        res = res.filter((it) => it.company.id === companyId);
    }
    console.log(res);
    if(salary !== "")
    {
        res = res.filter((it) => it.salary >= Number(salary), res);
    }
    if(prof !== "")
    {
        res = res.filter((it) => it.post.name.toLowerCase().includes(prof.toLowerCase()), res);
    }
    return (<>
            <div className='m-2 d-flex'>
                <Input className='w-25' onChange={(e)=> setSalary(e.target.value)} type="number" placeholder='Минимальная зарплата'></Input>
                <Input className='w-25' onChange={(e)=> setProf(e.target.value)} placeholder='Должность'></Input>
            </div>
            <Table>
            <thead>
                <tr>
                    <th>Должность</th>
                    <th>Зарплата</th>
                    <th>Дата создания</th>
                    <th>Компания</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {res.map(({id, salary, creatingDate, post, company })=> (
                <tr key={id}>
                    <td>
                        {post.name}
                    </td>
                    <td>
                        {salary}
                    </td>
                    <td>
                        {creatingDate.split("T")[0]}
                    </td>
                    <td>
                        <NavLink href={"/companies/"+company.id}>{company.name}</NavLink>
                    </td>
                    <td>
                        <Button onClick={()=> navigate("/vacancies/"+id)}>
                            Подробнее
                        </Button>
                    </td>
                </tr>))}
            </tbody>
            </Table>
    </>)
}

function GetResumes({postid, userId, vacancyId})
{
    const resumeQuery = gql`query getResumes {
        resumes(empId:${userId})
        {
          id
          salary
          creatingDate
          post
          {id, name}
          vacancies : vacancySet
          {
            id
          }
        }
      }`;
    
    function sendResume(resumeId)
    {
        axios.post("api/addresume/"+vacancyId+"/"+resumeId).then(resp =>{
            alert("резюме отправлено");
        })
    }

    const {loading, err, data} = useQuery(resumeQuery)
    if (loading)
      return (<p>loading</p>)
    if (err)
      return (<p>error</p>)
    let resumes = data.resumes.filter(it => it.post.id === postid);
    return (<div>
        {resumes.map(it => (<Card body>
        <p><strong>{it.post.name}</strong></p> 
        <p>Желаемый оклад: {it.salary} </p>
        <p>Дата создания: {it.creatingDate.split("T")[0]}</p>
        <Button color='link' onClick={() => sendResume(it.id)}>Подать резюме</Button>
        </Card>))}
    </div>)

}

function Vacancy({id})
{
    const vacancyQuery = gql`query {
        vacancy(id:${id})
        {
          id
          description
          salary
          post{
            id
            name
            description
          }
          company
          {
            id
            name
            address
            number
            mail
          }
        }
      }`;

    const [user, setUser] = useState(null);
    useEffect(() => {
        axios.get(`/api/getme`).then((response) => {
                if(response.status === 200)
                    setUser(response.data);
    }).catch((error) => {})}, [id]);

    const {loading, error, data} = useQuery(vacancyQuery);

    if (loading)
        return (<p>Загрузка</p>);

    if(error)
        return (<p>Ошибка</p>);
    
    const vacancy = data.vacancy;

    if(user != null && user.type === 'employee')
    {
        var resumeMenu = (<div>
            <h2>Ваши резюме</h2>
            <GetResumes postid={vacancy.post.id} userId={user.id} vacancyId={vacancy.id}/>
            </div>)
    }

    return(<Container className='bg-light h-100 w-50'>
        <h2>
            {vacancy.post.name}
        </h2>
        <p >{vacancy.description}</p>
        <h3>Оклад: {vacancy.salary} руб</h3>
        <div className='d-flex m-3' style={{justifyContent:"start"}}>
        <Card className='w-25 me-3 p-2' color='dark' outline >
            <CardTitle tag='h3'>
                <NavLink href={'/companies/'  + vacancy.company.id}>{vacancy.company.name}</NavLink>
                
            </CardTitle>
            <CardBody>
                <CardText>
                    <p>Адрес: {vacancy.company.address}</p>
                    <p>Номер: {vacancy.company.number}</p>
                    <p>Почта: {vacancy.company.mail}</p>
                </CardText>
            </CardBody>
        </Card>
        <Card className='w-25 p-2' color='primary' outline>
            <CardTitle tag='h3' >
                {vacancy.post.name}
            </CardTitle>
            <CardBody>
                <CardText>
                    <p>{vacancy.post.description}</p>
                </CardText>
            </CardBody>
        </Card>
        </div>
        {resumeMenu}
    </Container>)
}

export default function VacanciesPage()
{
    const {id} = useParams();

    if(id === undefined) {
        return(
            <div>
                <VacanciesList></VacanciesList>
            </div>)
    }

   
    return (<Vacancy id={id}/>)
}