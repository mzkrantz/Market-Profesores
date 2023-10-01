import React, { useState } from 'react';
import { Grid, Button, ButtonGroup } from '@mui/material';
import Comment from './Comment';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const CommentGrid = ({ comments }) => {
  const [sortedComments, setSortedComments] = useState([...comments]);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortByScore = () => {
    const sorted = [...sortedComments].sort((a, b) => {
      if (sortOrder === "desc") {
        return a.score - b.score;
      } else {
        return b.score - a.score;
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
    <div>
      <ButtonGroup>
        <Button onClick={toggleSortOrder}>
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
        <Button onClick={handleResetSort}>Reiniciar orden</Button>
      </ButtonGroup>
      <Grid container spacing={2} style={{ paddingTop: '1rem' }}>
        {sortedComments.map((comment, index) => (
          <Grid item xs={12} key={index}>
            <Comment name={comment.name} comment={comment.comment} score={comment.score} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CommentGrid;