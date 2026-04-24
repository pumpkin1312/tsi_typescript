import React from 'react';

interface QuizItemProps {
    id: number;
    title: string;
    description?: string;
    onDelete?: (id: number) => void;
    onEdit?: (id: number) => void;
}

export const QuizItem: React.FC<QuizItemProps> = ({ id, title, description, onDelete, onEdit }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-3 flex justify-between items-center">
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                {description && <p className="text-gray-600 text-sm mt-1">{description}</p>}
            </div>
            <div className="flex gap-2">
                <button 
                    onClick={() => onEdit?.(id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Редактировать
                </button>
                <button 
                    onClick={() => onDelete?.(id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                    Удалить
                </button>
            </div>
        </div>
    );
};