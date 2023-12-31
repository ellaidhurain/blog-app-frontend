import * as React from "react";
import { ImageList, ImageListItem } from "@mui/material";


const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];

const shuffleArray = (array) => {
  const newArray = [...array]; // Create a copy of the array

  // let i = newArray.length - 1; starting from last element  and goes backwards until the index i becomes 1 (inclusive).
  for (let i = newArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1)); // create a random index 
    [newArray[i], newArray[randomIndex]] = [newArray[randomIndex], newArray[i]]; // assign random index to array for every loop
  }

  return newArray; // Return the shuffled array
}

export default function StandardImageList() {
  const [shuffledItems, setShuffledItems] = React.useState(itemData);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const shuffledData = shuffleArray(itemData);
      setShuffledItems(shuffledData);
    }, 5000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []); // Empty dependency array to run the effect only once

  return (
    <ImageList
      sx={{
        width: 350,
        height: 196,
        bgcolor: "background.paper",
        padding: "8px",
        borderRadius: "10px",
        border: "1px solid rgba(0,0,0,0.15)", // Removed conditional border
        overflowY:"hidden"
      }}
      gap={8}
      cols={3}
      rowHeight={180}
    >
      {shuffledItems.map((item) => (
        <ImageListItem key={item.img}>
          <img
            style={{ borderRadius: "5px" }}
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}