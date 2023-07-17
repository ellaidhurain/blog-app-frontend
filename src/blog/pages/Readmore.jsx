import React, {  useState } from "react";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  
  return (
    <>
    <span className="text" >
      {isReadMore ? text.slice(0, 150) : text}
      <span onClick={toggleReadMore} className="read-or-hide" style={{color:"gray",cursor:"pointer"}}>
        {isReadMore ? " ...Read more" : " ...Show less"}
      </span>
    </span>
    </>
  );
};


export default ReadMore;
