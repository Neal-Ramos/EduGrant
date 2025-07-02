import axios from "axios";

type ScholarshipDataTypes = {
    scholarshipTitle: string;
    providerName: string;
    scholarshipDescription: string;
    applicationDeadline: string;
    detailsImage: FileList;
    sponsorLogo: FileList;
    documents: {
      label: string;
      formats: string[];
    }[];
};
export const createScholarships = async (data: ScholarshipDataTypes) => {
    console.log({newScholarName: data.providerName,
        newScholarDeadline: data.applicationDeadline,
        newScholarDescription: data.scholarshipDescription,
        requirements: data.documents,
        sponsorLogo: data.sponsorLogo,
        coverImg: data.detailsImage})
    try {
      const formData = new FormData();
      formData.append("newScholarTitle", data.scholarshipTitle);
      formData.append("newScholarProvider", data.providerName);
      formData.append("newScholarDeadline", data.applicationDeadline);
      formData.append("newScholarDescription", data.scholarshipDescription);
      formData.append("requirements", JSON.stringify(data.documents));
      formData.append("sponsorLogo", data.sponsorLogo[0]);
      formData.append("coverImg", data.detailsImage[0]);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_ADMIN_API}/adminAddScholarships`,
        formData,
        {withCredentials: true})
      if(res.status === 200){
        alert(res.data.message)
      }
    } catch (error: any) {
      console.log(error)
      alert(error?.response?.data?.message || "Something Went Wrong!!!")
    }
}