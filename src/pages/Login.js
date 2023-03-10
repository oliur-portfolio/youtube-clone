import React from "react";
import Signin from "../components/Signin";

const Login = () => {
    return (
        <div className="min-h-screen flex justify-center items-end">
            <div className="flex justify-center items-center login__height">
                <Signin />
            </div>
        </div>
    );
};

export default Login;
