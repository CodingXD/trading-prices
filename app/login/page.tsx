import Image from "next/image";
import GoogleLogin from "./_components/GoogleLogin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to see historical price data",
};

export default function Page() {
  return (
    <div className="flex min-h-screen flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center">
            <Image
              className="h-10 w-auto mx-auto"
              height={40}
              width={45}
              src="/logo.png"
              alt="Your Company"
            />
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Start your stock trading journey now
            </p>
          </div>

          <div className="mt-10">
            <div className="pt-10 border-t">
              <GoogleLogin />
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="/chart.jpg"
          alt="chart"
          height={800}
          width={780}
        />
      </div>
    </div>
  );
}
