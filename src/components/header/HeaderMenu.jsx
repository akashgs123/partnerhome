import { ExpandMoreSharp } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Box, IconButton, MenuItem, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { userName } from "../../util/constants";
import { langOptions, menuItems } from "../../util/util";
import CustomSelect from "../common/CustomSelect";
import SelectMenu from "./SelectMenu";
import Util from "../../util/util";

const HeaderMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const enTrans = Util.getTranslations();

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLanguageSelect = useCallback((event) => {
      handleClose();
    },[]);

    const open = Boolean(anchorEl);
    return <Box>
    <>
        {open && <Box component='span'>
          <Typography variant="subtitle1" color = 'black' component='span'>
            { userName }
            </Typography>
            <ExpandMoreSharp color = 'action' sx = {{verticalAlign: 'middle'}} />
          </Box>
        }
        <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={openMenu}
        color="secondary"

        >
        <AccountCircle />
        </IconButton>
    </>
    <SelectMenu
      handleClose = {handleClose}
      anchorEl = {anchorEl}
    >

      {
        menuItems.map((itm) => {
          if(itm!== 'lang') {
            return <MenuItem key = {itm} onClick={handleClose}>{enTrans[itm]}</MenuItem>
          } else {
            return <MenuItem key = {itm}>
               <CustomSelect
                defaultValue= 'en-gb'
                options={langOptions}
                onSelect={onLanguageSelect}
                hasUnderLine = {false}
                variant = 'standard'/>
            </MenuItem>
            
          }
        })
      }
 

  </SelectMenu>
  </Box>
}

export default HeaderMenu;