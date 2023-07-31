import { Skeleton,Box } from "@mui/material";
import React from "react";

const GlobalSkeleton = ({ height1,height2,height3 }) => {
  return (
    <>
      <div>
          <>
            <Box>
              <Skeleton variant="text" animation="wave" height={height1 || 50} />
              <Skeleton variant="rectangular" height={height2 || 250} animation="wave" />
              <Skeleton variant="text" animation="wave" height={height3 || 50} />
            </Box>
          </>
      </div>
    </>
  );
};

export default GlobalSkeleton;
