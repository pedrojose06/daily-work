import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const calcResult = atom(false);

const basedHour = atomWithStorage("based-hour", "");

const timeToGoHome = atom("");

export { basedHour, calcResult, timeToGoHome };
