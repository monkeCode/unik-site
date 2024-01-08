import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import {routers} from './routers';
import NavMenu from './components/NavMenu';

const uri = "http://"+(window.location.hostname === "localhost"?'localhost:8000':window.location.hostname) + '/graphql';
const link = createHttpLink({
  uri: uri,
  credentials: 'include'
});
console.log(uri);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className='h-100'>
      
       <ApolloProvider client={client} >
      <BrowserRouter>
      <NavMenu/>
      <Routes>
            {routers.map((it,key) => {
              return (<Route key={key} path={it.path} element ={it.component}/>)
            })}
      </Routes>
      </BrowserRouter>
  </ApolloProvider>
    </div>
  );
}

export default App;
