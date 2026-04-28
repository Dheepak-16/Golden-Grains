import React, { useEffect, useState } from "react";
import "./Home.css";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {

  const [carousel, setCarousel] = useState(null);
  const [products, setProducts] = useState([]);
  const [bestSelling, setBestSelling] = useState(null);

  const navigate = useNavigate();

  // const BASE_URL = "http://localhost:2000";
  const BASE_URL = process.env.REACT_APP_API_URL.replace("/api", "");


  /* ================= FETCH DATA ================= */

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_API_URL.replace("/api", "");
    /* CAROUSEL */
    axios.get(`${BASE_URL}/api/carousel`)
      .then(res => setCarousel(res.data))
      .catch(err => console.log("Carousel Error:", err));

    /* PRODUCTS */
    axios.get(`${BASE_URL}/api/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.log("Products Error:", err));

    /* BEST SELLING */
    axios.get(`${BASE_URL}/api/bestselling`)
      .then(res => setBestSelling(res.data))
      .catch(err => console.log("BestSelling Error:", err));

  }, []);

  /* ================= NAVIGATION LOGIC ================= */

  const handleCategoryNavigate = (item) => {

    let category = "rajabogam";

    const name = item.name.toLowerCase();

    if (name.includes("rice")) category = "rajabogam";
    else if (name.includes("millet")) category = "millet";
    else if (name.includes("pulse") || name.includes("dhal")) category = "dhal";
    else if (name.includes("oil")) category = "oils";

    navigate(`/allcategories/${category}`);
  };

  return (
    <div>

      {/* ================= CAROUSEL ================= */}
      {carousel?.images?.length > 0 && (
        <Carousel fade interval={3000}>
          {carousel.images.map((img, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100 banner-img"
                src={`${BASE_URL}${img.imageUrl}`}
                alt="banner"
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      {/* ================= ORGANIC RANGE ================= */}

      <section className="organic-range">

        <h2 className="range-title">Our Organic Range</h2>

        <div className="range-grid">

          {products.length > 0 ? (
            products.map((item, index) => (

              <div
                key={index}
                className="range-item"
                onClick={() => handleCategoryNavigate(item)}
              >

                <div className="range-img">
                  <img
                    src={`${BASE_URL}${item.imageUrl}`}
                    alt={item.name}
                  />
                </div>

                <p>{item.name}</p>

              </div>

            ))
          ) : (
            <p>No products available</p>
          )}

        </div>

      </section>

      {/* ================= BEST SELLING ================= */}

      <div id="best-selling" className="best-selling">

        <h2>BEST SELLING PRODUCTS</h2>

        <div className="best-selling-list">

          {bestSelling?.products?.length > 0 ? (
            bestSelling.products.map((item, index) => (

              <div key={index} className="bs-card">

                <div className="bs-image">
                  <img
                    src={`${BASE_URL}${item.imageUrl}`}
                    alt={item.name}
                  />
                </div>

                <div className="bs-info">

                  <h4>{item.name}</h4>

                  <div className="price-row">

                    <span className="bs-price">
                      ₹{item.price}
                    </span>

                    {item.mrp && (
                      <span className="old-price">
                        ₹{item.mrp}
                      </span>
                    )}

                  </div>

                  <button
                    className="bs-btn"
                    onClick={() =>
                      navigate(`/productdetails/${item.name}`)
                    }
                  >
                    View Product →
                  </button>

                </div>

              </div>

            ))
          ) : (
            <p>No best selling products</p>
          )}

        </div>

      </div>

    </div>
  );
};

export default Home;

// import React, { useEffect, useState } from "react";
// import "./Home.css";
// import Carousel from "react-bootstrap/Carousel";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const BASE_URL = "http://localhost:2000";

// const Home = () => {

//   const [carousel, setCarousel] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [bestSelling, setBestSelling] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {

//     axios.get(`${BASE_URL}/api/carousel`)
//       .then(res => setCarousel(res.data))
//       .catch(err => console.log(err));

//     axios.get(`${BASE_URL}/api/products`)
//       .then(res => setProducts(res.data))
//       .catch(err => console.log(err));

//     axios.get(`${BASE_URL}/api/bestselling`)
//       .then(res => setBestSelling(res.data))
//       .catch(err => console.log(err));

//   }, []);

//   return (
//     <div>

//       {carousel && (
//         <Carousel fade interval={3000}>
//           {carousel.images.map((img, index) => (
//             <Carousel.Item key={index}>
//               <img
//                 className="d-block w-100 banner-img"
//                 src={`${BASE_URL}${img.imageUrl}`}
//                 alt="banner"
//               />
//             </Carousel.Item>
//           ))}
//         </Carousel>
//       )}

//       <section className="organic-range">

//         <h2 className="range-title">Our Organic Range</h2>

//         <div className="range-grid">
//           {products.map((item, index) => (

//             <div
//               key={index}
//               className="range-item"
//               onClick={() => navigate(`/allcategories/rajabogam`)}
//             >

//               <div className="range-img">
//                 <img
//                   src={`${BASE_URL}${item.imageUrl}`}
//                   alt={item.name}
//                 />
//               </div>

//               <p>{item.name}</p>

//             </div>

//           ))}
//         </div>

//       </section>

//     </div>
//   );
// };

// export default Home;
