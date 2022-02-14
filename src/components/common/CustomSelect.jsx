import { NativeSelect } from "@mui/material";
import Util from "../../util/util";
import PropTypes from 'prop-types';

const CustomSelect = ({
        options,
        onSelect,
        defaultValue,
        variant,
        selectSX,
        hasUnderLine = true}) => {
 
    const selectChange = (event) => {
        onSelect(event.currentTarget.value);
    }
    const enTrans = Util.getTranslations();
    return <NativeSelect
            sx = {
               { width: '100%',
                ...(!hasUnderLine && {
                '&.MuiInput-underline: before': {
                    border: 'none !important',
                    outline: 'none !important'
                },
                '&.MuiInput-underline: after': {
                    border: 'none !important',
                    outline: 'none !important'
                }
               })}
            }
            variant= {variant}
            defaultValue= {defaultValue}
            onChange={selectChange}
            inputProps={{
                sx: selectSX ?? {},
                name: 'nativeSelect',
                id: 'native-select',
                'data-testid': 'native-select'
            }}
        >
            {options.map((langObj) => (<option key = {langObj.value} name = {langObj.value} value={langObj.key}>{enTrans[langObj.value]}</option>))}
        </NativeSelect>

}

CustomSelect.propTypes = {
    onSelect: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        value:  PropTypes.string
    })),
    variant: PropTypes.string,
    hasUnderLine: PropTypes.bool,
  }

export default CustomSelect;