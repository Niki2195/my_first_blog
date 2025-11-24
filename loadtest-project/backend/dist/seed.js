"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const ormconfig_1 = __importDefault(require("./ormconfig"));
const item_entity_1 = require("./src/items/entities/item.entity");
async function run() {
    const ds = new typeorm_1.DataSource({ ...ormconfig_1.default, entities: [item_entity_1.Item] });
    await ds.initialize();
    console.log('Connected for seeding');
    const total = 50000;
    const batchSize = 2000;
    const repo = ds.getRepository(item_entity_1.Item);
    for (let i = 0; i < total; i += batchSize) {
        const vals = [];
        const limit = Math.min(batchSize, total - i);
        for (let j = 0; j < limit; j++) {
            const idx = i + j + 1;
            const name = `item-${idx}`;
            // created_at можно оставить дефолтом now() — здесь задаём явное значение
            vals.push(`('${name}', now())`);
        }
        const sql = `INSERT INTO items (name, created_at) VALUES ${vals.join(',')};`;
        await ds.query(sql);
        console.log(`Inserted ${i + limit}/${total}`);
    }
    await ds.destroy();
    console.log('Seeding completed');
}
run().catch(err => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map