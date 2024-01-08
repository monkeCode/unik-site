import {gql, useQuery} from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import {Table, Button} from 'reactstrap';
import { VacanciesList } from './Vacancies';

function CompaniesList()
{
    const navigate = useNavigate();

    const getcompanies = gql`query getCompanies
    {
      companies
      {
        id
        name
        address
        mail
        number
      }
    }`;

    const {loading, error, data} = useQuery(getcompanies);

    if (loading)
        return (<p>loading</p>);

    if (error)
        return (<p>error</p>);
    
    let companies = data.companies;

    return (
        <Table>
        <thead>
            <tr>
                <th>Название</th>
                <th>Адрес</th>
                <th>Почта</th>
                <th>Номер</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        {companies.map(({id, name, address, mail, number })=> (
            <tr key={id}>
                <td>
                    {name}
                </td>
                <td>
                    {address}
                </td>
                <td>
                    {mail}
                </td>
                <td>
                    {number}
                </td>
                <td>
                    <Button onClick={()=> navigate("/companies/"+id)}>Вакансии</Button>
                </td>
            </tr>))}  
        </tbody>
        </Table>);
}

function Company({id})
{
    return (<VacanciesList companyId={id}></VacanciesList>);
}

export default function Companies()
{
    const {id} = useParams();

    if(id === undefined) {
        return(
            <div>
                <CompaniesList></CompaniesList>
            </div>)
    }

   
    return (<Company id={id}/>)
}