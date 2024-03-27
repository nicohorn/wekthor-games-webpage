import React from "react";
import UserDetails from "./components/UserDetails";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { findUserByEmail } from "@/index";
import { IUser } from "@/models/User";
import UserDetailsComponent from "./components/UserDetails";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const user: IUser = await findUserByEmail(session!.user.email!);
  //To get the session in the client, the component/page must be wrapped in the SessionProvider component.
  return <UserDetailsComponent user={user} />;
}
