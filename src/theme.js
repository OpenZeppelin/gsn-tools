import {createMuiTheme} from '@material-ui/core/styles'
import createPalette from '@material-ui/core/styles/createPalette'
import createTypography from '@material-ui/core/styles/createTypography'

export const theme = (() => {
    const palette = createPalette({
        primary: {
            main: '#5aa5ff',
            light: '#5aa5ff',
            dark: '#0077cb',
            contrastText: '#ffffff',
        },
    })

    const typography = createTypography(palette, {
        useNextVariants: true,
        fontFamily: '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",Arial,sans-serif',
    })

    return createMuiTheme({
        palette: palette,
        typography: typography,
        drawerWidth: 240,
    })
})()