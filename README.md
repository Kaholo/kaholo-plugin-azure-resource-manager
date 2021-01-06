# kaholo-plugin-azureResourceManager
kaholo Plugin for Azure Resource Manager. We are wrapping @azure/arm-resources SDK.

## Settings:
1) clientIdֿ (String)
2) subscriptionId (String)
3) tenant (String)
4) secret (String)
## Method createResourceGroup
This method will create a resource group.
JSON parameter should refer to code or configuration because action parameter is a string.

### Parameters:
1) resourceGroupName (String)
2) parameters (JSON)

## Method createStorageGroup
Create a Storage group.
JSON parameter should refer to code or configuration because action parameter is a string.

### Parameters:
1) resourceGroupName (String)
2) storageAccountName (String)
3) parameters (JSON)
