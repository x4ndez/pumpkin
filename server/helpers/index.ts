import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const login = async (emailInp: string, passwordInp: string) => {
    const checkEmail = await prisma.user.findUnique({
        where: {
            email: emailInp,
        }
    });

    if (!checkEmail) return {
        code: 0,
        msg: 'No user found',
    };

    if (passwordInp === checkEmail.password) {

        const user = {
            id: checkEmail.id,
            permissions: checkEmail.permissions,
            accountActive: checkEmail.accountActive,
        }

        return {
            code: 1,
            msg: 'Login success',
            data: user,
        }
    }
    else return {
        code: 0,
        msg: 'Password incorrect',
    };
}

export const addMember = async (emailInp: string, nameInp: string) => {

    const checkEmail = await prisma.user.findUnique({
        where: {
            email: emailInp,
        }
    });

    if (checkEmail) return {
        code: 0,
        msg: 'Email already exists'
    }

    const user = await prisma.user.create({
        data: {
            email: emailInp,
            name: nameInp,
            password: 'admin',
        }
    });

    if (user) return {
        code: 1,
        msg: 'Member created successfully!'
    }

}

export const addClass = async (classInp: Class) => {

    const {
        className,
        classType,
        startTime,
        endTime,
        dateOf,
        recurring,
        daysActive,
    } = classInp;

    const daysActiveFiltered: string[] = [];

    daysActive.forEach((val) => {
        if (val.active) daysActiveFiltered.push(val.day);
    });

    console.log(daysActiveFiltered)

    const createClass = await prisma.class.create({
        data: {
            className: className,
            classType: classType,
            startTime: startTime,
            endTime: endTime,
            date: dateOf,
            recurring: recurring,
        }
    });

    if (createClass.recurring && daysActiveFiltered.length > 0) {
        const createDaysActive = await prisma.daysActive.createMany({
            data: daysActiveFiltered.map((val) => {
                return {
                    classId: createClass.id,
                    day: val
                }
            })
        });
    } else console.log('No')

    return {
        code: 1,
        msg: 'Class added successfully!',
        data: createClass,
    }

}

export const batchAddSessions = async (classInp: any) => {

    const sessions = [];

    const generateSchedule = async (classInp: any) => {
        const currDate = new Date(Date.now());
        const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const weekDate: Date[] = [];

        // create an array of dates for the sessions to be created.
        // This will create 4 weeks of sessions.
        // 7 days = 1 week of dates for that class.
        // Days are Sunday (0) to Saturday (6)
        for (let i = 0, day = currDate.getDay(); i <= 24; day++, i++) {

            const dayDate = new Date(
                currDate.setDate( // Use the value below to change the date based on the current date.
                    i === 0 ? (currDate.getDate() - currDate.getDay()) : currDate.getDate() + 1 // Get the current day number, then add the additional day each iteration.
                )
            );

            weekDate.push(dayDate)

        }

        // filter array of dates against recurring days
        const filteredDate: Date[] = weekDate.filter((val) => {
            for (let item of classInp.daysActive) {
                if (weekDay[val.getDay()] === item.day) return val;
            }
        })

        return filteredDate;

    }

    const filteredDate = await generateSchedule(classInp);

    // add sessions to database
    const createSessions = await prisma.session.createMany({
        data: filteredDate.map((val) => {
            return {
                classId: classInp.id,
                date: val,
            }
        })
    });

    return {
        code: 1,
        msg: 'Session added successfully!'
    }

}

export const addWOD = async (name: string, content: string, dateOf: Date) => {

    const createWOD = await prisma.wOD.create({
        data: {
            name: name,
            date: dateOf,
            content: content,
        }
    });

    return {
        code: 1,
        msg: 'WOD created successfully!'
    };

}

export const getClasses = async () => {
    const query = await prisma.class.findMany({
        include: {
            daysActive: true,
        }
    });
    return query;
}

export const getSelectClass = async (classId: number) => {
    const query = await prisma.class.findUnique({
        where: {
            id: classId,
        },
        include: {
            daysActive: true,
        }
    });
    return query;
}

export const getSessionFromClass = async (classId: number, date: Date) => {

    const dateTimeMin = new Date(date.setHours(0, 0, 0, 0));
    const dateTimeMax = new Date(date.setHours(23, 59, 59, 999));

    const query = await prisma.session.findFirst({
        where: {
            AND: {
                classId: classId,
                date: {
                    lte: dateTimeMax,
                    gte: dateTimeMin,
                }
            }
        },
        include: {
            attendees: true,
        }
    });

    return query;
}

export const attendSession = async (memberId: number, sessionId: number) => {

    const attendeeExistsInSession = await prisma.attendees.findFirst({
        where: {
            AND: {
                userId: {
                    equals: memberId,
                },
                sessionId: {
                    equals: sessionId,
                }
            }
        }
    });

    if (attendeeExistsInSession === null) {
        const queryAttendee = await prisma.attendees.create({
            data: {
                userId: memberId,
                sessionId: sessionId,
            }
        });

        return {
            code: 1,
            msg: 'Attending!',
            data: queryAttendee,
        };
    } else {
        return {
            code: 0,
            msg: 'Failed request!'
        };
    }

}

