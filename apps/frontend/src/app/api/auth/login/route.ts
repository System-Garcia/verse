import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export async function POST(request: Request): Promise<Response> {
    const formData = await request.formData();

    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
        return new Response('Email and password are required.', { status: 400 });
    }

    let loginResponse;
    try {
        loginResponse = await fetch(`${BACKEND_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!loginResponse.ok) {
            return new Response('Invalid email or password', { status: 401 });
        }

        loginResponse = await loginResponse.json();
    } catch (error) {
        return new Response('An error occurred', { status: 500 });
    }

    const authToken = loginResponse.access_token;

    const response = NextResponse.json({ message: 'You have successfully logged in.', statusCode: 200 });
    response.cookies.set({
        name: 'authToken',
        value: authToken,
        httpOnly: true,
        path: '/',
    });

    return response;
}

export async function GET(request: NextRequest): Promise<Response> {

    const cookiesStore = cookies();
    const token = cookiesStore.get('authToken');
    
    if (!token) {
        return new Response(JSON.stringify({ message: 'You are not authorized', statusCode: 401 }), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return new Response(JSON.stringify({ message: 'You are authorized', token: token.value ,statusCode: 200 }))
}