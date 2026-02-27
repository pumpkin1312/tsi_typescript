import React, { Component } from 'react'
import { Button } from '../components/Button'

export default class Home extends Component{
    render(){
        function createQuiz():void{
            console.log('Button clicked!');
        }
        return (
            <div className='font-["Alegreya"] h-[1500px] bg-[#FEEFC8]'>
                <h1>Квизы</h1>
                <p>описание</p>
                <Button
                    color="primary"
                    size="small"
                    title="Создать квиз"
                    onClick={createQuiz}>
                </Button>

            </div>
        )
    }
}
