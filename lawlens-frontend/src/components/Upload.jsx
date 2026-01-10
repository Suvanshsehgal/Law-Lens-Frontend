import { useEffect } from "react";
import { uploadPDF } from "../lib/api";

function Upload({ file, setDocResult, setLoading, setError }) {
  useEffect(() => {
    if (!file) return;

    const processDocument = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await uploadPDF(file);
        setDocResult(response);
      } catch (err) {
        console.error(err);
        setError("Failed to process document. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    processDocument();
  }, [file, setDocResult, setLoading, setError]);

  return null;
}

export default Upload;
