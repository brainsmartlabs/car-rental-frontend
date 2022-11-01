import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

function CarPreview(props) {
    return (
        <Card sx={{ maxWidth: 800, boxShadow: 3 }} >
            <CardMedia
                component="img"
                height="240"
                image={props.image}
                alt={props.carName}
            />
            <Box display="flex" flexDirection="row" justifyContent="space-between">
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.carName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Rs.{props.rentPerHour} Rent Per Hour/-
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant='contained' color="info" size="large">Book Now</Button>
                </CardActions>
            </Box>
        </Card>
    )
}

export default CarPreview