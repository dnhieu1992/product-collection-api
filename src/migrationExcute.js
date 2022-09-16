import fs from 'fs';
import path from 'path';
import db from './models/index.js';
import Migration_31072021000_InitDefaultRoleValue from './config/migrations/Migration_31072021000_InitDefaultRoleValue.js';
import mongoose from 'mongoose';

const migrationObj = {
    Migration_31072021000_InitDefaultRoleValue: new Migration_31072021000_InitDefaultRoleValue()
};

export default (async function () {
    var normalizedPath = path.resolve(path.dirname(''), "config/migrations");
    const files = await fs.readdirSync(normalizedPath);
    const migrations = await db.Migration.find().exec();
    var newInstance = Object.create(Window["Migration_31072021000_InitDefaultRoleValue"].prototype);
    console.log(newInstance?.name)

    for (const file of files) {
        const instance = migrationObj[file.split('.')[0]];
        if (instance?.version && !migrations.some(migration => migration?.version === instance?.version)) {
            await instance?.up();
            const newMigration = new db.Migration({
                _id: mongoose.Types.ObjectId(),
                name: instance?.name,
                version: instance?.version
            });
            await newMigration.save();
        }
    }
})();