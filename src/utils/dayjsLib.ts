import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import UTCFormat from "dayjs/plugin/utc";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(customParseFormat);
dayjs.extend(LocalizedFormat);
dayjs.extend(UTCFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export default dayjs;