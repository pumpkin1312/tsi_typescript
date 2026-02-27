import React, { Component } from 'react'
import { Button } from '../components/Button'

export default class Home extends Component{
    render(){
        return (
            <div className='font-["Alegreya"] h-[1500px] bg-[#FEEFC8]'>
                <h1>Квизы</h1>
                <p>описание</p>
                <Button
                    color="primary"
                    size="small"
                    title="Добавить товар"
                    onClick={}>
                </Button>

            </div>
        )
    }
}
