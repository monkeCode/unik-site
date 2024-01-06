import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {routers} from './routers';
import Home from './components/Home';

const uri = "http://"+(window.location.hostname === "localhost"?'localhost:8000':window.location.hostname) + '/graphql';
console.log(uri);
const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App">
       <ApolloProvider client={client}>
      <BrowserRouter>
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
