import express from 'express';
import * as api from './api';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/teams', (req, res) => {
  api.getTeams((err, teams) => {
    if (err) {
      return res.status(err.code || 500).send(err.message);
    }

    res.json({ teams });
  });
});

app.get('/teams/:teamId/games', (req, res) => {
  const { teamId } = req.params;

  api.getGamesForTeam(teamId, (err, games) => {
    if (err) {
      return res.status(err.code).send(err.message);
    }

    res.json({ games });
  });
});

app.listen(9999, () => console.log('Listening on port 9999'));
