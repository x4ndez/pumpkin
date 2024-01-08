import { PrismaClient } from '@prisma/client';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import controllers from './controllers';

const prisma = new PrismaClient();
const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
app.use(controllers);

async function main() {
    //Prisma Client queries

    

}

main()
    .then(async () => {

        app.listen(PORT, () => {
            console.log(`[express]: Server running at http://localhost:${PORT}`)
        })

    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })