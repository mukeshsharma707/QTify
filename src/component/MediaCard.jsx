import React, { useEffect, useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid
} from '@mui/material';
import axios from 'axios';

function MediaCard() {
  const [cardData, setCardData] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true); // Toggle state

  const getApiData = async () => {
    try {
      const result = await axios.get('https://qtify-backend.labs.crio.do/albums/top');
      console.log("✅ API response:", result.data);
      setCardData(result.data);
    } catch (error) {
      console.error("❌ Error fetching API data:", error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const visibleCards = isCollapsed ? cardData.slice(0, 6) : cardData;

  return (
    <div style={{ background: 'black', padding: '20px' }}>
      <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
      <Typography sx={{ marginLeft: '10px', fontWeight: 800, color: 'white' }}>
        Top Albums
      </Typography>

      <Button
        style={{color:'green', fontWeight:'800px'}}
        onClick={() => setIsCollapsed(!isCollapsed)}
        sx={{ margin: '10px 0 20px 10px' }}
      >
       <b> {isCollapsed ? 'Show All' : 'Collapse'}</b>
      </Button></div>

      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: 'black',
          display: 'flex',
          flexDirection: isCollapsed ? 'row' : 'row',
          flexWrap: isCollapsed ? 'nowrap' : 'wrap',
          overflowX: isCollapsed ? 'auto' : 'visible',
        }}
      >
        {visibleCards.map((cardItem) => (
          <Grid
            item
            key={cardItem.id}
            sx={{
              backgroundColor: 'black',
              minWidth: isCollapsed ? 180 : 'auto',
              flexShrink: 0
            }}
            xs={isCollapsed ? 'auto' : 6}
            sm={isCollapsed ? 'auto' : 4}
            md={isCollapsed ? 'auto' : 3}
          >
            <Card
              sx={{
                width: 159,
                height: 232,
                backgroundColor: 'black',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxSizing: 'border-box',
                overflow: 'hidden',
              }}
            >
              <CardMedia
                sx={{
                  height: 170,
                  borderTopRightRadius: '10px',
                  borderTopLeftRadius: '10px'
                }}
                image={cardItem.image}
                title={cardItem.title}
              />
              <CardContent sx={{ flexGrow: 1, padding: '8px' }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    color: 'white',
                  }}
                >
                  {cardItem.title}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ marginTop: '4px', color: '#ccc' }}
                >
                  <span
                    style={{
                      background: 'black',
                      color: 'white',
                      borderRadius: '10px',
                      padding: '5px'
                    }}
                  >
                    {cardItem.follows} Follows
                  </span>
                </Typography>
              </CardContent>
              
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default MediaCard;
