/**
 * DISCLAIMER
 *
 * This example application only exists for educational purposes and claims
 * no ownership of images used, unless otherwise stated. Images used here
 * will be promptly removed if requested by a rightful owner.
 */

const fs = require('fs')
const request = require('request')
const async = require('async')

/**
 * Fetch teams from erikberg.com.
 *
 * @return {Promise}
 */
const fetchTeams = () => new Promise((resolve, reject) => {
  const accessToken = process.env.ACCESS_TOKEN

  if (!accessToken) {
    console.error('Missing access token')
    process.exit(1)
  }

  const requestOptions = {
    url: 'https://erikberg.com/nba/teams.json',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'User-Agent': 'Slam/1.0 (https://github.com/mrwest808/slam)',
    },
  }

  request(requestOptions, (error, _, body) => {
    if (error) {
      return reject(error)
    }

    try {
      const teams = JSON.parse(body)
      return resolve(teams)
    } catch (err) {
      return reject(err)
    }
  })
})

/**
 * There's a mismatch for some teams in the team abbreviation returned from the
 * erikberg.com API, and the team abbreviation expected by the image CDN.
 */
const replaceAbbreviationMap = {
  GS: 'GSW',
  PHO: 'PHX',
  SA: 'SAS',
  NY: 'NYK',
  NO: 'NOP',
}
const replaceAbbreviation = abbreviation => {
  return replaceAbbreviationMap[abbreviation]
    ? replaceAbbreviationMap[abbreviation]
    : abbreviation
}

const cdnURL = 'http://i.cdn.turner.com/nba/nba/assets/logos/teams/primary/web'
const svgLike = str =>
  str.trim().startsWith('<?xml ')
  || str.trim().startsWith('<svg ')

/**
 * Fetch team logos and write them to ./logos.
 *
 * @param  {string} teams
 * @return {Promise}
 */
const fetchAndWriteSVGs = teams => new Promise((resolve, reject) => {
  const logos = teams.map(teamAbbr => ({
    abbreviation: teamAbbr,
    url: `${cdnURL}/${replaceAbbreviation(teamAbbr)}.svg`,
  }))

  const fetchAndWrite = (logo, callback) => {
    const writePath = `logos/${logo.abbreviation}.svg`

    request(logo.url, (err, _, body) => {
      if (err) {
        return callback(err)
      }

      if (!svgLike(body)) {
        console.warn(`Failed to fetch SVG for: ${logo.abbreviation}`)
        return callback()
      }

      fs.writeFile(writePath, body, err => {
        callback(err)
      })
    })
  }

  async.each(logos, fetchAndWrite, err => {
    if (err) {
      return reject(err)
    }

    return resolve(teams)
  })
})

fetchTeams()
  .then(teams => teams.map(team => team.abbreviation))
  .then(fetchAndWriteSVGs)
  .then(teams => console.log('-> Fetched %d logos!', teams.length))
  .catch(console.error.bind(console))
