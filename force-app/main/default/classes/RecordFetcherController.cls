public with sharing class RecordFetcherController {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccounts(){
        return [SELECT Id, Name, Phone FROM Account];
    }

  @AuraEnabled(cacheable=true)// if we want a method to be called by lwc we have to add AuraEnable annotation, to make this method to be called by wire service we have to add cacheable=true
  public static Account getAccountDetail(Id accId){
      return [SELECT Id, Name, AccountNumber, Phone FROM Account WHERE Id = :accId];// apex class provide communication between lwc and org
  }                                                                                 //this method is created to be used for showSpecificAccount lwc 

  @AuraEnabled(cacheable=true)//if it cachable true we can use this method only for this task.and read only 
  public static List<Account> getAccountDetails(String accType){
      return [SELECT 
              Id, Name, AccountNumber, Phone, AnnualRevenue, Type 
              FROM Account 
              WHERE Type = :accType];
  }

  @AuraEnabled
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
}