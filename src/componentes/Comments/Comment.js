import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import RatingStars from '../RatingStars/RatingStars';

const Comment = ({ name, comment, score }) => {
  return (
    <Card variant="outlined">
      <CardContent className="responsive-comment">
        <Typography variant="h6">{name}</Typography>
        <RatingStars rating={parseFloat(score)} />
        <Typography variant="body1" gutterBottom>
          {comment}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Comment;