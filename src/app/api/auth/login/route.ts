import { cookies } from "next/headers";
import { CC_API_BASE_URL } from "../../consts";
import { getMessageFromApiError } from "../../helpers";

export async function POST(req: Request) {
  const loginFormData = await req.json();
  
  try {
    const res = await fetch(`${CC_API_BASE_URL}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginFormData),
    });
    const data = await res.json();

    if (data.error) {
      throw data.error;
    }

    cookies().set("token", data.jwt, {
      path: "/", // Accessible site-wide
      maxAge: 86400, // 24-hours
      httpOnly: true, // This prevents scripts from accessing
      sameSite: "strict", // This does not allow other sites to access
      secure: process.env.NODE_ENV === "production", // Secure in production
    });

    return Response.json(data.user);
  } catch (error: any) {
    // TODO: use logging library
    console.error("Login error", JSON.stringify(error, null, 2));
    const errorMessage = getMessageFromApiError(error);

    return new Response(`Error: ${JSON.stringify(errorMessage)}`, {
      status: error.status ?? 500,
      statusText: error.name ?? "Unknown error",
    });
  }
}
