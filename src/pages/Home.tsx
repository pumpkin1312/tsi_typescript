import React, { Component } from 'react'
import { Button } from '../components/Button'
import { Text } from '../components/Text';
import { Input } from '../components/Input';
import { QuizItem } from '../components/QuizItem';
import { QuizModal } from '../components/QuizModal';

interface QuizType {
    id: number;
    title: string;
    description: string;
}

interface HomeState {
    inputValue: string;
    quizzes: QuizType[];
    isModalOpen: boolean;
    editingQuiz: QuizType | null;
    loading: boolean;
    error: string | null;
}

export default class Home extends Component<{}, HomeState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            inputValue: '',
            quizzes: [],
            isModalOpen: false,
            editingQuiz: null,
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        this.fetchQuizzes();
    }
    fetchQuizzes = async():Promise<void>=>{
        try{
            const response = await fetch("http://localhost:5000/api/quizzes",);
            const result = await response.json();
            this.setState({quizzes:result, loading: false});
            console.log("Полученные квизы:", result);            
        }catch(error){
            console.log("Error fetching data:", error);
            this.setState({error: "Ошибка загрузки данных", loading:false});            
        }
    }
    sendQuizzes = async(title: string, description: string):Promise<void>=>{
        try{
            const response = await fetch("http://localhost:5000/api/quizzes",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    title: title,
                    description: description
                }),
            });
            const result = await response.json();
            console.log("Квиз отправлен на сервер:", result);

            this.setState(prevState =>({
                quizzes: [...prevState.quizzes, result],
                loading:false
            }));            
        }catch(error){
            console.log("Error sending data:", error);
            this.setState({error:"Ошибка отправки данных", loading:false});            
        }
    }



    createQuiz = (): void => {
        alert("Button clicked!");
    }

    handleInputChange = (value: string): void => {
        this.setState({ inputValue: value });
    }

    addQuiz = (title: string, description: string): void => {
        // const newQuiz: QuizType = {
        //     id: Date.now(),
        //     title: title,
        //     description: description
        // };
        
        // this.setState(prevState => ({
        //     quizzes: [...prevState.quizzes, newQuiz]
        // }));
        
        // console.log('Добавлен новый квиз:', newQuiz);
        this.sendQuizzes(title, description);
    }

    openAddModal = (): void => {
        this.setState({
            isModalOpen: true,
            editingQuiz: null
        });
    }

    handleSave = (title: string, description: string): void => {
        if (this.state.editingQuiz) {
            this.updateQuiz(title, description);
        } else {
            this.addQuiz(title, description);
        }
        this.closeModal();
    }

    deleteQuiz = (id: number): void => {
        this.setState(prevState => ({
            quizzes: prevState.quizzes.filter(quiz => quiz.id !== id)
        }));
    }

    editQuiz = (id: number): void => {
        const quizToEdit = this.state.quizzes.find(quiz => quiz.id === id);
        if (quizToEdit) {
            this.setState({
                editingQuiz: quizToEdit,
                isModalOpen: true
            });
        }
    }

    updateQuiz = (title: string, description: string): void => {
        if (this.state.editingQuiz) {
            this.setState(prevState => ({
                quizzes: prevState.quizzes.map(quiz =>
                    quiz.id === prevState.editingQuiz!.id
                        ? { ...quiz, title, description }
                        : quiz
                ),
                editingQuiz: null
            }));
        }
    }

    closeModal = (): void => {
        this.setState({
            isModalOpen: false,
            editingQuiz: null
        });
    }
    

    render() {
        const {loading, error, quizzes} = this.state;
        if (loading){
            return(
                <div className='font-["Alegreya"] min-h-screen p-[30px] bg-[#FEEFC8]'>
                    <Text size="large" color="primary" title="Квизы">
                    </Text>
                    <p className="text-center text-gray-500 mt-10">Загрузка квизов...</p>
                </div>
            );
        }
        if (error){
            return (
                <div className='font-["Alegreya"] min-h-screen p-[30px] bg-[#FEEFC8]'>
                    <Text size="large" color="primary" title="Квизы">
                    </Text>
                    <p className="text-center text-red-500 mt-10">{error}</p>
                    <div className="text-center mt-4">
                        <Button 
                            color="primary" 
                            size="middle" 
                            title="Попробовать снова" 
                            onClick={this.fetchQuizzes}>
                        </Button>
                    </div>
                </div>
            );
        }
        return (
            <div className='font-["Alegreya"] min-h-screen p-[30px] bg-[#FEEFC8]'>
                <Text size="large" color="primary" title="Квизы">
                </Text>
                <div className="mt-6 mb-4">
                    <Button 
                        color="primary" 
                        size="middle" 
                        title="+ Добавить новый квиз" 
                        onClick={this.openAddModal}>
                    </Button>
                </div>

                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-4">Список квизов ({this.state.quizzes.length}):</h2>
                    {this.state.quizzes.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">Нет созданных квизов. Нажмите "Добавить" чтобы создать первый квиз!</p>
                    ) : (
                        this.state.quizzes.map(quiz => (
                            <QuizItem
                                key={quiz.id}
                                id={quiz.id}
                                title={quiz.title}
                                description={quiz.description}
                                onDelete={this.deleteQuiz}
                                onEdit={this.editQuiz}
                            />
                        ))
                    )}
                </div>

                <QuizModal
                    isOpen={this.state.isModalOpen}
                    onClose={this.closeModal}
                    onSave={this.handleSave}
                    initialTitle={this.state.editingQuiz?.title || ''}
                    initialDescription={this.state.editingQuiz?.description || ''}
                />
            </div>
        );
    }
}