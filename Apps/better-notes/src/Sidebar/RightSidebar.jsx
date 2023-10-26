import React from 'react';
import './RightSidebar.css';

function RightSidebar({ books }) {
  return (
    <div className='sidebar-main'>
      <div className='Logo'>
        <h1>Better notes</h1>
      </div>
      <div className='app-settings'>
      <ul>
        <li>User</li>
        <li>settings</li>
      </ul>
      </div>
      <div className='books'>
        <h3>Books</h3>
      <ul>
      {books.map((book) => (
            <li 
                key={book.id}

            >
              {book.title}

            </li>
          ))}
      </ul>
      </div>
    </div>
  );
}

export default RightSidebar;
