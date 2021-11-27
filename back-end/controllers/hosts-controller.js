const City = require('../models/city');

const getCities = async (req, res, next) => {
  try {
    const city1 = new City(
      {
        location: {
          latitude: 53.54,
          longitude: 27.30,
          zoom: 10,
        },
        name: 'Минск'
      }
    )
    const city2 = new City(
      {
        location: {
          latitude: 53.42,
          longitude: 23.43,
          zoom: 10,
        },
        name: 'Гродно'
      }
    )

    const city3 = new City(
      {
        location: {
          latitude: 52.24,
          longitude: 31.00,
          zoom: 10,
        },
        name: 'Гомель'
      }
    )
    const city4 = new City(
      {
        location: {
          latitude: 55.12,
          longitude: 30.06,
          zoom: 10,
        },
        name: 'Витебск'
      }
    )
    const city5 = new City(
      {
        location: {
          latitude: 52.06,
          longitude: 23.42,
          zoom: 10,
        },
        name: 'Брест'
      }
    )
    const city6 = new City(
      {
        location: {
          latitude: 53.54,
          longitude: 30.18,
          zoom: 10,
        },
        name: 'Могилев'
      }
    )
    await city1.save()
    await city2.save()
    await city3.save()
    await city4.save()
    await city5.save()
    await city6.save()
    res.json("Server work")
  } catch (e) {
    console.log(e)
  }
}

module.exports.getCities = getCities;