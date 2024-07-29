'use server';

import { cookies } from "next/headers";
import { LoginResponse } from "../../interfaces/login-response.interface";

const nextApiUrl = process.env.NEXT_PUBLIC_NEXT_API_URL;

export async function login(email: string, password: string): Promise<LoginResponse> {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);

  try {
    const loginResponse = await fetch(`${nextApiUrl}/auth/login`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!loginResponse.ok) {
      return {
        message: 'An error occurred',
        statusCode: loginResponse.status,
      }
    }

    const setCookieHeader = loginResponse.headers.get('set-cookie');
    if(!setCookieHeader) {
        return {
            message: 'No set-cookie header found',
            statusCode: 500,
        }
    }

    const cookiesArray = setCookieHeader.split(';');
    const authToken = cookiesArray[0].split('=')[1];

    cookies().set({
        name: 'authToken',
        value: authToken,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    });

    return {
        message: 'You have successfully logged in.',
        statusCode: 200,
    }

  } catch (error) {
    return {
        message: 'An error occurred',
        statusCode: 500,
    }
  }
}
