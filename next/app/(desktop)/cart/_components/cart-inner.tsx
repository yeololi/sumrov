"use client";

import { Button } from "@/components/ui/button";
import Footer from "../../_components/footer";
import Header from "../../_components/header";
import { cart, columns } from "../colums";
import { DataTable } from "../data-tables";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "../../shop/page";

const CartInner = ({ data }: { data: cart[] }) => {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [selected, setSelected] = useState<cart[]>();

  let total = 0;

  selected?.forEach((ai) => {
    total += ai.price * ai.amount;
  });
  const sale = 0,
    box = 3000; // 3,000원 고정

  const selectOrder = () => {
    setIsLoading(() => true);
    if (!selected || selected?.length == 0) {
      toast({
        title: "제품을 선택해주세요",
        variant: "default",
      });
      setIsLoading(() => false);

      return;
    } else {
      const prop = selected.map((ai) => ai._id);
      setIsLoading(() => false);
      router.push(`/payment?s=${JSON.stringify(prop)}`);
    }
  };

  const allOrder = () => {
    setIsLoading(() => true);
    const prop = data.map((ai) => ai._id);
    setIsLoading(() => false);
    if (data.length) router.push(`/payment?s=${JSON.stringify(prop)}`);
    else {
      toast({
        title: "제품이 장바구니에 없습니다.",
        variant: "default",
      });
      setIsLoading(() => false);
      return;
    }
  };

  return (
    <>
      <Header />
      <div className="flex-col justify-center items-center gap-10 flex pt-[225px] pb-[300px]">
        <div className="flex-col justify-center items-center gap-6 flex">
          <div className="text-center text-black dark:text-neutral-50 text-[26px] font-semibold font-nav tracking-[2.60px]">
            CART
          </div>
          <div className="flex-col justify-center items-center gap-10 flex">
            <DataTable
              columns={columns}
              data={data}
              setSelected={setSelected}
            />
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
                  <TableCell className="text-center">
                    KRW {total.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    KRW {sale.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    KRW {box.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    KRW {(total - sale + box).toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="justify-center items-center gap-5 inline-flex">
          <Button
            disabled={isLoading}
            onClick={allOrder}
            variant={"login"}
            className="rounded-none w-[425px] h-[50px] py-[9px] bg-neutral-900 justify-center items-center gap-2.5 flex text-base font-semibold font-noto text-center "
          >
            모든 항목 주문
          </Button>
          <Button
            disabled={isLoading}
            onClick={selectOrder}
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

export default CartInner;
