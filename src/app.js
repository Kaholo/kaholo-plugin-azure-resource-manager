const msRest = require('@azure/ms-rest-nodeauth');
const resourceManagement = require("@azure/arm-resources");

/**
 * Internal function for handling authentication and generation of website managmnet client
 * @param {*} action 
 * @param {*} settings 
 * @returns Promise<WebSiteManagementClient>
 */

function _getWebSiteManagementClient(settings) {
	/**
	 * Create credentials from the clientId, secret and domain
	 */


    return msRest.loginWithServicePrincipalSecret(
        settings.clientId, settings.secret, settings.tenant).then(credentials => {
			/**
			 * Create new Resource Mamagement client using the credentials and subscription ID
			 * And returns the new resource mamagement client
			 */
            return new resourceManagement.ResourceManagementClient(credentials, (settings.subscriptionId));
        });
}

function createResourceGroup (action, settings) {
    return _getWebSiteManagementClient(settings).then(RMClient=>{
        let resourceGroupName = action.params.resourceGroupName
        let groupParameters = action.params.parameters
        return RMClient.resourceGroups.createOrUpdate(resourceGroupName, groupParameters);
    })
}

function createStorageAccount (action, settings){
    return _getWebSiteManagementClient(settings).then(RMClient=>{
        let resourceGroupName = action.params.resourceGroupName
        let storageAccountName = action.params.storageAccountName
        let createParameters = action.params.parameters
        return RMClient.createStorageAccount.createOrUpdate(resourceGroupName, storageAccountName, createParameters)
    })
}


module.exports = {
    createResourceGroup: createResourceGroup,
    createStorageAccount: createStorageAccount
}
