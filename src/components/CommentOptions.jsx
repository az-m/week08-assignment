"use client";

import Link from "next/link";
import { useState } from "react";

export default function CommentOptions({ postID, commentID }) {
  const [showOptions, setShowOptions] = useState("hidden");
  const [showDelete, setShowDelete] = useState("hidden");

  function handleClickDisplay() {
    if (showOptions === "hidden") {
      setShowOptions("block");
    } else setShowOptions("hidden");
  }

  function handleClickDeleteCheck() {
    if (showDelete === "hidden") {
      setShowDelete("block");
    }
  }

  function handleClickCancel() {
    setShowDelete("hidden");
    setShowOptions("hidden");
  }

  return (
    <>
      <div>
        <p
          className="text-2xl hover:text-link-hover hover:cursor-pointer"
          onClick={handleClickDisplay}
        >
          &hellip;
        </p>
      </div>
      <div className={showOptions}>
        <div className="bg-background relative -top-10 -left-10 pt-4 pb-4 pl-6 pr-6 text-foreground-reverse rounded-sm">
          <p>
            <Link
              href={`/post/${postID}/${commentID}`}
              className="hover:text-link-hover"
            >
              UPDATE
            </Link>
          </p>
          <p
            className="text-red-500 font-semibold hover:cursor-pointer mt-2"
            onClick={handleClickDeleteCheck}
          >
            DELETE
          </p>
        </div>
      </div>
      <div className={showDelete}>
        <div className="flex flex-col fixed inset-0 m-auto h-[110px] w-[250px] bg-background items-center rounded-sm pt-5 text-foreground-reverse">
          <p className="font-extrabold text-xl">ARE YOU SURE?</p>
          <p className="mt-2">
            <Link
              href={`/delete/${commentID}`}
              className="inline-block border-2 w-[75px] text-red-500 font-bold text-center"
            >
              DELETE
            </Link>
            <button
              className="border-2 w-[75px] ml-2 hover:text-link-hover"
              onClick={handleClickCancel}
            >
              Cancel
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
