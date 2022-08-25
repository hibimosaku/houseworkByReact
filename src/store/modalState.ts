import { atom } from "recoil";

export const modalState = atom<Boolean>({
  key: "modalState",
  default: false,
});
export const modalWorkState = atom<Boolean>({
  key: "modalWorkState",
  default: false,
});
export const modalPropState = atom<Boolean>({
  key: "modalPropState",
  default: false,
});
