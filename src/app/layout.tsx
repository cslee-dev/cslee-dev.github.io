import type {Metadata} from "next";
import {Noto_Sans_KR} from "next/font/google";
import "./globals.css";
import ResponsiveAppBar from "@/components/ResponsiveAppBar";

const inter = Noto_Sans_KR({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "CSLEE 기술 블로그",
    description: "CSLEE 기술 블로그에 오신걸 환영합니다.",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="ko">
        <body className={inter.className}>
        <ResponsiveAppBar/>
        {children}
        </body>
        </html>
    );
}
