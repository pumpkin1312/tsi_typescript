import React, { useState, useEffect } from 'react';

interface QuizModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (title: string, description: string) => void;
    initialTitle?: string;
    initialDescription?: string;
}

export const QuizModal: React.FC<QuizModalProps> = ({ 
    isOpen, 
    onClose, 
    onSave, 
    initialTitle = '', 
    initialDescription = ''
}) => {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);

    useEffect(() => {
        if (isOpen) {
            setTitle(initialTitle);
            setDescription(initialDescription);
        }
    }, [isOpen, initialTitle, initialDescription]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onSave(title, description);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    {initialTitle ? 'Редактировать квиз' : 'Добавить новый квиз'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Название</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                            placeholder="Введите название квиза"
                            autoFocus
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Описание</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                            placeholder="Введите описание (необязательно)"
                            rows={3}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            {initialTitle ? 'Сохранить' : 'Добавить'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};