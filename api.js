
const personalKey = "ramzil-khalimov";
const baseHost = "https://wedev-api.sky.pro";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    })
};

export function getUserPosts({ userId, token }) {
  return fetch(postsHost + `/user-posts/${userId}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    })
};
export function addPosts({ description, imageUrl, token }) {
  return fetch(postsHost, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      description: description,
      imageUrl: imageUrl,
    }),

  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Ошибка в добавлении");
    }
    return response.json();
  });
};


export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    return response.json();
  });
};
export const likeApi = ({ postId, token }) => {
  return fetch(`${postsHost}/${postId}/like`,
    {
      method: "POST",
      headers: {
        Authorization: token,
      }
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw Error('Лайк не поставлен')
      }
    });
};

export const dislikeApi = ({ postId, token }) => {
  return fetch(`${postsHost}/${postId}/dislike`,
    {
      method: "POST",
      headers: {
        Authorization: token,
      }
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw Error('Лайк не поставлен')
      }
    });
};

