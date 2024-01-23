import { Button } from "reactstrap"
import axios from "axios"
import { useNavigate } from "react-router-dom";
function BaseProfile({user})
{
    return (<>
        <img src="/user.png" alt="user icon" className="center"/>
        <p>Имя: {user.name}</p>
        <p>Фамилия: {user.last_name}</p>
        <p>Номер: {user.number}</p>
        <p>Дата рождения: {user.birth}</p>
        <p>Пол: {user.is_male?"Мужской":"Женский"}</p>
    </>)
}

export function EmployeeProfile({user})
{
    const navigate = useNavigate()
    function loguot()
{   
    axios.post('/api/usrlogout').then(res => {
        navigate("/login");
    });

}
    return(
    <div className="m-auto">
        <BaseProfile user={user}/>
        <div>
        <Button className="mt-3" onClick={()=>navigate("/myresumes")}>Мои резюме</Button> <br/>
        <Button className="mt-3" onClick={()=> navigate("/createresume")}>Создать новое резюме</Button><br/>
        <Button color="link" onClick={loguot}>Выйти</Button>
        </div>
    </div>)
}

export function RecruterProfile({user})
{
    const navigate = useNavigate()
    function loguot()
{   
    axios.post('/api/usrlogout').then(res => {
        navigate("/login");
    });

}
    return(
        <div className="m-auto">
            <BaseProfile user={user}/>
                <Button className="mt-3">Вакансии компании</Button><br/>
                <Button className="mt-3" >Создать новую вакансию</Button><br/>
                <Button color="link" onClick={loguot}>Выйти</Button>
        </div>)
}