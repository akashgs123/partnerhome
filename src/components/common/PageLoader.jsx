import { Backdrop } from "@mui/material";

import PropTypes from 'prop-types';
import { WayfairIcon } from "./styles";

const backDropStyles = {
    color: '#181818',
    backgroundColor: 'rgba(255,255,255,0.6)',
    zIndex: (theme) => theme.zIndex.drawer + 1
}

const PageLoader = ({open}) => {
    return <>
      {open && <Backdrop
      sx={backDropStyles}
      open={open}
    >
      <WayfairIcon />
    </Backdrop>}
    </>
}

PageLoader.propTypes = {
    open: PropTypes.bool.isRequired
}

export default PageLoader;
