public with sharing class CreateAccountsController {
    
    @AuraEnabled
    public static Account create(String name, Date expiry, Integer employees, Decimal revenue){
        Account acc = new Account();
        acc.Name = name;
        if(expiry != null){
            acc.SLAExpirationDate__c = expiry;
        }
        if(employees != null){
            acc.NumberOfEmployees = employees;
        }
        if(revenue != null){
            acc.AnnualRevenue = revenue;
        }
        INSERT acc;
        return acc;
    }

    @AuraEnabled
    public static Contact createRelatedContact(Id accId, String firstName, String lastName, String phone){
        Contact con = new Contact();
        if(firstName != null){
            con.FirstName = firstName;
        } 
        con.LastName = lastName;
        con.Phone = phone;
        con.AccountId = accId;
        INSERT con;
        return con;
    }
    
    @AuraEnabled
    public static List<Contact> createRelatedContacts(Id accId, List<Map<String, String>> records){
        List<Contact> contacts = new List<Contact>();
        for(Map<String, String> record : records){
            Contact con = new Contact();
            if(record.get('firstName') != null){
                con.FirstName = record.get('firstName');
            }
            con.LastName = record.get('lastName');
            con.Phone = record.get('phone');
            con.AccountId = accId;
            contacts.add(con);
        }
        INSERT contacts;
        return contacts;
    }
}