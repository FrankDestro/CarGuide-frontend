import { createContext } from "react";
import { AccessTokenPayLoadDTO } from "../models/auth";

export type ContextTokenType = {
  contextTokenPayload: AccessTokenPayLoadDTO | undefined;
  setContextTokenPayload: ( accessTokenPayload: AccessTokenPayLoadDTO | undefined ) => void;
};
export const ContextToken = createContext<ContextTokenType>({
  contextTokenPayload: undefined,
  setContextTokenPayload: () => {},

});
