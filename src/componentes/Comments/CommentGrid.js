import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import Comment from "./Comment";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "./CommentStyles.css";

const CommentGrid = ({ comments }) => {
  const [sortedComments, setSortedComments] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    setSortedComments([...comments]);
  }, [comments]);

  const handleSortByScore = () => {
    const sorted = [...sortedComments].sort((a, b) => {
      if (sortOrder === "desc") {
        return a.calificacion - b.calificacion;
      } else {
        return b.calificacion - a.calificacion;
      }
    });
    setSortedComments(sorted);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    handleSortByScore(); // Llama a la función de ordenamiento cuando se cambia el orden
  };

  const handleResetSort = () => {
    setSortedComments([...comments]);
    setSortOrder("asc"); // Restablece el orden a ascendente cuando se reinicia
  };

  return (
    <div className="responsive-container">
      <Button
        variant="outlined"
        className="responsive-button"
        onClick={toggleSortOrder}
      >
        {sortOrder === "asc" ? (
          <>
            <ArrowUpwardIcon />
            <span>Puntaje</span>
          </>
        ) : (
          <>
            <ArrowDownwardIcon />
            <span>Puntaje</span>
          </>
        )}
      </Button>
      <Button
        onClick={handleResetSort}
        variant="outlined"
        className="responsive-button"
      >
        Reiniciar orden
      </Button>
      <Grid container spacing={2} style={{ paddingTop: "1rem" }}>
        {sortedComments.map((comment, index) => (
          <Grid item xs={12} key={index}>
            <Comment
              name={comment.nombre}
              comment={comment.comentario}
              score={comment.calificacion}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CommentGrid;