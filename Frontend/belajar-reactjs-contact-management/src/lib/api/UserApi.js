export const userRegister = async (username, password, name) => {
   return await fetch(`${import.meta.env.VITE_API_PATH}/users`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password, name})
   });
}

// Di file src/lib/api/UserApi.js
export const userLogin = async (username, password) => {
    return fetch(`${import.meta.env.VITE_API_PATH}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
};

