import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button'
// import './styles/Header.css'
// import './styles/Home.css'


export default class Header extends Component{
    handleClick = ():void =>{
            alert("Button clicked!")
            //console.log('Button clicked!');   
    }
    render(){
        return (
            <header className='font-["Alegreya"] flex justify-between sticky items-center top-0 p-[45px] w-[100%] bg-[url(/cloud.jpg)] border-5 border-solid border-[#FEEFC8] text-[#19232B]'>
                <h1 className='text-4xl'><Link to='/'>Квиз-сайт</Link></h1>

                <div className='flex font-medium'>
                    <h3 className='p-[15px] text-xl'><Link to="/catalog">Каталог</Link></h3>
                    <h3 className='p-[15px] text-xl'><Link to="/rating">Рейтинг игроков</Link></h3>
                    <h3 className='p-[15px] text-xl'><Link to="/creator">Создание</Link></h3>
                </div>

                <div className='flex'>
                    <h2 className='p-[15px] text-2xl'><Link to="/register">Регистрация</Link></h2>
                    <h2 className='p-[15px] text-2xl border-4px border-solid border-rounded-[20%]'><Link to="/login">Вход</Link></h2>
                    {/* <Button color="login" size="large" title="Вход"><Link to="/login"></Link></Button> */}
                </div>
                
            </header>
        )
    }
}
