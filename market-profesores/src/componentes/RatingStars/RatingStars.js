import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";

function RatingStars({ rating }) {
  const stars = [];
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  /*Se realiza un loop para buscar los iconos de la estrella */
  for (let i = 1; i <= totalStars; i++) {
    if (i <= fullStars) {
      stars.push(<StarIcon key={i} color="warning" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<StarHalfIcon key={i} color="warning" />);
    } else {
      stars.push(<StarBorderIcon key={i} color="warning" />);
    }
  }

  return <div>{stars}</div>;
}

export default RatingStars;
