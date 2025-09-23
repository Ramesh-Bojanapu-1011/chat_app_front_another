import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={50}
        height={50}
        viewBox="0 0 512 512"
      >
        <path
          fill="#b1b4b5"
          d="M376.749 349.097c-13.531 0-24.5-10.969-24.5-24.5V181.932c0-48.083-39.119-87.203-87.203-87.203c-48.083 0-87.203 39.119-87.203 87.203v82.977c0 13.531-10.969 24.5-24.5 24.5s-24.5-10.969-24.5-24.5v-82.977c0-75.103 61.1-136.203 136.203-136.203s136.203 61.1 136.203 136.203v142.665c0 13.531-10.969 24.5-24.5 24.5"
        ></path>
        <path
          fill="#ffb636"
          d="M414.115 497.459H115.977c-27.835 0-50.4-22.565-50.4-50.4V274.691c0-27.835 22.565-50.4 50.4-50.4h298.138c27.835 0 50.4 22.565 50.4 50.4v172.367c0 27.836-22.565 50.401-50.4 50.401"
        ></path>
        <path
          fill="#ffd469"
          d="M109.311 456.841h-2.525c-7.953 0-14.4-6.447-14.4-14.4V279.309c0-7.953 6.447-14.4 14.4-14.4h2.525c7.953 0 14.4 6.447 14.4 14.4v163.132c0 7.953-6.447 14.4-14.4 14.4"
        ></path>
      </svg>
    ),
    title: "End-to-End Encryption",
    description:
      "Your conversations are secure with our military-grade encryption technology",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={50}
        height={50}
        viewBox="0 0 24 24"
      >
        <g fill="none">
          <path
            fill="url(#SVGiQCt3dKb)"
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"
          ></path>
          <path
            fill="url(#SVGcxkzteKY)"
            fillRule="evenodd"
            d="M9.115 2.422a9.6 9.6 0 0 0-.85 1.704c-.48 1.23-.838 2.723-1.049 4.374H2.63q-.271.725-.43 1.5h4.87a29 29 0 0 0 .088 5h-4.7q.246.78.61 1.5h4.297c.215 1.255.52 2.397.9 3.374c.246.63.53 1.205.85 1.704A10 10 0 0 0 12 22a10 10 0 0 0 2.885-.422a9.6 9.6 0 0 0 .85-1.704c.38-.977.685-2.119.9-3.374h4.298q.364-.72.61-1.5h-4.7a29 29 0 0 0 .088-5h4.87a10 10 0 0 0-.43-1.5h-4.587c-.21-1.651-.57-3.144-1.05-4.374a9.6 9.6 0 0 0-.849-1.704A10 10 0 0 0 12 2a10 10 0 0 0-2.885.422M8.73 8.5c.2-1.47.522-2.774.934-3.829c.36-.92.77-1.612 1.194-2.062C11.278 2.163 11.663 2 12 2s.723.163 1.143.609c.423.45.835 1.142 1.194 2.062c.412 1.055.734 2.36.934 3.829zM12 22c.338 0 .723-.163 1.143-.609c.423-.45.835-1.142 1.194-2.062c.316-.81.58-1.765.775-2.829H8.888c.196 1.064.46 2.02.775 2.829c.36.92.77 1.612 1.194 2.062c.42.446.805.609 1.143.609M8.5 12c0 1.048.058 2.055.166 3h6.668a27 27 0 0 0 .094-5H8.573a27 27 0 0 0-.073 2"
            clipRule="evenodd"
          ></path>
          <defs>
            <radialGradient
              id="SVGcxkzteKY"
              cx={0}
              cy={0}
              r={1}
              gradientTransform="rotate(-135.338 12.654 4.738)scale(16.0089 16.0078)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#25a2f0"></stop>
              <stop offset={0.974} stopColor="#3bd5ff"></stop>
            </radialGradient>
            <linearGradient
              id="SVGiQCt3dKb"
              x1={6.444}
              x2={20.889}
              y1={5.333}
              y2={18.667}
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#29c3ff"></stop>
              <stop offset={1} stopColor="#2052cb"></stop>
            </linearGradient>
          </defs>
        </g>
      </svg>
    ),
    title: "Cross-Platform Access",
    description:
      "Seamlessly switch between all your devices without losing any messages",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={50}
        height={50}
        viewBox="0 0 48 48"
      >
        <path
          fill="#ffa000"
          d="M40 12H22l-4-4H8c-2.2 0-4 1.8-4 4v8h40v-4c0-2.2-1.8-4-4-4"
        ></path>
        <path
          fill="#ffca28"
          d="M40 12H8c-2.2 0-4 1.8-4 4v20c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4"
        ></path>
      </svg>
    ),
    title: "File Sharing",
    description: "Share documents, images, and videos with just a few clicks",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={50}
        height={50}
        viewBox="0 0 1200 1200"
      >
        <path
          fill="currentColor"
          d="M600 0C268.629 0 0 268.629 0 600s268.629 600 600 600s600-268.629 600-600S931.371 0 600 0m-1.216 333.625c55.343.728 101.183 45.781 116.413 103.191c5.807 23.424 6.462 47.188.608 71.998c-8.827 34.929-26.498 69.048-59.423 90.008l47.986 22.796l114.021 55.205c11.199 4.8 16.793 14.399 16.793 28.8v110.372c0 22.763 1.808 42.393-26.406 50.418H388.792c-27.134-.391-28.258-27.874-27.622-50.418V705.623c0-14.4 6.009-24.415 18.009-30.016l117.591-53.989L542.401 600c-20.8-13.6-37.202-32.383-49.202-56.383c-14.41-31.684-20.123-72.814-9.612-110.411c13.288-50.962 54.904-96.748 115.197-99.581m-195.593 50.38c17.601 0 33.587 5.215 47.986 15.615c-3.993 11.198-7.375 23.009-10.183 35.41c-2.799 12.398-4.217 25.38-4.217 38.981q-.002 30 8.396 57.6c5.599 18.399 13.61 35.217 24.013 50.418c-4.801 6.399-11.187 11.993-19.188 16.793l-88.83 40.805c-12 6.4-21.599 15.376-28.799 26.977c-7.2 11.6-10.79 24.619-10.79 39.02v110.372h-87.576c-12.705-.198-21.286-13.002-21.619-26.368V685.221c0-12 4.384-20.013 13.184-24.013L358.777 600c-34.417-21.156-51.021-59.395-52.773-101.976c.606-52.462 34.992-109.661 97.187-114.019m393.58 0c55.291.874 95.229 55.691 97.227 114.02c-.304 38.595-15.369 75.863-50.418 100.798l130.813 62.386c8.8 4.8 13.184 12.812 13.184 24.013v104.407c-.132 12.392-6.82 25.103-21.58 26.367h-90.008V705.623c0-14.4-3.59-27.419-10.79-39.02s-16.8-20.576-28.8-26.976c-37.304-17.339-80.146-29.784-108.017-58.814c20.8-32 31.193-67.601 31.193-106.802c0-24.8-4.384-49.214-13.184-73.214c14.452-9.541 31.558-16.524 50.38-16.792"
        ></path>
      </svg>
    ),
    title: "Group Chats",
    description:
      "Create group conversations for teams, projects, or friend circles",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={50}
        height={50}
        viewBox="0 0 48 48"
      >
        <g fill="#616161">
          <path d="m29.175 31.99l2.828-2.827l12.019 12.019l-2.828 2.827z"></path>
          <circle cx={20} cy={20} r={16}></circle>
        </g>
        <path
          fill="#37474f"
          d="m32.45 35.34l2.827-2.828l8.696 8.696l-2.828 2.828z"
        ></path>
        <circle cx={20} cy={20} r={13} fill="#64b5f6"></circle>
        <path
          fill="#bbdefb"
          d="M26.9 14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2 1.2-6.9 3.2c-.4.4-.3 1.1.1 1.4c.4.4 1.1.3 1.4-.1C16 13.9 17.9 13 20 13s4 .9 5.4 2.5c.2.2.5.4.8.4c.2 0 .5-.1.6-.2c.4-.4.4-1.1.1-1.5"
        ></path>
      </svg>
    ),
    title: "Smart Search",
    description:
      "Find any message or file instantly with our powerful search functionality",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={50}
        height={50}
        viewBox="0 0 14 14"
      >
        <g fill="none">
          <path
            fill="#8fbffa"
            d="M8.093.066A7 7 0 0 0 4.35.577a7.06 7.06 0 0 0-4.2 5.94a7.06 7.06 0 0 0 3.343 6.462A7 7 0 0 0 7.129 14a6.8 6.8 0 0 0 1.877-.259a1.43 1.43 0 0 0 1.01-1.524a1.48 1.48 0 0 0-.99-1.292A1.5 1.5 0 0 1 9.5 8h1.87c.803.002 1.582-.4 2.046-1.056a2.53 2.53 0 0 0 .315-2.282A7 7 0 0 0 8.093.066"
          ></path>
          <path
            fill="#2859c5"
            d="M3 5.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0M7.5 4a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0m-4 5.5a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
          ></path>
        </g>
      </svg>
    ),
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
        {/* About Section  */}
        <section className="max-w-3xl px-4 py-12 mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold">About This App</h2>

          <p className="">
            Users can register, login, and chat with their friends securely. The
            app supports direct messaging, read receipts, file sharing, and
            real-time updates. Conversations are stored securely and sorted by
            the latest message.
          </p>
          <div className="mt-6">
            <p className="text-sm ">
              Built with ❤️ by Ramesh. Open-source and customizable.
            </p>
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
