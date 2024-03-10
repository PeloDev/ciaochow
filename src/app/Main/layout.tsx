import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get("token");
  if (!token) {
    redirect("/welcome");
  }
  const decodedToken = jwtDecode(token.value);
  const currentTime = Math.ceil(Date.now() / 1000);
  if ((decodedToken?.exp ?? 0) <= currentTime) {
    redirect("/login");
  }

  /**
   * TODO:
   * If user is not set in state, we cannot retrieve their data with a valid token.
   * Ideally there would be an API endpoint to fetch the user data using the valid token in cookies?
   * We would use that here (when we're sure the token is valid) to retrieve the user data and update
   * the user-slice...
   */

  return <>{children}</>;
}
