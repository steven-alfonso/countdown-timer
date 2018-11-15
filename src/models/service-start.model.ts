import { generateGuid } from "../utils/generate-guid";
import { Moment } from "moment";

export class ServiceStart {
    id: string;
    start: Moment;
    startAsString: string;
    videoStart: Moment;

    constructor(start: Moment) {
        this.id = generateGuid();
        this.setStart(start);
        this.startAsString = start.format('hh:mm');
    }

    setStart(start: Moment) {
        this.start = start;
        // this.startAsString = start.format('hh:mm');
        // console.log(this.startAsString);
    }
}