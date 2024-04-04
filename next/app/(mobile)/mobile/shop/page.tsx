import { Product, category } from "@/app/(desktop)/shop/page";
import Footer from "../_components/footer";
import Header from "../_components/header";
import ShopSelect from "./_components/shopSelect";
import Link from "next/link";

async function fetchData(category: category) {
  try {
    let response: { results: Product[] };

    if (category === "all") {
      response = await fetch(`http://3.39.237.151:8080/post`, {
        method: "GET",
      }).then((r) => r.json());
    } else {
      response = await fetch(`http://3.39.237.151:8080/post/${category}`, {
        method: "GET",
      }).then((r) => r.json());
    }
    console.log(response);
    if (response) {
      return response.results;
    } else {
      console.log("res.result is not an array or res is undefined");
      return;
    }
  } catch (error) {
    console.error(error);
    return;
  }
}

const ShopPage = async ({
  searchParams,
}: {
  searchParams: { category: category };
}) => {
  const category = searchParams.category;
  const result = await fetchData(category);
  return (
    <>
      <Header />
      <div className="w-full flex flex-col dark:bg-neutral-900 justify-center items-center pt-[101px] px-4">
        <ShopSelect category={category} />
        <div className="mt-[25px] gap-y-[25px] grid grid-cols-2 gap-x-[19px]">
          {result?.map((product, i) => (
            <Link
            href={"/mobile/shop/" + btoa(product.Uuid)}
              key={i}
              className="w-[162px] flex-col justify-start items-center gap-[11px] inline-flex"
            >{product.MainImage ? (
              <img
                className="w-[162px] h-[213px] shadow"
                src={product.MainImage}
              />
            ) : (
              <img
                className="w-[162px] h-[213px] shadow"
                src="https://via.placeholder.com/162x213"
              />
            )}
              <div className="w-[114px] h-[35px] flex flex-col items-center">
                <div className="text-black dark:text-white text-[11px] font-medium font-body">
                  {product.Title}
                </div>
                <div className="text-black dark:text-white text-[8px] font-medium font-body">
                  {product.Price}
                </div>
                <div className="text-black dark:text-white text-[10px] font-medium font-body">
                  {product.Category}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-[89px] pb-[49px] border-b flex justify-center items-center w-full border-black border-opacity-25">
          <div className="text-black dark:text-white text-[11px] font-medium font-body">
            Load more (1/1)
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopPage;
