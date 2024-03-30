// Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, handleClick }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => handleClick(number)}
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;



// // Pagination.js
// import React from 'react';

// const Pagination = ({ currentPage, totalPages, handleClick }) => {
//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="pagination">
//       {pageNumbers.map(number => (
//         <button
//           key={number}
//           onClick={() => handleClick(number)}
//           className={currentPage === number ? 'active' : ''}
//         >
//           {number}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Pagination;
