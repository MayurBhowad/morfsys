import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken.utils';

const deleteAuthToken = () => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
        const decoded = jwt_decode(localStorage.token);

        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            window.location.href = '/login'
        }
    }
}

export default deleteAuthToken