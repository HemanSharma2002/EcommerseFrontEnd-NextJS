"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Loader2, LockIcon } from 'lucide-react';
import axios from 'axios';
import { headers } from 'next/headers';
import { loginApi } from '@/app/backendApiCalls/api';
import { addTokenToBaseUrl } from '@/app/backendApiCalls/ApiClient';
import { Auths, useAuth } from '@/app/auth/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
    typography: {
        fontFamily: [
            "Montserrat", "sans-serif"
        ].join(',')
    }
});

export default function Login() {
    const Auth:Auths=useAuth()
    const router=useRouter()
    const{toast}=useToast()
    
    const [message, setmessage] = React.useState("")
    const [isProcessingSignUp, setisProcessingSignUp] = React.useState(false)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const prop = {
            email: data.get('email'),
            password: data.get('password'),
        }
        if(!Auth.login(prop)){
            setisProcessingSignUp(true)
            setmessage("Invalid credentials *")
            setisProcessingSignUp(false)
        }

    };

    const [show, setshow] = React.useState<boolean>(false)

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <div className=' p-3 bg-[#002D62] rounded-full'>
                            <LockIcon className=' bg-[#002D62] text-white ' />
                        </div>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={show ? "text" : "password"}
                                id="password"
                                autoComplete="current-password"
                            />
                            <div>
                                {message}
                            </div>
                            <FormControlLabel
                                control={<Checkbox onChange={(e) => setshow(!show)} value="remember" color="primary" />}
                                label="Show Password"
                            />
                            {isProcessingSignUp&&
                            <div className=' flex flex-col items-center'>
                                <Loader2 className=' animate-spin'/>
                            </div>
                            }
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={isProcessingSignUp}
                                sx={{
                                    mt: 3, mb: 2, bgcolor: "#002D62", ":hover": {
                                        bgcolor: "#00308F"
                                    }
                                }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href={`/user/authorization/signup`} variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}