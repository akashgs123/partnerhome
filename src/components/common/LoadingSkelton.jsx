import { Skeleton } from "@mui/material"

const CustomSkelton = ({width}) => <Skeleton
    sx={{ marginBlock: '2px' }}
    variant="text"
    width={width}
    height={52}
/>
const LoadingSkelton = ({width}) => {
    return <>
       <CustomSkelton width = {width} />
       <CustomSkelton  width = {width} />
       <CustomSkelton  width = {width} />
       <CustomSkelton  width = {width} />
       <CustomSkelton  width = {width} />
    </>
}
export default LoadingSkelton;
