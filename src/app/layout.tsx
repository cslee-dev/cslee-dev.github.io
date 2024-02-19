import type {Metadata} from "next";
import {Noto_Sans_KR} from "next/font/google";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import theme from "@/theme";
import Footer from '@/components/Footer';

const inter = Noto_Sans_KR({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "이철승 | 서버 백엔드 엔지니어",
    description: "CSLEE. 서버 백엔드 엔지니어",
    verification: {
        google: '9RxcLldAyhOs7MJBvjfB-tzdR0_wO0t522UbtXsxj4o'
    }
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="ko">
        <body className={inter.className}>
        <ThemeProvider theme={theme}>
            <Container>
                <ResponsiveAppBar/>
                <CssBaseline/>
                {children}
            </Container>
            <Footer/>
        </ThemeProvider>
        </body>
        </html>
    );
}
