interface IAudit{  
    id: string;
    createdAt: Date;
    modifiedAt: Date;
    createdById: string;
    createdBy: string;
    modifiedById: string;
    modifiedBy: string;
    auditDate: Date;
    tableName: string;
    entityState: string;
    keyValues: string;
    oldValues: string;
    newValues: string;
} 