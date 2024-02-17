import type {Metadata} from "next";
import {Noto_Sans_KR} from "next/font/google";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import theme from "@/theme";

const inter = Noto_Sans_KR({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "CSLEE 기술 블로그",
    description: "CSLEE 기술 블로그에 오신걸 환영합니다.",
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
        </ThemeProvider>
        </body>
        </html>
    );
}
