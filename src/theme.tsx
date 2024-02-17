'use client';
import {Noto_Sans_KR, Roboto} from 'next/font/google';
import {createTheme} from '@mui/material/styles';
import localFont from "next/font/local";

const AppleSDGothicNeo = localFont({
    src: [
        {
            path: './fonts/AppleSDGothicNeoL.ttf', // light
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/AppleSDGothicNeoM.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/AppleSDGothicNeoB.ttf',
            weight: '700',
            style: 'normal',
        },
        {
            path: './fonts/AppleSDGothicNeoEB.ttf',
            weight: '800',
            style: 'normal',
        },
        {
            path: './fonts/AppleSDGothicNeoH.ttf',
            weight: '900',
            style: 'normal',
        },
    ],
})
const notoSansKR = Noto_Sans_KR({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    palette: {
        background: {
            default: '#fcf7ed'
        },
        mode: 'light',
    },
    typography: {
        fontFamily: AppleSDGothicNeo.style.fontFamily,
    },
    components: {
        MuiAlert: {
            styleOverrides: {
                root: ({ownerState}) => ({
                    ...(ownerState.severity === 'info' && {
                        backgroundColor: '#60a5fa',
                    }),
                }),
            },
        },
    },
});

export default theme;