const parsers = require("./parsers");

const AzureResourceManagementService = require('./azure.arm.service');

async function createResourceGroup(action, settings){
    const { name, location, tags } = action.params;
    const client = await AzureResourceManagementService.from(action.params, settings);
    return client.createResourceGroup({
        name: parsers.string(name),
        location: parsers.autocomplete(location),
        tags: parsers.tags(tags)
    });
}

async function createStorageAccount(action, settings){
    const { resourceGroup, name, kind, accessTier, location, sku, tags } = action.params;
    const client = await AzureResourceManagementService.from(action.params, settings);
    return client.createStorageAccount({
        resourceGroup: parsers.autocomplete(resourceGroup),
        name: parsers.string(name),
        location: parsers.autocomplete(location),
        sku: parsers.autocomplete(sku),
        tags: parsers.tags(tags),
        kind, accessTier
    });
}

async function getResourceGroup(action, settings){
    const { resourceGroup } = action.params;
    const client = await AzureResourceManagementService.from(action.params, settings);
    return client.getResourceGroup({
        resourceGroup: parsers.autocomplete(resourceGroup)
    });
}

async function deleteResourceGroup(action, settings){
    const { resourceGroup } = action.params;
    const client = await AzureResourceManagementService.from(action.params, settings);
    return client.deleteResourceGroup({
        resourceGroup: parsers.autocomplete(resourceGroup)
    });
}

async function getStorageAccount(action, settings){
    const { resourceGroup, storageAccount } = action.params;
    const client = await AzureResourceManagementService.from(action.params, settings);
    return client.getStorageAccount({
        resourceGroup: parsers.autocomplete(resourceGroup),
        storageAccount: parsers.autocomplete(storageAccount)
    });
}

async function deleteStorageAccount(action, settings){
    const { resourceGroup, storageAccount } = action.params;
    const client = await AzureResourceManagementService.from(action.params, settings);
    return client.deleteStorageAccount({
        resourceGroup: parsers.autocomplete(resourceGroup),
        storageAccount: parsers.autocomplete(storageAccount)
    });
}

async function listResourceGroups(action, settings){
    const client = await AzureResourceManagementService.from(action.params, settings);
    return client.listResourceGroups();
}

async function listStorageAccounts(action, settings){
    const { resourceGroup } = action.params;
    const client = await AzureResourceManagementService.from(action.params, settings);
    return client.listStorageAccounts({
        resourceGroup: parsers.autocomplete(resourceGroup)
    });
} 

module.exports = {
    createResourceGroup,
	createStorageAccount,
	getResourceGroup,
	deleteResourceGroup,
	getStorageAccount,
	deleteStorageAccount,
	listResourceGroups,
	listStorageAccounts,
    // Autocomplete Functions
    ...require("./autocomplete")
}