import R from 'ramda';
import moment from 'moment';

// Get date part of ISO string
export const trimISOString = R.compose(R.head, R.split('T'));

// Get date part of ISO string from date object
export const toISODateString = date => {
  if (!moment.isMoment(date) && !moment.isDate(date)) {
    date = new Date(date);
  }

  return trimISOString(date.toISOString());
};

// Index games by event date
export const gamesByDate = R.compose(
  R.reduce(
    (acc, game) => {
      const isoDate = toISODateString(game.eventStartDateTime);
      return R.merge(acc, { [isoDate]: game });
    },
    {},
  ),
  R.values,
);
