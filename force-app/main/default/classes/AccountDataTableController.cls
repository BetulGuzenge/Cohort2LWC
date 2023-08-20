public with sharing class AccountDataTableController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccounts(){
        try {
            return [SELECT Id, Name, Type, 
                    AnnualRevenue, SLAExpirationDate__c, Phone 
                    FROM Account
                    ORDER BY CreatedDate DESC];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}