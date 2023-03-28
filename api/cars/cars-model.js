const db=require('../../data/db-config');

const getAll = () => {
  // HOKUS POKUS
  return db('*').from("cars"); //ya da==>db("cars")
}

const getById = (id) => {
  // HOKUS POKUS
  return db("cars").where("id",id).first() // firstten önce array döneceği için first yazıp ilkini alıyoruz.
}
//sorulabilir
const create = async (car) => {
  // HOKUS POKUS
  const id=await db("cars").insert(car);
  return await getById(id[0]);
  /* const [id]=await db("cars").insert(car);
  return await getById(id); */
}

const findByVin= (vin)=>{
  return db("cars").where("vin", vin).first();
}

module.exports={
  getAll,
  getById,
  create,
  findByVin
}
