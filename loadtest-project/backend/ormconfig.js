"use strict";
const item_entity_1 = require("./dist/src/items/entities/item.entity");
const config = {
    type: "postgres",
    host: process.env.POSTGRES_HOST || "postgres",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    database: process.env.POSTGRES_DB || "itemsdb",
    entities: [item_entity_1.Item],
    synchronize: true, // для тестового задания допустимо; в prod — миграции
    logging: false,
    extra: {
        // пул соединений
        max: 20,
    },
};
module.exports = config;
//# sourceMappingURL=ormconfig.js.map