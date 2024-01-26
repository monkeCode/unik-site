import {gql, useQuery} from "@apollo/client";
import {Container, Card, CardTitle, CardBody, CardText } from "reactstrap";
import { useParams } from "react-router-dom";

function Resume({id})
{
    const resumeQuery = gql`
    query
    {
      resume(id:${id})
      {
        description
        salary
        post
        {
          name
          description
        }
        employee
        {
          name
          lastName
          birth
          isMale
          number
        }
      }
    }`;


    const {loading, error, data} = useQuery(resumeQuery);

    if (loading)
        return (<p>Загрузка</p>);

    if(error)
        return (<p>Ошибка</p>);
    
    const resume = data.resume;

    return(<Container className='bg-light h-100 w-50'>
        <h2>
            {resume.post.name}
        </h2>
        <p >{resume.description}</p>
        <h3>Оклад: {resume.salary} руб</h3>
        <div className='d-flex m-3' style={{justifyContent:"start"}}>
        <Card className='w-25 me-3' color='dark' outline >
            <CardBody>
                <CardText>
                    <h3>{resume.employee.name} {resume.employee.lastName}</h3>
                    <p>Дата рождения: {resume.employee.birth}</p>
                    <p>Пол: {resume.employee.isMale?"Мужской":"Женский"}</p>
                    <p>Номер: {resume.employee.number}</p>
                </CardText>
            </CardBody>
        </Card>
        <Card className='w-25' color='primary' outline>
            <CardBody>
                <CardText>
                    <h3>
                    {resume.post.name}
                    </h3>
                    <p>{resume.post.description}</p>
                </CardText>
            </CardBody>
        </Card>
        </div>
    </Container>)
}

export default function ResumePage()
{
    const {id} = useParams();
    return (<Resume id={id}/>)
}