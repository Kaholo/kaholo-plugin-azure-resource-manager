const parsers = require("./parsers");
const msRest = require('@azure/ms-rest-nodeauth');
const armResources = require("@azure/arm-resources");
const armStorage = require("@azure/arm-storage");
const armSubscriptions = require("@azure/arm-subscriptions");

module.exports = class AzureResourceManagementService{
    constructor({creds, subscriptionId}){
        this.rmClient = new armResources.ResourceManagementClient(creds, subscriptionId);
        this.storageClient = new armStorage.StorageManagementClient(creds, subscriptionId);
        this.subscriptionsClient = new armSubscriptions.SubscriptionClient(creds);
        this.subscriptionId = subscriptionId;
    }

    static async from(params, settings){
        const clientId = parsers.string(params.clientId || settings.clientId);
        const secret = params.secret || settings.secret;
        const domain = parsers.string(params.domain || settings.domain);
        const creds = await msRest.loginWithServicePrincipalSecret(clientId, secret, domain)

        return new AzureResourceManagementService({
            creds,
            subscriptionId: parsers.string(params.subscriptionId || settings.subscriptionId)
        });
    }
    
    async createResourceGroup({name, location, tags, dontWait}){
        if (!name || !location) {
            throw "One of the required parameters wasn't provided.";
        }
        return this.rmClient.resourceGroups.createOrUpdate(name, {location, tags});
    }
    
    async createStorageAccount({resourceGroup, name, kind, accessTier, location, sku, tags}){
        if (!resourceGroup || !name || !sku || !location) {
            throw "One of the required parameters wasn't provided.";
        }
        if (kind === "BlobStorage" && !accessTier) {
            throw "If chose BLOB storage, must also specify access tier.";
        }
        return this.storageClient.storageAccounts.create(resourceGroup, name, {
            kind: kind || "StorageV2", 
            accessTier: kind === "BlobStorage" ? accessTier : undefined,
            sku: {name: sku}, location, tags
        });
    }
    
    async getResourceGroup({resourceGroup}){
        if (!resourceGroup) throw "Must provide a resource group.";
        return this.rmClient.resourceGroups.get(resourceGroup);
    }
    
    async deleteResourceGroup({resourceGroup}){
        if (!resourceGroup) throw "Must provide a resource group.";
        return this.rmClient.resourceGroups.deleteMethod(resourceGroup);
    }
    
    async getStorageAccount({resourceGroup, storageAccount}){
        if (!resourceGroup || !storageAccount) {
            throw "One of the required parameters wasn't provided.";
        }
        return this.storageClient.storageAccounts.getProperties(resourceGroup, storageAccount);
    }
    
    async deleteStorageAccount({resourceGroup, storageAccount}){
        if (!resourceGroup || !storageAccount) {
            throw "One of the required parameters wasn't provided.";
        }
        return this.storageClient.storageAccounts.deleteMethod(resourceGroup, storageAccount);
    }
    
    async listResourceGroups(){
        return this.rmClient.resourceGroups.list();
    }
    
    async listStorageAccounts({resourceGroup}){
        if (!resourceGroup) return this.storageClient.storageAccounts.list();
        return this.storageClient.storageAccounts.listByResourceGroup(resourceGroup);
    }
    
    async listLocations(){
        return this.subscriptionsClient.subscriptions.listLocations(this.subscriptionId);
    }
    
    async listSkus({kind, location}){
        const result = (await this.storageClient.skus.list({})).filter(sku => sku.resourceType && 
            (!location || sku.locations.includes(location)) &&
            (!kind || sku.kind === kind));
        return result;
    }
}