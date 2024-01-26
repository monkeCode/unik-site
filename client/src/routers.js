import Companies from './components/Companies';
import CreateResume from './components/CreateResume';
import CreateVacancy from './components/CreateVacancy';
import Home from './components/Home';
import Login from './components/Login';
import MyResumes from './components/MyResumes';
import MyVacancies from './components/MyVacancies';
import ResumePage from './components/Resume';
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
    {path:'/resume/:id', component: <ResumePage/>},
    {path:'/myvacancies', component: <MyVacancies/>},
    {path:'/createvacancy', component: <CreateVacancy/>},
    {path:'/vacancies/:id/edit', component: <CreateVacancy/>},
]