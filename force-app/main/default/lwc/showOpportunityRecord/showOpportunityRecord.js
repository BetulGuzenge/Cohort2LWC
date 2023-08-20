import { LightningElement, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

import OPP_ID from '@salesforce/schema/Opportunity.Id';
import OPP_NAME from '@salesforce/schema/Opportunity.Name';
import OPP_CLOSEDATE from '@salesforce/schema/Opportunity.CloseDate';
import OPP_LEADSOURCE from '@salesforce/schema/Opportunity.LeadSource';
import OPP_EXPECTEDREVENUE from '@salesforce/schema/Opportunity.ExpectedRevenue';


export default class ShowOpportunityRecord extends LightningElement {
    
    recId = '0066e00001qAlz5AAC';

    @track opportunityRecord=undefined;

    @wire (getRecord, {recordId: '$recId', fields: [OPP_ID,OPP_NAME,OPP_CLOSEDATE,OPP_LEADSOURCE,OPP_EXPECTEDREVENUE]})

        getOpportunityRecord ({data,error}){
            if(data){
                this.opportunityRecord ={
                    Id : data.fields.Id.value,
                    Name : data.fields.Name.value,
                    CloseDate : data.fields.CloseDate.value,
                    LeadSource : data.fields.LeadSource.value,
                    ExpectedRevenue : data.fields.ExpectedRevenue.value
                };
            }
            if(error){
                console.log(error);

            }
        }


}
