"use client";

import { useEffect } from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import UserCard from "../cards/user-card";

type UserQueryParams = {
  take?: number;
  lastCursor?: string;
};

const allUsers = async ({ take, lastCursor }: UserQueryParams) => {
  const response = await axios.get("/api/users", {
    params: { take, lastCursor },
  });
  return response?.data;
};

type UsersType = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

const Users = () => {
  // to know when the last element is in view
  const { ref, inView } = useInView();

  // useInfiniteQuery is a hook that accepts a queryFn and queryKey and returns the result of the queryFn
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isSuccess,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryFn: ({ pageParam = "" }) =>
      allUsers({ take: 10, lastCursor: pageParam }),
    queryKey: ["users"],
	// getNextPageParam is used to get the cursor of the last element in the current page
	// which is then used as the pageParam in the queryFn
    getNextPageParam: (lastPage) => {
      return lastPage?.metaData.lastCursor;
    },
  });

  useEffect(() => {
	// if the last element is in view and there is a next page, fetch the next page
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  if (error as any)
    return (
      <div className="mt-10">
        {"An error has occurred: " + (error as any).message}
      </div>
    );

  // console.log("data:",data);

  return (
    <div className="mt-10">
      {isSuccess &&
        data?.pages.map((page) =>
          page.data.map((user: UsersType, index: number) => {
			// if the last element in the page is in view, add a ref to it
            if (page.data.length === index + 1) {
              return (
                <div ref={ref} key={index}>
                  <UserCard
                    key={user.id}
                    name={user.name}
                    email={user.email}
                    avatar={user.avatar}
                  />
                </div>
              );
            } else {
              return (
                <UserCard
                  key={user.id}
                  name={user.name}
                  email={user.email}
                  avatar={user.avatar}
                />
              );
            }
          })
        )}

      {(isLoading || isFetchingNextPage) && <p className="mb-4">Loading...</p>}
    </div>
  );
};

export default Users;
