import { PiArrowBendDownRightThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import featureVideo from "../assets/home/feature.mp4";

export default function FeatureSection() {
  return (
    <div className="pb-10 pt-20 sm:py-20">
      <div className="mx-auto mt-[-100px] max-w-6xl px-4">
        <h2 className="text-center text-3xl font-extrabold md:text-5xl">
          What we{" "}
          <span className="bg-[#ff5f2eca] px-4 text-[#fffbf3]">offer ?</span>
        </h2>
        <p className="mx-auto my-10 w-full text-center text-lg text-gray-700 sm:w-1/2 sm:text-xl">
          At Poll Share, we provide a platform where you can create, share, and
          participate in polls on a variety of topics and much more.
        </p>
        <div className="mt-20 flex flex-col gap-20 sm:gap-40">
          <div className="flex flex-col justify-center gap-10 rounded-3xl border border-orange-100 bg-orange-50 p-5 sm:gap-40 sm:p-10 md:flex-row">
            <div className="flex w-full flex-col items-start gap-5 md:w-2/5">
              <h2 className="text-xl font-extrabold text-[#ff5f2eca] sm:text-2xl">
                Create higly{" "}
                <span className="rounded-md bg-orange-800 px-2 py-1 text-[#fffbf3]">
                  customisable polls
                </span>
              </h2>
              <p className="text-lg font-medium text-gray-700 sm:text-xl">
                At Poll Share, we empower you to craft polls tailored to your
                needs. With our intuitive platform, you can:
              </p>
              <div className="mt-2 flex flex-col">
                <span className="flex items-center gap-4 border-b border-gray-300 py-3 text-base font-medium text-gray-900 sm:text-xl">
                  <PiArrowBendDownRightThin color="gray" />
                  <p>Give Your Polls a Distinct Title</p>
                </span>
                <span className="flex items-center gap-4 border-b border-gray-300 py-3 text-base font-medium text-gray-900 sm:text-xl">
                  <PiArrowBendDownRightThin color="gray" />

                  <p>Add Multiple Options</p>
                </span>
                <span className="flex items-center gap-4 border-b border-gray-300 py-3 text-base font-medium text-gray-900 sm:text-xl">
                  <PiArrowBendDownRightThin color="gray" />

                  <p>Categorize your polls</p>
                </span>
                <span className="flex items-center gap-4 border-b border-gray-300 py-3 text-base font-medium text-gray-900 sm:text-xl">
                  <PiArrowBendDownRightThin color="gray" />

                  <p>Control visibiity</p>
                </span>
              </div>
              <Link
                to={"/create"}
                className="text-semibold my-2 rounded-md bg-[#f25b2dca] px-4 py-1.5 text-lg text-white hover:bg-[#ff5f2eca]"
              >
                Create now
              </Link>
            </div>
            <div className="self-center overflow-hidden rounded-3xl shadow-xl">
              <video width="350" controls autoPlay={true}>
                <source src={featureVideo} type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-10 rounded-3xl border border-orange-100 bg-orange-50 p-5 sm:gap-40 sm:p-10 md:flex-row">
            <div className="flex w-full flex-col items-start gap-5 md:w-2/5">
              <h2 className="text-xl font-extrabold text-[#ff5f2eca] sm:text-2xl">
                Unlock Insights with Our Robust{" "}
                <span className="rounded-md bg-orange-800 px-2 py-1 text-[#fffbf3]">
                  Analytical Dashboard
                </span>
              </h2>
              <p className="text-lg font-medium text-gray-700 sm:text-xl">
                Experience the power of data-driven decision-making with our
                Analytical Dashboard
              </p>
              <div className="mt-2 flex flex-col gap-4">
                <span className="border-b border-gray-300 py-2 text-base sm:text-xl">
                  {/* <span className="font-semibold text-gray-900">
                      Insightful Data:
                    </span>{" "} */}
                  <div className="flex items-center gap-4">
                    <PiArrowBendDownRightThin color="gray" />
                    <p>
                      Discover key metrics like votes, views, and engagement.
                    </p>
                  </div>
                </span>
                <span className="border-b border-gray-300 py-2 text-base sm:text-xl">
                  {/* <span className="font-semibold text-gray-900">
                      Visualize Data:
                    </span>{" "} */}

                  <div className="flex items-center gap-4">
                    <PiArrowBendDownRightThin color="gray" />
                    <p>See trends at a glance with interactive charts.</p>
                  </div>
                </span>
                <span className="border-b border-gray-300 py-2 text-base sm:text-xl">
                  {/* <span className="font-semibold text-gray-900">
                      Real-Time Updates:
                    </span>{" "} */}

                  <div className="flex items-center gap-4">
                    <PiArrowBendDownRightThin color="gray" />
                    <p>Stay current with live poll activity.</p>{" "}
                  </div>
                </span>
                <span className="text-base text-gray-500 sm:text-xl">
                  and much more
                </span>
              </div>
            </div>
            <div className="self-center overflow-hidden rounded-3xl shadow-xl">
              {/* <img className="" src={createImg} alt="bg" /> */}
              <video width="350" controls autoPlay={true}>
                <source src={featureVideo} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
