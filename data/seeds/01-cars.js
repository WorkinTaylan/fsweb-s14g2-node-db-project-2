// ESNEK
const defaultCars=[
    {
        vin:"123",
        make:"volkswagen",
        model:"Golf",
        mileage:12345
    },
    {
        vin:"1234",
        make:"Audi",
        model:"A4",
        mileage:12345
    },
    {
        vin:"12345",
        make:"Reno",
        model:"Clio",
        mileage:12345
    },
    {
        vin:"123456",
        make:"Volvo",
        model:"V40",
        mileage:12345
    },
]

exports.seed=async function(knex){
    await knex("cars").truncate()
    await knex("cars").insert(
        defaultCars
    )
};