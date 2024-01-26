import {useQuery, gql} from '@apollo/client';
import { Button, Card, CardTitle, CardText, CardBody, Container, CardSubtitle, NavLink } from 'reactstrap';
import {Link, useNavigate} from "react-router-dom";


function CompanyBlock()
{
  const vacancyRec = gql`query
  {
    companies
    {
      id
      name
      address

      vacancies: vacancySet{
        id
      }
    }
  }`

  const {loading, error, data} = useQuery(vacancyRec);
  if (loading) return (<p>Загрузка</p>);
  if (error) return (<p>Ошибка</p>);

  return (<div className='mt-3'>
  <h2>Топ компаний</h2>
    <div style ={{display:"flex"}}>
      {data.companies.slice(0, 10).map(it => {
        return (
        <Card key ={it.id} outline color="dark" style={{width:"15%", padding:"1rem", margin:"0.5rem"}}>
          <CardTitle>
            <Link to={"/companies/"+it.id} style={{color:"darksalmon"}}>
            {it.name}
            </Link>
          </CardTitle>
          <CardSubtitle>
            {it.address}
          </CardSubtitle>
          <CardText>
            {it.vacancies.length} вакансий
          </CardText>
        </Card>)
      })}
    </div>
    </div>)
}

export default function Home()
{
  const navigate = useNavigate();

  const vacancyRec = gql`query
  {
    vacancies
    {
      id
      post
      {
        id
        name
      }
      salary
      company
      {
        id
        name
      }
    }
  }`

  const {loading, error, data} = useQuery(vacancyRec);
  if (loading) return (<p>Загрузка</p>);
  if (error) return (<p>Ошибка</p>);

  return(
  <div>
    <div className='office-back'>
        <h1>Работа для вас - найдется</h1>
        <Button style={{fontSize:"24px"}} onClick={()=> navigate("/vacancies") }>Вакансии</Button>
    </div>
    <Container className='mt-3'>
    <h2>Вакансии недели</h2>
    <div style ={{display:"flex"}}>
      {data.vacancies.slice(0, 10).map(it => {
        return (
        <Card key ={it.id} outline color="dark" style={{width:"20%", padding:"1rem",  margin:"0.5rem"}}>
          <CardTitle>
            <Link to={"/vacancies/"+it.id}>
            {it.post.name}
            </Link>
          </CardTitle>
          <CardSubtitle>
            {it.salary} ₽
          </CardSubtitle>
          <CardText>
            <Link to={"/companies/"+it.company.id}>
            {it.company.name}
            </Link>
          </CardText>
        </Card>)
      })}
    </div>
    <CompanyBlock/>
    </Container>

  </div>
  )
}