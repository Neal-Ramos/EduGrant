

export interface adminAddScholarshipsData {
    newScholarName: string,
    newScholarDeadline: Date,
    newScholarDescription: string,
    requirements: object
};

export interface getScholarshipsData {
    scholarshipId: number
};