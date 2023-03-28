// HOKUS POKUS
const router=require('express').Router();
const carsModel=require("./cars-model");
const {checkCarId, checkCarPayload, checkVinNumberUnique,checkVinNumberValid}=require("./cars-middleware")

router.get("/", async(req,res,next)=>{
    try{
        const allCars=await carsModel.getAll()
        res.json(allCars)
    }catch(error){
        next(error)
    }
})

router.get("/:id",checkCarId, async(req,res,next)=>{

    try{
        res.json(req.CheckedBody)
    }
    catch(error){
        next(error)
    }
})

router.post("/", checkCarPayload,checkVinNumberValid,checkVinNumberUnique, async(req,res,next)=>{
    try{
        const {vin,make,model,mileage,title,transmission}=req.body
        let posted=await carsModel.create({vin:vin, make:make, model:model, mileage:mileage,title:title, transmission:transmission})
        res.status(201).json(posted)
    }catch(error){
        next(error)
    }
})

router.use((err, req, res, next) => { // eslint-disable-line
    // KODLAR BURAYA
    res.status(err.status || 400).json({
        message:err.message,
        customMessage:"Hata oluştu"
    })
})


module.exports=router;
