'use client';
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import profilePic from "../../public/profile.png";
import {Grid} from "@mui/material";
import {useTheme} from '@mui/material/styles';

export default function Home() {
    const theme = useTheme();

    return (
        <main>
            <Box textAlign="center" mt={8}>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <Image
                            src={profilePic} // 이미지 경로를 여기에 입력
                            width={400}
                            alt="프로필 이미지"
                        />
                    </Grid>
                    <Grid item xs={12} md={5} textAlign="left" sx={{
                        [theme.breakpoints.down('xs')]: {
                            ml: 0, // xs 이하에서 오른쪽 패딩 없음
                        },
                        [theme.breakpoints.up('md')]: {
                            ml: 3, // md 이상에서 오른쪽 패딩 2
                        }
                    }}>
                        <Typography variant="h1" gutterBottom fontWeight="700" sx={{opacity: 0.9, fontSize:'5rem'}} >
                            Hello, <br/>I’m CSLEE.
                        </Typography>
                        <Typography variant="h5" sx={{fontSize: '1.2rem', letterSpacing:'-0.02em'}}>
                            6년 경력의 Python 및 Django 개발자로,<br/> 월간 활성 사용자(MAU) 18만 명을 보유한 이커머스 플랫폼 개발과 AWS 인프라 구축/운영 분야에서
                            전문성을 발휘해 왔습니다.<br/><br/>
                            프리미엄 상품 기반 이커머스 플랫폼의 백엔드 개발 리더로서, 주요 기능 개발 및 레거시 시스템의 개편에 중추적인 역할을 맡았습니다. 특히, 시스템 안정성과
                            성능을
                            극대화하며 MAU를 1만에서 18만으로 성장시키는 데 기여 했습니다.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

        </main>
    );
}
