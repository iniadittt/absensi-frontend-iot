"use server";

import {
  LoginRequest,
  RegisterRequest,
} from "@/lib/definition/authentication-type";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const login = async (request: LoginRequest) => {
  try {
    const res = await fetch(`${backendURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const response = await res.json();

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const register = async (request: RegisterRequest) => {
  try {
    const res = await fetch(`${backendURL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const response = await res.json();

    return response;
  } catch (error) {
    console.error(error);
  }
};
