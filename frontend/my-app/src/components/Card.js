import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard({schedule}) {
    return (
    //  <div className="Container1">
            <Card  sx={{ maxWidth: 345 }}>
                
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Interview Scheduled
        </Typography>
        <Typography variant="body2" color="text.secondary">
                  Date: {schedule.date}
                  <br></br>
                  Start Time: {schedule.start_time};
                    <br></br>
                  End Time: {schedule.end_time};
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small">Details</Button>
      </CardActions>
    </Card>
        // </div>
  );
}
