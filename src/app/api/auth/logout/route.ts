import { cookies } from "next/headers";
import { getMessageFromApiError } from "../../helpers";

export async function POST(req: Request) {
  try {
    cookies().delete("token");

    return Response.json({ message: "Logged out successfully." });
  } catch (error: any) {
    // TODO: use logging library
    console.error("Logout error", JSON.stringify(error, null, 2));
    const errorMessage = getMessageFromApiError(error);

    return new Response(`Error: ${JSON.stringify(errorMessage)}`, {
      status: error.status ?? 500,
      statusText: error.name ?? "Unknown error",
    });
  }
}
