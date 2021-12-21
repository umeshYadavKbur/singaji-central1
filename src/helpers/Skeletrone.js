import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';

export default function SkeletonColor() {
    return (
       
            <Skeleton
            sx={{bgcolor: "rgb(190, 190, 190)"}}
                variant="rectangular"
                style={{width:'95%',height:"95%"}}
            />
       
    );
}
