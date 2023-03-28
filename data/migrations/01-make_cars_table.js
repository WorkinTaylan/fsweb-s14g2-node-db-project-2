exports.up = function (knex, Promise) {
  // SİHRİNİZİ GÖSTERİN
  return knex.schema.createTable('cars', tbl=>{
    tbl.increments();//id primary key
    
    tbl.string('vin').unique().notNullable();//vin, benzersiz, required
    
    tbl.string('make').notNullable();
    
    tbl.string('model').notNullable();
    
    tbl.integer('mileage').notNullable(); //km değeri numeric ve required
    
    tbl.string('title');
    
    tbl.string('transmission');
    
  })
};

exports.down = function (knex, Promise) {
  // SİHRİNİZİ GÖSTERİN
  return knex.schema.dropTableIfExists("cars")
};
