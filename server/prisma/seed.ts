import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedAdmins = async () => {

    await prisma.user.createMany({

        data: [
            {
                email: 'admin@admin.com',
                name: 'admin',
                password: 'admin',
                bio: 'I am an admin, just doing admin things.',
                permissions: 'admin',
                accountActive: true,
            },
            {
                email: 'tux@iron.com',
                name: 'Tux',
                password: 'admin',
                bio: 'x0x0x0x0',
                permissions: 'admin',
                accountActive: true,
            },
            {
                email: 'maz@iron.com',
                name: 'Maz',
                password: 'admin',
                bio: 'lol, hey',
                permissions: 'admin',
                accountActive: true,
            },
            {
                email: 'jonstone@gmail.com',
                name: 'Jon Stone',
                password: 'admin',
                bio: 'I am the best at lifting things in this entire world.',
                permissions: 'user',
                accountActive: true,
            },
            {
                email: 'jessrein@gmail.com',
                name: 'Jess Reinhart',
                password: 'admin',
                bio: 'omg this app is so c00l',
                permissions: 'user',
                accountActive: true,
            },
            {
                email: 'bilbo@gmail.com',
                name: 'Bilbo Maggins',
                password: 'admin',
                bio: 'Almost got that ring bro, but at the gym, I get the rings every day.',
                permissions: 'user',
                accountActive: true,
            },
        ]
    });

}

seedAdmins();