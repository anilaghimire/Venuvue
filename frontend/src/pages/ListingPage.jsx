import React from "react";
import image1 from "../images/TAJ.jpg";
import image2 from "../images/img1.jpeg";
import image3 from "../images/img2.jpeg";
import image4 from "../images/img3.jpeg";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer"; // Ensure the path and casing are correct
import '../style/ListingPage.css';



const ListingPage = () => {
  const banquets = [
    {
      name: "TAJ BANQUET",
      capacity: "1000 people",
      preference: "Indoor, Outdoor",
      location: "Gayenshwar",
      image: image1
    },
    {
      name: "DURBAR BANQUET",
      capacity: "1500 people",
      preference: "Indoor",
      location: "Dillibazar",
      image: image2
    },
    {
      name: "EVEQUE BANQUET",
      capacity: "2500 people",
      preference: "Indoor, Outdoor",
      location: "Baneshwor",
      image: image3
    },
    {
      name: "PALACE BANQUET",
      capacity: "1000 people",
      preference: "Indoor",
      location: "Kupandol",
      image: image4
    }
  ];

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Banquets Listing */}
      <div className="container mt-5 listing-container">
        <h2 className="text-center mb-4" style={{ color: "#563d2d" }}>BANQUETS</h2>
        {banquets.map((banquet, index) => (
          <div key={index} className="card mb-4 banquet-card">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={banquet.image} alt={banquet.name} className="img-fluid"/>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title" style={{ color: "#A52A2A" }}>{banquet.name}</h5>
                  <ul className="list-unstyled mb-1">
                    <li><strong>Seat Capacity:</strong> {banquet.capacity}</li>
                    <li><strong>Space Preference:</strong> {banquet.preference}</li>
                    <li><strong>Service Location:</strong> {banquet.location}</li>
                  </ul>
                  <Link to={`/details/${index}`} className="btn btn-custom">
                    DETAILS
                  </Link>
                </div>
              </div>
            </div>
            {index < banquets.length - 1 && <hr className="separator" />}
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ListingPage;
