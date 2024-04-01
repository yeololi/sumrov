import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Link from "next/link";
import { NextRequest } from "next/server";
import Footer from "../_components/footer";
import Header from "../_components/header";
import Pagination from "../_components/pagination";

interface Product {
  Uuid: string;
  Title: string;
  Price: number;
  Sale: number;
  Description: string;
  Size: string;
  Color: string;
  MainImage: string;
  DetailImage: string;
  Category: string;
}

const ShopPage = ({
  searchParams,
}: {
  searchParams: { category: "all" | "top" | "bottom" | "acc"; page: string };
}) => {
  const page = parseInt(searchParams.page);
  const category = searchParams.category;

  async function fetchData() {
    function chunk<T>(array: T[] | undefined, chunkSize: number): T[][] {
      if (!array) return []; // array가 undefined 또는 null인 경우, 빈 배열 반환
      const result: T[][] = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        result.push(chunk);
      }
      return result;
    }

    try {
      console.log("cat: " + category);

      const response: any = await fetch(`/backend/post`, {
        method: "GET",
      })
        .then((r) => r.json())
        .then((res) => {
          console.log("res: " + res);
        });
      // .catch((err) => {
      //   console.error(err);
      // });

      //   if (response) {
      //     // const chunkData = chunk(response.results, 9)
      //     //   .map((subArray) => chunk(subArray, 3))
      //     //   .flat();

      //     console.log(response);

      //     return response;
      //   } else {
      //     console.log("res.result is not an array or res is undefined");
      //     return;
      //   }
    } catch (error) {
      console.error("err: " + error);
      return;
    }
  }

  const result = fetchData();

  return (
    <>
      <Header />
      <div className="w-full h-full flex flex-col justify-center items-center pt-[225px] bg-neutral-50 pb-[142px] gap-[50px]">
        <div className="flex-col justify-center items-center gap-[25px] inline-flex">
          <div className="text-neutral-900 dark:text-neutral-50 text-lg font-bold font-nav tracking-widest uppercase">
            {category}
          </div>
          <div className="justify-center items-center gap-[100px] inline-flex">
            <Link
              href={{
                pathname: "/shop",
                query: { category: "all", page: 1 },
              }}
              className="text-neutral-900 dark:text-neutral-50 text-xs font-medium font-nav"
            >
              ALL
            </Link>
            <Link
              href={{
                pathname: "/shop",
                query: { category: "top", page: 1 },
              }}
              className="text-neutral-900 dark:text-neutral-50 text-xs font-medium font-nav"
            >
              TOP
            </Link>
            <Link
              href={{
                pathname: "/shop",
                query: { category: "bottom", page: 1 },
              }}
              className="text-neutral-900 dark:text-neutral-50 text-xs font-medium font-nav"
            >
              BOTTOM
            </Link>
            <Link
              href={{
                pathname: "/shop",
                query: { category: "acc", page: 1 },
              }}
              className="text-neutral-900 dark:text-neutral-50 text-xs font-medium font-nav"
            >
              ACC
            </Link>
          </div>
        </div>
        <div className="flex h-full flex-col gap-[100px]">
          {/* <>
            {result.map((args, i) => (
              <div className="gap-[50px] w-full flex" key={i}>
                {args.map((product, j) => (
                  <Link
                    href={"/shop/" + btoa(product.Uuid) + "/"}
                    key={j}
                    className="w-[300px] h-[480px] flex-col justify-center items-center gap-[10px] inline-flex"
                  >
                    <img
                      className="w-[300px] h-[380px] shadow"
                      src="https://via.placeholder.com/300x380"
                    />
                    <div className="w-[134px] flex-col justify-center items-center gap-[5px] flex">
                      <div className="text-black dark:text-neutral-50 text-[13px] font-medium font-body leading-none">
                        {product.Title}
                      </div>
                      <div className="text-black dark:text-neutral-50 text-[15px] font-semibold font-body">
                        {product.Price}
                      </div>
                      <div className="text-black dark:text-neutral-50 text-[11px] font-light font-body">
                        {product.Description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </> */}
          <Pagination props={{ category }} totalPages={30} currentPage={page} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopPage;
