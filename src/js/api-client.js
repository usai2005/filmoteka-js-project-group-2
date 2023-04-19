import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
//зображення що завантажиться при відсутності постеру
const DEFAULT_IMG =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png';

class ApiClient {
  constructor() {
    this.query = null;
    this.curentPage = 1;
    this.totalPages = 0;
    this.totalMovies = 0;
    this.genres = [];
    this.currentMoviesList = [];
    this.config = null;
  }

  //додаткова функція що при первинному запиті та отриманні популярних фільмів робить запит на сервер і отримує масив всіх жанрів та їх id
  async getGenres() {
    const response = await axios.get(
      `${BASE_URL}/genre/movie/list?api_key=ae38d5c8baf36c9c4ca14e9456f3c0fd&language=en-US`
    );

    this.genres = response.data.genres;
  }

  //додаткова функція для отримання конфігурації зображень
  async getImgConfig() {
    const response = await axios.get(
      `${BASE_URL}/configuration?api_key=ae38d5c8baf36c9c4ca14e9456f3c0fd`
    );
    this.config = response.data.images;
  }

  // підставляє до знайдених id жанрів його назву, повертає масив жанрів(обʼєднаний в рядок) або "Other", використовується при запиті інформації про фільми
  matchMovieGenres = obj => {
    const movieGenres = obj.reduce((acc, genreId) => {
      const genre = this.genres.find(({ id }) => id === genreId);
      if (genre) {
        acc.push(genre.name);
      }
      return acc;
    }, []);
    //якщо жанр айді = пустий масив, то додає Інший жанр
    if (movieGenres.length === 0) {
      return 'Other';
    } else if (movieGenres.length <= 2) {
      return movieGenres.join(', ');
    } else {
      return `${movieGenres.slice(0, 2).join(', ')}, Other`;
    }
  };

  //запит до серверу, що отримує дані популярних фільмів, повертає об'єкт готовий до рендеру
  getPopularMovie = async pageNumber => {
    // попереднє завантаження жанрів
    await this.getGenres();

    //якщо pageNumber = undefinеd(первинний запит що не задає номеру сторінки) запит переходить на сторінку 1, або поточну за замовчуванням
    if (pageNumber) {
      this.curentPage = pageNumber;
    }
    //власне, сам запит
    const data = await axios(
      `${BASE_URL}/trending/movie/day?api_key=ae38d5c8baf36c9c4ca14e9456f3c0fd&page=${this.curentPage}`
    )
      .then(response => {
        if (response.status !== 200) {
          throw new Error(`Error in request: ${response.status}`);
        }
        // перезапис значень, що використовуються для пагінації
        this.totalMovies = response.data.total_results;
        this.totalPages = response.data.total_pages;
        this.currentMoviesList = this.getMoviesInfo(response.data.results);
        //обробка результату функцією getMoviesInfo прокидання отриманого обʼєкту в функцію обробник щоб витягнути необхідні поля
        return this.getMoviesInfo(response.data.results);
      })
      .catch(e => console.error(e));

    return data;
  };

  //запит на сервер, пошук фільмів за ключовими словами. при первинному запиті номер сторінки можна не прокидувати, в середині функції прописана логіка якщо номер сторінки undefined щоб скрипт не падав
  getMovieByQuery = async (query, pageNumber) => {
    //додаткова перевірка, чи підвантажились жанри
    if (this.genres.length === 0) {
      await this.getGenres();
    }
    console.log('перевірка');
    // якщо запит оновлено, йде скидання до початкових значень
    if (query !== this.query) {
      this.query = query;
      this.curentPage = 1;
      this.totalPages = 0;
      this.totalMovies = 0;
    }
    //якщо pageNumber = undefinеd(первинний запит що не задає номеру сторінки) запит переходить на сторінку 1, або поточну за замовчуванням
    if (pageNumber) {
      this.curentPage = pageNumber;
    }

    const data = await axios(
      `${BASE_URL}/search/movie?api_key=ae38d5c8baf36c9c4ca14e9456f3c0fd&language=en-US&query=${query}&page=${this.curentPage}`
    )
      .then(response => {
        if (response.status !== 200) {
          throw new Error(`Error in request: ${response.status}`);
        }

        // перезапис значень, що використовуються для пагінації
        this.totalMovies = response.data.total_results;
        this.totalPages = response.data.total_pages;
        this.currentMoviesList = this.getMoviesInfo(response.data.results);
        //обробка результату, прокидання отриманого респонсу через функцію обробник
        return this.getMoviesInfo(response.data.results);
      })
      .catch(e => console.error(e));

    return data;
  };

