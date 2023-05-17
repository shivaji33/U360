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
  const handleDownload = (downloadUrl: string) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', downloadUrl);
    xhr.send();
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
