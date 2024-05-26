"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Loader2, LockIcon } from 'lucide-react';
import { Label } from '@mui/icons-material';
import { InputLabel } from '@mui/material';
import { signUpApi } from '@/app/backendApiCalls/api';
import { Auths, useAuth } from '@/app/auth/auth';
import { ApiResponse } from '@/app/admin/Interfaces/Interfaces';
import { useRouter } from 'next/navigation';
import {  useToast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';
import { tree } from 'next/dist/build/templates/app-page';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
    typography: {
        fontFamily: [
            "Montserrat", "sans-serif"
        ].join(',')
    }
});

export default function SignUp() {
    const router=useRouter()
    const {toast}=useToast()
    const auth: Auths = useAuth()
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const prop = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
            mobile: data.get('mobile'),
        }

        if (prop.password !== data.get('confirmPassword')) {
            setmessage("Password do not matches")
            return
        }
        try {
            setmessage("")
            setisProcessingSignUp(true)
            const resp:ApiResponse = await signUpApi(prop).then(resp=>resp.data)
            console.log(resp);
            
            if(resp.success){
                //toast
                toast({
                    title:"Signup Success . Verify",
                    description:resp.message
                })
                router.push(`/user/authorization/verify/${resp.userId}`)
            }else{
                //toast
                if(resp.userId){
                    toast({
                        title:"User exist",
                        description:resp.message,
                        variant:"destructive"
                    })
                    router.push(`/user/authorization/verify/${resp.userId}`)
                }else{
                    toast({
                        title:"Sign up failed",
                        description:resp.message,
                        variant:"destructive"
                    })
                    //toast
                }
            }
        } catch (error) {
            const resp= error as AxiosError<ApiResponse>
            toast({
                title:"Verification Failed",
                description:resp.message,
                variant:"destructive"
            })
        }
        finally{
            setisProcessingSignUp(false)
        }
        console.log(prop);
    };
    const [show, setshow] = React.useState(false)
    const [message, setmessage] = React.useState<string>()
    const [isProcessingSignUp, setisProcessingSignUp] = React.useState(false)

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <div className=' p-3 bg-[#002D62] rounded-full'>
                        <LockIcon className=' bg-[#002D62] text-white ' />
                    </div>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={show ? "text" : "password"}
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type={show ? "text" : "password"}
                                    id="confirmPassword"
                                    autoComplete="new-confirmPassword"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="mobile"
                                    label="Mobile"
                                    type="text"
                                    id="mobile"
                                    autoComplete="new-mobile"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel className={`${message==="sucess"?" text-green-500":" text-red-500"}`}>{message}</InputLabel>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox onChange={(e) => setshow(!show)} value="allowExtraEmails" color="primary" />}
                                    label="Show Password"
                                />
                            </Grid>
                        </Grid>
                        {isProcessingSignUp &&
                            <div className=' flex flex-col items-center'>
                                <Loader2 className=' animate-spin' />
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
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item className=' pb-10'>
                                <Link href={`/user/authorization/signin`} variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                    
                </Box>
            </Container>
        </ThemeProvider>
    );
}