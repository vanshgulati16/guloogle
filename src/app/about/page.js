import Link from "next/link";
export default function About() {
  return (
    <div className=" flex flex-col w-full md:flex-row-reverse h-full items-center gap-x-10 gap-y-10 justify-center pb-10 md:pb-0">
      <div className="flex flex-col font-ropaSans w-4/5 md:w-2/5 lg:w-1/3 font-bold text-md text-white gap-y-4">
        <h2 className="text-accent-text opacity-70">Vansh Gulati</h2>
        <h2>
          I'm a computer science graduate who loves building
          things for homosapien.
        </h2>

        <h2>
          I'm advanced in{" "}
          <span className="text-[#DED7FC] italic ">
            Python and JS/TS with a lot of experience in full-stack
            web development and exploring mobile development.
          </span>{" "}
          as well as a mastery of turning designs into code. My most epic skillset lies in the fact that I consistently push the boundaries of coventional thinking to turn my ambitious visions into reality.
        </h2>

        <h2>
          Currently, I’m Freelancing builing website for products and companies
          and working on a project {" "}<span> 
            <Link href={"https://dishdashmozie.vercel.app/"} target={"_blank"} className="inline-flex items-center hover:underline hover:opacity-70 text-[#DED7FC] transform transition-all duration-300 gap-x-1">
              Dish Dash Momzie
              <div
                className="bg-no-repeat bg-cover w-4 h-4"
                style={{ backgroundImage: `url("icons/link.svg")` }}
              />
            </Link>
          </span> {" "}, a recipe curating website, which helps you find recipes based on the ingredients you have, modify recipes and create your own recipes. Help you store your recipes and use them later and much more. It's still in development and will be launched soon.
          I won many hackathons one of them inclusing @nosu AI hackathon. 
        </h2>

        <Link
          href="/search?q=vanshs-projects"
          className="border border-[#DED7FC] flex flex-row w-full items-center justify-center rounded-md p-4 hover:bg-[#DED7FC] hover:text-dark-purple-100 transform transition-all duration-300"
        >
          discover my projects
        </Link>
      </div>
      <div className="flex md:flex-col-reverse items-center justify-start">
        <div
          className="bg-no-repeat bg-cover w-32 h-32 md:w-72 md:h-72"
          style={{ backgroundImage: `url("head-shot.png")` }}
        />
      </div>
    </div>
  );
}
