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

  return <>{children}</>;
}