  // запит, що підвантажує наступну порцію фільмів, перехід на вказану сторінку (пагінація). прокидується колбеком в методи бібліотеки пагінації
  goToPage = pageNumber => {
    if (!this.query) {
      return this.getPopularMovie(pageNumber);
    } else {
      return this.getMovieByQuery(this.query, pageNumber);
    }
  };

  // функція обробник повернення масиву об"єктів даних про фільми. використовується при пошуку по назві завантаженні популярних фільмів, в інших файлах не використовується
  getMoviesInfo = moviesArr => {
    return moviesArr.map(movie => {
      const movieInfo = {
        title: movie.title ? movie.title : movie.name, //назва
        w300imgUrl: movie.poster_path
          ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
          : DEFAULT_IMG, // постер, або дефолтна картинка за відсутності постера
        w500imgUrl: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : DEFAULT_IMG, // постер, або дефолтна картинка за відсутності постера
        genres: this.matchMovieGenres(movie.genre_ids), // жанри
        year: movie.release_date
          ? movie.release_date.slice(0, 4)
          : movie?.first_air_date?.slice(0, 4) || '', //рік
        id: movie.id, // ID не рендериться, використовується для отримання деталей по фільму
      };
      return movieInfo;
    });
  };

  //запит, що отримує інформацію про фільм за ID, використовується для показу детальної інформації за фільмом
  getMovieById = async id => {
    const data = await axios(
      `${BASE_URL}/movie/${id}?api_key=ae38d5c8baf36c9c4ca14e9456f3c0fd&language=en-US`
    )
      .then(response => {
        if (response.status !== 200) {
          throw new Error(`Error in request: ${response.status}`);
        }
        this.currentMoviesList = this.getMoviesDetails(response.data);
        // обробка результату, прокидання отриманого респонса через функцію обробник
        return this.getMoviesDetails(response.data);
      })
      .catch(e => console.error(e));

    return data;
  };

  // функція обробник повертає об"єкт з детальною інформацією по фільму, в інших файлах не використовується
  getMoviesDetails = movie => {
    let genres = movie.genres.map(elem => elem.name);
    let cutGenres;
    if (genres.length === 0) {
      cutGenres = 'Other';
    } else if (genres.length <= 2) {
      cutGenres = genres.join(', ');
    } else {
      cutGenres = `${genres.slice(0, 2).join(', ')}, Other`;
    }
    return {
      title: movie.title ? movie.title : movie.name, //назва
      titleOriginal: movie.original_title, // оригінальна назва
      popularity: movie.popularity, //популярність
      vote: movie.vote_average, // середній рейтинг
      votes: movie.vote_count, // кількість голосів
      w300imgUrl: movie.poster_path
        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        : DEFAULT_IMG, // постер, або дефолтна картинка за відсутності постера
      w500imgUrl: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : DEFAULT_IMG, // постер, або дефолтна картинка за відсутності постера
      genres: cutGenres, // жанри
      about: movie.overview,
      id: movie.id,
      year: movie.release_date
        ? movie.release_date.slice(0, 4)
        : movie?.first_air_date?.slice(0, 4) || '', // ID не рендериться, використовується для отримання деталей по фільму/трейлеру,
    };
  };

  //запит, що отримує інформацію про трейлер фільму
  getMoviesTrailer = async id => {
    const data = await axios(
      `${BASE_URL}/movie/${id}/videos?api_key=ae38d5c8baf36c9c4ca14e9456f3c0fd&language=en-US`
    )
      .then(response => {
        if (response.status !== 200) {
          throw new Error(`Error in request: ${response.status}`);
        }
        const result = response.data.results;
        // обробка результату
        // запит повертає обʼєкт що містить ключ до трейлеру[перший елемент масиву] та тізеру[другий елемент масиву]
        if (result.length === 0) {
          return null; // якщо запит повернув пустий масив функція повертає null
        } else if (result.length > 0) {
          const trailerObj = result.find(({ name }) =>
            name.toLowerCase().includes('trailer')
          );

          if (trailerObj) {
            return trailerObj.key; //якщо є трейлер, то повертає рядок з адресою трейлера
          } else {
            return result[0].key; //якщо тільки тизер, то відповідно адресу тизера
          }
        }

        return response.data.results; //повертає масив об"єктів
      })
      .catch(e => console.error(e));

    return data;
  };
}
const api = new ApiClient(); //експортуємо екземпляр

export default api;
