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

export const getClasses = async () => {

    const res = await fetch(`http://${localhostUrl}:3000/api/classes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return await res.json();

}

export const getSessionFromClass = async (classId, date) => {

    const res = await fetch(`http://${localhostUrl}:3000/api/classes/session/${classId}.${date}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return await res.json();

}

export const attendSession = async (memberId, sessionId) => {

    const payload = {
        memberId: memberId,
        sessionId: sessionId,
    }

    const res = await fetch(`http://${localhostUrl}:3000/api/classes/session/attendees`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    });

    return await res.json();

}

export const unattendSession = async (memberId, sessionId, attendeeId) => {

    const payload = {
        memberId: memberId,
        sessionId: sessionId,
        attendeeId: attendeeId,
    }

    const res = await fetch(`http://${localhostUrl}:3000/api/classes/session/attendees`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    });

    return await res.json();

}

export const getAttendees = async (sessionId) => {

    const res = await fetch(`http://${localhostUrl}:3000/api/classes/session/attendees/${sessionId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return await res.json();

}

export const deleteUser = async (userId) => {

    const payload = {
        userId: userId,
    }

    const res = await fetch(`http://${localhostUrl}:3000/api/users`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    });

    return await res.json();

}

export const getWodsFromDate = async (dateOf) => {

    const res = await fetch(`http://${localhostUrl}:3000/api/wod/${dateOf}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return await res.json();

}

export const addPost = async (userId, content) => {

    const payload = {
        userId: userId,
        content: content,
    }

    const res = await fetch(`http://${localhostUrl}:3000/api/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    });

    return await res.json();

}

export const getAllPosts = async () => {

    const res = await fetch(`http://${localhostUrl}:3000/api/posts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return await res.json();

}

export const getSinglePost = async (postId) => {

    const res = await fetch(`http://${localhostUrl}:3000/api/posts/${postId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return await res.json();

}

export const addComment = async (postId, userId, content) => {

    const payload = {
        userId: userId,
        postId: postId,
        content: content,
    }

    const res = await fetch(`http://${localhostUrl}:3000/api/posts/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    });

    return await res.json();

}

export const deleteWod = async (wodId) => {

    const payload = {
        wodId: wodId,
    }

    const res = await fetch(`http://${localhostUrl}:3000/api/wod`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    });

    return await res.json();

}

export const deleteClass = async (classId) => {

    const payload = {
        classId: classId,
    }

    const res = await fetch(`http://${localhostUrl}:3000/api/classes`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    });

    return await res.json();

}