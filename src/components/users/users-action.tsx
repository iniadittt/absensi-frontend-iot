"use client";

import React from "react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EllipsisIcon, EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { LoadingSVG } from "@/components/iconSVG";
import { deleteUser } from "@/lib/action/crud";

const UsersAction = ({ userId }: { userId: number }) => {
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  async function onDeleteusers(id: number) {
    toast("Deleting...", {
      icon: <LoadingSVG />,
      duration: Infinity,
      id: "delete-toast",
    });
    setIsDeleting(true);
    try {
        const res = await deleteUser({
          accessToken: session!.user.accessToken,
          id: id,
        });

        if (res.status !== 200) {
          toast.dismiss("delete-toast");
          toast.error("Error", {
            description: <p className="text-sm text-red-600">{res.message}</p>,
            duration: 2000,
          });
          setIsDeleting(false);
          return;
        }

      toast.dismiss("delete-toast");
      toast.success("Success", {
        description: <p className="text-green-700">{res.message}</p>,
        duration: 2000,
      });
      setOpen(false);
      setIsDeleting(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="sm" variant="ghost">
            <EllipsisIcon size={12} />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link
              href={`/dashboard/users/${userId}`}
              className="flex cursor-pointer flex-row items-center"
            >
              <EyeIcon size={14} className="mr-2" />
              Detail
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`/dashboard/users/${userId}/edit`}
              className="flex cursor-pointer flex-row items-center"
            >
              <PencilIcon size={14} className="mr-2" />
              Edit
            </Link>
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem className="flex cursor-pointer flex-row items-center">
              <Trash2Icon size={14} className="mr-2 text-destructive" />
              <span className="text-destructive">Delete</span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this file from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => onDeleteusers(userId)}
            disabled={isDeleting}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UsersAction;
