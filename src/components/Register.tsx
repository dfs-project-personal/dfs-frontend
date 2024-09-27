import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
    Card,
    CardBody,
    Typography,
    Button,
    Input,
    IconButton
} from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon, ExclamationCircleIcon } from "@heroicons/react/16/solid";
import { white_bg } from "../assets/imageImports";

const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register: React.FC = () => {

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

    const [firstName, setFirstName] = useState("");
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState("");
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const result = NAME_REGEX.test(firstName);
        setValidFirstName(result);
    }, [firstName]);

    useEffect(() => {
        const result = NAME_REGEX.test(lastName);
        setValidLastName(result);
    }, [lastName]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPassword(result);
        const match = password === confirmPassword;
        setValidConfirmPassword(match);
    }, [password, confirmPassword]);

    // reset the error msg when the user changes something
    useEffect(() => {
        setErrMsg("");
    }, [firstName, lastName, email, password, confirmPassword]);

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
                                Sign Up
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Welcome! Enter your details to register.
                            </Typography>
                        </div>
                        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
                            <div className="mb-1 flex flex-col gap-6">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            size="lg"
                                            label="first name *"
                                            value={firstName}
                                            ref={inputRef}
                                            autoComplete="off"
                                            containerProps={{ className: "min-w-[72px]" }}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            onFocus={() => setFirstNameFocus(true)}
                                            onBlur={() => setFirstNameFocus(false)}
                                            error={firstNameFocus && !validFirstName}
                                            success={firstNameFocus && validFirstName}
                                        />
                                        <Input
                                            size="lg"
                                            label="last name"
                                            value={lastName}
                                            autoComplete="off"
                                            containerProps={{ className: "min-w-[72px]" }}
                                            onChange={(e) => setLastName(e.target.value)}
                                            onFocus={() => setLastNameFocus(true)}
                                            onBlur={() => setLastNameFocus(false)}
                                            error={lastNameFocus && !validLastName}
                                            success={lastNameFocus && validLastName}
                                        />
                                    </div>
                                    {(firstNameFocus && firstName && !validFirstName) || (lastName && !validLastName) ? <Typography
                                        variant="small"
                                        color="gray"
                                        className="flex items-center font-normal text-red-500 gap-1"
                                    >
                                        <ExclamationCircleIcon className="w-4 h-4" />
                                        Name should include 3 - 23 alphanumeric characters
                                    </Typography> : null}
                                </div>
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
                                        onFocus={() => setPasswordFocus(true)}
                                        onBlur={() => setPasswordFocus(false)}
                                        error={passwordFocus && !validPassword}
                                        success={passwordFocus && validPassword}
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
                                {passwordFocus && password && !validPassword ? <Typography
                                    variant="small"
                                    color="gray"
                                    className="-mt-4 flex items-start gap-1 font-normal text-red-500"
                                >
                                    <ExclamationCircleIcon className="w-8 h-8" />
                                    Password should include 8 - 24 characters with at least one uppercase letter, one lowercase letter, one number, and one special character
                                </Typography> : null}
                                <Input
                                    type="password"
                                    size="lg"
                                    label="confirm password *"
                                    value={confirmPassword}
                                    autoComplete="off"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onFocus={() => setConfirmPasswordFocus(true)}
                                    onBlur={() => setConfirmPasswordFocus(false)}
                                    error={confirmPasswordFocus && !validConfirmPassword}
                                    success={confirmPasswordFocus && validConfirmPassword}
                                />
                                {confirmPasswordFocus && confirmPassword && !validConfirmPassword ? <Typography
                                    variant="small"
                                    color="gray"
                                    className="-mt-4 flex items-center gap-1 font-normal text-red-500"
                                >
                                    <ExclamationCircleIcon className="w-4 h-4" />
                                    Password Mismatch
                                </Typography> : null}
                            </div>
                            <Button className="mt-6" fullWidth>
                                sign up
                            </Button>
                            <Typography color="gray" className="mt-4 text-center font-normal">
                                Already have an account?{" "}
                                <Link to="/login" className="font-medium text-gray-900">
                                    Sign In
                                </Link>
                            </Typography>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default Register;