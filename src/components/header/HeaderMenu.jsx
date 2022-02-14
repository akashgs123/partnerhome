import { AccountCircleOutlined, ExpandMoreSharp } from "@mui/icons-material";
import { Box, IconButton, MenuItem, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { userName } from "../../util/constants";
import { langOptions, menuItems } from "../../util/util";
import CustomSelect from "../common/CustomSelect";
import SelectMenu from "./SelectMenu";
import Util from "../../util/util";

const customSelectStyle = {
  padding: '8px 16px',
  width: '100%'
}

const HeaderMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const enTrans = Util.getTranslations();

    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLanguageSelect = useCallback((value) => {
      console.log('Language:', value)
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
        <AccountCircleOutlined />
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
            return <MenuItem
               sx = {{padding: 0}}
               key = {itm}>
               <CustomSelect
                selectSX={customSelectStyle}
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