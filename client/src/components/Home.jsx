import {useQuery, gql} from '@apollo/client';

export default function Home()
{
    const GET_COMPANIES = gql`
    query GetAllCompanies {
        companies {
          id
          name
          address
        }
      }
    `;
    const { loading, error, data } = useQuery(GET_COMPANIES);
    if (loading)
        return (<p>loading</p>);
    if (error)
        return (<p>{error.message}</p>);
    return (<div>
        <h1>hi</h1>
        {data.companies.map(({id, name, address}) => {return <p key={id}>{name} {address}</p>})}</div>);
}