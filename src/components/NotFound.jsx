import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { mainCategories } from "@/utils/mainCategories";
import { IoMdArrowBack } from "react-icons/io";

function NotFound() {
  const router = useRouter();
  return (
    <div className="lg:mb-10">
      <div className="lg:hidden sticky top-0 bg-[#028DCE] w-full py-2">
        <div className="flex items-center justify-between px-3.5">
          <button
            onClick={() => router.back()}
            className="outline-none focus:outline-none select-none flex items-center"
          >
            <IoMdArrowBack size={24} className="text-white" />
          </button>
          <h1 className="text-white text-lg">Khmer 24</h1>
          <p className="w-5"></p>
        </div>
      </div>

      <div className="lg:bg-white max-w-[1104px] mx-auto">
        <div className="space-y-4 pt-3.5 font-battambang px-6">
          <h1 className="md:text-xl text-center">
            ផលិតផលដែលលោកអ្នកកំពុងស្វែងរក ត្រូវបានលក់ចេញហើយ (ឬបានលុបចេញ)
          </h1>
          <div className="flex items-center justify-center">
            <Image
              className="w-[320px] h-[185px] object-cover object-center"
              src={require("@/assets/404_face.webp")}
              width={600}
              height={800}
              alt=""
            />
          </div>
          <div className="text-center space-y-1.5">
            <Link
              href={`/`}
              className="text-[#007BFF] hover:text-[#424242] transition-all ease-out outline-none focus:outline-none"
            >
              ចុចទីនេះដើម្បីស្វែងរកផលិតផលថ្មីផ្សេងទៀត ដែលកំពុងដាក់លក់លើគេហទំព័រ
              Khmer24.com
            </Link>
            <p className="text-[#424242]">
              Click here to go to Khmer24.com Home Page
            </p>
          </div>
        </div>
        <div className="py-8">
          <hr />
        </div>

        <div className="px-5 lg:px-0 pb-5 space-y-4">
          <h1 className="md:text-xl text-center">Find Product by Categories</h1>
          <ul className="grid md:grid-cols-4 grid-cols-3 lg:grid-cols-6 px-1">
            {mainCategories.map((category, i) => (
              <li key={category + i}>
                <Link
                  href={category.link}
                  className=" outline-none focus:outline-none"
                >
                  <div className="hover:bg-[#f7f7f7] flex flex-col items-center h-[153px] space-y-3 md:px-1 md:pb-1 md:pt-5 pt-4">
                    <div className="h-[60px] w-[60px] bg-[#DEF2FF] rounded-full">
                      <Image
                        className="w-full h-full object-cover object-center"
                        src={require(`@/assets/${category.photoUrl}`)}
                        width={1000}
                        height={1000}
                        alt=""
                      />
                    </div>
                    <h2 className="text-center text-wrap px-2 mb-auto">
                      {category.name?.length > 35
                        ? `${category.name?.slice(0, 35)}...`
                        : category.name}
                    </h2>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
