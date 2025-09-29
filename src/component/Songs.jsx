import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  IconButton,
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import axios from 'axios';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Songs() {
  const [cardData, setCardData] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const scrollRef = useRef(null);

  const handleChange = (event, newValue) => {
    setSelectedGenre(newValue);
  };

  const getApiData = async () => {
    try {
      const result = await axios.get('https://qtify-backend.labs.crio.do/songs');
      const allSongs = result.data;
      console.log('songs data here', allSongs);

      setCardData(allSongs);

      // Extract unique genres
      const uniqueGenres = Array.from(
        new Set(allSongs.map((song) => song.genre.key))
      ).map((key) => {
        const genre = allSongs.find((song) => song.genre.key === key).genre;
        return { key: genre.key, label: genre.label };
      });

      setGenres([{ key: 'all', label: 'All' }, ...uniqueGenres]);

      setFilteredSongs(allSongs); // Show all by default
    } catch (error) {
      console.error("❌ Error fetching API data:", error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  // Filter songs when genre changes
  useEffect(() => {
    if (selectedGenre === 'all') {
      setFilteredSongs(cardData);
    } else {
      const filtered = cardData.filter(song => song.genre.key === selectedGenre);
      setFilteredSongs(filtered);
    }
  }, [selectedGenre, cardData]);

  const visibleCards = isCollapsed ? filteredSongs.slice(0, 20) : filteredSongs;

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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ marginLeft: '10px', fontWeight: 800, color: 'white' }}>
          Songs
        </Typography>
        {/* <Button
          style={{ color: '#00BD2B', fontWeight: '800px' }}
          onClick={() => setIsCollapsed(!isCollapsed)}
        > */}
          {/* <b>{isCollapsed ? 'Show All' : 'Collapse'}</b> */}
        {/* </Button> */}
      </div>

      {/* Genre Tabs */}
      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <Tabs
          value={selectedGenre}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="genre tabs"
          sx={{
            '& .MuiTab-root': { color: 'white' },
            '& .Mui-selected': { color: '#00ffcc' },
            '& .MuiTabs-indicator': { backgroundColor: '#00ffcc' },
          }}
        >
          {genres.map((genre) => (
            <Tab
              key={genre.key}
              value={genre.key}
              label={genre.label}
            />
          ))}
        </Tabs>
      </Box>

      {/* Scroll View or Grid */}
      {isCollapsed ? (
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <IconButton
            onClick={scrollLeft}
            sx={{ color: 'white', position: 'absolute', left: 0, zIndex: 1 }}
          >
            <ArrowBackIosNewIcon sx={{color:'#00BD2B'}} />
          </IconButton>

          <div
            ref={scrollRef}
            style={{
              overflowX: 'auto',
              display: 'flex',
              gap: '16px',
              padding: '10px 40px',
              scrollBehavior: 'smooth',
              marginTop: '10px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
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
                  <Typography variant="caption" sx={{ marginTop: '4px', color: '#ccc' }}>
                    <span
                      style={{
                        background: 'black',
                        color: 'white',
                        borderRadius: '10px',
                        padding: '5px',
                      }}
                    >
                      {cardItem.likes} Likes
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
            <ArrowForwardIosIcon sx={{color:'#00BD2B'}} />
          </IconButton>
        </div>
      ) : (
        <Grid container spacing={2} sx={{ marginTop: '10px' }}>
          {visibleCards.map((cardItem) => (
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
                  <Typography variant="caption" sx={{ marginTop: '4px', color: '#ccc' }}>
                    <span
                      style={{
                        background: 'black',
                        color: 'white',
                        borderRadius: '10px',
                        padding: '5px',
                      }}
                    >
                      {cardItem.likes} Likes
                    </span>
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

export default Songs;
