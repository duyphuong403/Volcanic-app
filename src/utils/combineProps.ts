import axios from "axios";
import assign from "lodash/assign";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";

export interface PropsCombinable<T> {
  (context: T): Promise<Record<string, any> | null>;
}

export const combineProps = async <T extends GetStaticPropsContext | GetServerSidePropsContext>(context: T, ...combinables: PropsCombinable<T>[]) => {
  try {
    const resolver = combinables.map((runner) => runner(context));
    const response = await axios.all(resolver);

    return assign({}, ...response);
  } catch (error) {
    console.error("combineProps Error: ", error);
    return null;
  }
};
