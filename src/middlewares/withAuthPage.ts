import { GetServerSidePropsContext } from "next";
import { verifyToken } from "@/libs/jwt";

type fnType = (context?: GetServerSidePropsContext) => any;

export const withAuthPage = (cb: fnType) => {
  return (context: GetServerSidePropsContext) => {
    try {
      const { req } = context;
      const token = req.cookies.authorize_key;
      if (!token || !verifyToken(token)) {
        return {
          notFound: true,
          //   redirect: {
          //     destination: '/admin/sign-in',
          //     permanent: false,
          //   },
        };
      }
      return cb(context);
    } catch (error) {
      return {
        notFound: true,
        // redirect: {
        //   destination: '/admin/sign-in',
        //   permanent: true,
        // },
      };
    }
  };
};
