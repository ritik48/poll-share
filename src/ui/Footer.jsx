export default function Footer() {
    return (
      <div className="bg-[#000000f4] py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col justify-between gap-10 sm:flex-row sm:gap-0">
            <div className="flex flex-col">
              <h2 className="text-2xl font-extrabold text-orange-200">
                Poll Share
              </h2>
              <p className="mt-2 w-[70%] text-gray-200">
                Your go-to platform for all polls related tasks
              </p>
              <span className="mt-4 text-sm text-gray-200">
                &copy; 2024 &#xb7; Poll Share
              </span>
              <div className="mt-4 w-2/3 text-gray-200">
                Hey I'm{" "}
                <a
                  className="text-gray-100 underline"
                  href="https://ritik-dev.vercel.app"
                  target="_blank"
                >
                  Ritik
                </a>
                , the creator of Poll share. Follow me for more project updates on{" "}
                <a
                  className="text-gray-100 underline"
                  href="https://linkedin.com/in/raj-ritik"
                  target="_blank"
                >
                  Linkedin
                </a>
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="mb-2 font-semibold uppercase text-gray-200">
                Links
              </h2>
              <a href="/#" className="text-gray-100 hover:underline">
                About us
              </a>
              <a href="/#" className="text-gray-100 hover:underline">
                Need help
              </a>
              <a href="/#" className="text-gray-100 hover:underline">
                Pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  