'use server'

import { RegisterResponse } from "../../interfaces/register-response.interface";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export async function register(email: string, password: string, name: string): Promise<RegisterResponse> {
    const params = new URLSearchParams();
    params.append('name', name);
    params.append('email', email);
    params.append('password', password);

    try {
        const response = await fetch(`${BACKEND_API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params.toString(),
        });

        if (!response.ok) return {
            message: 'An error occurred',
            statusCode: response.status,
        }

        return {
            message: 'You have successfully registered',
            statusCode: 200,
        }
    } catch (error) {
        return {
            message: 'An error occurred',
            statusCode: 500,
        }
    }
}