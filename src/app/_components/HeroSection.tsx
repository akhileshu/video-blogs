import { GetStartedAuthButton } from "@/features/auth/components";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-16 px-4">
      <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
        Learn Smarter, Not Harder
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-xl">
        A platform where videos and structured content come together for a
        seamless learning experience.
      </p>
      <GetStartedAuthButton/>
    </section>
  );
}
