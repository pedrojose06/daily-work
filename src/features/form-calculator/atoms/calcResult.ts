import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

enum resultTypes {
	less = 0,
	equal = 1,
	more = 2,
	moreThan24 = 3,
}

const showResult = atom(0 as resultTypes);

const basedHour = atomWithStorage("based-hour", "");

const timeToGoHome = atom("");

const timeLeft = atom("");

export { basedHour, showResult, timeLeft, timeToGoHome };
