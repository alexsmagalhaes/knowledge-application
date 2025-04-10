import { IAuthSession } from "@/types/auth";
import { create } from "zustand";

type TStore = {
  session: IAuthSession | undefined;
  setSession: (session: IAuthSession) => void;
  removeSession: () => void;
};

export const useSessionStore = create<TStore>((set) => ({
  session: undefined,
  setSession: (session) => set({ session }),
  removeSession: () => set(() => ({ session: undefined })),
}));
