# kaholo-plugin-azure-resource-management
Kaholo plugin for integration with Azure Resource Management API.

##  Settings
1. Client or App ID (String) **Required if not in action** - The ID of the default azure client or app to authenticate to.
2. Secret or Password (Vault) **Required if not in action** - The default Active Directory Secret or default client password to authenticate with.
3. Domain or Tenant ID (String) **Required if not in action** - The ID of the default domain or tenant to use for authentication.
4. Subscription ID (String) **Required if not in action** - The ID of the default subscription to use.

## Method: Create Resource Group
Create a new resource group.

## Parameters
1. Client or App ID (String) **Required if not in settings** - The ID of the azure client or app to authenticate to.
2. Secret or Password (Vault) **Required if not in settings** - The Active Directory Secret or client password to authenticate with.
3. Domain or Tenant ID (String) **Required if not in settings** - The ID of the domain or tenant to use for authentication.
4. Subscription ID (String) **Required if not in settings** - The ID of the subscription to use.
5. Name (String) **Required** - The name to assign to the new resource group. Only allows alphanumeric characters, periods, underscores, hyphens and parenthesis and cannot end in a period.
6. Region (Autocomplete) **Required** - The Azure region to create the new resource group inside.
7. Tags (Text) **Optional** - Assign the tags specified to the new resource group. Tags must follow the format tagName=tagVal. To enter multiple tags seperate each with a new line.

## Method: Create Storage Account
Create a new storage account for the specified resource group.

## Parameters
1. Client or App ID (String) **Required if not in settings** - The ID of the azure client or app to authenticate to.
2. Secret or Password (Vault) **Required if not in settings** - The Active Directory Secret or client password to authenticate with.
3. Domain or Tenant ID (String) **Required if not in settings** - The ID of the domain or tenant to use for authentication.
4. Subscription ID (String) **Required if not in settings** - The ID of the subscription to use.
5. Resource Group (Autocomplete) **Required** - The Azure resource group the storage account will belong to.
6. Name (String) **Required** - The name to assign to the new storage account. must be between 3 and 24 characters in length and may contain numbers and lowercase letters only.
7. Storage Kind (Options) **Required** - The kind of storage to use in this account. The default is Storage V2. All other are optionsa are considered 'Premium' and cost more money.Possible values: **Storage V2 | Blob Storage | Block Blob Storage | File Storage**
8. Blob Storage Access Tier (Options) **Optional** - Required for storage accounts where kind = BlobStorage. The access tier used for billing. Possible values include: 'Hot', 'Cool'Possible values: **Hot | Cool**
9. Region (Autocomplete) **Required** - The Azure region to create the new storage account inside.
10. Redunency Type(SKU) (Autocomplete) **Required** - The Azure region to create the new resource group inside.
11. Tags (Text) **Optional** - Assign the tags specified to the new storage account. Tags must follow the format tagName=tagVal. To enter multiple tags seperate each with a new line.

## Method: Get Resource Group
Get information on the specified resource group.

## Parameters
1. Client or App ID (String) **Required if not in settings** - The ID of the azure client or app to authenticate to.
2. Secret or Password (Vault) **Required if not in settings** - The Active Directory Secret or client password to authenticate with.
3. Domain or Tenant ID (String) **Required if not in settings** - The ID of the domain or tenant to use for authentication.
4. Subscription ID (String) **Required if not in settings** - The ID of the subscription to use.
5. Resource Group (Autocomplete) **Required** - The Azure resource group to return information about.

## Method: Delete Resource Group
Delete the specified resource group.

## Parameters
1. Client or App ID (String) **Required if not in settings** - The ID of the azure client or app to authenticate to.
2. Secret or Password (Vault) **Required if not in settings** - The Active Directory Secret or client password to authenticate with.
3. Domain or Tenant ID (String) **Required if not in settings** - The ID of the domain or tenant to use for authentication.
4. Subscription ID (String) **Required if not in settings** - The ID of the subscription to use.
5. Resource Group (Autocomplete) **Required** - The Azure resource group to delete.

## Method: Get Storage Account
Get information on the specified storage account.

## Parameters
1. Client or App ID (String) **Required if not in settings** - The ID of the azure client or app to authenticate to.
2. Secret or Password (Vault) **Required if not in settings** - The Active Directory Secret or client password to authenticate with.
3. Domain or Tenant ID (String) **Required if not in settings** - The ID of the domain or tenant to use for authentication.
4. Subscription ID (String) **Required if not in settings** - The ID of the subscription to use.
5. Resource Group (Autocomplete) **Required** - The Azure resource group the storage account belongs to.
6. Storage Account (Autocomplete) **Required** - The Azure storage account to return information about.

## Method: Delete Storage Account
Delete the specified storage account.

## Parameters
1. Client or App ID (String) **Required if not in settings** - The ID of the azure client or app to authenticate to.
2. Secret or Password (Vault) **Required if not in settings** - The Active Directory Secret or client password to authenticate with.
3. Domain or Tenant ID (String) **Required if not in settings** - The ID of the domain or tenant to use for authentication.
4. Subscription ID (String) **Required if not in settings** - The ID of the subscription to use.
5. Resource Group (Autocomplete) **Required** - The Azure resource group the storage account belongs to.
6. Storage Account (Autocomplete) **Required** - The Azure storage account to delete.

## Method: List Resource Groups
List all resource groups in the current connected account.

## Parameters
1. Client or App ID (String) **Required if not in settings** - The ID of the azure client or app to authenticate to.
2. Secret or Password (Vault) **Required if not in settings** - The Active Directory Secret or client password to authenticate with.
3. Domain or Tenant ID (String) **Required if not in settings** - The ID of the domain or tenant to use for authentication.
4. Subscription ID (String) **Required if not in settings** - The ID of the subscription to use.

## Method: List Storage Accounts
List all storage accounts which match the provided criteria.

## Parameters
1. Client or App ID (String) **Required if not in settings** - The ID of the azure client or app to authenticate to.
2. Secret or Password (Vault) **Required if not in settings** - The Active Directory Secret or client password to authenticate with.
3. Domain or Tenant ID (String) **Required if not in settings** - The ID of the domain or tenant to use for authentication.
4. Subscription ID (String) **Required if not in settings** - The ID of the subscription to use.
5. Resource Group (Autocomplete) **Optional** - If specified only list storage accounts which belongs to the specified resource group.

