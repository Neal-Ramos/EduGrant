

export interface adminAddScholarshipsData {
    newScholarTitle: string,
    newScholarProvider: string,
    newScholarDeadline: Date,
    newScholarDescription: string,
    requirements: object
};

export interface getScholarshipsData {
    scholarshipId: number
};