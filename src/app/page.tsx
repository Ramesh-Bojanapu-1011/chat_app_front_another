import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: "🔒",
    title: "End-to-End Encryption",
    description:
      "Your conversations are secure with our military-grade encryption technology",
  },
  {
    icon: "🌐",
    title: "Cross-Platform Access",
    description:
      "Seamlessly switch between all your devices without losing any messages",
  },
  {
    icon: "📁",
    title: "File Sharing",
    description: "Share documents, images, and videos with just a few clicks",
  },
  {
    icon: "👥",
    title: "Group Chats",
    description:
      "Create group conversations for teams, projects, or friend circles",
  },
  {
    icon: "🔍",
    title: "Smart Search",
    description:
      "Find any message or file instantly with our powerful search functionality",
  },
  {
    icon: "🎨",
    title: "Customizable Interface",
    description:
      "Personalize your chat experience with themes and layout options",
  },
];

export default function Home() {
  return (
    <>
      <header>
        <Card className="flex justify-between p-4 rounded-lg">
          <div className="flex items-center px-4 space-x-2 text-xl font-bold">
            <Image
              src="/chat-app-logo-icon.svg"
              alt={""}
              className="dark:bg-white"
              width={20}
              height={20}
            />
            <span>ChatConnect</span>
          </div>

          <div className="flex items-center space-x-2">
            <Link href="/sign-in">
              <Button variant="default" className="hidden md:inline-flex">
                Login
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="default" className="hidden md:inline-flex">
                Sign Up
              </Button>
            </Link>
            <ModeToggle />
          </div>
        </Card>
      </header>
      <Card className="flex flex-col items-center justify-center ">
        {/* Hero Section */}
        <section>
          <div className="px-4 py-6 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              Stay Connected, Anytime, Anywhere
            </h1>
            <p className="max-w-2xl mx-auto mb-10 text-lg ">
              Experience seamless communication with ChatConnect - the modern
              messaging platform that brings teams, friends and family together
              in one place.
            </p>

            <div className="flex flex-col justify-center mb-16 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center px-6 py-3 font-medium text-white transition-colors bg-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-700 hover:border-indigo-700"
              >
                Get Started - It's Free
              </Link>
            </div>
          </div>
        </section>{" "}
        {/* CTA Section */}
        <section className="py-20 ">
          <div className="max-w-5xl px-4 mx-auto text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold ">
              Ready to Transform Your Communication?
            </h2>
            <p className="max-w-2xl mx-auto mb-10 text-lg text-gray-500">
              Join millions of users who trust ChatConnect for their personal
              and professional communication needs.
            </p>

            <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center px-6 py-3 font-medium text-white transition-colors bg-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-700 hover:border-indigo-700"
              >
                Create Free Account
              </Link>

              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center px-6 py-3 font-medium text-indigo-600 transition-colors border border-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white"
              >
                Already have an account
              </Link>
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section id="features" className="py-20 ">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold ">
                Why Choose ChatConnect?
              </h2>
              <p className="max-w-2xl mx-auto text-lg ">
                Our feature-rich platform is designed to make communication
                effortless and enjoyable
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-8 text-center transition-all rounded-xl hover:transform hover:-translate-y-2 hover:shadow-lg dark:bg-gray-800 bg-slate-100"
                >
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 text-3xl text-indigo-600 bg-indigo-100 rounded-lg">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold ">
                    {feature.title}
                  </h3>
                  <p className="">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="w-full pt-16 pb-6 text-white bg-gray-800">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between pt-8 border-t border-gray-700 md:flex-row">
              <div className="mb-4 md:mb-0">
                &copy; 2025 ChatConnect. All rights reserved.
              </div>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="flex items-center justify-center w-10 h-10 transition-colors bg-gray-700 rounded-full hover:bg-gray-600"
                >
                  📱
                </Link>
                <Link
                  href="#"
                  className="flex items-center justify-center w-10 h-10 transition-colors bg-gray-700 rounded-full hover:bg-gray-600"
                >
                  💼
                </Link>
                <Link
                  href="#"
                  className="flex items-center justify-center w-10 h-10 transition-colors bg-gray-700 rounded-full hover:bg-gray-600"
                >
                  📸
                </Link>
                <Link
                  href="#"
                  className="flex items-center justify-center w-10 h-10 transition-colors bg-gray-700 rounded-full hover:bg-gray-600"
                >
                  🐦
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </Card>
    </>
  );
}
