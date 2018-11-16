import { Component } from '@angular/core';
import { TimeSegment, SegmentSubtypes } from '../models/time-segment.model';
import * as moment from 'moment';
import * as _ from 'lodash';
import { leftPad } from '../utils/pad';
import { ServiceStart } from '../models/service-start.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  timeSegments: TimeSegment[];
  startTimeInput: string;
  serviceStartTimes: ServiceStart[];
  preServiceStart: any;
  segmentSubtypes = SegmentSubtypes;

  constructor() {
    this.timeSegments = [new TimeSegment(0), new TimeSegment(1)];
    this.serviceStartTimes = [
      new ServiceStart(moment('18:00', 'HH:mm')),
      new ServiceStart(moment('09:30', 'HH:mm')),
      new ServiceStart(moment('11:05', 'HH:mm'))
    ];
    this.calculateVideoStartTimes();
  }

  addTimeSegment() {
    this.timeSegments = this.timeSegments.concat(new TimeSegment(this.timeSegments.length));
  }

  calculateVideoStartTimes() {
    this.serviceStartTimes.forEach((serviceStart: ServiceStart) => {
      if (serviceStart) {
        let s: moment.Moment = serviceStart.start.clone();
        this.timeSegments.forEach(timeSegment => {
          s = s.subtract(timeSegment.minutes, 'minutes');
          s = s.subtract(timeSegment.seconds, 'seconds');
        });
          serviceStart.videoStart = s;
      }
    })

  }

  updateSegmentInputValue(id: string, value: string | null) {
    const splitVals = this.splitMinutesSeconds(value);
    const index = _.findIndex(this.timeSegments, { id: id });
    this.timeSegments[index].minutes = splitVals[0];
    this.timeSegments[index].seconds = splitVals[1];
    this.calculateVideoStartTimes();
  }

  updateStartTime(value: string, id: string) {
    const splitVals = this.splitMinutesSeconds(value);
    const stringVal = `${leftPad(splitVals[0], 2)}:${leftPad(splitVals[1], 2)}`;
    _.find(this.serviceStartTimes, { id: id }).setStart(moment(stringVal, 'hh:mm'));
    this.calculateVideoStartTimes();

  }

  splitMinutesSeconds(value: string): number[] {
    if (value.indexOf('.') >= 0) {
      return value.split('.').map(val => {
        return parseInt(val.trim()) || 0;
      });
    } else if (value.indexOf(':') >= 0) {
      return value.split(':').map(val => {
        return parseInt(val.trim()) || 0;
      });
    } else {
      return [parseInt(value.trim()) || 0, 0];
    }
  }
}
