exports.up = function (knex) {
  exports.up = function (knex) {
    return knex.schema.createTable("questions", (tbl) => {
      tbl.increments();
      tbl.text("question").notNullable().unique();
      tbl.text("answer").notNullable();
      tbl.text("detail");
      tbl.integer("point").notNullable();
    });
  };

  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("questions");
  };
};
