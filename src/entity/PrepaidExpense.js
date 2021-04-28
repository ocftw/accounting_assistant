export default class {
    constructor(transferDate, itemName, sendAmount, 
        receiptDepiction, applicant, projectName, ocfSplitComment, otherComment, writeOffComment) {
        
        //撥款日期
        this.transferDate = transferDate;
        //項目
        this.itemName = itemName;
        //金額
        this.sendAmount = sendAmount;
        //單據
        this.receiptDepiction = receiptDepiction;
        //填表人
        this.applicant = applicant;
        //專案名稱
        this.projectName = projectName;
        //OCF 分帳備註
        this.ocfSplitComment = ocfSplitComment;
        //其他備註
        this.otherComment = otherComment;
        //其他核銷備註
        this.writeOffComment = writeOffComment;
    }
}