import React, { useState } from 'react';
import RightSidebar from './Sidebar/RightSidebar';
import CreateNewBook from './createNewBook';

function App() {
    const [books, setBooks] = useState([]);

    const createNewBook = (bookName) => {
        const newBook = {
            id: Date.now(),
            title: bookName,
            notes: []
        };

        setBooks([...books, newBook]);
    };

    return (
        <div className="App">
            <CreateNewBook createNewBook={createNewBook} />
            <RightSidebar books={books} />
        </div>
    );
}

export default App;
