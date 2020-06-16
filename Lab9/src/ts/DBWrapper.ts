import * as sqlite3 from "sqlite3";

export function DbHandlerOpen(path: string) {
    return new Promise<sqlite3.Database>((resolve, reject) => {
        let db = new sqlite3.Database(path, function(err : any) {
            if (err) {
                reject(err);
            } else {
                resolve(db);
            }
        });
    });
}

export function DbHandlerAll(db : sqlite3.Database, sqlQuery: string, params: any[]) {
    return new Promise<any>((resolve, reject) => {
        if (params === undefined) {
            params = [];
        }

        db.all(sqlQuery, params, function(err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

export function DbHandlerRun(db : sqlite3.Database, sqlQuery: string, params: any[]) {
    return new Promise((resolve, reject) => {
        db.run(sqlQuery, params,
            function(err)  {
                if (err) {
                    reject(err.message)
                } else {
                    resolve(true);
                }
        });
    });
}

export function DbHandlerGet(db : sqlite3.Database, sqlQuery: string, params: any) {
    return new Promise((resolve, reject) => {
        if (params === undefined) {
            params = [];
        }

        db.get(sqlQuery, params, function(err: any, row: any){
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}