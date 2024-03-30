// App.js
import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file here
import ProductList from './ProductList';
import Filter from './Filter';
import Pagination from './Pagination';

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch products
        const productsResponse = await fetch(
          'http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000'
        );
        const productsData = await productsResponse.json();
        setProducts(productsData);

        // Fetch categories
        const categoriesResponse = await fetch('http://20.244.56.144/test/categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    // Handle filter change logic
    console.log('Filter changed:', e.target.value);
  };

  return (
    <div className="App">
      <h1>Top N Products Application</h1>
      {/* Pass categories and handleFilterChange to Filter component */}
      <Filter categories={categories} handleChange={handleFilterChange} />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ProductList products={products} />
      )}
      <Pagination />
    </div>
  );
};

export default App;


// // App.js
// import React, { useState, useEffect } from 'react';
// import './App.css'; // Import your CSS file here
// import ProductList from './ProductList';
// import Filter from './Filter';
// import Pagination from './Pagination';

// const App = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(
//           'http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000'
//         );
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         setError(error);
//       }
//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="App">
//       <h1>Top Products</h1>
//       <Filter />
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>Error: {error.message}</p>
//       ) : (
//         <ProductList products={products} />
//       )}
//       <Pagination />
//     </div>
//   );
// };

// export default App;
