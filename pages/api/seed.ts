import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDatabase } from '../../database'
import { Product, User } from '../../models';

type Data = {
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>){
  switch (req.method) {
    case "GET":
      return insertSeedData(req, res);
  
    default:
      return res.status(400).json({ message: "Metodo no existe" })
  }
}

async function insertSeedData(req: NextApiRequest, res: NextApiResponse<Data>) {
  
  if( process.env.NODE_ENV === 'production' )
    return res.status(401).json({ message: 'No tiene acceso a este servicio' });
  

  await db.connect();

  await User.deleteMany();
  await User.insertMany( seedDatabase.initialData.users )

  await Product.deleteMany();
  await Product.insertMany( seedDatabase.initialData.products )

  await db.disconnect();

  res.status(200).json({ message: 'Proceso realizado correctamente' })

}