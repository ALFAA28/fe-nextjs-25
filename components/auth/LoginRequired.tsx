"use client";
import { Button, Paper, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function LoginRequired() {
    return (
        <div className="flex-1 w-full flex justify-center items-center min-h-[70vh]">
            <Paper elevation={3} className="p-8 text-center max-w-md mx-auto">
                <Typography variant="h5" className="mb-4 font-bold text-gray-800">
                    Login Required
                </Typography>
                <Typography className="mb-6 text-gray-600">
                    You must be logged in to view this content. Please login or register to continue.
                </Typography>
                <div className="flex justify-center gap-4">
                    <Link href="/auth/login">
                        <Button variant="contained" color="primary">
                            Login
                        </Button>
                    </Link>
                    <Link href="/auth/register">
                        <Button variant="outlined" color="primary">
                            Register
                        </Button>
                    </Link>
                </div>
            </Paper>
        </div>
    );
}
