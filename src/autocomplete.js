const parsers = require("./parsers");

const AzureResourceManagementService = require('./azure.arm.service');
const MAX_RESULTS = 10;

// auto complete helper methods

function mapAutoParams(autoParams){
  const params = {};
  autoParams.forEach(param => {
    params[param.name] = parsers.autocomplete(param.value);
  });
  return params;
}

/***
 * @returns {[{id, value}]} filtered result items
 ***/
function handleResult(result, query, useId){
  if (!result || result.length == 0) return [];
  const items = result.map(item => 
    getAutoResult(useId ? item.id : item.name, item.displayName || item.name));
  return filterItems(items, query);
}

/***
 * @returns {{id, value}} formatted autocomplete item
 ***/
function getAutoResult(id, value) {
  return {
    id: id || value,
    value: value || id
  };
}

function filterItems(items, query){
  if (query){
    const qWords = query.split(/[. ]/g).map(word => word.toLowerCase()); // split by '.' or ' ' and make lower case
    items = items.filter(item => qWords.every(word => item.value.toLowerCase().includes(word)));
    items = items.sort((word1, word2) => word1.value.toLowerCase().indexOf(qWords[0]) - word2.value.toLowerCase().indexOf(qWords[0]));
  }
  return items.splice(0, MAX_RESULTS);
}

function listAuto(listFuncName, useId) {
  return async (query, pluginSettings, triggerParameters) => {
    const settings = mapAutoParams(pluginSettings), params = mapAutoParams(triggerParameters);
    const client = await AzureResourceManagementService.from(params, settings);
    const result = await client[listFuncName](params);
    const items = handleResult(result, query, useId);
    return items;
  }
}

module.exports = {
  listLocationsAuto: listAuto("listLocations"),
  listResourceGroupsAuto: listAuto("listResourceGroups"),
  listStorageAccountsAuto: listAuto("listStorageAccounts"),
  listSkusAuto: listAuto("listSkus")
}
