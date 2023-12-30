const { localhostUrl } = require('../config/index')

export const getSingleMember = async (memberId) => {

    const res = await fetch(`http://${localhostUrl}:3000/api/users/${memberId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return await res.json();

}