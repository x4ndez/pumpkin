import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedAdmins = async () => {

    // model User {
    //   id            Int @id @default (autoincrement())
    //   email         String @unique
    //   name          String
    //   password      String
    //   classesBooked Int @default (0)
    //   bio           String ?
    //             proficiency   String ? @default ("Newbie")
    //   permissions   String @default ("user")
    //   accountActive Boolean @default (true)
    //   createdAt     DateTime @default (now())
    //   attendeeOf    Attendees[]
    //     }

    await prisma.user.create({
        data: {
            email: 'admin@admin.com',
            name: 'admin',
            password: 'admin',
            bio: 'I am an admin, just doing admin things.',
            permissions: 'admin',
            accountActive: true,
        }
    });

}

seedAdmins();