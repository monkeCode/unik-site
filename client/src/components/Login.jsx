import {Container,
        Form,
        FormGroup,
        Input,
        FormFeedback,
        Label,
        Button,
         } from 'reactstrap';

import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {useState} from "react";


export default function Login()
{
    const [err, setErr] = useState(false);
    const [isReg, setIsReg] = useState(true);
    const navigate = useNavigate();
    function register(e)
    {
        e.preventDefault();
        let data = {
            "username":e.target[0].value,
            "password":e.target[1].value,
            "email":e.target[2].value,
            "name":e.target[4].value,
            "last_name":e.target[5].value,
            "number":e.target[3].value,
            "birth": e.target[6].value,
            "is_male":e.target[7].value?"True":"False"
        };
        axios.post("/api/usrregister", data).then(resp =>{
            console.log(resp);
            navigate("/");  
        }).catch(err => {setErr(true);});
    }

    function login(e)
    {
        e.preventDefault();

        axios.post(`/api/usrlogin?username=${e.target[0].value}&password=${e.target[1].value}`).then(resp =>{
            console.log(resp);
            navigate("/");  
        }).catch(err => {setErr(true);});
    }
    if (isReg)
        var formBody = (<><FormGroup>
            <Label for="login" className='label'>
                Логин
            </Label>
            <Input placeholder="Логин" name="login" id="login" onChange={()=> setErr(false)} invalid={err}></Input>
            <FormFeedback invalid>
                Что-то пошло не так
            </FormFeedback>

            <Label for="password" className='label'>
                Пароль
            </Label>
            <Input placeholder="Пароль" name="password" type="password" id="password"></Input>

            <Label for="Email" className='label'>
            Email
            </Label>
            <Input placeholder="Email" name="Email" id="email"></Input>

            <Label for="tel" className='label'>
                Телефн
            </Label>
            <Input placeholder="+7 *** *** ****" name="tel" id="tel" type="tel"></Input>

            <Label for="password" className='label'>
                Пароль
            </Label>
            <Input placeholder="Имя" name="name" id="name"></Input>

            <Label for="last_name" className='label'>
            Фамилия
            </Label>
            <Input placeholder="Фамилия" name="last_name" id="last_name"></Input>

            <Label for="birth" className='label'>
                Дата рождения
            </Label>
            <Input placeholder="Дата рождения" name="birth" id="birth" type="date"></Input>

            <Label for="is_male" className='sex'>
                Пол
            </Label>
            <Input placeholder="Дата рождения" name="sex" id="is_male" type="select">
                <option value={true}>
                    Мужской
                </option>
                <option value={false}>
                    Женский
                    </option>
            </Input>

            <Input type="submit" className='mt-5' />

        </FormGroup>
        <Button className='m-auto' color='link' onClick={()=> setIsReg(false)}>Уже есть акаунт? Войти</Button>
   </>)
   else 
        formBody = (<><FormGroup>
            <Label for="login" className='label'>
                Логин
            </Label>
            <Input placeholder="Логин" name="login" id="login" onChange={()=> setErr(false)} invalid={err}></Input>
            <FormFeedback invalid>
                Что-то пошло не так
            </FormFeedback>

            <Label for="password" className='label'>
                Пароль
            </Label>
            <Input placeholder="Пароль" name="password" type="password" id="password"></Input>
            <Input type="submit" className='mt-5' />
            </FormGroup>
            <Button className='m-auto' color='link' onClick={()=> setIsReg(true)}>Нет акаунта? Регистрация</Button>
            </>)
    return (<Container>

        <Form className="auth-from"onSubmit={isReg?register:login} >
            {formBody}
        </Form>
        </Container>)
}