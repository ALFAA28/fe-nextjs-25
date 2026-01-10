"use client";
import React, { useState } from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { authRegister } from "@/services/services";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Layout from "@/components/ui/Layout";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            alert("Password confirmation does not match");
            return;
        }

        setLoading(true);
        const data = { name, email, password, password_confirmation: passwordConfirmation };

        try {
            const response = await authRegister(data);
            if (response.error) {
                alert(response.message);
            } else {
                Cookies.set("token", btoa(response.data.access_token));
                router.push("/");
            }
        } catch (error) {
            console.error(error);
            alert("Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="flex justify-center items-center w-full min-h-[60vh]">
                <Paper elevation={3} className="p-8 w-full max-w-sm">
                    <Typography variant="h5" className="mb-6 font-bold text-center">
                        Register
                    </Typography>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <TextField
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                            fullWidth
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            fullWidth
                            className="mt-2"
                        >
                            {loading ? "Registering..." : "Register"}
                        </Button>
                        <div className="text-center mt-2">
                            <span className="text-sm text-gray-600">Already have an account? </span>
                            <Link href="/auth/login" className="text-blue-600 text-sm hover:underline">
                                Login
                            </Link>
                        </div>
                    </form>
                </Paper>
            </div>
        </Layout>
    );
}
