const fetch = require('node-fetch');
const querystring = require('querystring');
const rateLimit = require('function-rate-limit');
const fs = require('fs');
const readlineSync = require('readline-sync');
const AsyncAF = require('async-af');

const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      headers: {
        'Content-Type': 'text/plain',
        'User-Agent': 'Argentina District Survey.',
      },
      method: 'GET',
    })
      .then((res) => {
        if (res.status === 200 && res.ok) {
          res.json().then((json) => {
            resolve(json);
          });
        } else {
          res.json().then((json) => {
            reject(json);
          });
        }
      })
      .catch((e) => {
        console.log(e);
        reject({ message: 'Request failed' });
      });
  });
};

const matchAndSaveProvinces = async () => {
  const provinces = await fetchData(
    'https://mercedes-benz.audru.com.ar/provinces'
  );

  const provinceMatch = await Promise.all(
    provinces.map(async (province) => {
      const params = querystring.stringify({
        format: 'json',
        countrycodes: 'AR',
        state: province.name,
      });
      const url = `http://localhost:7070/search.php?${params}`;
      const results = await fetchData(url);

      return {
        ...province,
        osm_id: results[0].osm_id,
      };
    })
  );

  fs.writeFileSync('provincesMatch.json', JSON.stringify(provinceMatch));

  return provinceMatch;
};

const readProvinceMatches = () => {
  const file = fs.readFileSync('provincesMatch.json');
  return JSON.parse(file);
};
const readDistrictMatches = () => {
  const file = fs.readFileSync('districtsMatch.json');
  return JSON.parse(file);
};

const matchAndSaveDistricts = async (provinceMatches) => {
  const districts = await fetchData(
    'https://mercedes-benz.audru.com.ar/districts'
  );

  const districtMatches = await Promise.all(
    districts.map(async (district) => {
      const province = provinceMatches.find(
        (province) => province.id === district.provinceId
      );

      let params = querystring.stringify({
        format: 'json',
        countrycodes: 'AR',
        county: district.name,
        state: province.name,
      });
      let url = `http://localhost:7070/search.php?${params}`;

      let results = await fetchData(url);

      if (results.length === 1) {
        return {
          ...district,
          osm_id: results[0].osm_id,
        };
      }

      // const osmId = readlineSync.question(
      //   `Enter OSM ID for ${district.name}, ${province.name}:`
      // );

      return {
        ...district,
        osm_id: undefined,
      };
    })
  );

  fs.writeFileSync('districtsMatch.json', JSON.stringify(districtMatches));
};

const getGeographyForOsm = async (input) => {
  const districtMatches = input.filter((i) => !!i.osm_id);

  const getGeo = async (district) => {
    let params = querystring.stringify({
      format: 'json',
      osm_type: 'R',
      osm_id: district.osm_id,
      polygon_geojson: true,
      polygon_threshold: 0.002,
    });
    let url = `http://localhost:7070/reverse.php?${params}`;

    let results = await fetchData(url);

    return {
      ...district,
      ...results.geojson,
    };
  };

  const completeDistrictMatches = await AsyncAF(districtMatches).series.map(
    getGeo
  );

  fs.writeFileSync(
    'districtsMatchWithGeography.json',
    JSON.stringify({ features: completeDistrictMatches })
  );
};

const main = async () => {
  try {
    const provinceMatches = readProvinceMatches();
    // const provinceMatches = await matchAndSaveProvinces();
    // await matchAndSaveDistricts(provinceMatches);

    const districtMatches = readDistrictMatches();

    await getGeographyForOsm(districtMatches);
  } catch (e) {
    console.log(e);
  }
};

main();
