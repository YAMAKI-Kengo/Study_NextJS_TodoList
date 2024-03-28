"use client";

import type { Session } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ModalCore from "./modalCore";
import { ModalType } from "./modal/modalType";
import { useEffect } from "react";
const Navigation = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (session === null && pathname?.includes("/todo")) {
      router.push('/');
    } [session, pathname];
  })
  
  return (
    <header>
      <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
        <nav className="hidden md:flex space-x-4">
          <div>
            <Link className="text-gray-600 hover:text-blue-600" href="/">
              Home
            </Link>
          </div>
          {session ? (
            <>
              <div>
                <Link
                  className="text-gray-600 hover:text-blue-600"
                  href="/todo"
                >
                  todo
                </Link>
              </div>
              <form action="/auth/logout" method="post">
                <button>
                  <div className="text-gray-600 hover:text-blue-600">
                    Logout
                  </div>
                </button>
              </form>
            </>
          ) : (
            <>
              <div>
                <ModalCore modalType={ModalType.SignIn}></ModalCore>
              </div>
              <div>
                <ModalCore modalType={ModalType.SignUp}></ModalCore>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
