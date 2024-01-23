import Companies from './components/Companies';
import CreateResume from './components/CreateResume';
import Home from './components/Home';
import Login from './components/Login';
import MyResumes from './components/MyResumes';
import VacanciesPage from './components/Vacancies';

export const routers = [
    {path:'/', component: <Home/>},
    {path:'/login', component: <Login/>},
    {path:'/vacancies/', component: <VacanciesPage/>},
    {path:'/vacancies/:id', component: <VacanciesPage/>},
    {path:'/companies/', component: <Companies/>},
    {path:'/companies/:id', component: <Companies/>},
    {path:'/myresumes', component: <MyResumes/>},
    {path:'/createresume', component: <CreateResume/>},
    {path:'/resume/:id/edit', component: <CreateResume/>},
]