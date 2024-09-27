import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
    Card,
    CardBody,
    Typography,
    Button,
    Input,
    Checkbox,
    IconButton
} from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon, ExclamationCircleIcon } from "@heroicons/react/16/solid";
import { white_bg } from "../assets/imageImports";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const Login: React.FC = () => {

    // password field show/hide
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    // focus on first input field
    const inputRef = useRef<HTMLInputElement>(null);

    // set the focus on the first input field
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState("");

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    return (
        <div 
            className="w-full"
            style={{ 
                backgroundImage: `url(${white_bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}    
        >
            <div className="container flex items-center h-screen">
                <Card className="mt-6 w-full sm:w-2/3 md:w-1/2 mx-auto flex flex-row justify-center">
                    <CardBody>
                        <div className="flex-col text-center">
                            <Typography variant="h3" color="blue-gray" className="mb-2 display-4">
                                Sign In
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Welcome! Enter your details to Login.
                            </Typography>
                        </div>
                        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
                            <div className="mb-1 flex flex-col gap-6">
                                <Input
                                    size="lg"
                                    label="your email *"
                                    value={email}
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                    error={emailFocus && !validEmail}
                                    success={emailFocus && validEmail}
                                />
                                {emailFocus && email && !validEmail ? <Typography
                                    variant="small"
                                    color="gray"
                                    className="-mt-4 flex items-center gap-1 font-normal text-red-500"
                                >
                                    <ExclamationCircleIcon className="w-4 h-4" />
                                    Not a valid email format
                                </Typography> : null}
                                <div className="relative flex w-full max-w-[24rem]">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        size="lg"
                                        label="password *"
                                        className="pr-20"
                                        containerProps={{
                                            className: "min-w-0",
                                        }}
                                        value={password}
                                        autoComplete="off"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <IconButton 
                                        variant="text" 
                                        size="sm" 
                                        className="!absolute right-1 top-1 rounded-lg"
                                        onClick={togglePassword}
                                    >
                                        {showPassword ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                                    </IconButton>
                                </div>
                            </div>
                            <Checkbox
                                label={
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="flex items-center font-normal"
                                    >
                                        Remember me for this device
                                    </Typography>
                                }
                                containerProps={{ className: "-ml-2.5" }}
                            />
                            <Button className="mt-6" fullWidth>
                                sign In
                            </Button>
                            <Typography color="gray" className="mt-4 text-center font-normal">
                                Do not have an account?{" "}
                                <Link to="/" className="font-medium text-gray-900">
                                    Sign Up
                                </Link>
                            </Typography>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default Login;