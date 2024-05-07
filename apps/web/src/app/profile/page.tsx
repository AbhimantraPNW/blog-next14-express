'use client';

import AuthGuard from "@/hoc/AuthGuard";

const Profile = () => {
  return (
    <main className="container mx-auto px-4">
      <div className="text-4xl font-extrabold text-center">Profile Page</div>
    </main>
  );
};

export default AuthGuard(Profile);
