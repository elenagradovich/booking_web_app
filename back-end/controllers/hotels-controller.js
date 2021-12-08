const Hotel = require('../models/hotel');
const City = require('../models/city');
const Host = require('../models/host');


// const HttpError = require('../models/http-error');
// const { mapFilePathToServerUrl, mapImageUrlToLocalFilePath } = require('../util/helpers');

const getAllHotels = async (req, res, next) => {

  try {
    //поиск по БД Hotel.find
    const hotels = await Hotel
      .find()
      .select('is_premium price is_favorite rating id title preview_image')

    res.send(hotels)
  } catch (e) {
    return res.status(400).json({message: "Hotels not found"})
  }
  
};


const getHotelById = async (req, res, next) => {
  const hotelId = req.params.id;
  try {
    const hotel = await Hotel
      .findById(hotelId)
      .populate({ path: 'hostId', select: 'avatar_url is_pro name' }) 
      .populate('cityId', 'location name')
    
    res.send( hotel );
  } catch (err) {
    return res.status(404).json({message: "Hotel not found"})
  }
};

const create = async (req, res, next) => {
  // const getCityById =async (id) => {
  //   const city = {...await City.findById(id)};
  //   return city
  // }

  // const getHostById = async (id) => {
  //   const host = {...await Host.findById(id)};
  //   return host
  // }

  try {
    const hotel1 = new Hotel(
      {
        "bedrooms": 1,
        "description": "Отличная квартира в центре Минска. Рядом есть все, что нужно. Торговые центры, магазины, кафе и рестораны в шаговой доступности. Метро в 2 минутах пешком.",
        "goods": [
          "Heating",
          "Kitchen"
        ],
        "images": [
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
          "https://images.unsplash.com/photo-1637762646936-29b68cd6670d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        ],
        "is_favorite": false,
        "is_premium": false,
        "location": {
          "latitude": 53.9238393,
          "longitude": 27.6080605,
          "zoom": 8
        },
        "max_adults": 4,
        "preview_image": "https://images.unsplash.com/photo-1637762646936-29b68cd6670d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
        "price": 120,
        "rating": 4.8,
        "title": "Уютные Апартаменты в историческом центре Минска",
        "type": "apartment",
        "hostId": '619fe0e17db2dde62c2fe3ee',
        "cityId": '619ff1c6c8b671edc73d2f0a'
      }
    )
    const hotel2 = new Hotel({
      "bedrooms": 3,
        "description": "Прекрасное расположение, две минуты от метро. Квартира соответствует описанию, а камин это вообще шикарно вещь",
        "goods": [
          "Heating",
          "Kitchen",
          "Cable TV",
          "Washing machine",
          "Coffee machine",
          "Dishwasher"
        ],
        "images": [
          "https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          "https://images.unsplash.com/photo-1637649228998-6c78a67dfa6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=325&q=80",
          "https://images.unsplash.com/photo-1637649228998-6c78a67dfa6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=325&q=80g"
        ],
        "is_favorite": false,
        "is_premium": true,
        "location": {
          "latitude": 53.9238393,
          "longitude": 27.6080605,
          "zoom": 8
        },
        "max_adults": 4,
        "preview_image": "https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        "price": 129,
        "rating": 4,
        "title": "Уютные Апартаменты в историческом центре Минска",
        "type": "apartment",
        "hostId": '619fe0e17db2dde62c2fe3ef',
        "cityId": '619ff1c6c8b671edc73d2f0a'
      }
    )

    const hotel3 = new Hotel(
      {
        "bedrooms": 3,
        "description": "Отличная квартира в центре Минска. Рядом есть все, что нужно. Торговые центры, магазины, кафе и рестораны в шаговой доступности. Метро в 2 минутах пешком.",
        "goods": [
          "Heating",
          "Kitchen",
          "Cable TV",
          "Washing machine",
          "Coffee machine",
          "Dishwasher"
        ],
        "images": [
          "https://images.unsplash.com/photo-1614356192561-8f97735e56fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=740&q=80",
          "https://images.unsplash.com/photo-1614356192561-8f97735e56fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=740&q=80"
        ],
        "is_favorite": false,
        "is_premium": false,
        "location": {
          "latitude": 53.9238393,
          "longitude": 27.6080605,
          "zoom": 8
        },
        "max_adults": 4,
        "preview_image": "https://images.unsplash.com/photo-1614356192561-8f97735e56fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=340&q=80",
        "price": 140,
        "rating": 4.1,
        "title": "Уютные Апартаменты в историческом центре Минска",
        "type": "apartment",
        "hostId": '619fe0e17db2dde62c2fe3f0',
        "cityId": '619ff1c6c8b671edc73d2f0b'
      }
    )
    const hotel4 = new Hotel(
      {
        "bedrooms": 3,
        "description": "Отличная квартира в центре Минска. Рядом есть все, что нужно. Торговые центры, магазины, кафе и рестораны в шаговой доступности. Метро в 2 минутах пешком.",
        "goods": [
          "Heating",
          "Kitchen",
          "Cable TV",
          "Washing machine",
          "Coffee machine",
          "Dishwasher"
        ],
        "images": [
          "https://images.unsplash.com/photo-1613036814506-a79f847abdd4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=742&q=80",
          "https://images.unsplash.com/photo-1613036814506-a79f847abdd4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=742&q=80"
        ],
        "is_favorite": false,
        "is_premium": false,
        "location": {
          "latitude": 53.908628,
          "longitude": 27.549013,
          "zoom": 8
        },
        "max_adults": 4,
        "preview_image": "https://images.unsplash.com/photo-1613036814506-a79f847abdd4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=342&q=80",
        "price": 180,
        "rating": 1.8,
        "title": "Уютные Апартаменты в историческом центре Минска",
        "type": "apartment",
        "hostId": '619fe0e17db2dde62c2fe3f1',
        "cityId": '619ff1c6c8b671edc73d2f0b'
      }
    )
    const hotel5 = new Hotel(
      {
        "bedrooms": 1,
        "description": "Отличная квартира в центре Минска. Рядом есть все, что нужно. Торговые центры, магазины, кафе и рестораны в шаговой доступности. Метро в 2 минутах пешком.",
        "goods": [
          "Heating",
          "Kitchen"
        ],
        "images": [
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
          "https://images.unsplash.com/photo-1637762646936-29b68cd6670d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        ],
        "is_favorite": false,
        "is_premium": false,
        "location": {
          "latitude": 53.9238393,
          "longitude": 27.6080605,
          "zoom": 8
        },
        "max_adults": 4,
        "preview_image": "https://images.unsplash.com/photo-1637762646936-29b68cd6670d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
        "price": 120,
        "rating": 4.8,
        "title": "Уютные Апартаменты в историческом центре Минска",
        "type": "apartment",
        "hostId": '619fe0e17db2dde62c2fe3ee',
        "cityId": '619ff1c6c8b671edc73d2f0f'
      }
    )
    const hotel6 = new Hotel({
      "bedrooms": 3,
        "description": "Прекрасное расположение, две минуты от метро. Квартира соответствует описанию, а камин это вообще шикарно вещь",
        "goods": [
          "Heating",
          "Kitchen",
          "Cable TV",
          "Washing machine",
          "Coffee machine",
          "Dishwasher"
        ],
        "images": [
          "https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          "https://images.unsplash.com/photo-1637649228998-6c78a67dfa6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=325&q=80",
          "https://images.unsplash.com/photo-1637649228998-6c78a67dfa6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=325&q=80g"
        ],
        "is_favorite": false,
        "is_premium": true,
        "location": {
          "latitude": 53.9238393,
          "longitude": 27.6080605,
          "zoom": 8
        },
        "max_adults": 4,
        "preview_image": "https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        "price": 129,
        "rating": 4,
        "title": "Уютные Апартаменты в историческом центре Минска",
        "type": "apartment",
        "hostId": '619fe0e17db2dde62c2fe3ef',
        "cityId": '619ff1c6c8b671edc73d2f0f'
      }
    )

    const hotel7 = new Hotel(
      {
        "bedrooms": 3,
        "description": "Отличная квартира в центре Минска. Рядом есть все, что нужно. Торговые центры, магазины, кафе и рестораны в шаговой доступности. Метро в 2 минутах пешком.",
        "goods": [
          "Heating",
          "Kitchen",
          "Cable TV",
          "Washing machine",
          "Coffee machine",
          "Dishwasher"
        ],
        "images": [
          "https://images.unsplash.com/photo-1614356192561-8f97735e56fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=740&q=80",
          "https://images.unsplash.com/photo-1614356192561-8f97735e56fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=740&q=80"
        ],
        "is_favorite": false,
        "is_premium": false,
        "location": {
          "latitude": 53.9238393,
          "longitude": 27.6080605,
          "zoom": 8
        },
        "max_adults": 4,
        "preview_image": "https://images.unsplash.com/photo-1614356192561-8f97735e56fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=340&q=80",
        "price": 140,
        "rating": 4.1,
        "title": "Уютные Апартаменты в историческом центре Минска",
        "type": "apartment",
        "hostId": '619fe0e17db2dde62c2fe3f0',
        "cityId": '619ff1c6c8b671edc73d2f0e'
      }
    )
    const hotel8 = new Hotel(
      {
        "bedrooms": 3,
        "description": "Отличная квартира в центре Минска. Рядом есть все, что нужно. Торговые центры, магазины, кафе и рестораны в шаговой доступности. Метро в 2 минутах пешком.",
        "goods": [
          "Heating",
          "Kitchen",
          "Cable TV",
          "Washing machine",
          "Coffee machine",
          "Dishwasher"
        ],
        "images": [
          "https://images.unsplash.com/photo-1613036814506-a79f847abdd4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=742&q=80",
          "https://images.unsplash.com/photo-1613036814506-a79f847abdd4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=742&q=80"
        ],
        "is_favorite": false,
        "is_premium": false,
        "location": {
          "latitude": 53.908628,
          "longitude": 27.549013,
          "zoom": 8
        },
        "max_adults": 4,
        "preview_image": "https://images.unsplash.com/photo-1613036814506-a79f847abdd4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=342&q=80",
        "price": 180,
        "rating": 1.8,
        "title": "Уютные Апартаменты в историческом центре Минска",
        "type": "apartment",
        "hostId": '619fe0e17db2dde62c2fe3f1',
        "cityId": '619ff1c6c8b671edc73d2f0e'
      }
    )
    await hotel1.save()
    await hotel2.save()
    await hotel3.save()
    await hotel4.save()
    await hotel5.save()
    await hotel6.save()
    await hotel7.save()
    await hotel8.save()
    res.json("Server work")
  } catch (e) {
    console.log(e)
  }
}


module.exports.getAllHotels = getAllHotels;
module.exports.getHotelById = getHotelById;
module.exports.create = create;



