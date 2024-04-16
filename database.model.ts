import { Model } from "mongoose";
export class DatabaseDefault<T extends object> {
  constructor(protected databaseModel?: Model<any>) {}
  public create = async (data: T) => {
    return new Promise((resolve, reject) => {
      if (!("userId" in data)) {
        throw new Error("User Id not provided in record!");
      }
      console.log("[create] data:", data);
      console.log("[create] model:", this.databaseModel);
      this.databaseModel.create(
        {
          ...data,
        },
        (err, payload) => {
          if (err) {
            reject(err);
          }
          resolve(payload);
        }
      );
    });
  };
  public findAll = async (userId?: string) => {
    // const filter = { userId };
    console.log("[findAll] user:", userId);
    console.log("[findAll] model:", this.databaseModel);
    return new Promise(async (resolve, reject) => {
      await this.databaseModel.find((err, records) => {
        if (err) {
          reject(err);
        }
        resolve(records);
      });
    });
  };
}
