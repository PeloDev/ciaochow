import { RegisterFormData } from "../../../types/forms";
import { CC_API_BASE_URL } from "../../consts";

async function registerWithJsonBody(registerFormData: RegisterFormData) {
  const res = await fetch(`${CC_API_BASE_URL}/auth/local/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerFormData),
  });
  return res;
}

async function registerWithFormDataBody({username, email, password}: RegisterFormData) {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  const res = await fetch(`${CC_API_BASE_URL}/auth/local/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });
  return res;
}

export async function POST(registerFormData: RegisterFormData) {
  try {
    const res = await registerWithFormDataBody(registerFormData);
    const data = await res.json();

    if (data.error) {
      throw data.error;
    }

    return Response.json(data);
  } catch (error: any) {
    // TODO: use logging library
    console.error("Register error", JSON.stringify(error, null, 2));
    // TODO: sanitise error before sending to client
    const errorDetails = error?.details?.errors;
    const errorMessage =
      errorDetails.constructor === Array
        ? errorDetails
            .map((detail) => detail?.message ?? JSON.stringify(detail))
            .join(", ")
        : error.message;

    return new Response(`Register error: ${JSON.stringify(errorMessage)}`, {
      status: error.status ?? 500,
      statusText: error.name ?? "Unknown error",
    });
  }
}
