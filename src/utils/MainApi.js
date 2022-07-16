class MainApi {
    constructor(options) {
        // Путь до сервера
        this._baseUrl = options.baseUrl;
    }

    // Приватный метод, выставляющий заголовки
    _headers() {
        return {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
    }

    // Приватный метод, который проверяет ответ от сервера, форматирует его или возващает ошибку
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    //  Шаблоны запросов

    _get(dir) {
        return fetch(this._baseUrl + dir, {
            headers: this._headers(),
        })
            .then(this._checkResponse);
    }

    _patch(dir, bodyObject) {
        return fetch(this._baseUrl + dir, {
            method: 'PATCH',
            headers: this._headers(),
            body: JSON.stringify(bodyObject)
        })
            .then(this._checkResponse);
    }

    _post(dir, bodyObject) {
        return fetch(this._baseUrl + dir, {
            method: 'POST',
            headers: this._headers(),
            body: JSON.stringify(bodyObject)
        })
            .then(this._checkResponse);
    }

    _delete(dir1, id, dir2) {
        return fetch(this._baseUrl + dir1 + id + dir2, {
            method: 'DELETE',
            headers: this._headers(),
        })
            .then(this._checkResponse);
    }

    // Публичные методы используют шаблоны, приведённые выше:
    // дополняют URL и тело запросов

    getUserInfo() {
        return this._get('/users/me');
    }

    editProfile(name, email) {
        const body = {
            name,
            email
        };
        return this._patch('/users/me', body);
    }

    getMovies() {
        return this._get('/movies');
    }

    addMovie(info) {
        const body = {
            country: info.country,
            director: info.director,
            duration: info.duration,
            year: info.year,
            description: info.description,
            image: "https://api.nomoreparties.co" + info.image.url,
            trailerLink: info.trailerLink,
            thumbnail: "https://api.nomoreparties.co" + info.image.formats.thumbnail.url,
            movieId: info.id,
            nameRU: info.nameRU,
            nameEN: info.nameEN
        };
        return this._post('/movies', body);
    }

    deleteMovie(id) {
        return this._delete('/movies/', id, '');
    }
}

// Экземпляр API-класса
const mainApi = new MainApi({
    baseUrl: 'https://api.ev-movies.nomoredomains.xyz',
});

export default mainApi;