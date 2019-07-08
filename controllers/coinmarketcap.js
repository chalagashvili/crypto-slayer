import rp from 'request-promise';

export function getInstruments(req, res) {
  const { page = 1 } = req.params;
  console.log(page);
  const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
      start: `${(page - 1) * 100 + 1}`,
      limit: `${page * 100 - 1}`,
      convert: 'USD'
    },
    headers: {
      // eslint-disable-next-line
      'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY
    },
    json: true,
    gzip: true
  };

  rp(requestOptions)
    .then(response => {
      return res.status(200).send({
        instruments: response.data.map(instrument => instrument.name)
      });
    })
    .catch(err => {
      console.log('API call error:', err.message);
      return res.status(500).send({ error: err.message });
    });
}
