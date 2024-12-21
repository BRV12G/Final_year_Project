import { useEffect } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to homepage or dashboard after landing on login page
    router.push("/");
  }, [router]);

  return (
    <div className="text-center p-12">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <p>Redirecting...</p>
    </div>
  );
};

export default Login;
