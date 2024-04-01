import { Button } from "@/components/ui/button";
import Footer from "../_components/footer";
import Header from "../_components/header";
import { cart, columns } from "./colums";
import { DataTable } from "./data-tables";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: cart[] = [
  {
    id: "1",
    name: "Lorem ipsum dolor sit",
    price: 10000,
    amount: 1,
    color: "블랙",
    size: "L",
    image: "asd",
  },
];

const Cart = () => {
  return (
    <>
      <Header />
      <div className="flex-col justify-center items-center gap-10 flex pt-[150px] pb-[300px]">
        <div className="flex-col justify-center items-center gap-6 flex">
          <div className="text-center text-black text-[26px] font-semibold font-nav tracking-[2.60px]">
            CART
          </div>
          <div className="flex-col justify-center items-center gap-10 flex">
            <DataTable columns={columns} data={data} />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center font-noto w-[200px]">
                    총 상품 금액
                  </TableHead>
                  <TableHead className="text-center font-noto w-[200px]">
                    총 할인 금액
                  </TableHead>
                  <TableHead className="text-center font-noto w-[200px]">
                    총 배송비
                  </TableHead>
                  <TableHead className="text-center font-noto w-[400px]">
                    결제 예정 금액
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-center">KRW 20,000</TableCell>
                  <TableCell className="text-center">KRW 100</TableCell>
                  <TableCell className="text-center">KRW 0</TableCell>
                  <TableCell className="text-center">KRW 19,900</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="justify-center items-center gap-5 inline-flex">
          <Button
            variant={"login"}
            className="rounded-none w-[425px] h-[50px] py-[9px] bg-neutral-900 justify-center items-center gap-2.5 flex text-base font-semibold font-noto text-center "
          >
            모든 항목 주문
          </Button>
          <Button
            variant={"signup"}
            className="w-[425px] h-[50px] py-[9px] border border-neutral-900 justify-center items-center gap-2.5 flex text-base font-semibold font-noto text-center "
          >
            선택 항목 주문
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
