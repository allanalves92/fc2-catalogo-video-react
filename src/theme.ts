import {createTheme} from "@material-ui/core";
import {PaletteOptions} from "@material-ui/core/styles/createPalette";
import {green, red} from "@material-ui/core/colors";

const palette: PaletteOptions = {
    primary: {
        main: '#79aec8',
        contrastText: '#fff'
    },
    secondary: {
        main: '#4db5ab',
        contrastText: '#fff',
        dark: "#055a52"
    },
    background: {
        default: '#fafafa'
    },
    success: {
        main: green["500"],
        contrastText: '#fff'
    },
    error: {
        main: red["500"]
    },
};

const theme = createTheme({
    palette,
});

export default theme;
