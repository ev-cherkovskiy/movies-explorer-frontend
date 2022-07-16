class MoviesApi {
    constructor(options) {
        // Путь до сервера
        this._baseUrl = options.baseUrl;
    }

    // Приватный метод, выставляющий заголовки
    _headers() {
        return {
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

    // Шаблон get-запроса
    _get() {
        return fetch(this._baseUrl, {
            headers: this._headers(),
        })
            .then(this._checkResponse);
    }

    // Запрос
    getMovies() {
        return this._get();
    }
}

// Экземпляр API-класса
const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default moviesApi;