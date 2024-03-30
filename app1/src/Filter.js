// Filter.js
import React from 'react';

const Filter = ({ categories, handleChange }) => {
  return (
    <div className="filter">
      <h2>Filter by Category</h2>
      <select onChange={handleChange}>
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;

// // Filter.js
// import React from 'react';

// const Filter = ({ categories, handleChange }) => {
//   return (
//     <div className="filter">
//       <h2>Filter</h2>
//       <select onChange={handleChange}>
//         <option value="">Select Category</option>
//         {categories.map(category => (
//           <option key={category} value={category}>{category}</option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default Filter;
