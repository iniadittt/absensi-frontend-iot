"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";

const generatePagination = (thisPage: number, totalPages: number) => {
  if (totalPages <= 10) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (thisPage <= 5) {
    return [
      1,
      2,
      3,
      4,
      5,
      6,
      "...",
      totalPages - 5,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  if (thisPage >= totalPages - 4) {
    return [
      1,
      2,
      3,
      4,
      5,
      6,
      "...",
      totalPages - 5,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    thisPage - 4,
    thisPage - 3,
    thisPage - 2,
    thisPage - 1,
    thisPage,
    thisPage + 1,
    thisPage + 2,
    thisPage + 3,
    thisPage + 4,
    "...",
    totalPages,
  ];
};

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx(
    "flex h-9 w-10 rounded-md font-medium items-center justify-center text-sm border",
    {
      "z-10 bg-primary border-primary text-white": isActive,
      "hover:bg-gray-100": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    },
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const thisPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(pageNumber));
    const newUrl = `${pathname}?${params.toString()}`;
    return newUrl;
  };

  const allPages = generatePagination(thisPage, totalPages);

  return (
    <div className="flex w-full flex-row items-center justify-center gap-2">
      <Button
        size={"sm"}
        disabled={thisPage === 1 || thisPage > totalPages}
        asChild={thisPage > 1}
      >
        <Link href={createPageURL(thisPage - 1)}>Prev</Link>
      </Button>

      <div className="hidden flex-row gap-1 lg:flex">
        {allPages.map((page, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={index}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={thisPage === page}
            />
          );
        })}
      </div>

      <Button
        size={"sm"}
        disabled={thisPage === totalPages || thisPage > totalPages}
        asChild={thisPage < totalPages}
      >
        <Link href={createPageURL(thisPage + 1)}>Next</Link>
      </Button>
    </div>
  );
};

export default Pagination;
