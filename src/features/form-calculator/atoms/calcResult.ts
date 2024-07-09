import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const calcResult = atom(false);

const basedHour = atomWithStorage("based-hour", "");

const timeToGoHome = atom("");

const timeLeft = atom("");

export { basedHour, calcResult, timeLeft, timeToGoHome };
