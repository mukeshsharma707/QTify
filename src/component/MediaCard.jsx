import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function MediaCard() {
  const [cardData, setCardData] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const scrollRef = useRef(null); // Ref for scrollable container

  const getApiData = async () => {
    try {
      const result = await axios.get('https://qtify-backend.labs.crio.do/albums/top');
      setCardData(result.data);
    } catch (error) {
      console.error("❌ Error fetching API data:", error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const visibleCards = isCollapsed ? cardData.slice(0, 20) : cardData; // show more in scroll

  // Scroll handlers
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ background: 'black', padding: '20px' }}>
      {/* Header and Toggle Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ marginLeft: '10px', fontWeight: 800, color: 'white' }}>
          Top Albums
        </Typography>
        <Button
          style={{ color: 'green', fontWeight: '800px' }}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <b>{isCollapsed ? 'Show All' : 'Collapse'}</b>
        </Button>
      </div>

      {/* Scroll Arrows (only in collapsed mode) */}
      {isCollapsed && (
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <IconButton
            onClick={scrollLeft}
            sx={{ color: 'white', position: 'absolute', left: 0, zIndex: 1 }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          {/* Scrollable container */}
          <div
  ref={scrollRef}
  style={{
    overflowX: 'auto',
    display: 'flex',
    gap: '16px',
    padding: '10px 40px',
    scrollBehavior: 'smooth',
    marginTop: '10px',
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE and Edge
  }}
  className="scroll-container"
>
            {visibleCards.map((cardItem) => (
              <Card
                key={cardItem.id}
                sx={{
                  width: 159,
                  height: 232,
                  backgroundColor: 'black',
                  color: 'white',
                  flexShrink: 0,
                  borderRadius: '10px',
                }}
              >
                <CardMedia
                  sx={{ height: 170, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                  image={cardItem.image}
                  title={cardItem.title}
                />
                <CardContent sx={{ padding: '8px' }}>
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
                        padding: '5px',
                      }}
                    >
                      {cardItem.follows} Follows
                    </span>
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>

          <IconButton
            onClick={scrollRight}
            sx={{ color: 'white', position: 'absolute', right: 0, zIndex: 1 }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      )}

      {/* Grid layout (if not collapsed) */}
      {!isCollapsed && (
        <Grid container spacing={2} sx={{ marginTop: '10px' }}>
          {cardData.map((cardItem) => (
            <Grid item key={cardItem.id} xs={6} sm={4} md={3}>
              <Card
                sx={{
                  width: 159,
                  height: 232,
                  backgroundColor: 'black',
                  color: 'white',
                  borderRadius: '10px',
                }}
              >
                
                <CardMedia
                  sx={{ height: 170, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                  image={cardItem.image}
                  title={cardItem.title}
                />
                <CardContent sx={{ padding: '8px' }}>
                
                <div style={{ height: 170, borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                    <Typography
                    variant="caption"
                    sx={{ marginTop: '4px', color: '#ccc' }}
                  >
                    <span
                      style={{
                        background: 'black',
                        color: 'white',
                        borderRadius: '10px',
                        padding: '5px',
                      }}
                    >
                      {cardItem.follows} Follows
                    </span>
                  </Typography>
                  </div>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      color: 'white',
                    }}
                  >
                    {cardItem.title}
                  </Typography>
                  
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default MediaCard;
