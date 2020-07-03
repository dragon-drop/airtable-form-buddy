export const createRecord = async (table, json, callback) => {
  if (table.hasPermissionToCreateRecord(json)) {
    const newRecordId = await table.createRecordAsync(json);
    if (typeof callback === 'function') callback(newRecordId);
  }
};