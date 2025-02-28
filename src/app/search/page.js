"use client";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import projects from "../../data/projects.json";
import experiences from "../../data/experience.json";
import life from "../../data/life.json";
import whyHire from "../../data/why.json";

export default function Search() {
  const [isHover, setIsHover] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q");
  const project = searchParams.get("p");
  const [selectedSearch, setSelectedSearch] = useState(
    project === "dishdashmomzie"
      ? projects.find((proj) => proj.alias === "dishdashmomzie")
      : ""
  );
  const displayQuery = query ? query : "";
  const displayData = 
    displayQuery == "vanshs-projects" ? [...projects]?.reverse() :
    displayQuery == "experience" ? experiences :
    displayQuery == "life" ? [...life]?.reverse() :
    displayQuery == "why-hire-a-vansh" ? whyHire :
    [];  // default to empty array if no match

  const [showMore, setShowMore] = useState(false);
  const [isOpen, setIsOpen] = useState(project === "dishdashmomzie" ? true : false);
  const languages = [
    "Python",
    "JavaScript",
    "Typescript",
    "HTML",
    "CSS",
    "SQL",
    "Sqlite",
    "YAML",
  ];
  const technologies = [
    "React JS",
    "React Native",
    "Nodejs",
    "Next JS",
    "Flask",
    "Tailwind CSS",
    "Postgres",
    "AWS",
    "Nginx",
    "pandas",
    "NumPy",
    "Matplotlib",
    "NLTK",
  ];

  useEffect(() => {
    if (project) {
      const params = new URLSearchParams(searchParams); // Clone the existing searchParams
      params.delete("p"); // Remove 'p' parameter

      // Update the URL without refreshing the page
      router.replace(`?${params.toString()}`, { shallow: true });
    }
  }, [project, searchParams, router]);

  const handleSelect = (data) => {
    setIsOpen(true);
    setSelectedSearch(data);
  };

  const SearchItem = ({ data }) => {
    return (
      <div
        className="font-ropaSans flex flex-row gap-x-2"
        style={{ zIndex: 10 }}
      >
        <div className="w-4/5">
          <div className="flex flex-row items-center gap-x-4">
            <div className="bg-dark-purple-300 rounded-full w-8 h-8 flex items-center justify-center">
              <div
                className="bg-no-repeat bg-cover w-5 h-5"
                style={{ backgroundImage: `url(icons/key.svg)` }}
              />
            </div>
            <div className="font-light leading-tight">
              <h2>{data.title}</h2>
              <h2 className="opacity-75 text-sm">{data.timeline}</h2>
            </div>
          </div>
          <h2
            className="text-search-blue text-xl hover:underline cursor-pointer"
            onClick={() => handleSelect(data)}
          >
            {data.headline}
          </h2>
          <h2 className="text-white opacity-50">{data.searchDescription}</h2>
        </div>

        <div
          className="bg-no-repeat bg-cover w-24 h-24 rounded-md"
          style={{ backgroundImage: `url(search-img/${data.alias}-icon.png)` }}
        />
      </div>
    );
  };

  const SearchItemOpen = ({ data }) => {
    return (
      <div>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-40 flex items-center justify-center">
          <div
            className={`p-2 flex flex-col items-center h-4/5 w-11/12 md:w-4/5 lg:w-3/5 bg-accent-color rounded-lg shadow-lg z-50 transform transition-transform duration-300 ease-in-out`}
          >
            <div className="flex row w-full justify-end mb-2">
              <div
                className="bg-no-repeat bg-cover w-6 h-6"
                style={{ backgroundImage: "url(icons/exit.svg)" }}
                onClick={() => setIsOpen(false)}
              />
            </div>

            <div
              className="bg-no-repeat bg-contain bg-center w-full h-2/5 md:h-3/5 rounded-lg"
              style={{
                backgroundImage: `url(search-img/${data.alias}-banner.png)`,
              }}
            />

            <div className="flex flex-col w-full items-center justify-start h-3/5 p-4 gap-y-2 relative">
              <h2 className="w-full text-2xl">{data.title}</h2>
              <div className={`flex flex-row w-full gap-x-2`}>
                {displayQuery === "vanshs-projects" &&
                  data.links.map((link, idx) => (
                    <Link
                      className={`flex flex-row py-1.5 px-3 text-sm font-medium text-center items-center gap-x-2 rounded  border border-stone-700 transform transition-all duration-300 ${
                        link.name == "github"
                          ? "bg-dark-purple-300 hover:bg-[#4D456E] border-dark-purple-300 flex-row-reverse"
                          : "bg-white text-dark-purple-100 hover:bg-stone-200 hover:text-dark-purple-300"
                      }`}
                      key={idx}
                      href={link.link}
                      target={"_blank"}
                      onMouseEnter={() => setIsHover(true)}
                      onMouseLeave={() => setIsHover(false)}
                    >
                      <h2>{link.name}</h2>
                      <div
                        className={`bg-no-repeat bg-cover ${
                          link.name == "video" ? "w-6 h-6" : "w-4 h-4"
                        }`}
                        style={{
                          backgroundImage: `url(icons/${
                            isHover ? link.urlHover : link.url
                          })`,
                        }}
                      />
                    </Link>
                  ))}
              </div>

              <div
                className="relative w-full h-full overflow-y-scroll overflow-x-hidden text-wrap scroll-smooth"
                style={{ scrollbarWidth: "1" }}
              >
                <div className="font-thin">{data.longDescription}</div>
              </div>

              <div className="flex flex-row w-full gap-x-2">
                {data.type == "project" &&
                  data.tech.map((stack, idx) => (
                    <div
                      key={idx}
                      className="bg-white bg-opacity-10 text-accent-text text-sm p-1 rounded"
                    >
                      {stack}
                    </div>
                  ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-full text-white font-ropaSans">
      <div className="flex flex-col w-full relative ">
        <div className="border borber-b border-[0.05rem] border-white border-opacity-10" />
        <div className="w-full flex flex-row gap-x-20 py-10">
          <div className="flex flex-col gap-y-4 px-4 md:w-1/2  lg:pl-48">
            {(displayQuery !== "why-hire-a-vansh" &&
              displayData?.map((data, idx) => (
                <div key={idx}>
                  <SearchItem data={data} />
                </div>
              ))) || (
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-row gap-x-2 items-center">
                  <div
                    className="bg-no-repeat bg-cover w-4 h-5"
                    style={{ backgroundImage: "url(icons/star.svg)" }}
                  />
                  <h2>AI Overview</h2>
                </div>

                <div
                  className={`flex flex-col gap-y-3 relative ${
                    showMore ? "h-auto" : "h-40 overflow-y-hidden"
                  }`}
                >
                  {!showMore && (
                    <>
                      <h2>
                        <span className="bg-[#735B95] py-1">
                          I transform environments.
                        </span>
                      </h2>
                      <h2 className="">
                        <span className="bg-[#735B95]  py-1">
                          seeking global opportunities to specialize in emerging
                          technologies and apply my skills in software, project
                          management, and design thinking
                        </span>
                      </h2>
                    </>
                  )}

                  <h2>
                  Ever since I started programming, my goal has been to leverage my technical expertise to build impactful and efficient digital experiences. 
                  My strong foundation in front-end development, DevOps, and UI/UX, combined with my problem-solving mindset, has allowed me to contribute meaningfully to every project 
                  I’ve been part of.
                  </h2>

                  <h2>
                  Throughout my journey, I have actively sought opportunities to enhance user experience and optimize performance. 
                  As a Frontend Developer Intern at Textify.ai, I played a key role in developing UI components using Next.js, 
                  fixing bugs, and ensuring smooth feature implementations. My experience as a DevOps Intern at To The New allowed 
                  me to automate deployment pipelines using Terraform and AWS services like ECS, ECR, and CodePipeline, streamlining infrastructure deployment. 
                  At CarDekho, I contributed to the development of "CarDekho Connect" by designing and launching a dedicated product website.
                  </h2>

                  <h2>
                    Beyond internships, I have built innovative projects, such as Dish Dash Momzie,
                    an AI-powered recipe app, and Resume Analyzer, which enhances resumes using NLP techniques.
                    I continuously explore emerging technologies and design strategies to build scalable,
                    user-centric applications.
                  </h2>

                  <h2>
                  In addition to my technical expertise, I have been an active participant and organizer of various college events, 
                  contributing to the tech community through leadership roles. As the Technical Head of the IEEE Student Branch
                   at my college, I have led multiple initiatives, fostering collaboration and innovation among peers. 
                   My passion for problem-solving has also led me to success in hackathons, where I have developed creative solutions 
                   that have been recognized for their impact.
                  </h2>
                  <h2>
                  As I move forward, I seek opportunities to apply my expertise in front-end development, DevOps,
                   and UI/UX to create impactful digital solutions while expanding my technical and global perspective.
                  </h2>

                  {!showMore && (
                    <div className="bg-gradient-to-t from-dark-purple-300 via-dark-purple-200 via-dark-purple-100 to-transparent absolute -bottom-6 h-10 w-full" />
                  )}
                </div>

                {!showMore && (
                  <div className="flex flex-col justify-end bg-gradient-to-t from-dark-purple-300 to-transparent md:px-48  absolute left-0 w-full h-28 -bottom-8">
                    <div
                      onClick={() => setShowMore(!showMore)}
                      className="mt-3 py-3 border border-accent-color w-full rounded-full md:w-2/3 lg:w-2/5 bg-dark-purple-200 flex items-center justify-center hover:bg-[#322C48] gap-x-2 cursor-pointer"
                    >
                      <h2>Show More</h2>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M18 9L12 15L6 9" stroke="#C48DF6" />
                      </svg>
                    </div>

                    <div className="border borber-b border-[0.05rem] border-accent-text border-opacity-50 w-full mt-3" />
                  </div>
                )}
              </div>
            )}
          </div>

          {displayQuery !== "why-hire-a-vansh" && (
            <div className="hidden w-1/3 p-2 h-[40rem] border-[0.05rem] border-white border-opacity-30 shadow-xl rounded-lg md:flex flex-col gap-y-3 ">
              <img
                src={
                  displayQuery == "life"
                    ? "search-img/life.jpeg"
                    : "https://github-readme-stats.vercel.app/api/top-langs/?username=vanshgulati16&layout=compact&theme=nightowl&hide_border=true&exclude_repo=the-www-blog,clean-water-foundation&langs_count=6"
                }
                alt="vansh"
                className="w-full h-[20rem] rounded-t-lg"
              />


              {(displayQuery == "vanshs-projects" && (
                <div className="flex flex-col gap-y-3">
                  <h2 className="opacity-70 text-lg">
                    I love building impact-driven, full-stack projects.{" "}
                  </h2>
                  <h2 className="opacity-70 text-lg">
                    Currently, I'm working on specializing my technical skills
                    in AWS
                  </h2>

                  <div className="flex flex-col">
                    <h2 className="uppercase tracking-wider text-sm">
                      languages
                    </h2>
                    <div className="flex flex-row flex-wrap gap-2">
                      {languages.map((stack, idx) => (
                        <div
                          key={idx}
                          className="inline-flex bg-white bg-opacity-10 text-accent-text text-sm p-1 rounded"
                        >
                          {stack}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <h2 className="uppercase tracking-wider text-sm">
                      Frameworks & Libraries
                    </h2>
                    <div className="flex flex-row flex-wrap gap-2">
                      {technologies.map((stack, idx) => (
                        <div
                          key={idx}
                          className="inline-flex bg-white bg-opacity-10 text-accent-text text-sm p-1 rounded"
                        >
                          {stack}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )) || (
                <div className="flex flex-col gap-y-3 p-2">
                  <h2 className="text-xl">"Lead a life worth telling"</h2>
                  {/* <h2 className="opacity-70 text-lg">
                    I have been a part of many events and workshops in my college.
                  </h2> */}
                </div>
              )}
            </div>
          )}

        </div>

        {isOpen && <SearchItemOpen data={selectedSearch} />}
      </div>

      {displayQuery == "why-hire-a-vansh" && !showMore && (
        <div className="pl-10 md:pl-48 pt-16 flex flex-col gap-y-2">
          <h2 className="text-sm">
            Your search - <span className="font-bold">why hire a vansh</span> -
            did not match any documents
          </h2>
          <h2 className="text-sm">Suggestions:</h2>
          <ul className="list-disc pl-5 text-sm">
            <li>
              Don't search something preposterous (everyone needs a vansh!)
            </li>
            <li>Contact vansh to learn more</li>
          </ul>
        </div>
      )}
    </div>
  );
}
