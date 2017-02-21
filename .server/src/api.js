import request from 'request';
import LRU from 'lru-cache';

const cacheOptions = { max: 500, maxAge: 1000 * 60 * 60 };
const cache = LRU(cacheOptions);

const accessToken = process.env.ACCESS_TOKEN;
const createRequest = (endpoint, callback) => {
  if (!accessToken) {
    return callback(new Error('Missing access token'));
  }

  const requestOptions = {
    url: `https://erikberg.com/nba${endpoint}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'User-Agent': 'Slam/1.0 (https://github.com/mrwest808/slam)',
    },
  };

  request(requestOptions, (err, _, body) => {
    if (err) {
      return callback(err);
    }

    try {
      const response = JSON.parse(body);
      return callback(null, response);
    } catch (err) {
      return callback(err);
    }
  });
};

export const getTeams = callback => {
  const endpoint = '/teams.json';
  const cachedResponse = cache.get(endpoint);

  if (cachedResponse) {
    return callback(null, cachedResponse);
  }

  createRequest(endpoint, (err, response) => {
    if (err) {
      return callback(err);
    }

    cache.set(endpoint, response);
    callback(null, response);
  });
};

export const getGamesForTeam = (teamId, callback) => {
  const endpoint = `/results/${teamId}.json`;
  const cachedResponse = cache.get(endpoint);

  if (cachedResponse) {
    return callback(null, cachedResponse);
  }

  createRequest(endpoint, (err, response) => {
    if (err) {
      return callback(err);
    }

    cache.set(endpoint, response);
    callback(null, response);
  });
};
