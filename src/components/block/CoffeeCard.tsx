import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingCart } from "phosphor-react";

import { useCart } from "@/src/hooks/useCart";
import { useCount } from "@/src/hooks/useCount";
import { ICoffeCard } from "@/src/models/coffee-card";

const CoffeeCard: React.FC<ICoffeCard> = ({ ...props }) => {
  const { id, imageUrl, tags, title, description, price, active, slug, priceFormatted, images } =
    props;

  const { handleAddNewProductInCart } = useCart();
  const { count, handleDecrementProduct, handleIncrementProduct } = useCount(1);

  return (
    <div className="transition duration-300 ease-in-out hover:scale-105 bg-gray-100 rounded-tl-[6px] rounded-tr-[36px] rounded-bl-[36px] rounded-br-[6px] flex flex-col items-center pb-[23px]">
      <Image
        className="relative -top-[20px] select-none"
        src={imageUrl}
        alt="Coffee"
        width={120}
        height={120}
      />
      <div className="flex items-center gap-[4px]">
        {tags.map((tag: string) => {
          return (
            <span
              className="bg-yellow-100 py-[4px] px-[8px] text-yellow-700 rounded-full font-roboto font-bold uppercase text-[10px]"
              key={tag}
            >
              {tag}
            </span>
          );
        })}
      </div>
      <h1 className="text-[20px] font-bold font-baloo text-brow-400 mt-[16px]">{title}</h1>
      <p className="text-center px-[20px] mt-[8px] text-gray-300 font-roboto font-normal">
        {description}
      </p>
      <div className="flex items-center justify-between gap-[23px] px-[24px] mt-[33px] w-full">
        <strong className="flex items-end leading-3 text-brow-300 text-[24px]">
          {priceFormatted}
        </strong>

        <div className="flex items-center gap-[8px]">
          <div className="bg-gray-200 w-[72px] h-[38px] flex items-center justify-evenly rounded-[6px] font-roboto text-purple-500">
            <button onClick={handleDecrementProduct} type="button">
              <Minus size={14} weight="fill" />
            </button>
            <span className="text-gray-800 select-none">{count}</span>
            <button onClick={handleIncrementProduct} type="button">
              <Plus size={14} weight="fill" />
            </button>
          </div>

          <button
            onClick={() =>
              handleAddNewProductInCart({
                id,
                imageUrl,
                tags,
                title,
                description,
                price,
                active,
                quantity: count,
                slug,
                images,
                priceFormatted,
                subTotal: "",
              })
            }
            className="text-white bg-gray-500 p-[8px] rounded-[6px] hover:brightness-90 transition-all"
            type="button"
          >
            <ShoppingCart size={19} weight="fill" />
          </button>
        </div>
      </div>
      <div className="px-[24px] w-full">
        <Link
          href={`/product/${id}`}
          className="mt-5 bg-purple-500 block text-center w-full py-3 rounded-lg px-4 text-white font-roboto text-[15px] hover:brightness-90 transition-all"
        >
          See product
        </Link>
      </div>
    </div>
  );
};

export default CoffeeCard;
