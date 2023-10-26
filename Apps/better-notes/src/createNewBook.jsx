import React, { useState } from "react";

function CreateNewBook({ createNewBook }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBookName, setNewBookName] = useState("");

    const handleCreateNewBook = () => {
        if (newBookName.trim() !== "") {
            createNewBook(newBookName);
            setIsModalOpen(false);
        }
    };

    return (
        <div>
            <div className="Button" onClick={() => setIsModalOpen(true)}>
                <p>+</p>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <input
                        type="text"
                        placeholder="Enter book name"
                        value={newBookName}
                        onChange={(e) => setNewBookName(e.target.value)}
                    />
                    <button onClick={handleCreateNewBook}>Create Book</button>
                    <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default CreateNewBook;
