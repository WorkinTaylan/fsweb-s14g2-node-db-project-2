const carsModel=require("./cars-model")
const yup=require("yup");
const vinValidator = require('vin-validator')

const carSchema=yup.object().shape({
  vin:yup.string()
  .required("vin is missing"),
  make:yup.string()
  .required("make is missing"),
  model:yup.string()
  .required("model is missing"),
  mileage:yup.number()
  .required("mileage is missing"),
  title:yup.string(),
  transmission:yup.string()
})

const checkCarId = async (req, res, next) => {
  // HOKUS POKUS
  try{
    const {id}=req.params;
    const existCar= await carsModel.getById(id);
    if(!existCar){
      res.status(404).json({message:`${id} kimliğine sahip araba bulunamadı`})
    }else{
      req.CheckedBody=existCar
      next()
    }
  }
  catch(error){
      next(error)
  }
}

const checkCarPayload = async (req, res, next) => {
  // HOKUS POKUS
  const {vin, make, model, mileage}=req.body
  try{
    
    if(vin && make && model && mileage){
      req.currentBody=req.body
    }
    await carSchema.validate(req.body);
    next();
  }
  catch(error){
    next(error)
  }
}

const checkVinNumberValid = async (req, res, next) => {
  // HOKUS POKUS
  const {vin}=req.body;

  try{
    const isValidVin=vinValidator.validate(vin)

    if(!isValidVin){
      res.status(400).json({message:`vin ${vin} is invalid`})
    }
      else{
        next()
      }
  }
  catch(error){
    next(error)
  }

}

const checkVinNumberUnique = async (req, res, next) => {
  // HOKUS POKUS
  try{
    const checkedVinValue=await carsModel.findByVin(req.body.vin)
    if(checkedVinValue){
      res.status(400).json({message:`vin ${req.body.vin} already exists`})
    }else{
      next()
    }
  }
  catch(error){
    next(error)
  }

}

module.exports={
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}