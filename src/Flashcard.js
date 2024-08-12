import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Flashcard.css'; // Import CSS file for styling

function Flashcard() {
    const [flashcards, setFlashcards] = useState([]);
    const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });
    const [flippedCard, setFlippedCard] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        fetchFlashcards();
    }, []);

    const fetchFlashcards = async () => {
        const response = await axios.get('http://localhost:3001/flashcards');
        setFlashcards(response.data);
        setCurrentIndex(0); // Reset index when data is fetched
    };

    const addFlashcard = async () => {
        await axios.post('http://localhost:3001/flashcards', newFlashcard);
        fetchFlashcards();
        setNewFlashcard({ question: '', answer: '' });
    };

    const updateFlashcard = async (id) => {
        const updatedFlashcard = prompt('Enter the updated flashcard:', JSON.stringify(flashcards.find(f => f.id === id)));
        if (updatedFlashcard) {
            const { question, answer } = JSON.parse(updatedFlashcard);
            await axios.put(`http://localhost:3001/flashcards/${id}`, { question, answer });
            fetchFlashcards();
        }
    };

    const deleteFlashcard = async (id) => {
        await axios.delete(`http://localhost:3001/flashcards/${id}`);
        fetchFlashcards();
    };

    const toggleFlip = (id) => {
        setFlippedCard(flippedCard === id ? null : id);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    };

    const currentFlashcard = flashcards[currentIndex];

    return (
        <div className="flashcard-container">
            <h1 className="title">Flashcard Learning Tool</h1>

            <div className="flashcard-management">
                <h2>Add New Flashcard</h2>
                <input
                    type="text"
                    placeholder="Question"
                    value={newFlashcard.question}
                    onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Answer"
                    value={newFlashcard.answer}
                    onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
                />
                <button onClick={addFlashcard}>Add Flashcard</button>
            </div>

            {flashcards.length > 0 && (
                <div className="flashcard-display">
                    <button className="nav-button prev" onClick={handlePrevious}>❮</button>
                    <div
                        key={currentFlashcard.id}
                        className={`flashcard ${flippedCard === currentFlashcard.id ? 'flipped' : ''}`}
                        onClick={() => toggleFlip(currentFlashcard.id)}
                    >
                        <div className="front">
                            <strong></strong> {currentFlashcard.question}
                        </div>
                        <div className="back">
                            <strong></strong> {currentFlashcard.answer}
                        </div>
                    </div>
                    <button className="nav-button next" onClick={handleNext}>❯</button>
                </div>
            )}

            {currentFlashcard && (
                <div className="flashcard-actions">
                    <button onClick={() => updateFlashcard(currentFlashcard.id)}>Edit</button>
                    <button onClick={() => deleteFlashcard(currentFlashcard.id)}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default Flashcard;
