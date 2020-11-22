import axios from 'axios';
import Router from 'next/router';

axios.defaults.withCredentials = true;

export const getServerSideToken = req => {
    if (req === undefined) {
        return {};
      } else {
        const { signedCookies = {} } = req;
        if (!signedCookies) {
            return {};
        } else if (!signedCookies.token) {
            return {}
        }
        return { user: signedCookies.token }
      }
}


const WINDOW_USER_SCRIPT_VAR = '__USER__';

export const getClientSideToken = () => {
    if (typeof window !== 'undefined') {
        const user = window[WINDOW_USER_SCRIPT_VAR] || {}
        return { user };
    }
    return { user: {} }
}

export const getUserScript = user => {
    return `${WINDOW_USER_SCRIPT_VAR} = ${JSON.stringify(user)};`;
}

export const authInitialProps = isProtectedRoute => ({req, res}) => {
    const auth = req ? getServerSideToken(req) : getClientSideToken()
    const currentPath = req ? req.url : window.location.pathname;
    const user = auth.user;
    const isAnonymous = !user || user.type !== 'authenticated';
    if (isProtectedRoute && isAnonymous && currentPath !== '/login') {
        return redirectUser(res, '/login');
    }
    return { auth }
}


const redirectUser = (res, path) => {
    if (res) {
        res.redirect(302, path);
        res.finished = true;
        return {}
    }
    Router.replace(path);
    return {};
}

export const loginUser = async (email, password) => {
    const { data } = await axios.post('/api/login', {email, password });
    if (typeof window !== 'undefined') {
        window[WINDOW_USER_SCRIPT_VAR] = data || {};
    }
}

export const logOutUser = async () => {
    if (typeof window !== 'undefined') {
        window[WINDOW_USER_SCRIPT_VAR] = {};
    }
    await axios.post('/api/logout');
    Router.push('/login')
}

export const getUserProfile = async () => {
    const { data } = await axios.get('/api/profile');
    return data;
}