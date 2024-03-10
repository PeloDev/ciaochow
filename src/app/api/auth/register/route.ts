import { CC_API_BASE_URL } from "../../consts";
import { getMessageFromApiError } from "../../helpers";

export async function POST(req: Request) {
  const registerFormData = await req.json();
  try {
    const res = await fetch(`${CC_API_BASE_URL}/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerFormData),
    });
    const data = await res.json();

    if (data.error) {
      throw data.error;
    }

    return Response.json(data);
  } catch (error: any) {
    // TODO: use logging library
    console.error("Register error", JSON.stringify(error, null, 2));
    const errorMessage = getMessageFromApiError(error);

    return new Response(`Error: ${JSON.stringify(errorMessage)}`, {
      status: error.status ?? 500,
      statusText: error.name ?? "Unknown error",
    });
  }
}
