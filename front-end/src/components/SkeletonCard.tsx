import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

interface SkeletonProps {
  loading?: boolean;
  numberOfItems?: number;
}

function SkeletonCard(props: SkeletonProps) {
  const { loading = false, numberOfItems = 3 } = props;
  const items = loading ? Array.from(new Array(numberOfItems)) : [];

  return (
    <div className="card-list">
      {items.map((item, index) => (
        <Skeleton
          key={index + 1}
          variant="rectangular"
          className="card-item skeleton-item"
        />
      ))}
    </div>
  );
}

export default SkeletonCard;
