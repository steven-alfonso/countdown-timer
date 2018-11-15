import { generateGuid } from "../utils/generate-guid";

export class TimeSegment {
    id: string;
    minutes: number;
    seconds: number;
    sLength: string;
    order: number;

    constructor(order: number) {
        this.id = generateGuid();
        this.order = order;
    }
}

export enum SegmentSubtypes {
    Minutes = 'minutes',
    Seconds = 'seconds'
}