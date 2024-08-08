"use server";

import { revalidatePath } from "next/cache";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getUsers = async (request: any) => {
  try {
    const res = await fetch(`${backendURL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${request.accessToken}`,
      },
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (request: any) => {
  try {
    const res = await fetch(`${backendURL}/users/${request.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${request.accessToken}`,
      },
    });

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const addUser = async (request: any, accessToken: string) => {
  try {
    const res = await fetch(`${backendURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(request),
    });
    const response = await res.json();
    revalidatePath("/dashboard/users", "page");
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (
  id: number,
  request: any,
  accessToken: string,
) => {
  try {
    const res = await fetch(`${backendURL}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(request),
    });
    const response = await res.json();
    revalidatePath("/dashboard/users/[id]/edit", "page");

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (request: any) => {
  try {
    const res = await fetch(`${backendURL}/users/${request.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${request.accessToken}`,
      },
    });
    const response = await res.json();
    revalidatePath("/dashboard/users", "page");
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getPresensi = async (request: any) => {
  try {
    const res = await fetch(
      request.search
        ? `${backendURL}/presensi?name=${request.search}`
        : `${backendURL}/presensi`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${request.accessToken}`,
        },
      },
    );
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const getAbsensi = async () => {
  try {
    const res = await fetch(`${backendURL}/dosen`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getDashboard = async (accessToken: string) => {
  try {
    const res = await fetch(`${backendURL}/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const response = await res.json();

    return response;
  } catch (error) {
    console.error(error);
  }
};
