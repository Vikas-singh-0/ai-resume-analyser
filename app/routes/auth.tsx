import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/puter/puter";

export const meta = () => {
  return [
    { title: "Resumid | Auth" },
    { name: "description", content: "Log into your account" },
  ];
};
function Auth() {
  const { isLoading, auth, init } = usePuterStore();
  const location = useLocation();
  const next: string = location.search.split('next=')[1];
  const navigate = useNavigate();
  useEffect(() => {
    if(auth.isAuthenticated) {
      navigate(next);
    } 
    init();
  }, [auth.isAuthenticated, next]);
  return (
    <main className="bg-[url('images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center p-4">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Login to continue your journey</h2>
          </div>
          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p>Signing you in</p>
              </button>
            ) : auth.isAuthenticated ? (
              <button onClick={auth.signOut} className="auth-button">
                Logout
              </button>
            ) : (
              <button onClick={auth.signIn} className="auth-button">Login</button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Auth;