export const unattendSession = async (memberId: number, sessionId: number, attendeeId: number) => {

    const attendeeExistsInSession = await prisma.attendees.findFirst({
        where: {
            AND: {
                userId: {
                    equals: memberId,
                },
                sessionId: {
                    equals: sessionId,
                }
            }
        }
    });

    if (attendeeExistsInSession === null) return {
        code: 0,
        msg: 'Failed request!  The attendee does not exist in the session.'
    };

    if (attendeeExistsInSession.id === attendeeId) {
        const queryAttendee = await prisma.attendees.delete({
            where: {
                id: attendeeId,
            }
        });

        return {
            code: 1,
            msg: 'Removed from attendance!',
        };
    } else {
        return {
            code: 0,
            msg: 'Failed request!'
        };
    }

}

export const getAttendees = async (sessionId: number) => {

    const query = await prisma.user.findMany({
        where: {
            attendeeOf: {
                some: {
                    sessionId: {
                        equals: sessionId,
                    }
                }
            }
        },
        select: {
            id: true,
            name: true,
            proficiency: true,
        }
    });

    return query;
}

export const deleteUser = async (userId: number) => {

    const checkUser = await prisma.user.findUnique({
        where: {
            id: userId,
        }
    });

    console.log(checkUser)

    if (checkUser != null && checkUser.email === 'admin@admin.com') {
        return {
            code: 0,
            msg: 'Request Failed.  You cannot delete admin!',
        };
    } else if (checkUser === null) {
        return {
            code: 0,
            msg: 'Request Failed! User does not exist.',
        };
    }

    const query = await prisma.user.delete({
        where: {
            id: userId,
        }
    }).catch((err) => {
        return {
            code: 0,
            msg: `Failed request! Callback: ${err}`,
        };
    });

    return {
        code: 1,
        msg: 'User removed!',
    };

}

export const getWodsFromDate = async (dateOf: Date) => {

    const dateTimeMin = new Date(dateOf.setHours(0, 0, 0, 0));
    const dateTimeMax = new Date(dateOf.setHours(23, 59, 59, 999));

    const query = await prisma.wOD.findMany({
        where: {
            // If attaches to session, will need to add an AND operator and make a relationship between WOD and Session models.
            date: {
                lte: dateTimeMax,
                gte: dateTimeMin,
            }
        }
    });

    return {
        code: 1,
        msg: `${query.length} WODs found!`,
        data: query,
    };
}

export const addPost = async (userId: number, content: string) => {

    const query = await prisma.post.create({
        data: {
            userId: userId,
            content: content,
        }
    });

    return query;
}

export const getAllPosts = async () => {

    const query = await prisma.post.findMany({
        include: {
            comments: true,
            createdBy: {
                select: {
                    name: true,
                }
            }
        }
    });


    return query;
}

export const getSinglePost = async (postId: number) => {

    const query = await prisma.post.findUnique({
        where: {
            id: postId,
        },
        include: {
            comments: {
                include: {
                    createdBy: {
                        select: {
                            id: true,
                            name: true,
                            proficiency: true,
                            permissions: true,
                        }
                    }
                }
            }
        }
    });

    return query;
}

export const addComment = async (postId: number, userId: number, content: string) => {

    const query = await prisma.comment.create({
        data: {
            userId: userId,
            postId: postId,
            content: content,
        }
    });

    return query;
}

export const deleteWod = async (wodId: number) => {

    const checkWod = await prisma.wOD.findUnique({
        where: {
            id: wodId,
        }
    });

    if (checkWod === null) {
        return {
            code: 0,
            msg: 'Request Failed! WOD does not exist!',
        };
    }

    const deletedWod = await prisma.wOD.delete({
        where: {
            id: wodId,
        }
    }).catch((err) => {
        return {
            code: 0,
            msg: `Failed request! Callback: ${err}`,
        };
    });

    return {
        code: 1,
        msg: 'WOD removed!',
    };

}

export const deleteClass = async (classId: number) => {

    const checkClass = await prisma.class.findUnique({
        where: {
            id: classId,
        }
    });

    if (checkClass === null) {
        return {
            code: 0,
            msg: 'Request Failed! Class does not exist!',
        };
    }

    const deletedClass = await prisma.class.delete({
        where: {
            id: classId,
        }
    }).catch((err) => {
        return {
            code: 0,
            msg: `Failed request! Callback: ${err}`,
        };
    });

    return {
        code: 1,
        msg: 'Class removed!',
    };

}

export const deletePost = async (postId: number) => {

    const checkPost = await prisma.class.findUnique({
        where: {
            id: postId,
        }
    });

    if (checkPost === null) {
        return {
            code: 0,
            msg: 'Request Failed! Post does not exist!',
        };
    }

    const deletedPost = await prisma.post.delete({
        where: {
            id: postId,
        }
    }).catch((err) => {
        return {
            code: 0,
            msg: `Failed request! Callback: ${err}`,
        };
    });

    return {
        code: 1,
        msg: 'Post removed!',
    };

}

export interface Class {
    className: string
    classType: string
    startTime: Date
    endTime: Date
    dateOf: Date
    recurring: boolean
    daysActive: daysActive[]
}

export interface daysActive {
    day: string
    active: boolean
}

export interface DaysActive {
    classId: number
    day: string
}
