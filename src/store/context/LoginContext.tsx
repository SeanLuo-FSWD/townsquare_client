import { createContext, Dispatch, SetStateAction } from "react";
import { IUser } from "../../interfaces/IUser";

export interface ILoginContext {
  currentUser: any | null;
  setCurrentUser: Dispatch<SetStateAction<any | null>>;
  signUpStatus: boolean;
  setSignUpStatus: Dispatch<SetStateAction<boolean>>;
  showModal: string;
  setShowModal: Dispatch<SetStateAction<string>>;
  modalProps: any;
  setModalProps: Dispatch<SetStateAction<any>>;
  cerror: string;
  setCerror: Dispatch<SetStateAction<string>>;
  groupChat: string[];
  setGroupChat: Dispatch<SetStateAction<string[]>>;
}

export const LoginContext = createContext({} as ILoginContext);
