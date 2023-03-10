import React from "react";
import Signup from "../components/Signup";

const Register = () => {
    return (
        <div className="min-h-screen flex justify-center items-end">
            <div className="flex justify-center items-center login__height">
                <Signup />
            </div>
        </div>
    );
};

export default Register;
