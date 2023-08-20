public with sharing class AccountCreateFormController {
    @AuraEnabled(cacheable=true)
    public static List<String> getAccountTypePicklistValues(){
        Schema.DescribeFieldResult fieldResult = Account.Type.getDescribe();
        List<Schema.PicklistEntry> typeList = fieldResult.getPicklistValues();
        List<String> values = new List<String>();
        for(Schema.PicklistEntry temp : typeList){
            if(temp.isActive()){
                values.add(temp.getValue());
            }
        }
        return values;
    }

    @AuraEnabled
    public static Account createAccount(Map<String, Object> record){
        try {
            Account acc = new Account();
            String dateString = String.valueOf(record.get('expiryDate')); // 2023-8-6
            String []dateArray = dateString.split('-');
            acc.Name = String.valueOf(record.get('name'));
            acc.Type = String.valueOf(record.get('type'));
            acc.AnnualRevenue = Decimal.valueOf(String.valueOf(record.get('annualRevenue')));
            acc.SLAExpirationDate__c = Date.newInstance(Integer.valueOf(dateArray[0]), Integer.valueOf(dateArray[1]),Integer.valueOf(dateArray[2]));
            acc.Phone = String.valueOf(record.get('phone'));
            acc.Active__c = String.valueOf(record.get('active'));
            INSERT acc;
            return acc;
        } catch (Exception e) {
            System.debug(e);
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Boolean createContacts(Id accId, List<Map<String, Object>> records){
        try {
            List<Contact> contacts = new List<Contact>();
            for(Map<String, Object> record : records){
                Contact con = new Contact();
                con.LastName = String.valueOf(record.get('lastName'));
                con.Phone = String.valueOf(record.get('phone'));
                con.AccountId = accId;
                contacts.add(con);
            }
            INSERT contacts;
            return true;
        } catch (Exception e) {
            System.debug(e);
            throw new AuraHandledException(e.getMessage());
        }
    }
}

// inorder to create an account we have to pass an object as parametre, because salesforce doesn't accept more than 4 parametres. we create this object on child js createaccount handler else part 
//then import the method on child js 