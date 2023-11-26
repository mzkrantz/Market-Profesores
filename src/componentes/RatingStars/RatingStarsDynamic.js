import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import "./RatingStarsDynamic.css"; // Importa un archivo CSS para estilos personalizados

function RatingStars({ rating, setRating }) { // Recibe rating y setRating como props

  const handleIncrement = () => {
    if (rating < 5) {
      setRating(Math.min(5, rating + 0.5));
    }
  };

  const handleDecrement = () => {
    if (rating > 0) {
      setRating(Math.max(0, rating - 0.5));
    }
  };

  const renderStar = (index) => {
    if (index < rating - 0.5) {
      return <StarIcon key={index} className="star" />;
    } else if (index + 0.25 < rating) {
      return <StarHalfIcon key={index} className="star" />;
    } else {
      return <StarBorderIcon key={index} className="star" />;
    }
  };

  return (
    <div className="rating-container">
      <IconButton onClick={handleDecrement}>
        <RemoveCircleOutlineIcon fontSize="large" />
      </IconButton>
      <div className="stars-container">
        {[0, 1, 2, 3, 4].map((index) => renderStar(index))}
      </div>
      <IconButton onClick={handleIncrement}>
        <AddCircleOutlineIcon fontSize="large" />
      </IconButton>
    </div>
  );
}

export default RatingStars;