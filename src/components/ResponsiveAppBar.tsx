"use client";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link'
import {Button} from "@mui/material";

export default function MenuAppBar() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar component="nav" position="static" color="transparent" sx={{boxShadow: 'none'}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1, fontWeight: 900}}>
                        <Link href="/" passHref legacyBehavior>
                            <a style={{textDecoration: 'none', 'color': 'inherit'}}>CSLEE.</a>
                        </Link>
                    </Typography>
                    <Box>
                        <Button sx={{color: 'black'}}>
                            Work
                        </Button>
                        <Button sx={{color: 'black'}}>
                            <Link href="https://github.com/dev-cslee" passHref legacyBehavior>
                                <a style={{textDecoration: 'none', 'color': 'inherit'}} target="_blank">Github</a>
                            </Link>
                        </Button>
                        <Button sx={{color: 'black'}}>
                            <Link href="/" passHref legacyBehavior>
                                <a style={{textDecoration: 'none', 'color': 'inherit'}} target="_blank">Blog</a>
                            </Link>
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}