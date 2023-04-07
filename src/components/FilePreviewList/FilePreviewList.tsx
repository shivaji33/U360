import classes from "./FilePreviewList.module.scss";
import PDFThubnail from "../../assets/PDF_file_icon.svg";
import { ReactNode } from "react";
import { Expense } from "../../modules/expense-tracker/models/expense";

const FilePreviewList: React.FC<{ expense: Expense; children?: ReactNode }> = ({
  expense,
}) => {
  const isFilePdf = (contentType: string) => {
    return contentType === "application/pdf";
  };
  const handleDownload = (fileUrl: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.target = "_blank";
    link.download ='test';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={classes["attchments-list"]}>
      {expense.expenseAttachment?.map((ea) => (
        <div key={ea.rawURL} className={classes["attchments-item"]}>
          {
            <img
              src={!isFilePdf(ea.fileType) ? ea.downloadURL : PDFThubnail}
              alt="EXPENSE_IMAGE"
            />
          }
          <button
            onClick={handleDownload.bind(this, ea.downloadURL)}
            className={classes["download-file-icon"]}
          >
            <i className="fas fa-cloud-download"></i>
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilePreviewList;
